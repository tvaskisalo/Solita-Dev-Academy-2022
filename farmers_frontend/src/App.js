import {
  Switch, Route, Redirect
} from "react-router-dom"
import LoginPage from "./components/login/loginPage";
import Main from "./components/mainPage/main";
import { useSelector } from "react-redux";

const App = () => {
  const state = useSelector(state => state);
  console.log(state);
  return (
    <Switch>
      <Route path = "/login">
        <LoginPage/>
      </Route>
      <Route path = "/">
        <Main />
      </Route>
    </Switch>
  )
}

export default App;
