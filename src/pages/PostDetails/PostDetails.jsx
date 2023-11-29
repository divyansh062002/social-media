import React, { useContext, useState } from "react";
import Header from "../../components/Header/Header";
import { AuthContext } from "../../contexts/AuthContext";
import { DataContext } from "../../contexts/DataContext";
import { PostModalContext } from "../../contexts/PostModalContext";
import Sidebar from "../../components/Sidebar/Sidebar";
import ExploreUsers from "../../components/Explore Users/ExploreUsers";
import CreatePostModal from "../../components/CreatePostModal/CreatePostModal";
import { useParams } from "react-router-dom";
import Post from "../../components/Post/Post";
import "./PostDetails.css"

function PostDetails() {
  const { authState } = useContext(AuthContext);
  const { dataState } = useContext(DataContext);
  const { setPostForm, setEditMode } = useContext(PostModalContext);
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);
  const { postId } = useParams();

  const postToDisplay = [...dataState?.posts].find(
    (post) => post?.id === postId
  );

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

  return (
    <div className="postDetailsPage">
      <Header />
      <div className="postDetailsPageContainer">
        <Sidebar openModal={openModal} />
        <section className="postDetailSection">
          <Post post={postToDisplay} openModal={openModal} />
        </section>
        <ExploreUsers usersToFollow={usersToFollow} />
        {isPostModalOpen && <CreatePostModal closeModal={closeModal} />}
      </div>
    </div>
  );
}

export default PostDetails;
