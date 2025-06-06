import { Route, Routes } from "react-router-dom"
import "./App.css"
import Home from "./Pages/Home"
import UserLogin from "./Pages/UserLogin"
import UserSignup from "./Pages/UserSignup"
import CaptainSignup from "./Pages/CaptainSignup"
import Captainlogin from "./Pages/Captainlogin"

function App() {

  return (
    <Routes>
      <Route path="/" element={<Home/>}></Route>
      <Route path="/login" element={<UserLogin/>}/>
      <Route path="/signup" element={<UserSignup/>}/>
      <Route path="/captain-signup" element={<CaptainSignup/>}/>
      <Route path="/captain-login" element={<Captainlogin/>}/>
    </Routes>
  )
}

export default App
