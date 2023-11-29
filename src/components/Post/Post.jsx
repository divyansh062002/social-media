import React, { useContext, useEffect, useRef, useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import { BiShareAlt } from "react-icons/bi";
import { MdBookmarkBorder, MdBookmark } from "react-icons/md";
import { FaRegComment } from "react-icons/fa";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import "./Post.css";
import calculateTimePassed, {
  deletePost,
  dislikePost,
  likePost,
} from "../../utils/PostUtils";
import { AuthContext } from "../../contexts/AuthContext";
import { DataContext } from "../../contexts/DataContext";
import { addBookmark, removeBookmark } from "../../utils/UserUtils";
import { PostModalContext } from "../../contexts/PostModalContext";
import CommentsSection from "../CommentsSection/CommentsSection";
import {
  addCommentsService,
  getCommentsService,
} from "../../services/PostServices";
import { useNavigate } from "react-router-dom";
import UsersModal from "../UsersModal/UsersModal";

function Post({ post, openModal }) {
  const { authState } = useContext(AuthContext);
  const { dataState, dataDispatch } = useContext(DataContext);
  const { handleFormEdit } = useContext(PostModalContext);
  const navigate = useNavigate();

  const firstName = authState?.user?.firstName;
  const lastName = authState?.user?.lastName;
  const username = authState?.user?.username;
  const avatarUrl = authState?.user?.profileAvatar;

  const [showPostActionsMenu, setShowPostActionMenu] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState({
    firstName,
    lastName,
    username,
    avatarUrl,
    text: "",
  });
  const [hoveredOverCommentAction, setHoveredOverCommentAction] =
    useState(false);
  const [hoveredOverLikeAction, setHoveredOverLikeAction] = useState(false);
  const [hoveredOverShareAction, setHoveredOverShareAction] = useState(false);
  const [hoveredOverBookmarkAction, setHoveredOverBookmarkAction] =
    useState(false);
  const [showUsersWhoLiked, setShowUsersWhoLiked] = useState(false);

  const postActionsRef = useRef(null);

  const openUsersWhoLikedModal = () => {
    setShowUsersWhoLiked(true);
    document.body.style.overflow = "hidden";
  };

  const closeUsersWhoLikedModal = () => {
    setShowUsersWhoLiked(false);
    document.body.style.overflow = "auto";
  };

  const isLikedAlready = post?.likes?.likedBy.find(
    (user) => user?.username === authState?.user?.username
  );

  const isBookmarkedAlready = [...dataState?.bookmarks].find(
    (bookmark) => post?._id === bookmark?._id
  );

  const handlePostActionsMenu = () => {
    setShowPostActionMenu((prevState) => !prevState);
  };

  const handleDeletePost = () => {
    setShowPostActionMenu(false);
    deletePost(post?._id, authState?.token, dataDispatch);
  };

  const handleEditPost = (postToEdit) => {
    setShowPostActionMenu(false);
    openModal();
    postToEdit?.media && delete postToEdit?.media;
    handleFormEdit(postToEdit);
  };

  const toggleCommentSectionAndGetComments = async () => {
    setShowComments((prevState) => !prevState);
    const res = await getCommentsService(post?._id);
    const resJson = await res.json();
    setComments(resJson?.comments);
  };

  const handleChange = (e) => {
    setComment((prev) => ({ ...prev, text: e.target.value }));
  };

  const handleAddComment = async () => {
    const res = await addCommentsService(post?._id, comment, authState?.token);
    const resJson = await res.json();
    const modifiedPosts = resJson?.posts;
    const postOnWhichCommentIsAdded = [...modifiedPosts].find(
      (singlePost) => singlePost?._id === post?._id
    );
    setComments(postOnWhichCommentIsAdded?.comments);
    setComment({ firstName, lastName, username, avatarUrl, text: "" });
  };

  const currentUser = [...dataState?.users]?.find(
    ({ username }) => username === post?.username
  );

  const navigateToUserProfile = () => {
    navigate(`/profile/${currentUser?.username}`);
  };

  const listOfUsersWhoLiked = post?.likes?.likedBy;

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        postActionsRef.current &&
        !postActionsRef.current.contains(event.target) &&
        !event.target.classList.contains("feedIcon")
      ) {
        setShowPostActionMenu(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
    // eslint-disable-next-line
  }, []);

  const navigateToPost = () => {
    navigate(`/post-details/${post?.id}`);
  };

  return (
    <div className="post">
      <div className="userProfileImage">
        <div className="profilePicture" onClick={navigateToUserProfile}>
          <img src={currentUser?.profileAvatar} alt={currentUser?.username} />
        </div>
      </div>
      <div className="postDetails">
        <div className="postHeader">
          <div className="primaryDetails">
            <div className="profile" onClick={navigateToUserProfile}>
              <span>
                {post?.fullName || post?.firstName + " " + post?.lastName}
              </span>
              <p>@{post?.username}</p>
            </div>
            <div className="dateCreated">
              <p>{calculateTimePassed(post?.createdAt)} ago</p>
            </div>
          </div>
          {authState?.user?.username === post?.username && (
            <div onClick={handlePostActionsMenu} className="moreOptions">
              <BsThreeDots className="icon feedIcon" size={22} />
            </div>
          )}
          {showPostActionsMenu && (
            <div className="postActionsMenu" ref={postActionsRef}>
              <p onClick={() => handleEditPost(post)}>Edit Post</p>
              <p onClick={handleDeletePost}>Delete Post</p>
            </div>
          )}
        </div>

        <div className="postContent">
          <p>{post?.content}</p>
        </div>

        {post?.mediaUrl !== "" && (
          <div className="media" onClick={navigateToPost}>
            {post?.mediaUrl && post?.type === "video" && (
              <video className="postMedia" controls autoPlay muted loop>
                <source src={post?.mediaUrl} />
              </video>
            )}
            {post?.mediaUrl && post?.type === "image" && (
              <img className="postMedia" src={post?.mediaUrl} alt="postImg" />
            )}
          </div>
        )}

        <div className="postActions">
          <div
            className="actionsContainer commentsActionContainer"
            onMouseOver={() =>
              setHoveredOverCommentAction((prevState) => !prevState)
            }
            onMouseOut={() =>
              setHoveredOverCommentAction((prevState) => !prevState)
            }
            onClick={toggleCommentSectionAndGetComments}
          >
            <div
              className={
                !hoveredOverCommentAction
                  ? "iconContainer"
                  : "commentIconContainer"
              }
            >
              <FaRegComment size={22} className="icon" />
            </div>
            <span>{post?.comments.length}</span>
          </div>

          <div
            className="actionsContainer likeActionContainer"
            onMouseOver={() =>
              setHoveredOverLikeAction((prevState) => !prevState)
            }
            onMouseOut={() =>
              setHoveredOverLikeAction((prevState) => !prevState)
            }
          >
            <div
              className={
                !hoveredOverLikeAction ? "iconContainer" : "likeIconContainer"
              }
            >
              {isLikedAlready ? (
                <AiFillHeart
                  size={25}
                  onClick={() =>
                    dislikePost(post?._id, authState?.token, dataDispatch)
                  }
                  className="icon"
                  style={{ color: "red" }}
                />
              ) : (
                <AiOutlineHeart
                  size={25}
                  onClick={() =>
                    likePost(post?._id, authState?.token, dataDispatch)
                  }
                  className="icon"
                />
              )}
            </div>
            <span onClick={openUsersWhoLikedModal}>
              {post?.likes?.likeCount}
            </span>
          </div>

          <div
            className="actionsContainer shareActionContainer"
            onMouseOver={() =>
              setHoveredOverShareAction((prevState) => !prevState)
            }
            onMouseOut={() =>
              setHoveredOverShareAction((prevState) => !prevState)
            }
          >
            <div
              className={
                !hoveredOverShareAction ? "iconContainer" : "shareIconContainer"
              }
            >
              <BiShareAlt size={22} className="icon" />
            </div>
          </div>

          <div
            className="actionsContainer bookmarkActionContainer"
            onMouseOver={() =>
              setHoveredOverBookmarkAction((prevState) => !prevState)
            }
            onMouseOut={() =>
              setHoveredOverBookmarkAction((prevState) => !prevState)
            }
          >
            <div
              className={
                !hoveredOverBookmarkAction
                  ? "iconContainer"
                  : "bookmarkIconContainer"
              }
            >
              {isBookmarkedAlready ? (
                <MdBookmark
                  size={25}
                  onClick={() =>
                    removeBookmark(post?._id, authState?.token, dataDispatch)
                  }
                  className="icon"
                  style={{ color: "#1d9bf0" }}
                />
              ) : (
                <MdBookmarkBorder
                  size={25}
                  onClick={() =>
                    addBookmark(post?._id, authState?.token, dataDispatch)
                  }
                  className="icon"
                />
              )}
            </div>
          </div>
        </div>

        {showComments && (
          <CommentsSection
            comments={comments}
            comment={comment}
            handleChange={handleChange}
            handleAddComment={handleAddComment}
          />
        )}
      </div>
      {showUsersWhoLiked && (
        <UsersModal
          usersList={listOfUsersWhoLiked}
          modalHeading={"Liked By"}
          closeUsersWhoLikedModal={closeUsersWhoLikedModal}
        />
      )}
    </div>
  );
}

export default Post;
