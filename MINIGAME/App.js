import { useState } from 'react';
import { StyleSheet, ImageBackground, SafeAreaView } from 'react-native'; // ImageBackground 컴포넌트는 배경에 이미지를 렌더링한다
import { LinearGradient } from 'expo-linear-gradient';
import StartGameScreen from './screens/StartGameScreen';
import GameScreen from './screens/GameScreen';
import Colors from './constants/colors';

export default function App() {
  // 사용자가 입력한 숫자를 state로 갖음
  const [userNumber, setUserNumber] = useState()
  
  function pickedNumberHandler(pickedNumber) {
    setUserNumber((pickedNumber))
  }
  
  // 사용자가 입력한 숫자가 없으면 StartGameScreen을 렌더링하고,
  // 사용자가 입력한 숫자가 있으면 GameScreen을 렌더링한다
  let screen = <StartGameScreen onPickNumber={pickedNumberHandler}/>
  if (userNumber) {
    screen = <GameScreen />
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
