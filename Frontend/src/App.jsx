import { Route, Routes } from "react-router-dom"
// import "./App.css"
import Start from "./Pages/Start"
import UserLogin from "./Pages/UserLogin"
import UserSignup from "./Pages/UserSignup"
import CaptainSignup from "./Pages/CaptainSignup"
import Captainlogin from "./Pages/Captainlogin"
import { Home } from "./Pages/Home"
import { UserProtectedWrapper } from "./wrapComponents/UserProtectedWrapper"
import UserLogout from "./Pages/UserLogout"
import { CaptainHome } from "./Pages/CaptainHome"
import { CaptainProtectedWrapper } from "./wrapComponents/CaptainProtectedWrapper"
import { CaptainLogout } from "./Pages/CaptainLogout"
import 'remixicon/fonts/remixicon.css'
import Riding from "./Pages/Riding"
import CaptainRiding from "./Pages/captainRiding"



function App() {

  return (
    <Routes>
      <Route path="/" element={<Start />}></Route>
      <Route path="/login" element={<UserLogin />} />
      <Route path="/signup" element={<UserSignup />} />
      <Route path="/captain-signup" element={<CaptainSignup />} />
      <Route path="/captain-login" element={<Captainlogin />} />
      <Route path="/home" element={
        <UserProtectedWrapper>
          <Home />
        </UserProtectedWrapper>
      } />
      <Route path="/logout" element={<UserLogout />} />
      <Route path="/captain-home" element={
        <CaptainProtectedWrapper><CaptainHome /></CaptainProtectedWrapper>
      } />
      <Route path="/captain-logout" element={<CaptainLogout />} />
      <Route path="/riding" element={<Riding />} />
      <Route path="/captain-riding" element={<CaptainRiding />} />
    </Routes>

  )
}

export default App
