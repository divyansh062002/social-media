import React, { useContext } from "react";
import "./CommentsSection.css";
import Comment from "../Comment/Comment";
import { AuthContext } from "../../contexts/AuthContext";

function CommentsSection({
  comments,
  comment,
  handleChange,
  handleAddComment,
}) {
  const { authState } = useContext(AuthContext);

  const loggedInUser = authState?.user;

  return (
    <div className="commentsSection">
      <div className="addCommentSection">
        <div className="userProfileImage">
          <div className="profilePicture">
            <img
              src={loggedInUser?.profileAvatar}
              alt={loggedInUser?.username}
            />
          </div>
        </div>
        <textarea
          className="commentInput"
          placeholder="Add your comment"
          onChange={handleChange}
          value={comment?.text}
        />
        <button
          disabled={comment?.text.length === 0}
          className={
            comment?.text.length === 0 ? "commentBtnDisabled" : "commentBtnEnabled"
          }
          onClick={handleAddComment}
        >
          Comment
        </button>
      </div>
      <div className="commentsContainer">
        {comments?.length === 0 ? (
          <p>No comments to show</p>
        ) : (
          comments.map((comment, idx) => {
            return <Comment comment={comment} key={idx} />;
          })
        )}
      </div>
    </div>
  );
}

export default CommentsSection;
