import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { AuthProvider } from "./context/AuthContext"
// Import Pages
import Signup from "./pages/Signup"
import Login from "./pages/Login"
import Dashboard from "./pages/Dashboard"
import Profile from "./pages/Profile"
// Import Components
import Header from "./components/Header"
import RequireAuth from "./components/RequireAuth"
import PersistLogin from "./components/PersistLogin"

const App = () => {
  return (
    <div className="min-h-screen max-w-screen bg-neutral-100">
      <AuthProvider>
        <Router>
            <Header />
            <main className="">
              <Routes>
                <Route path='/auth/login' element={<Login />} />
                <Route path='/auth/register' element={<Signup />} />
                {/* Auth Protected Routes */}
                <Route element={<PersistLogin />}>
                  <Route element={<RequireAuth allowedRoles={[1001]}/>}>
                    <Route path='/' element={<Dashboard />}/>
                    <Route path='/profile/:username' element={<Profile />}/>
                  </Route>
                </Route>
              </Routes>
            </main>
        </Router>
      </AuthProvider>
    </div>
  )
}

export default App