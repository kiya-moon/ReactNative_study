import { useState, createContext } from "react"

// React Context 사용
export const AuthContext = createContext({
  token: '',
  isAuthenticated: false,
  authenticate: () => {},
  logout: () => {},
})

function authContextProvider({ children }) {
  const [authToken, setAuthToken] = useState()  // 초기에는 토큰이 없으므로 초기값도 없음

  // 사용자가 로그인 또는 가입에 성공할 때 트리거되는 함수
  function authenticate(token) {
    setAuthToken(token)
  }

  // 사용자가 로그아웃할 때 트리거되는 함수
  // null 값을 설정해 토큰을 삭제
  function logout() {
    setAuthToken(null)
  }

  // value > 모든 콘텍스트 사용자에게 전달되도록 한다
  // 현재 토큰 값인 authToken 사용
  // 또한 헬퍼 프로퍼티인 isAuthenticated를 !!authToken과 같도록 설정해서
  // 참(truthy) 또는 거짓(falsy) 값을 true 또는 fasle로 전환하게 하면 내용이 완성됨
  // '!!'은 강제 형변환을 의미
  // 변수 authToken이 존재하고 유효한 값이 있는 경우, !!authToken > true 
  // authToken이 존재하지 않거나 falsy한 값인 경우(예: null, undefined, false, 0, "" 등), !!authToken > false
  const value = {
    token: authToken,
    isAuthenticated: !!authToken,
    // authenticate와 logout 추가해서 각 함수를 지목
    authenticate: authenticate,
    logout: logout,
  }

  return <AuthContext.Provider value={value}>{ children }</AuthContext.Provider>
}

export default authContextProvider