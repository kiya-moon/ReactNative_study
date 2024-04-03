// 사용자가 숫자를 고르고 게임을 시작하는 화면
// 입력란이 비어있다면 게임 화면으로 이어지지 않아야 하고, 사용자에게 값을 입력하라는 경고창을 띄워야 한다
// 입력란에는 0이나 -1 같은 값을 입력할 수 없다
import { TextInput, View, StyleSheet, Alert, } from "react-native";
import { useState } from "react";
import PrimaryButton from "../components/ui/PrimaryButton";
import Title from "../components/ui/Title";
import Card from "../components/ui/Card";
import Colors from "../constants/colors";
import InstructionText from "../components/ui/InstructionText";

function StartGameScreen({onPickNumber}) {
  // 입력된 상태값 state
  const [enteredNumber, setEnteredNumber] = useState('')  // default 상태값이 문자열('')인 이유는, TextInput으로 받는 값이 문자열이기 때문

  function numberInputHandler(enteredText) {
    // onChangeText를 통해서 입력 값이 바뀌면 entereText에 들어온다
    setEnteredNumber(enteredText)
  }

  function resetInputHandler() {
    setEnteredNumber('')
  }

  // 현재 상태를 확인해서 1 - 99까지의 숫자인지 확인
  // 값이 유효하다면 다음 화면으로 넘기고 유효하지 않다면 경고문을 띄운
  function confirmInputHandler() {
    const chosenNumber = parseInt(enteredNumber)

    // isNaN : 주어진 값이 숫자인지 확인
    if (isNaN(chosenNumber) || chosenNumber < 1 || chosenNumber > 99) {
      // 리액트 네이티브에서는 경고창 표시를 Alert api를 이용해 ios나 android 플랫폼에 내장된 native alert api를 사용한다
      // 첫 번째 인수는 title(제목), 두 번째 인수는 message(내용), 세 번째 인수는 여러 개의 버튼을 배열[]로 설정할 수 있음
      Alert.alert(
        'Inbalid Number!',
        'Number has to be a number between 1 and 99',
        [{ text: 'Okay', style: 'destructive', onPress: resetInputHandler }],
        // 배열에 객체를 추가하여 버튼을 정의
        // text에는 버튼의 캡션을 적는다
        // style에는 defualt(기본), destructive(삭제), cancel(취소)가 있으며, 스타일에 따라 텍스트의 색상이나 굵기가 달라진다
        // 마지막으로 onPress를 추가하여 버튼을 클릭할 때 실행되어야 할 함수를 지정
      )
      return
    }

    onPickNumber(chosenNumber)
  }

  return (
    <View style={styles.rootContainer}>
      {/* 타이틀 영역 */}
      <Title>Guess My Number</Title>
      {/* 숫자 입력 영역 */}
      <Card>
        <InstructionText>Enter a Number</InstructionText>
        <TextInput 
          style={styles.numberInput} 
          maxLength={2}
          keyboardType="number-pad" // 키보드 제어
          autoCapitalize="none"
          autoCorrect={false}
          onChangeText={numberInputHandler}
          value={enteredNumber} // TextInput과 바인딩되는 역할
          />
        <View style={styles.buttonsContainer}>
          <View style={styles.buttonContainer}>
            <PrimaryButton onPress={resetInputHandler}>Reset</PrimaryButton>
          </View>
          <View style={styles.buttonContainer}>
            <PrimaryButton onPress={confirmInputHandler}>Confirm</PrimaryButton>
          </View>
        </View>
      </Card>
    </View>
  )
}

export default StartGameScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    marginTop: 100,
    alignItems: 'center', // alignItems 기본은 'stretch'
  },
  numberInput: {
    height: 50,
    width: 50,
    fontSize: 32,
    color: Colors.accent500,
    fontWeight: 'bold',
    borderBottomColor: Colors.accent500,
    borderBottomWidth: 2,
    textAlign: 'center',
    marginVertical: 8,
  },
  buttonsContainer: {
    flexDirection: 'row',
  },
  buttonContainer: {
    flex: 1
  }
})