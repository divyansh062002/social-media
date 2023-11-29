import React from "react";
import "./Comment.css";
import calculateTimePassed from "../../utils/PostUtils";
import { useNavigate } from "react-router-dom";

function Comment({ comment }) {
  const navigate = useNavigate()

  const navigateToUserProfile = (username) => {
    navigate(`/profile/${username}`);
  };

  return (
    <div className="singleComment">
      <div className="userProfileImage" onClick={() => navigateToUserProfile(comment?.username)}>
        <div className="profilePicture">
          <img src={comment?.avatarUrl} alt={comment?.username} />
        </div>
      </div>
      <div className="commentInfo">
        <div className="userInfoOfComment">
          <div className="commentProfile" onClick={() => navigateToUserProfile(comment?.username)}>
            <span>{comment?.firstName + " " + comment?.lastName}</span>
            <p>@{comment?.username}</p>
          </div>
          <div className="dateCreated">
            <p>{calculateTimePassed(comment?.createdAt)} ago</p>
          </div>
        </div>
        <div className="commentContent">
          <p className="comment">{comment?.text}</p>
        </div>
      </div>
    </div>
  );
}

export default Comment;
