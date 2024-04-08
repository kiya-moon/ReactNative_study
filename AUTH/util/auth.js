import axios from "axios";

// API_KEY는 여기저기서 사용되므로 상수로 선언
const API_KEY = 'AIzaSyAtzcaIjFoPvAghcKLVbcwY0lzIIF4dZ4U'

// Firebase Document
// Sign up with email / password : https://firebase.google.com/docs/reference/rest/auth#section-create-email-password 참고
// Sign in with email / password : https://firebase.google.com/docs/reference/rest/auth#section-sign-in-email-password 참고
// 로그인가 가입의 api 차이는 'signUp'/'signInWithPassword'의 차이 밖에 없으므로,
// authenticate 함수를 이용해 모드를 설정해주면 하나의 api로 두 기능을 사용할 수 있다
async function authenticate(mode, email, password) {
  const url = `https://identitytoolkit.googleapis.com/v1/accounts:${mode}?key=${API_KEY}`

  const response = await axios.post(url, {
    email: email,
    password: password,
    returnSecureToken: true
  })

  const token = response.data.idToken
  return token
}


export function createUser(email, password) {
  // // Firebase에서 API_KEY 위치 : 프로젝트 개요 옆 '톱니바퀴' 아이콘 > 일반 > 웹 API 키
  // // axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=[API_KEY]')
  // try {
  //   const response = await axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + API_KEY, 
  //   {
  //     email: email,
  //     password: password,
  //     returnSecureToken: true
  //   })  // 첫 번째 인수 : 백엔드 API
  //       // 두 번째 인수 : 객체(axios로 인해 데이터 형식이 JSON으로 자동으로 변환되기 때문)  
  // } catch (error) {
  //   console.error(error);
  // }
  return authenticate('signUp', email, password)
}

export function login(email, password) {
  return authenticate('signInWithPassword', email, password)
}