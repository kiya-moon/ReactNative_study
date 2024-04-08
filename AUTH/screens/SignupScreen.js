import AuthContent from '../components/Auth/AuthContent';
import LoadingOverlay from '../components/ui/LoadingOverlay';
import { AuthContext } from '../store/auth-context';
import { createUser } from '../util/auth';
import { useState, useContext } from 'react';

function SignupScreen() {
  // createUser는 프로미스를 반환하고, 그 프로미스가 성공(rewolve)할 때까지 대기(await)해야하니 로딩 아이콘을 표시해야 함
  // 그러기 위해서 비동기 함수로 전환하고 createUser 호출을 대기(await)
  // 그리고 SignupScreen 함수에서 로딩 상태를 관리하기 위해 React에서 임포트 한 useState를 사용한다
  const [ isAuthenticating, setIsAuthenticating ] = useState(false);

  // 가입이 완료되면 콘텍스트에 잇는 authenticate 함수를 호출해서 Firebase에서 콘텍스트로 수신한 토큰을 전달해서 인증 상태를 '인증됨'으로 설정할 수 있음
  // react에서 가져온 useContext 훅을 이용해서 authContext 객체 전달
  // 이 부분을 상수 또는 변수로 저장하고 signup Handler 함수에서 createuser를 호출한 후에 authCtx.authenticate를 호출
  // 이 authenticate에 Firebase가 반환한 토큰을 전달
  const authCtx = useContext(AuthContext)
  
  async function signupHandler({email, password}) {
    // signupHandler 실행될 때 > setIsAuthenticating = true
    setIsAuthenticating(true)
    try {
      const token = await createUser(email, password);  // AuthContent.js 파일에서 이미 유효성을 검증하므로 email과 password는 이미 유효한 데이터
      authCtx.authenticate(token)
    } catch (error) {
      Alert.alert(
        'Authentication failed',
        'Could not create user, please check your input and try again later.'
      );
      // 사용자 생성이 완료되면 > setIsAuthenticating = false
      setIsAuthenticating(false)
    }
  }

  if ( isAuthenticating ) {
    // LoadingOverlay 컴포넌트는 화면에 띄울 message 프로퍼티가 필요함
    return <LoadingOverlay message="Create user..." />
  }

  return <AuthContent onAuthenticate={signupHandler} />;
}

export default SignupScreen;
