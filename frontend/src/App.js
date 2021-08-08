import { BrowserRouter, Route, Redirect } from 'react-router-dom'
import Feed from './components/Feed'
import Register from './components/Register'
import Login from './components/Login'

function setToken(userToken) {
  sessionStorage.setItem('token', JSON.stringify(userToken))
}

function getToken() {
  const tokenString = sessionStorage.getItem('token')
  const userToken = JSON.parse(tokenString)
  return userToken
}

function App() {
  const token = getToken()
  return (
    <div className="App">
      <BrowserRouter>
        <Route path="/register" component={Register} />
        <Route path="/login" component={() => <Login setToken={setToken} />} />
        <Route path="/feeds" component={() => <Feed />} />
        <Route path="/">
          <Redirect to={token ? '/feeds' : 'login'} />
        </Route>
      </BrowserRouter>
    </div>
  )
}

export default App
