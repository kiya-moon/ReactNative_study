import { StyleSheet, ImageBackground } from 'react-native'; // ImageBackground 컴포넌트는 배경에 이미지를 렌더링한다
import { LinearGradient } from 'expo-linear-gradient';
import StartGameScreen from './screens/StartGameScreen';

export default function App() {
  return (
    // colors에는 그라데이션에 추가할 생상만큼 생상코드를 적으면 됨
    <LinearGradient colors={['#9900ff', '#f2dfff']} style={styles.rootScreen}>
      {/* resizeMode를 cover로 설정하면 이미지가 왜곡되지 않고 확대 및 축소를 통해 최대한의 공간을 덮는다 */}
      <ImageBackground 
        source={require('./assets/images/background.png')} 
        resizeMode="cover"
        style={styles.rootScreen}
        imageStyle={styles.backgroundImage}
      >
        <StartGameScreen />
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
