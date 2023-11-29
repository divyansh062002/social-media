import React, { useContext, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import "./Home.css";
import { DataContext } from "../../contexts/DataContext";
import CreatePost from "../../components/CreatePost/CreatePost";
import Filters from "../../components/Filters/Filters";
import { sortPosts } from "../../utils/SortPosts";
import Post from "../../components/Post/Post";
import CreatePostModal from "../../components/CreatePostModal/CreatePostModal";
import { PostModalContext } from "../../contexts/PostModalContext";
import Sidebar from "../../components/Sidebar/Sidebar";
import ExploreUsers from "../../components/Explore Users/ExploreUsers";
import Header from "../../components/Header/Header";

function Home() {
  const { authState } = useContext(AuthContext);
  const { dataState, filter } = useContext(DataContext);
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

  const postsOfFollowingUsers = dataState?.posts.filter((post) =>
    usernameOfFollowingUsers.includes(post.username)
  );

  const postsOfLoggedInUser = dataState?.posts.filter(
    (post) => post.username === loggedInUser.username
  );

  const timelinePosts = [...postsOfFollowingUsers, ...postsOfLoggedInUser];

  const sortedPosts = sortPosts(timelinePosts, filter);

  const usersToFollow = [...dataState?.users].filter(
    (user) =>
      user?.username !== loggedInUser?.username &&
      !usernameOfFollowingUsers.includes(user?.username)
  );

  return (
    <div className="homePage">
      <Header />
      <div className="homePageContainer">
        <Sidebar openModal={openModal} />
        <section className="homeSection">
          <CreatePost />
          <Filters />
          <div className="postsContainer">
            {sortedPosts.length === 0 ? (
              <p className="nothingToShow">
                Sorry, there is nothing to show! Follow people to see their posts.
              </p>
            ) : (
              [...sortedPosts]
                .reverse()
                .map((post, idx) => (
                  <Post post={post} key={idx} openModal={openModal} />
                ))
            )}
          </div>
          {isPostModalOpen && <CreatePostModal closeModal={closeModal} />}
        </section>
        <ExploreUsers usersToFollow={usersToFollow} />
        {isPostModalOpen && <CreatePostModal closeModal={closeModal} />}
      </div>
    </div>
  );
}

export default Home;
