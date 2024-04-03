import { View, StyleSheet } from 'react-native'
import Colors from '../../constants/colors';

function Card({ children }) {
  return <View style={styles.card}>{children}</View>
}

export default Card;

const styles = StyleSheet.create({
  card: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 36,
    marginHorizontal: 24,
    padding: 16,
    backgroundColor: Colors.primary500,
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
})