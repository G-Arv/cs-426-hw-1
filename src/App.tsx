import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Start from './Start'
import LogIn from './LogIn'
import SignUp from './SignUp'
import Calculate from './Calculate'
import Results from './Results'
import Resources from './Resources'
import Profile from './Profile'
import './App.css'

function App() {
  return (
    <>
          <BrowserRouter>
                <Routes>
                    <Route
                        path="/"
                        element={<Start />}
                    />
                    <Route
                        path="/login"
                        element={<LogIn />}
                    />
                    <Route
                        path="/signup"
                        element={<SignUp />}
                    />
                    <Route
                        path="/calculate"
                        element={<Calculate />}
                    />
                    <Route
                      path="/results"
                      element={<Results />}
                    />
                    <Route
                      path="/resources"
                      element={<Resources />}
                    />
                    <Route
                      path="/profile"
                      element={<Profile />}
                    />
                </Routes>
            </BrowserRouter>
    </>
  )
}

export default App
