import { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';

import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
import WelcomeScreen from './screens/WelcomeScreen';
import { Colors } from './constants/styles';
import AuthContextProvider, { AuthContext } from './store/auth-context';
import IconButton from './components/ui/IconButton'

const Stack = createNativeStackNavigator();

function AuthStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Colors.primary500 },
        headerTintColor: 'white',
        contentStyle: { backgroundColor: Colors.primary100 },
      }}
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
    </Stack.Navigator>
  );
}

// 로그인 성공 시 LoginScreen/SignupScreen이 WelcomeScreen으로 전환되어야 함
// 그럴려면 이 스택을 인증된 사용자가 사용하는 화면 스택으로 전환해야 한다.
// 이를 위해서는 이 어플리케이션의 어딘가에 사용자가 로그인했다는 정보를 저장해야 한다 > 토큰 저장
// 인증 상태에 따라 일어나는 화면 전환은 전체 화면 설정과 내비게이터 전환이 되는데, 라우트 방지 또는 화면 보호라고도 불린다  
// 화면 보호라고 불리는 이유 > 특정 조건이 충족되지 않는 한, 특정 화면으로의 전환을 막아야 하기 때문에
// 예를 들면, 사용자가 로그인하지 않는 한 WelcomeScreen으로 넘어갈 수 없게 하는 것
// How? WelcomeScreen을 특정 화면 설정 안에 두면 됨. 이 경우 특정 내비게이션 > AuthenticatedStack 함수 참조
// App.js가 처음 렌더링될 때 Navigatrion()만 실행 > AuthStack만 렌더링 되고 AuthenticatedStack은 렌더링되지 않는다.
// AuthenticatedStack을 렌더링 하기 위해서 상태(state) 사용

function AuthenticatedStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Colors.primary500 },
        headerTintColor: 'white',
        contentStyle: { backgroundColor: Colors.primary100 },
      }}
    >
      <Stack.Screen name="Welcome" component={WelcomeScreen} options={{
        headerRight: ({ tintColor }) => <IconButton icon="exit" color={tintColor} size={24} />
      }}/>
    </Stack.Navigator>
  );
}

function Navigation() {
  const authCtx = useContext(AuthContext)
  return (
    <NavigationContainer>
      {/* 컴포넌트를 중괄호로 감싸면 동적 렌더링이 가능하다 */}
      {/* isAuthenticated가 거짓이라면, 즉 인증되지 않았으면 로그인과 회원가입 화면이 있는 AuthStack을 렌더링 */}
      {/* isAuthenticated가 참이라면, 즉 인증이 되었다면 환영 화면이 있는 AuthenticatedStack을 렌더링 */}
      {!authCtx.isAuthenticated && <AuthStack />}
      {authCtx.isAuthenticated && <AuthenticatedStack />}
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <>
      <StatusBar style="light" />
      <AuthContextProvider>
        <Navigation />
      </AuthContextProvider>
    </>
  );
}
