import { Route, Routes } from "react-router-dom"
import { Footer } from "./components/Footer"
import { Navbar } from "./components/Navbar"
import { LoginPage } from "./pages/LoginPage"
import { RegisterPage } from "./pages/RegisterPage"

const App = () => {
  return (
    <div>
      <Navbar />
      <div>
      <Routes>
          {/* <Route path='/' element={<Home />} /> */}
          <Route path='/sign-in' element={<LoginPage />} />
          <Route path='/sign-up' element={<RegisterPage />} />
          {/* <Route path='/pricing' element={<Pricing />} />
          <Route path='/generate' element={<PromptGenerator />} /> */}
          <Route />
        </Routes>
      </div>
      <Footer />
    </div>
  )
}

export default App
