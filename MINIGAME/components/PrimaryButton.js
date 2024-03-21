// Button 컴포넌트는 스타일링이 제한적이기 때문에 View와 Text를 이용해서 커스텀 버튼을 만든다
import { View, Text, Pressable, StyleSheet } from "react-native";

// function PrimaryButton(props) {
//   return <View>
//     <Text>{props.children}</Text>
//   </View>
// }

function PrimaryButton({ children }) {
  // 객체 구조 분해 사용했을 때
  // PrimaryButton에 들어오는 props를 명시하지 않아도 children을 사용할 수 있다

  function pressHandler() {
    console.log("Pressed!");
  }

  return (
    <View style={styles.buttonOuterContainer}>
      <Pressable 
        onPress={pressHandler} 
        // style을 배열로 만들어 여러개의 스타일을 줄 수도 있다
        style={({pressed}) => pressed ? [styles.buttonInnerContainer, styles.pressed] : styles.buttonInnerContainer}
        android_ripple={{ color: "#ff0000" }}
      >
        <Text style={styles.buttonText}>{children}</Text>
      </Pressable>
    </View>
  );
}

export default PrimaryButton;

const styles = StyleSheet.create({
  buttonOuterContainer: {
    borderRadius: 28,
    margin: 4,
    overflow: 'hidden'
  },
  buttonInnerContainer: {
    backgroundColor: "#ffa319",
    paddingVertical: 8,
    paddingHorizontal: 16,
    elevation: 2,
  },
  buttonText: {
    color: "black",
    textAlign: "center",
  },
  // ios용
  pressed: {
    opacity: 0.75
  }
});
