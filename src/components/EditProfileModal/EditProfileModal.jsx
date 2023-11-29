import React from "react";
import "./EditProfileModal.css";
import { IoMdClose } from "react-icons/io";
import { AiOutlineCamera } from "react-icons/ai";

function EditProfileModal({
  handleCloseEditProfileModal,
  userProfile,
  handleChooseAvatar,
  handleChange,
  handleMediaInput,
  handleEditProfileFormSubmit,
}) {
  const avatars = [
    "https://res.cloudinary.com/dp6uypw0c/image/upload/v1690440001/avatar-6_bjrd9c.png",
    "https://res.cloudinary.com/dp6uypw0c/image/upload/v1690440001/avatar-7_uvbupl.png",
    "https://res.cloudinary.com/dp6uypw0c/image/upload/v1690440002/avatar-2_wt2gxl.png",
    "https://res.cloudinary.com/dp6uypw0c/image/upload/v1690440002/avatar-4_y1nd3d.png",
    "https://res.cloudinary.com/dp6uypw0c/image/upload/v1690440002/avatar-1_c8wtmz.png",
    "https://res.cloudinary.com/dp6uypw0c/image/upload/v1690440001/avatar-5_agmzsi.png",
    "https://res.cloudinary.com/dp6uypw0c/image/upload/v1690440003/avatar-3_v9ckzi.png",
  ];

  return (
    <>
      <div className="editProfileModal">
        <div className="editProfileModalHeader">
          <IoMdClose
            className="icon"
            size={25}
            onClick={handleCloseEditProfileModal}
          />
          <div className="editProfileModalHeaderPrimary">
            <h3>Edit Profile</h3>
          </div>
        </div>
        <form onSubmit={handleEditProfileFormSubmit}>
          <div className="editProfileModalPrimaryInfo">
            <div className="profileImageContainer">
              <img src={userProfile?.profileAvatar} alt="profileAvatar" />
              <label>
                <input
                  type="file"
                  className="fileInput"
                  onChange={handleMediaInput}
                />
                <AiOutlineCamera className="cameraIcon" size={25} />
              </label>
            </div>
            <div className="userInfo">
              <h3>{userProfile?.firstName + " " + userProfile?.lastName}</h3>
              <p>@{userProfile?.username}</p>
            </div>
          </div>
          <div className="changeProfileContainer">
            <p>Choose a picture from your gallery or existing avatars</p>
            <div className="avatarsContainer">
              {avatars.map((avatar, idx) => {
                return (
                  <img
                    className={
                      avatar === userProfile?.profileAvatar
                        ? "selectedAvatar"
                        : "avatar"
                    }
                    src={avatar}
                    alt="avatar-img"
                    key={idx}
                    id={avatar}
                    onClick={handleChooseAvatar}
                  />
                );
              })}
            </div>
          </div>
          <div className="editAboutContainer">
            <label htmlFor="about">About:</label>
            <textarea
              id="about"
              onChange={handleChange}
              value={userProfile?.about}
              required
            />
          </div>
          <div className="editWebsiteContainer">
            <label htmlFor="website">Website:</label>
            <textarea
              id="website"
              onChange={handleChange}
              value={userProfile?.website}
              required
            />
          </div>
          <button className="submitFormBtn" type="submit">
            Save
          </button>
        </form>
      </div>
      <div className="editProfileModalOverlay" />
    </>
  );
}

export default EditProfileModal;
