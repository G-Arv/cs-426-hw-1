import { useNavigate } from 'react-router-dom'
import './App.css'

function Start() {
    const navigate = useNavigate()
  
    return (
      <>
        <div>
          <img src={"src/assets/Carbon.png"} className="logo" alt="CarbonBuddy Logo"/>
        </div>
        <h1>Welcome to CarbonBuddy!</h1>
        <h3>Learn about your everyday impact on the environment!</h3>
        <h3>Click Log In or Sign Up below to start.</h3>
        <div className="buttonCard">
          <button onClick={() => navigate("/login")}>
            Log In
          </button>
          <button onClick={() => navigate("/signup")}>
            Sign Up
          </button>
        </div>
      </>
    )
  }
  
  export default Start