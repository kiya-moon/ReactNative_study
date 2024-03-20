import React from 'react';
import { Text, View } from 'react-native';

export default function App() {
  return (
    // 모든 View는 html과 달리 FlexBox를 기본값(세로정렬)으로 자식요소를 구성한다
    // 개별 자식 요소에 높이와 너비 설정을 하지 않을 경우, 주축을 따라 배열되면서 부모 요소의 높이 또는 너비가 적용됨
    // 주축을 따라 공간을 얼마나 차지할 지는 자식 요소에서 개별적으로 설정 가능
    // justifyContent : 주축을 따라 어떻게 정렬할 지 지시
    // alignItems : 교차축을 따라 어떻게 정렬할 지 지시
    <View style={{ padding: 50, flexDirection: 'row', width: '80%', height: 300, justifyContent: 'space-around', alignItems: 'stretch' }}>
      <View
        style={{
          backgroundColor: 'red',
          // width: 100,
          // height: 100,
          flex: 1, 
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <Text>1</Text>
      </View>
      <View
        style={{
          backgroundColor: 'blue',
          // width: 100,
          // height: 100,
          flex: 2, 
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <Text>2</Text>
      </View>
      <View
        style={{
          backgroundColor: 'green',
          // width: 100,
          // height: 100,
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <Text>3</Text>
      </View>
    </View>
  );
}
