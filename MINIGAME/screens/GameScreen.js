import { useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Title from '../components/ui/Title';
import NumberContainer from '../components/game/NumberContainer';
import PrimaryButton from '../components/ui/PrimaryButton';

// 최소값(min)과 최대값(max) 사이의 난수를 생성하는 함수
// excluded에는 사용자가 입력한 숫자를 설정하여 컴퓨터가 한 번에 맞히지 못하도록 함
function generateRandomBetween(min, max, excluded) {
  const rndNum = Math.floor(Math.random() * (max - min)) + min

  if (rndNum === excluded) {
    return generateRandomBetween(min, max, excluded)
  } else {
    return rndNum
  }
}

let minBoundary = 1
let maxBoundary = 100

function GameScreen({userNumber}) {
  // 이 상태의 초기값은 최초 추측값
  const initialGuess = generateRandomBetween(minBoundary, maxBoundary, userNumber)
  const [currentGuess, setCurrentGuess] = useState(initialGuess)
  
  function nextGuessHandler(direction) {  // direction => 'lower', 'greater' (현재 추측한 수보다 작은 지, 큰 지)
    if (direction === 'lower') {
      maxBoundary = currentGuess
    } else {
      minBoundary = currentGuess + 1  // 상한값과 달리 하한값은 가능한 결과값에 포함되기 때문에 1을 더해준다
    }
    const newRndNumber = generateRandomBetween(minBoundary, maxBoundary, currentGuess)
    setCurrentGuess = newRndNumber
  }

  return (
    <View style={styles.screen}>
      {/* Title을 재사용 가능한 별도의 컴포넌트로 아웃소싱 */}
      {/* <Text style={styles.title}>Opponent's Guess</Text> */}
      <Title>Opponent's Guess</Title>
      <NumberContainer>{currentGuess}</NumberContainer>
      <View>
        <Text>Higher or lower?</Text>
        <View>
          {/* 함수를 사전구성할 수 있다? */}
          <PrimaryButton onPress={nextGuessHandler.bind(this, 'lower')}>-</PrimaryButton>
          <PrimaryButton onPress={nextGuessHandler.bind(this, 'greater')}>+</PrimaryButton>
        </View>
      </View>
      <View>
        <Text>LOG ROUNDS</Text>
      </View>
    </View>
  )
}

export default GameScreen

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 24
  },
  // title: {
  //   fontSize: 18, 
  //   fontWeight: 'bold',
  //   color: '#ffd000',
  //   textAlign: 'center',
  //   borderWidth: 2,
  //   borderColor: '#ffd000',
  //   padding: 12
  // }
})