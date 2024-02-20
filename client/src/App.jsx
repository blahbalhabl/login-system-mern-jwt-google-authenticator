import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { AuthProvider } from "./context/AuthContext"
import Signup from "./pages/Signup"
import Login from "./pages/Login"
import Dashboard from "./pages/Dashboard"
import Porfile from "./pages/Porfile"

const App = () => {
  return (
    <div className="w-screen">
      <Router>
        <AuthProvider>
          <Routes>
            <Route path='/' element={<Dashboard />}/>
            <Route path='auth/login' element={<Login />} />
            <Route path='auth/register' element={<Signup />} />
            <Route path='/profile/:id' element={<Porfile />}/>
          </Routes>
        </AuthProvider>
      </Router>
    </div>
  )
}

export default App