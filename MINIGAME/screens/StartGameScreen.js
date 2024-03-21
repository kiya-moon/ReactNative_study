//  사용자가 숫자를 고르고 게임을 시작하는 화면
import { TextInput, View, StyleSheet } from "react-native";
import PrimaryButton from "../components/PrimaryButton";

function StartGameScreen() {
  return <View style={styles.inputContainer}>
    <TextInput 
      style={styles.numberInput} 
      maxLength={2}
      keyboardType="number-pad" // 키보드 제어
    />
    <View style={styles.buttonsContainer}>
      <View style={styles.buttonContainer}>
        <PrimaryButton>Reset</PrimaryButton>
      </View>
      <View style={styles.buttonContainer}>
        <PrimaryButton>Confirm</PrimaryButton>
      </View>
    </View>
  </View>
}

export default StartGameScreen;

const styles = StyleSheet.create({
  inputContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 100,
    marginHorizontal: 24,
    padding: 16,
    backgroundColor: '#ffd000',
    borderRadius: 8,
    // css에서는 box-shadow로 박스에 그림자를 주었지만, RN에서는 불가능
    // 플랫폼에 따라 다른 네이티브 컴포넌트로 컴파일되고, 
    // android와 ios에서 지원되는 스타일 프로퍼티가 다르기 때문에 스타일을 각각 주어야 한다.
    // android
    elevation: 4,
    // ios
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 6,
    shadowOpacity: 0.25,
  },
  numberInput: {
    height: 50,
    width: 50,
    fontSize: 32,
    color: '#ff0000',
    fontWeight: 'bold',
    borderBottomColor: '#ff0000',
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