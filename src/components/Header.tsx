import { NavLink } from "react-router-dom";
import './Header.css'

function Header() {
  return (
    // <header>
    //     <h1>Hi there, this is a test for the header</h1>
    // </header>
    <div className="headerClass">
        <nav>
            CarbonBuddy 
        <NavLink to="/">
            Home
        </NavLink>
        <NavLink to="/resources">
            Resources
        </NavLink>
        <NavLink to="/login">
            Log In
        </NavLink>
        </nav>
    </div>
  );
}
export default Header;