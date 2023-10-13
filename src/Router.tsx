import { BrowserRouter, Route, Routes } from "react-router-dom";
import AlarmPage from "./pages/AlarmPage";
import CalendarPage from "./pages/CalendarPage";
import Landing from "./pages/Landing";
import LoginPage from "./pages/LoginPage";
import MainPage from "./pages/MainPage";
import MedalPage from "./pages/MedalPage";
import ProfilePage from "./pages/ProfilePage";
import SignupPage from "./pages/SignupPage";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/landing" element={<Landing />} />
        <Route path="/home" element={<MainPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/medal" element={<MedalPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/calendar" element={<CalendarPage />} />
        <Route path="/alarm" element={<AlarmPage />} />
      </Routes>
    </BrowserRouter>
  );
}
