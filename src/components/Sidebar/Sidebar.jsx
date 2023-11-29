import React, { useContext } from "react";
import {
  MdOutlineHome,
  MdOutlineExplore,
  MdOutlineBookmarks,
  MdOutlineLogout,
  MdHome,
  MdExplore,
  MdBookmarks,
  MdCreate
} from "react-icons/md";
import "./Sidebar.css";
import { AuthContext } from "../../contexts/AuthContext";
import { NavLink, useLocation, useNavigate } from "react-router-dom";

function Sidebar({ openModal }) {
  const { authState, logoutUser } = useContext(AuthContext);
  const loggedInUser = authState?.user;
  const navigate = useNavigate();

  const getActiveStyle = ({ isActive }) => ({
    fontWeight: isActive ? 700 : 400,
  });

  const NavigationLink = ({ to, icon, activeIcon, children }) => {
    const location = useLocation();
    const isActive = location.pathname === to;

    return (
      <NavLink
        className="individualSection"
        exact
        to={to}
        style={getActiveStyle}
      >
        {isActive ? activeIcon : icon}
        <span>{children}</span>
      </NavLink>
    );
  };

  const navigateToUserProfile = () => {
    navigate(`/profile/${loggedInUser?.username}`);
  };

  return (
    <div className="sidebarContainer">
      <div className="topSection">
        <nav>
          <NavigationLink
            to="/"
            icon={<MdOutlineHome size={30} />}
            activeIcon={<MdHome size={30} />}
          >
            Home
          </NavigationLink>

          <NavigationLink
            to="/explore"
            icon={<MdOutlineExplore size={30} />}
            activeIcon={<MdExplore size={30} />}
          >
            Explore
          </NavigationLink>

          <NavigationLink
            to="/bookmarks"
            icon={<MdOutlineBookmarks size={30} />}
            activeIcon={<MdBookmarks size={30} />}
          >
            Bookmarks
          </NavigationLink>

          <NavLink
            onClick={logoutUser}
            style={getActiveStyle}
            className="individualSection"
            to="/login"
          >
            <MdOutlineLogout size={30} />
            <span>Logout</span>
          </NavLink>
        </nav>
        <button className="newPostBtn" onClick={openModal}>
          <MdCreate size={25} />
          <span>New Post</span>
        </button>
      </div>
      <div className="loggedInUserProfile" onClick={navigateToUserProfile}>
        <div className="profilePicture">
          <img src={loggedInUser?.profileAvatar} alt="profile-img" />
        </div>
        <div className="loggedInUserInfo">
          <p className="fullName">
            {loggedInUser?.firstName + " " + loggedInUser?.lastName}
          </p>
          <p className="username">@{loggedInUser?.username}</p>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
