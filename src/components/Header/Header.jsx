import React, { useState } from "react";
import "./Header.css";
import { useNavigate } from "react-router-dom";
import { MdDarkMode, MdOutlineDarkMode } from "react-icons/md";

function Header() {
  const navigate = useNavigate();
  const [isDarkMode, setIsDarkMode] = useState(true); // assuming default is dark mode

  const navigateToHome = () => {
    navigate("/");
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);

    // Update the CSS variables based on the mode
    if (isDarkMode) {
      // Switch to Light Mode
      document.documentElement.style.setProperty('--background-color', '#fff');
      document.documentElement.style.setProperty('--text-color', '#000');
      document.documentElement.style.setProperty('--dark-grey-color', '#EFEFEF')

      // ... you can continue updating other variables for light mode
    } else {
      // Switch to Dark Mode
      document.documentElement.style.setProperty('--background-color', '#000');
      document.documentElement.style.setProperty('--text-color', '#fff');
      document.documentElement.style.setProperty('--dark-grey-color', '#16181c')
    }
  };

  return (
    <div className="header">
      <div className="appName" onClick={navigateToHome}>
        <img
          src="https://res.cloudinary.com/dp6uypw0c/image/upload/v1691742865/social-media-logo_za5vhq.png"
          alt="app-logo"
        />
      </div>
      {isDarkMode ? (
        <MdOutlineDarkMode onClick={toggleDarkMode}  size={30}/>
      ) : (
        <MdDarkMode onClick={toggleDarkMode} size={30} />
      )}
    </div>
  );
}

export default Header;
