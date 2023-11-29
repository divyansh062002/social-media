import React, { useContext } from "react";
import "./UsersModal.css";
import { IoMdClose } from "react-icons/io";
import { AuthContext } from "../../contexts/AuthContext";
import { followUser, unfollowUser } from "../../utils/UserUtils";

function UsersModal({
  usersList,
  modalHeading,
  closeUsersWhoLikedModal,
  closeFollowingUsersModal,
  closeFollowersModal,
}) {
  const { authState, authDispatch } = useContext(AuthContext);
  return (
    <>
      <div className="usersModal">
        <div className="modalContent">
          <h2>{modalHeading}</h2>
          {usersList.length === 0 ? (
            <p className="noUsers">Nothing to show here!</p>
          ) : (
            <div className="appropriateUsersContainer">
              {usersList.map((user, idx) => {
                const isFollowingCurrentUser = [
                  ...authState?.user?.following,
                ].find((singleUser) => singleUser?.username === user?.username);

                const handleUnfollowUser = () => {
                  unfollowUser(user?._id, authState?.token, authDispatch);
                };

                const handleFollowUser = () => {
                  followUser(user?._id, authState?.token, authDispatch);
                };

                return (
                  <div className="singleUserCard" key={idx}>
                    <div className="userCardPrimaryInfo">
                      <div className="profilePicture">
                        <img
                          src={
                            user?.avatarUrl
                              ? user?.avatarUrl
                              : user?.profileAvatar
                          }
                          alt={user?.username}
                        />
                      </div>
                      <div className="fullNameAndUsername">
                        <p className="fullName">
                          {user?.firstName && user?.lastName
                            ? user?.firstName + " " + user?.lastName
                            : user?.fullName}
                        </p>
                        <p className="userName">@{user?.username}</p>
                      </div>
                    </div>
                    {authState?.user?.username !== user?.username && (
                      <div>
                        {isFollowingCurrentUser !== undefined ? (
                          <button onClick={handleUnfollowUser}>
                            Following
                          </button>
                        ) : (
                          <button onClick={handleFollowUser}>Follow</button>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
        <IoMdClose
          className="closePostModal"
          onClick={
            modalHeading === "Liked By"
              ? closeUsersWhoLikedModal
              : modalHeading === "Following"
              ? closeFollowingUsersModal
              : closeFollowersModal
          }
        />
      </div>
      <div className="modalOverlay" />
    </>
  );
}

export default UsersModal;
