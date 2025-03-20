import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Menu.css";

function Menu({ page }: any) {
    const [isDropdownVisible, setDropdownVisible] = useState(false);
    const navigate = useNavigate();

    let changeOption: string[] = [];
    let displayOption: string[] = [];

    const user = page[page.length-1];

    // Determines the options to display for two out of the three categories for dropdown based on the page
    const determineOptions = () => {
      for(let i = 0; i < page.length-1; ++i) {
        changeOption.push("/" + page[i]);
        displayOption.push(page[i].charAt(0).toUpperCase() + page[i].slice(1));
      }
    }

    // Runs the determineOptions() function
    determineOptions();

    // Displays the dropdown menu results 
    // Return: HTMLElement
    const DropdownMenu = () => {
        return (
          <div className="dropdownMenu">
            <ul className="dropdownUL">
              <li className="dropdownLI" onClick={()=> navigate(changeOption[0], {state: JSON.parse(user)})}>{displayOption[0]}</li>
              <li className="dropdownLI" onClick={()=> navigate(changeOption[1], {state: JSON.parse(user)})}>{displayOption[1]}</li>
              <li className="dropdownLI" onClick={()=> navigate("/")}>Log Out</li>
            </ul>
          </div>
        );
    };

    // Sets the dropdown as visible when the mouse falls on it
    const handleMouseEnter = () => {
        setDropdownVisible(true);
      };
    
    // Hides the dropdown when the mouse leaves the dropdown
    const handleMouseLeave = () => {
      setDropdownVisible(false);
    };

      return (
        <div className="dropdown">
          <header className="dropdownHeader">
            <div
              className="menu"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <button className="dropdownButton"><img src={"src/assets/CarbonBuddyLeaf.jpg"} className="dropdownLogo" alt="CarbonBuddy Leaf Logo"></img></button>
              {isDropdownVisible && <DropdownMenu />}
            </div>
          </header>
        </div>
      );
}

export default Menu