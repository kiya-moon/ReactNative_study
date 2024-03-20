import {
  StyleSheet,
  // Text,
  View,
  Button,
  // TextInput,
  // ScrollView,
  FlatList,
} from "react-native"; // 코어 컴포넌트를 사용하기 위해서는 import를 해주어야 한다

// 리액트 네이티브에서 제공하는 StatusBar 컴포넌트를 통해 상세표시줄에 대해 조정할 수 있다
// 루트 App 컴포넌트의 JSX 코드에서만 작업하면 됨
import { StatusBar } from "react-native";

import { useState } from "react";

import GoalItem from "./components/GoalItem";
import GoalInput from "./components/GoalInput";

export default function App() {
  // 모달을 열고 닫을 때 상태를 흔히 사용
  // 모달이 보이지 않는 상태(false)가 초기값
  const [modalIsVisible, setModalIsVisible] = useState(false)

  // 버튼을 클릭할 때마다 모달 상태 변경
  function startAddGoalHandler() {
    setModalIsVisible(true)
  }

  function endAddGoalHandler() {
    setModalIsVisible(false)
  }

  // 골을 입력하고, 입력한 골을 리스트에 추가하기
  // const [enteredGoalText, setEnteredGoalText] = useState("")
  const [courseGoals, setCourseGoals] = useState([])

  // function goalInputHandler(enteredText) {
  //   setEnteredGoalText(enteredText)
  // }

  function addGoalHandler(enteredGoalText) {
    setCourseGoals((currentCourseGoals) => [
      ...currentCourseGoals,
      // enteredGoalText,
      // 데이터를 key를 가진 객체로 넣기
      {
        text: enteredGoalText,
        // key: Math.random().toString(),
        id: Math.random().toString(),
      },
    ]);
  }

  function deleteGoalHandler(id) {
    setCourseGoals(currentCourseGoals => {
      // filter 자체에 true 혹은 false를 반환하는 함수가 사용되는데,
      // 이 내부 함수가 true를 반환하면 아이템은 유지되고,
      // false를 반환하면 아이템은 제외된다
      return currentCourseGoals.filter((goal) => goal.id !== id)
    })
  }


  // 레이아웃 만들기
  return (
    // 루트 단계에서는 형제 요소를 허용하지 않으므로(?) fragment(<>)로 묶어준다
    <>
      <StatusBar style="light" />
      {/* 코드 작성법
      Core Components
      https://reactnative.dev/docs/intro-react-native-components
      https://reactnative.dev/docs/components-and-apis */}
      {/* <View style={styles.container}>
        <Text style={styles.dummyText}>Hello World! This is React Native!!</Text>
        <View> */}
          {/* 스타일을 줄 때, 숫자만 적어도 자동으로 디바이스 픽셀 밀도에 맞춰짐 */}
          {/* css와 유사하지만 완전 같지 않음
              ex. border: 1px solid black >>> 에러 발생. border가 유효하지 않기 때문 */}
          {/* 1. Inline Styles
            <Text style={{margin: 16, borderWidth: 2, borderColor: 'red', padding: 16}}>Another piece of text!</Text> */}
          {/* 2. StyleSheet Object */}
          {/* <Text style={styles.dummyText}>Another piece of text!</Text>
          <Button title="Click me!" />
        </View>
      </View> */}

      {/* 레이아웃 만들기 */}
      <View style={styles.appContainer}>
        {/* <View style={styles.inputContainer}>
          <TextInput
            placeholder="Put Your course goal!"
            style={styles.textInput}
            onChangeText={goalInputHandler}
          />
          <Button title="Add Goal" onPress={addGoalHandler} />
        </View> */}
        {/* Button은 style 프로퍼티를 지원하지 않는다 */}

        {/* 모달 여닫는 버튼 추가 */}
        <Button 
          title="Add New Goal" 
          color="#a065ec" 
          onPress={startAddGoalHandler}
        />
        {/* modalIsVisible이 true라면 */}
        {/* { modalIsVisible && <GoalInput onAddGoal={addGoalHandler} /> } */}
        <GoalInput 
          visible={modalIsVisible} 
          onAddGoal={addGoalHandler}
          onCancel={endAddGoalHandler} 
        />

        {/* 내용이 길어지면 웹에서는 자동으로 스크롤이 생성됐지만 모바일에서는 x, ScrollView를 사용한다 */}
        {/* ScrollView는 부모 영역에 따라 스크롤 가능한 영역이 정해지므로, View로 감싸 스타일을 준다 */}
        <View style={styles.goalsContainer}>
          {/* ScrollView와 함께 쓸 수 있는 프로퍼티
              https://reactnative.dev/docs/scrollview */}
          {/* <ScrollView alwaysBounceVertical={false}> */}
          {/* <Text>에 준 radius 스타일은 안드로이드에는 적용되지만 아이폰에는 적용되지 않는다
                이럴 땐 <Text>를 <View>로 감싸고 <View>에 스타일을 준다 해결 */}
          {/* {courseGoals.map((goal) => (
              <View key={goal} style={styles.goalItem}>
                <Text style={styles.goalText}>{goal}</Text>
              </View>    
            ))}
          </ScrollView> */}

          {/* Scrollview의 경우에는 목록의 갯수와 상관없이 계속 재렌더링 되기 때문에, 목록이 많아질 경우 성능의 저하가 올 수 있다.
              이것을 방지하기 위해 FlatList를 사용한다.
              FlatList는 사용자가 스크롤을 내려야 보이지 않던 부분을 렌더링하여 보여준다 */}
          {/* {courseGoals.map((goal) => ())} 
              데이터를 수동으로 매핑해주는 대신, data, renderItem 프로퍼티를 통해 필요한 사항만 FlatList에 전달해서 효율적으로 목록을 렌더링한다 
              data : 목록에서 출력할 데이터를 지정하는 역할. 여기서는 courseGoals
              randerItem : 개별 데이터의 렌더링 방식을 FlatList에 지시하는 함수를 값으로 갖는다 */}
          {/* FlatList 사용 시 key를 추가하는 방법
              1. 데이터의 값을 key 프로퍼티를 포함하는 객체로 변경하는 것.
                FlatList는 자동으로 key 값을 찾는다.
                원시데이터에서도 잘 동작하지만, 객체데이터일 때 더 잘 동작한다
                
              2. 데이터를 변경할 수 없을 때. keyExtractor 사용*/}
          <FlatList
            data={courseGoals}
            renderItem={( itemData ) => {
              // return (
                // <View style={styles.goalItem}>
                //   {/* 데이터를 객체로 변경했기 때문에 .text 추가 */}
                //   <Text style={styles.goalText}>{itemData.item.text}</Text>
                // </View>
              // );
              return (
                <GoalItem 
                  text={itemData.item.text}
                  id={itemData.item.id}
                  onDeleteItem={deleteGoalHandler} 
                />  
              )
            }}
            // FlatList가 모든 항목에서 key를 가져오려고 호출하는 함수
            keyExtractor={(item, index) => {
              return item.id
            }}
            // ScrollView에서 지원되는 프로퍼티는 대부분 FlatList에서도 지원된다
            alwaysBounceVertical={false}
          />
          {/* FlatList는 셀프 클로징 컴포넌트 */}
        </View>
      </View>
    </>
  );
}

