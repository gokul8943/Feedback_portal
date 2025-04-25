import { Navigate, Route, Routes } from "react-router-dom"
import { Navbar } from "./components/Navbar"
import { LoginPage } from "./pages/LoginPage"
import { RegisterPage } from "./pages/RegisterPage"
import HomePage from "./pages/HomePage"
import { FeedbackForm } from "./components/FeedbackForm"
import AdminDashBoard from "./pages/Admin/AdminDashBoard"
import MyFeedback from "./components/MyFeedback"

const App = () => {
  return (
    <div>
      <Navbar />
      <div className="pt-20">
        <Routes>
          <Route path='/' element={<Navigate to="/sign-in" replace />} /> {/* 👈 redirect */}
          <Route path='/sign-in' element={<LoginPage />} />
          <Route path='/sign-up' element={<RegisterPage />} />
          <Route path='/home' element={<HomePage />} /> {/* optional: give HomePage its own route */}
          <Route path="/add-feedback" element={<FeedbackForm />} />
          <Route path="/feedback" element={<MyFeedback />} />
          <Route path='/dashboard' element={<AdminDashBoard />} />
        </Routes>
      </div>
    </div>
  )
}

export default App
