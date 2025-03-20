import { useNavigate } from 'react-router-dom'
import './App.css'
import { useState } from 'react'

function LogIn() {
    const navigate = useNavigate()
    const [userName, setUserName] = useState<string>()
    const [password, setPassWord] = useState<string>()

    // Displays the password based on the user's preference
    const showPassword = () => {
      if(document.getElementById("loginPassword")) {
        if((document.getElementById("loginPassword") as HTMLInputElement).type == "text") {
          (document.getElementById("loginPassword") as HTMLInputElement).type  = "password"
        }
        else {
          (document.getElementById("loginPassword") as HTMLInputElement).type  = "text"
        }
      }
    }

    // Checks to determine if the login information is correct
    const verifySubmit = () => {
        if(userName){
            const userNameCheck = localStorage.getItem(userName)
            const user = JSON.parse(userNameCheck != null ? userNameCheck: "")
            if(user.userName == userName && user.password == password) {
                navigate("/calculate", {state: user});
            }
            else {
              const error = document.getElementById('loginError')
              if (error) {
                  error.textContent = "Incorrect username or password. Please try again."
                  error.style.color = "red"
              }
            }
        }
        else {
            const error = document.getElementById('loginError')
            if (error) {
                error.textContent = "No login credentials found. Please try again."
                error.style.color = "red"
            }
        }
    }
  
    return (
      <>
        <div>
          <img src={"src/assets/Carbon.png"} className="logo" alt="CarbonBuddy Logo"/>
        </div>
        <h1>Log In!</h1>
        <h3>Enter your username and password below.</h3>
        <div className="card">
            <div>
                <div id="loginError"></div>
                <form className="credentialForm">
                    <div>
                      <label>Username: </label>
                      <input id="loginUserName" type='text' value={userName} onChange={(e) => setUserName(e.target.value)}></input>
                    </div>
                    <div>
                      <label>Password: </label>
                      <input id="loginPassword" type='password' value={password} onChange={(e) => setPassWord(e.target.value)}></input>
                    </div>
                    <div>
                      <label>Show Password: </label>
                      <input id="loginPasswordCheckbox" type="checkbox" onClick={() => showPassword()}/>
                    </div>
                </form>
            </div>
        </div>
        <div className='buttonCard'>
          <button onClick={() => navigate("/")}>
              Back
            </button>
          <button onClick={() => verifySubmit()}>
              Log In
            </button>
        </div>
      </>
    )
  }
  
  export default LogIn