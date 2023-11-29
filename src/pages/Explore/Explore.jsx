import React, { useContext, useState } from 'react'
import Header from '../../components/Header/Header'
import { PostModalContext } from '../../contexts/PostModalContext';
import Sidebar from '../../components/Sidebar/Sidebar';
import CreatePostModal from '../../components/CreatePostModal/CreatePostModal';
import { DataContext } from '../../contexts/DataContext';
import { AuthContext } from '../../contexts/AuthContext';
import ExploreUsers from '../../components/Explore Users/ExploreUsers';
import Post from '../../components/Post/Post';
import "./Explore.css"

function Explore() {
  const {authState} = useContext(AuthContext)
  const {dataState} = useContext(DataContext)
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

  const postsToDisplayOnExplorePage = [...dataState?.posts]

  return (
    <div className='explorePage'>
      <Header />
      <div className='explorePageContainer'>
        <Sidebar openModal={openModal} />
        <section className='exploreSection'>
          {postsToDisplayOnExplorePage.map((post, idx) => {
            return(
              <Post post={post} key={idx} openModal={openModal}/>
            )
          })}
        </section>
        <ExploreUsers usersToFollow={usersToFollow}/>
        {isPostModalOpen && <CreatePostModal closeModal={closeModal}/>}
      </div>
    </div>
  )
}

export default Explore