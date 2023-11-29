import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { DataContext } from "../../contexts/DataContext";
import { MdCalendarMonth } from "react-icons/md";
import { AuthContext } from "../../contexts/AuthContext";
import "./Profile.css";
import {
  convertDateFormat,
  editUser,
  followUser,
  unfollowUser,
} from "../../utils/UserUtils";
import Post from "../../components/Post/Post";
import EditProfileModal from "../../components/EditProfileModal/EditProfileModal";
import { uploadImage } from "../../utils/UploadImage";
import Sidebar from "../../components/Sidebar/Sidebar";
import { PostModalContext } from "../../contexts/PostModalContext";
import ExploreUsers from "../../components/Explore Users/ExploreUsers";
import CreatePostModal from "../../components/CreatePostModal/CreatePostModal";
import Header from "../../components/Header/Header";
import UsersModal from "../../components/UsersModal/UsersModal";

function Profile() {
  const { authState, authDispatch } = useContext(AuthContext);
  const { dataState, dataDispatch } = useContext(DataContext);
  const { setPostForm, setEditMode } = useContext(PostModalContext);
  const { username } = useParams();

  const [userProfile, setUserProfile] = useState({
    profileAvatar: "",
    firstName: "",
    lastName: "",
    username: "",
    about: "",
    website: "",
  });
  const [showEditProfileModal, setShowEditProfileModal] = useState(false);
  const [isNewProfilePicUploaded, setIsNewProfilePicUploaded] = useState(false);
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);
  const [showFollowingUsersModal, setShowFollowingUsersModal] = useState(false);
  const [showFollowersModal, setShowFollowersModal] = useState(false);

  const openModal = () => {
    setIsPostModalOpen(true);
    setEditMode(false);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setPostForm((prevState) => ({ ...prevState, content: "", mediaUrl: "" }));
    setIsPostModalOpen(false);
    document.body.style.overflow = "auto";
  };

  const openFollowingUsersModal = () => {
    setShowFollowingUsersModal(true);
    document.body.style.overflow = "hidden";
  };

  const closeFollowingUsersModal = () => {
    setShowFollowingUsersModal(false);
    document.body.style.overflow = "auto";
  };

  const openFollowersModal = () => {
    setShowFollowersModal(true);
    document.body.style.overflow = "hidden";
  };

  const closeFollowersModal = () => {
    setShowFollowersModal(false);
    document.body.style.overflow = "auto";
  };

  const loggedInUser = authState?.user;

  const followingUsers = loggedInUser?.following || [];

  const usernameOfFollowingUsers = [...followingUsers].map(
    (user) => user?.username
  );

  const usersToFollow = [...dataState?.users].filter(
    (user) =>
      user?.username !== loggedInUser?.username &&
      !usernameOfFollowingUsers.includes(user?.username)
  );

  const currentUser = [...dataState?.users].find(
    (user) => user.username === username
  );

  const remainingUsers = [...dataState?.users].filter(
    (user) => user.username !== username
  );

  const isFollowingCurrentUser = [...authState?.user?.following].find(
    (user) => user?.username === currentUser?.username
  );

  const fullName = currentUser?.firstName + " " + currentUser?.lastName;

  const postsOfCurrentUser = [...dataState?.posts].filter(
    (post) => post?.username === username
  );

  const noOfPosts = [...dataState?.posts].filter(
    (post) => post?.username === username
  ).length;

  const listOfFollowingUsers = currentUser?.following;

  const listOfFollowers = currentUser?.followers;

  const handleUnfollowUser = () => {
    unfollowUser(currentUser?._id, authState?.token, authDispatch);
  };

  const handleFollowUser = () => {
    followUser(currentUser?._id, authState?.token, authDispatch);
  };

  const handleOpenEditProfileModal = () => {
    setShowEditProfileModal((prevValue) => !prevValue);
    document.body.style.overflow = "hidden";
  };

  const handleCloseEditProfileModal = () => {
    setShowEditProfileModal(false);
    setUserProfile({
      profileAvatar: currentUser?.profileAvatar,
      firstName: currentUser?.firstName,
      lastName: currentUser?.lastName,
      username: currentUser?.username,
      about: currentUser?.about,
      website: currentUser?.website,
    });
    document.body.style.overflow = "auto";
  };

  const handleChooseAvatar = (e) => {
    const selectedAvatar = e.target.getAttribute("id");
    setUserProfile((prevValue) => ({
      ...prevValue,
      profileAvatar: selectedAvatar,
    }));
  };

  const handleChange = (e) => {
    setUserProfile((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const handleMediaInput = (e) => {
    setIsNewProfilePicUploaded(true);
    const file = e.target.files[0];
    if (file.type.startsWith("image/")) {
      if (file.size < 10 * 1024 * 1024) {
        setUserProfile((prev) => ({
          ...prev,
          media: file,
          profileAvatar: URL.createObjectURL(file),
        }));
      } else {
        console.log("File size must be less than 10mb");
      }
    } else {
      console.log("File must be an image");
    }
  };

  const handleEditProfileFormSubmit = async (e) => {
    e.preventDefault();
    if (isNewProfilePicUploaded) {
      const resp = await uploadImage(userProfile?.media);
      const modifiedUserProfileForm = {
        ...userProfile,
        profileAvatar: resp.url,
      };
      const modifiedLoggedInUser = {
        ...authState?.user,
        ...modifiedUserProfileForm,
      };
      editUser(
        authState?.token,
        modifiedUserProfileForm,
        dataDispatch,
        authDispatch,
        remainingUsers
      );
      authDispatch({ type: "setUser", payload: modifiedLoggedInUser });
    } else {
      const modifiedLoggedInUser = { ...authState?.user, ...userProfile };
      editUser(
        authState?.token,
        userProfile,
        dataDispatch,
        authDispatch,
        remainingUsers
      );
      authDispatch({ type: "setUser", payload: modifiedLoggedInUser });
    }
    setShowEditProfileModal(false);
    setIsNewProfilePicUploaded(false);
  };

  useEffect(() => {
    setUserProfile({
      profileAvatar: currentUser?.profileAvatar,
      firstName: currentUser?.firstName,
      lastName: currentUser?.lastName,
      username: currentUser?.username,
      about: currentUser?.about,
      website: currentUser?.website,
    });
  }, [currentUser]);

  return (
    <div className="profilePage">
      <Header />
      <div className="profilePageContainer">
        <Sidebar openModal={openModal} />
        <section className="profileSection">
          <div className="profilePrimaryInfo">
            <div className="profilePicAndActionContainer">
              <img src={currentUser?.profileAvatar} alt="profile-pic" />
              {authState?.user?.username === currentUser?.username ? (
                <button onClick={handleOpenEditProfileModal}>
                  Edit Profile
                </button>
              ) : isFollowingCurrentUser !== undefined ? (
                <button onClick={handleUnfollowUser}>Following</button>
              ) : (
                <button onClick={handleFollowUser}>Follow</button>
              )}
            </div>

            <div className="userPrimaryInfo">
              <h3>{fullName}</h3>
              <p>@{currentUser?.username}</p>
            </div>

            <p className="userAboutInfo">{currentUser?.about}</p>

            <div className="userWebsiteAndJoinedDate">
              <a className="userWebsite" href={currentUser?.website}>
                {currentUser?.website}
              </a>
              <div className="joinedDateInfo">
                <MdCalendarMonth />
                <p>
                  Joined{" "}
                  {currentUser?.createdAt &&
                    convertDateFormat(currentUser?.createdAt)}
                </p>
              </div>
            </div>

            <div className="userSecondaryInfo">
              <div className="singleStat">
                <p>{noOfPosts}</p>
                <span>Posts</span>
              </div>
              <div className="singleStat">
                <p>{currentUser?.following.length}</p>
                <span
                  className="showAppropriateModal"
                  onClick={openFollowingUsersModal}
                >
                  Following
                </span>
              </div>
              <div className="singleStat">
                <p>{currentUser?.followers.length}</p>
                <span
                  className="showAppropriateModal"
                  onClick={openFollowersModal}
                >
                  Followers
                </span>
              </div>
            </div>
          </div>
          <div className="profilePosts">
            {postsOfCurrentUser.length === 0 ? (
              <p className="noPosts">You haven't posted anything yet!</p>
            ) : (
              [...postsOfCurrentUser].map((post, idx) => {
                return <Post post={post} openModal={openModal} key={idx} />;
              })
            )}
          </div>
          {showEditProfileModal && (
            <EditProfileModal
              userProfile={userProfile}
              handleOpenEditProfileModal={handleOpenEditProfileModal}
              handleCloseEditProfileModal={handleCloseEditProfileModal}
              handleChooseAvatar={handleChooseAvatar}
              handleChange={handleChange}
              handleMediaInput={handleMediaInput}
              handleEditProfileFormSubmit={handleEditProfileFormSubmit}
            />
          )}
          {showFollowingUsersModal && (
            <UsersModal
              usersList={listOfFollowingUsers}
              modalHeading="Following"
              closeFollowingUsersModal={closeFollowingUsersModal}
            />
          )}
          {showFollowersModal && (
            <UsersModal
              usersList={listOfFollowers}
              modalHeading="Followers"
              closeFollowersModal={closeFollowersModal}
            />
          )}
        </section>
        <ExploreUsers usersToFollow={usersToFollow} />
        {isPostModalOpen && <CreatePostModal closeModal={closeModal} />}
      </div>
    </div>
  );
}

export default Profile;
