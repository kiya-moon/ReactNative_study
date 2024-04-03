import { useState, useEffect } from 'react';
import { StyleSheet, ImageBackground, SafeAreaView } from 'react-native'; // ImageBackground 컴포넌트는 배경에 이미지를 렌더링한다
import { LinearGradient } from 'expo-linear-gradient';

// 폰트 사용하기
// 루트파일에 useFonts 추가★
import * as Font from 'expo-font';

import AppLoading from'expo-app-loading'
import * as SplashScreen from 'expo-splash-screen'

import StartGameScreen from './screens/StartGameScreen';
import GameScreen from './screens/GameScreen';
import GameOverScreen from './screens/GameOverScreen';
import Colors from './constants/colors';



export default function App() {
  // 사용자가 입력한 숫자를 state로 갖음
  const [userNumber, setUserNumber] = useState()
  const [gameIsOver, setGameIsOver] = useState(true)  // 게임 시작 전 == 게임 끝

  // 사용하고자 하는 글꼴을 assets - fonts 파일에 추가
  // (구글 폰트 파일을 손쉽게 사용하는 방법도 공식문서에 있으므로 참고)
  // 추가한 글꼴은 useFonts를 통해 로딩됨
  // 로딩한 글꼴을 구별하는 데 쓰일 프로퍼티 이름을 설정하고, 프로퍼티에 대한 값을 설정해서 로딩할 파일을 지정
  // const [fontsLoaded] = useFonts({
  //   'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
  //   'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf'),
  // })  // 로딩할 글꼴에 대한 설정을 포함한 객체를 전달
  // // 일반적으로 글꼴이 로딩되는 동안 로딩 화면을 띄우고나 앱의 스플래시 화면을 띄움
  // // 글꼴이 초기 설정되기 전에 나오는 앱의 로딩 화면
  // // expo install expo-app-loading

  // if (!fontsLoaded) {
  //   return <AppLoading />
  // } // font가 로딩되는 동안 AppLoading 화면 출력

  // expo-app-loading 대신에 expo-splash-screen이 쓰인대서 적용해봤는데 잘 모르겠다 ^^*
  // https://docs.expo.dev/versions/latest/sdk/splash-screen/
  const [fontsLoaded, setFontsLoaded] = useState(false)

  useEffect(() => {
    async function loadFontsAsync() {
      try {
        await Font.loadAsync({
          'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
          'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf'),
        });
      } catch (error) {
        console.warn(error);
      } finally {
        setFontsLoaded(true)
      }
    }

    loadFontsAsync();
  }, []);

  // 로딩 중일 때는 null을 반환하여 아무것도 렌더링하지 않음
  if (!fontsLoaded) {
    return null;
  }

  function pickedNumberHandler(pickedNumber) {
    setUserNumber((pickedNumber))
    setGameIsOver(false)
  }

  function gameOverHandler() {
    setGameIsOver(true)
  }
  
  // 사용자가 입력한 숫자가 없으면 StartGameScreen을 렌더링하고,
  // 사용자가 입력한 숫자가 있으면 GameScreen을 렌더링한다
  let screen = <StartGameScreen onPickNumber={pickedNumberHandler}/>
  if (userNumber) {
    screen = <GameScreen userNumber={userNumber} onGameOver={gameOverHandler}/>
  }

  if (gameIsOver && userNumber) { // userNumber가 선택됐다면 게임 시작된 후
    screen = <GameOverScreen />
  }

  return (
    // colors에는 그라데이션에 추가할 생상만큼 생상코드를 적으면 됨
    <LinearGradient colors={[Colors.gradiant600, Colors.gradiant500]} style={styles.rootScreen}>
      {/* resizeMode를 cover로 설정하면 이미지가 왜곡되지 않고 확대 및 축소를 통해 최대한의 공간을 덮는다 */}
      <ImageBackground 
        source={require('./assets/images/background.png')} 
        resizeMode="cover"
        style={styles.rootScreen}
        imageStyle={styles.backgroundImage}
      >
        {/* 폰에 따라 노치가 있거나 없는 폰이 있고, 크기도 제각각이다.
            따라서 실행 중인 장치를 자동으로 감지하고 노치와 상태표시줄, 콘텐츠 사이의 적절한 간격을 자동으로 추가하는 컴포넌트가 필요한데,
            이 기능을 해주는 컴포넌트가 SafeAreaView 
            앱 전반에 적용할 요소이기 때문에 App.js에서 적용*/}
        <SafeAreaView style={styles.rootScreen}>
          {screen}
        </SafeAreaView>
      </ImageBackground>
    </LinearGradient>
  )
}

const styles = StyleSheet.create({
  rootScreen: {
    // View는 콘텐츠가 있는 영역만 차지하기 때문에
    // 콘텐츠가 없는 영역을 차지하기 위해 flex: 1을 지정한다
    // backgroundColor: '#9900ff', >> LinearGradient는 자체 컴포넌트에서 지원하는 colors 프로퍼티를 활용하기 때문에 배경색 지정이 불필요하다
    flex: 1,
  },
  backgroundImage: {
    opacity: 0.15
  }
 })
