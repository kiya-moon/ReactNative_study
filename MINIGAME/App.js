import { StyleSheet, View } from 'react-native';
import StartGameScreen from './screens/StartGameScreen';

export default function App() {
  return (
    <View style={styles.rootScreen}>
      <StartGameScreen />
    </View>
  )
}

const styles = StyleSheet.create({
  rootScreen: {
    // View는 콘텐츠가 있는 영역만 차지하기 때문에
    // 콘텐츠가 없는 영역을 차지하기 위해 flex: 1을 지정한다
    backgroundColor: '#9900ff',
    flex: 1,
  }
 })
