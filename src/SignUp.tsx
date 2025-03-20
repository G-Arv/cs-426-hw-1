import { useNavigate } from 'react-router-dom'
import { User } from './user/user-data'
import './App.css'
import { useState } from 'react'

function SignUp() {
    const navigate = useNavigate()
    const [userName, setUserName] = useState<string>()
    const [password, setPassWord] = useState<string>()

    // Handles the display of the password based on whether the user checks it off
    const showPassword = () => {
        if(document.getElementById("signupPassword")) {
          if((document.getElementById("signupPassword") as HTMLInputElement).type == "text") {
            (document.getElementById("signupPassword") as HTMLInputElement).type  = "password"
          }
          else {
            (document.getElementById("signupPassword") as HTMLInputElement).type  = "text"
          }
        }
      }

    // Adds a new user to the application
    const addNewUser = () => {
        if(userName && password) {
            const user: User = {userName: userName, password: password, journal: []}
            localStorage.setItem(userName, JSON.stringify(user))

            navigate("/calculate", {state: user})

        }
        else {
            const error = document.getElementById("signupError")
            if(error) {
                error.textContent = "Error with signup. Please enter a username and a password."
                error.style.color = "red"
            }
        }
    }
  
    return (
      <>
        <div>
          <img src={"src/assets/Carbon.png"} className="logo" alt="CarbonBuddy Logo"/>
        </div>
        <h1>Sign Up!</h1>
        <h3>Enter your preferred username and password below.</h3>
        <div className="card">
            <div id="signupError"></div>
            <div>
                <form className="credentialForm">
                    <div>
                        <label>Username: </label> 
                        <input id="signupUserName" onChange={(e) => setUserName(e.target.value)}></input>
                    </div>
                    <div>
                        <label>Password: </label>
                        <input id="signupPassword" type="password" onChange={(e) => setPassWord(e.target.value)}></input>
                    </div>
                    <div>
                        <label>Show Password: </label>
                        <input id="signupPasswordCheckbox" type="checkbox" onClick={() => showPassword()}/>
                    </div>
                </form>
            </div>
        </div>
        <div className='buttonCard'>
            <button onClick={() => navigate("/")}>
                Back
            </button>
            <button onClick={() => addNewUser()}>
                Sign Up
            </button>
        </div>
      </>
    )
  }
  
  export default SignUp