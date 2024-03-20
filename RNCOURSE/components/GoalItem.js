// 최신 버전에서는 import React from 'react'를 사용x
import { StyleSheet, View, Text, Pressable } from "react-native";

function GoalItem(props) {
  return (
    // 아이템 한 개를 가져오기 위한 코드를 App.js에서 가져온다
    // 가져온 코드에 맞춰 styles도 옮겨와야 함

    // html에서는 onClick만 추가하면 아이템을 선택하게 할 수 있었지만,
    // 리액트 네이티브에서는 해당 아이템을 리액트 네이티브에 인식시켜줘야 한다
    // 그를 위해서 Pressable 컴포넌트를 사용한다
    // Touchable 컴포넌트도 있지만, 옛날 리엑트 네이티브에서 사용됐었고, 지금은 Pressable 컴포넌트 사용
    <View style={styles.goalItem}>
      <Pressable 
        // 안드로이드는 잘 작동. 아이폰은 작동x
        android_ripple={{color: '#210644'}} 
        // ios에 스타일을 주려면 style 프로퍼티 추가
        // style 객체를 사용하지만 함수를 사용할 수도 있음
        // 이 함수는 터치 상태가 변할 때마다 Pressable이 자동으로 호출
        // 여기에서는 현재 터치 상태와 관련된 정보를 포함한 상수를 매개변수로 사용
        // 또 객체 구조 분해를 사용해서 우리가 구할 객체의 일부인 pressed 프로퍼티를 확보할 수도 있음 
        // style={(pressData) => pressData.pressed} (뭔말이야)
        // pressed는 Pressable 컴포넌트가 제공
        style={({pressed}) => pressed && styles.pressedItem}
        onPress={props.onDeleteItem.bind(this, props.id)}
      >
        <Text style={styles.goalText}>{props.text}</Text>
      </Pressable>
    </View>
  );
}

export default GoalItem;

const styles = StyleSheet.create({
  goalItem: {
    margin: 8,
    borderRadius: 6,
    backgroundColor: '#5e0acc',
    color: 'white',
  },
  goalText: {
    color: 'white',
    padding: 8,
  },
  pressedItem: {
    opacity: 0.5,
  }
})