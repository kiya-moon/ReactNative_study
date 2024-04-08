import { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';
//
import { useNavigation } from '@react-navigation/native';

import FlatButton from '../ui/FlatButton';
import AuthForm from './AuthForm';
import { Colors } from '../../constants/styles';

function AuthContent({ isLogin, onAuthenticate }) { // onAuthenticate 프로퍼티는 유효한 데이터를 포함한 양식이 제출되면 트리거된다
                                                    // email, password를 가진 객체가 onAuthenticate로 전달됨
                                                    // line 68 : onAuthenticate({ email, password });
  // React Native에서 제공하는 특수한 훅 사용
  // useNavigation을 임포트하고 여기서 실행
  // navigation 객체로 선언 > 이 객체가 navigation 메서드를 제공
  const navigation = useNavigation()

  const [credentialsInvalid, setCredentialsInvalid] = useState({
    email: false,
    password: false,
    confirmEmail: false,
    confirmPassword: false,
  });

  function switchAuthModeHandler() {
    // isLogin 프로퍼티는 LoginScreen 컴포넌트에 설정되어 있지만 SignupScreen 컴포넌트에는 x
    // 따라서 SignupScreen 에서는 false이지만 LoginScreen에서는 true
    // 이를 이용해 가입/로그인페이지 중 어디로 이동해야 할 지 알 수 있음
    // 여기서 isLogin이 true이면 가입 페이지로 이동, isLogin이 false이면 로그인 페이지로 이동

    // 페이지를 이동하려면 React Native 패키지의 내비게이션 Api가 필요
    // AuthContent 컴포넌트는 Screen 컴포넌트가 아니기 때문에 navigation 프로퍼티를 가질 수 없음
    // 대신 React Navigation으로 작업하는 경우 내비게이션 객체에 액세스 가능 ↑↑↑
    if ( isLogin ) {
      // navigation.navigate()를 사용하면 뒤로 가기 버튼이 생기지만,
      // navigation.replace()를 사용하면 뒤로 가기 버튼 생성x
      navigation.replace('Signup')
    } else {
      navigation.replace('Login')
    }
  }

  function submitHandler(credentials) {
    let { email, confirmEmail, password, confirmPassword } = credentials;

    email = email.trim();
    password = password.trim();

    // 참고로 Firebase는 최소 6자 이상의 비밀번호를 요구해서 다음과 같은 유효성 검증 로직을 구현해 놓음(by.강사님)
    const emailIsValid = email.includes('@');
    const passwordIsValid = password.length > 6;
    const emailsAreEqual = email === confirmEmail;
    const passwordsAreEqual = password === confirmPassword;

    if (
      !emailIsValid ||
      !passwordIsValid ||
      (!isLogin && (!emailsAreEqual || !passwordsAreEqual))
    ) {
      Alert.alert('Invalid input', 'Please check your entered credentials.');
      setCredentialsInvalid({
        email: !emailIsValid,
        confirmEmail: !emailIsValid || !emailsAreEqual,
        password: !passwordIsValid,
        confirmPassword: !passwordIsValid || !passwordsAreEqual,
      });
      return;
    }
    onAuthenticate({ email, password });
  }

  return (
    <View style={styles.authContent}>
      <AuthForm
        isLogin={isLogin}
        onSubmit={submitHandler}
        credentialsInvalid={credentialsInvalid}
      />
      <View style={styles.buttons}>
        <FlatButton onPress={switchAuthModeHandler}>
          {isLogin ? 'Create a new user' : 'Log in instead'}
        </FlatButton>
      </View>
    </View>
  );
}

export default AuthContent;

const styles = StyleSheet.create({
  authContent: {
    marginTop: 64,
    marginHorizontal: 32,
    padding: 16,
    borderRadius: 8,
    backgroundColor: Colors.primary800,
    elevation: 2,
    shadowColor: 'black',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.35,
    shadowRadius: 4,
  },
  buttons: {
    marginTop: 8,
  },
});
