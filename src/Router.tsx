import { BrowserRouter, Route, Routes } from "react-router-dom";
import CalendarPage from "./pages/CalendarPage";
import LoginPage from "./pages/LoginPage";
import MainPage from "./pages/Mainpage";
import MedalPage from "./pages/MedalPage";
import ProfilePage from "./pages/ProfilePage";
import SigninPage from "./pages/SigninPage";

export default function Router() {
  return (
    <BrowserRouter>
    <Routes>
        <Route path="/" element={<MainPage/>}/>
        <Route path="/login" element={<LoginPage/>}/>
        <Route path="/signin" element={<SigninPage/>}/>
        <Route path="/medal" element={<MedalPage/>}/>
        <Route path="/profile" element={<ProfilePage/>}/>
        <Route path="/calendar" element={<CalendarPage/>}/> 
    </Routes>
    </BrowserRouter>
  )
}
