import { useLocation, useNavigate } from "react-router-dom"
import Menu from "./components/Menu";

function Profile() {
    const location = useLocation()
    const navigate = useNavigate()

    let user = location.state;

    // Handles deletion of user profile in localStorage
    const handleDeleteAccount = () => {
        localStorage.removeItem(user.userName);
    }

    return (
        <>
            <Menu page={["results", "resources", JSON.stringify(user)]}/>
            <h1>{user.userName}'s Profile</h1>
            <h2>Profile Information</h2>
            <div>
                <div>
                    <label>Username: {user.userName}</label>
                </div>
                <div>
                    <label>Password: {user.password}</label>
                </div>
                <div>
                    <label>Number of Journal Entries: {user.journal.length}</label>
                </div>
            </div>

            <h2>Change Settings</h2>
            <div>
                <div className="profileButtons">
                    <button onClick={() => handleDeleteAccount()}>Delete Account</button>
                </div>
            </div>

        </>
    )
}   

export default Profile
