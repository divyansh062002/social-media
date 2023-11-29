import React, { useContext, useState } from "react";
import Header from "../../components/Header/Header";
import Sidebar from "../../components/Sidebar/Sidebar";
import { AuthContext } from "../../contexts/AuthContext";
import { DataContext } from "../../contexts/DataContext";
import { PostModalContext } from "../../contexts/PostModalContext";
import ExploreUsers from "../../components/Explore Users/ExploreUsers";
import CreatePostModal from "../../components/CreatePostModal/CreatePostModal";
import Post from "../../components/Post/Post";
import "./Bookmarks.css";

function Bookmarks() {
  const { authState } = useContext(AuthContext);
  const { dataState } = useContext(DataContext);
  const { setPostForm, setEditMode } = useContext(PostModalContext);
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);

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

  const bookmarkedPostsIds =
    [...dataState?.bookmarks].length >= 0 &&
    [...dataState?.bookmarks].map(({ _id }) => _id);

  const bookmarkedPosts = [...dataState?.posts].filter((post) =>
    bookmarkedPostsIds.includes(post?._id)
  );

  return (
    <div className="bookmarksPage">
      <Header />
      <div className="bookmarksPageContainer">
        <Sidebar openModal={openModal} />
        <section className="bookmarksSection">
          {bookmarkedPosts.length === 0 ? (
            <p className="noBookmarks">You have not bookmarked any posts yet!</p>  
          ) : (
            bookmarkedPosts.map((post, idx) => {
              return <Post post={post} key={idx} openModal={openModal} />;
            })
          )}
        </section>
        <ExploreUsers usersToFollow={usersToFollow} />
        {isPostModalOpen && <CreatePostModal closeModal={closeModal} />}
      </div>
    </div>
  );
}

export default Bookmarks;
