import { useState } from "react";
import { StyleSheet, View, TextInput, Button, Modal, Image } from "react-native";

function GoalInput(props) {

  const [enteredGoalText, setEnteredGoalText] = useState("")

  function goalInputHandler(enteredText) {
    setEnteredGoalText(enteredText);
  }

  function addGoalHandler() {
    props.onAddGoal(enteredGoalText) // 여기서 전달하는 etneredGoalText는 
                                     // App.js의 addGoalHandler(enteredGoalText)에 전달된다
    setEnteredGoalText('')
  }

  return (
    // 모달이 제공하는 visible 프로퍼티로 노출 여부를 설정할 수도 있고
    // animationType 프로퍼티로 애니메이션 효과를 줄 수도 있다. 유용!
    <Modal visible={props.visible} animationType="slide">
      <View style={styles.inputContainer}>
        {/* Image 컴포넌트는 style 프로퍼티 지원 */}
        <Image source={require('../assets/images/goal.png')} style={styles.image} />
        <TextInput
          placeholder="Put Your course goal!"
          style={styles.textInput}
          onChangeText={goalInputHandler}
          value={enteredGoalText}
        />
        <View style={styles.buttonContainer}>
          {/* Button에는 style을 사용할 수 없으므로 View로 감싸 적용한다 */}
          <View style={styles.button}>
            <Button title="Add Goal" onPress={addGoalHandler} color="#b180f0" />
          </View>
          <View style={styles.button}>
            <Button title="Cancel" onPress={props.onCancel} color="#f31282" />
          </View>
        </View>
      </View>  
    </Modal>
  );
}

export default GoalInput;

const styles = StyleSheet.create({
  inputContainer: {
    flex: 1,
    // flexDirection: "row", >>> column으로 바꾸면 초기값이 되므로 굳이 명시하지 않아도 된다
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#311b6b'
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#e4d0ff',
    backgroundColor: '#e4d0ff',
    color: '#120438',
    borderRadius: 6,
    width: '100%',
    padding: 16,
  },
  buttonContainer: {
    marginTop: 16,
    flexDirection: 'row',
  }, 
  button: {
    width: 100,
    marginHorizontal: 8
  },
  image: {
    width: 100,
    height: 100,
    margin: 20
  }
})
