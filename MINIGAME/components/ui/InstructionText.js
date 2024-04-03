import { Text, StyleSheet } from 'react-native'
import Colors from '../../constants/colors'

function InstructionText({children, style}){  // 부모컴포넌트에서 style도 받아올 수 있음
  return <Text style={[styles.instructionText, style]}>{children}</Text>
  // >>> style 선언 시 배열 객체 선언이 가능
  // >>> 배열 내부에서는 오른쪽에 있는 스타일이 왼쪽에 있는 스타일을 덮어쓰게 됨
}

export default InstructionText

const styles = StyleSheet.create({
  instructionText: {
    fontFamily: 'open-sans',
    color: Colors.accent500,
    fontSize: 24,
  },
})