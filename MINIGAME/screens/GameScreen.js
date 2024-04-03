import { useState, useEffect } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import Title from '../components/ui/Title';
import NumberContainer from '../components/game/NumberContainer';
import PrimaryButton from '../components/ui/PrimaryButton';
import Card from '../components/ui/Card';
import InstructionText from '../components/ui/InstructionText';

// Expo 혹은 Expo로 생성된 프로젝트는 아이콘을 사용할 수 있는 라이브러리 및 패키지를 포함하기 때문에 임포트만 추가하면 된다
// install 과정 없이 기본적으로 사용이 가능
// https://docs.expo.dev/guides/icons/ 참고
import { Ionicons } from '@expo/vector-icons' // Ionicons : 제공되는 아이콘 세트 중 하나
                                              // icons.expo.fyi에서 원하는 아이콘 검색해서 사용 가능
                                              // 우리는 Ionicons를 사용하므로 필터에서 Ionicons 선택

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

function GameScreen({ userNumber, onGameOver }) {
  // 이 상태의 초기값은 최초 추측값
  const initialGuess = generateRandomBetween(1, 100, userNumber)
  const [currentGuess, setCurrentGuess] = useState(initialGuess)

  // currentGuess와 userNumber를 비교
  // 두 숫자가 같으면 App 컴포넌트에 알려서 GameScreen 컴포넌트에서 GameOverScreen 컴포넌트로 전환
  // React의 useEffect 사용해서 상태(State) 같은 의존성이 변경될 때마다 체크
  useEffect(() => {
    // currentGuess와 userNumber가 같으면 App.js에서 정의된 함수를 호출
    if (currentGuess === userNumber) { onGameOver() }
  }, [currentGuess, userNumber, onGameOver])  // useEffect 훅에 의존성 추가
                                              // 함수에 사용되는 변수와 값은 모두 의존성으로 추가돼야 한다
                                              // currentGuess나 userNumber, onGameOver 함수가 변경될 때마다 useEffect 함수가 재실행되고 게임 종료 여부를 확인함
  
  function nextGuessHandler(direction) {  // direction => 'lower', 'greater' (현재 추측한 수보다 작은 지, 큰 지)
    // 컴퓨터가 추측한 값이 사용자의 값보다 작은데도 사용자 값이 더 작다고 지시내리거나 반대의 경우
    // 무한 루프에 빠지기 때문에 잘못된 지시에 대해 처리
    if ((direction === 'lower' && currentGuess < userNumber) || (direction === 'greater' && currentGuess > userNumber)) {
      Alert.alert("Don't lie!", 'You know that this is wrong...', [{text: 'Sorry!', style: 'cancel'}])
      return
    }

    if (direction === 'lower') {
      maxBoundary = currentGuess
    } else {
      minBoundary = currentGuess + 1  // 상한값과 달리 하한값은 가능한 결과값에 포함되기 때문에 1을 더해준다
    }
    const newRndNumber = generateRandomBetween(minBoundary, maxBoundary, currentGuess)
    setCurrentGuess(newRndNumber)
  }

  return (
    <View style={styles.screen}>
      {/* <Text style={styles.title}>Opponent's Guess</Text> */}
      {/* Title을 재사용 가능한 별도의 컴포넌트로 아웃소싱 */}
      <Title>Opponent's Guess</Title>
      <NumberContainer>{currentGuess}</NumberContainer>
      <Card>
        <InstructionText style={styles.InstructionText}>Higher or lower?</InstructionText>
        <View style={styles.buttonsContainer}>
          <View style={styles.buttonContainer}>
            <PrimaryButton onPress={nextGuessHandler.bind(this, 'lower')}>
              <Ionicons name="remove" size={24} color="white"></Ionicons>
            </PrimaryButton>
          </View>
          <View style={styles.buttonContainer}>
            <PrimaryButton onPress={nextGuessHandler.bind(this, 'greater')}>
              <Ionicons name="add" size={24} color="white"></Ionicons>
            </PrimaryButton>
          </View>
        </View>
      </Card>
      <View>
        {/* <Text>LOG ROUNDS</Text> */}
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
  buttonsContainer: {
    flexDirection: 'row',
  },
  buttonContainer: {
    flex: 1
  },
  InstructionText: {
    marginBottom: 12,
  }
})