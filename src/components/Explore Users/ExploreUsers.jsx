import React, { useContext } from "react";
import "./ExploreUsers.css";
import { AuthContext } from "../../contexts/AuthContext";
import { followUser } from "../../utils/UserUtils";
import { useNavigate } from "react-router-dom";

function ExploreUsers({ usersToFollow }) {
  const { authState, authDispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  const navigateToUserProfile = (username) => {
    navigate(`/profile/${username}`);
  };

  const handleFollowUser = (e, userId) => {
    e.stopPropagation();
    followUser(userId, authState?.token, authDispatch);
  };

  return (
    <div className="exploreUsersContainer">
      <div className="suggestedUsersContainer">
        <h3>Who to follow?</h3>
        <div className="usersToFollow">
          {usersToFollow.length === 0 ? (
            <p className="noMoreUsersToFollow">No more suggestions!</p>
          ) : (
            usersToFollow.map((user, idx) => {
              return (
                <div
                  className="userCard"
                  key={idx}
                  onClick={() => navigateToUserProfile(user?.username)}
                >
                  <div className="aboutUser">
                    <div className="userProfileImage">
                      <div className="profilePicture">
                        <img src={user?.profileAvatar} alt={user?.username} />
                      </div>
                    </div>
                    <div className="infoAboutUserToFollow">
                      <span>{user?.firstName + " " + user?.lastName}</span>
                      <p>@{user?.username}</p>
                    </div>
                  </div>
                  <button onClick={(e) => handleFollowUser(e, user?._id)}>
                    Follow
                  </button>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}

export default ExploreUsers;