// 스타일 방법
// 1. Inline Styles
// 2. StyleSheet Object : 별도의 객체를 정의해서 그걸 프로퍼티로 전달하는 것

// Style and Color
// https://reactnative.dev/docs/style
const styles = StyleSheet.create({
  // container: {
  //   flex: 1,
  //   backgroundColor: '#fff',
  //   alignItems: 'center',
  //   justifyContent: 'center',
  // },
  // dummyText: {
  //   margin: 16,
  //   padding: 16,
  //   borderWidth: 2,
  //   borderColor: 'blue ',
  // }

  appContainer: {
    flex: 1, // textInput과 goalsContainer가 1:3으로 자리를 차지하려면, 둘을 감싸는 외부 컨테이너가 전체 공간을 차지하고 있어야 한다.
    paddingTop: 50,
    paddingHorizontal: 16,
    backgroundColor: '#1e085a', // 화면이 여러 개일 때는 일일이 지정해주기 보다 app.json에서 backgroundColor를 지정해주면 전체적으로 적용된다
  },
  // inputContainer: {
  //   flex: 1,
  //   flexDirection: "row",
  //   justifyContent: "space-between",
  //   alignItems: "center",
  //   marginBottom: 24,
  //   borderBottomWidth: 1,
  //   borderBlockColor: "#cccccc",
  // },
  // textInput: {
  //   borderWidth: 1,
  //   borderColor: "#cccccc",
  //   width: "70%",
  //   marginRight: 8,
  //   padding: 8,
  // },
  goalsContainer: {
    flex: 5,
  },
  // goalItem: {
  //   margin: 8,
  //   padding: 8,
  //   borderRadius: 6,
  //   backgroundColor: "#5e0acc",
  //   // CSS와 달리 부모요소에서 자식요소로 상속되지 않는다
  //   // 현재 goalitem은 View의 스타일이기 때문에 Text가 자식이어도 적용되지 않는다
  //   color: "white",
  // },
  // goalText: {
  //   color: "white",
  // },
});
