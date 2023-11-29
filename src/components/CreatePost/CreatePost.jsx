import React, { useContext, useRef, useState } from "react";
import { MdOutlineInsertPhoto } from "react-icons/md";
import { IoMdClose } from "react-icons/io";
import { BsEmojiSmile } from "react-icons/bs";
import { AuthContext } from "../../contexts/AuthContext";
import { createPost } from "../../utils/PostUtils";
import { DataContext } from "../../contexts/DataContext";
import { uploadImage } from "../../utils/UploadImage";
import "./CreatePost.css";
import EmojiPicker from "emoji-picker-react";
// import GifPicker from "gif-picker-react";

function CreatePost() {
  const { authState } = useContext(AuthContext);
  const { dataDispatch } = useContext(DataContext);

  const firstName = authState?.user?.firstName;
  const lastName = authState?.user?.lastName;

  const [postForm, setPostForm] = useState({
    firstName,
    lastName,
    content: "",
    mediaUrl: "",
  });
  const [showEmojiContainer, setShowEmojiContainer] = useState(false);
  // const [showGifContainer, setShowGifContainer] = useState(false);
  const [uploadingGif, setUploadingGif] = useState(false);

  const newPostRef = useRef();

  const handleChange = (e) => {
    setPostForm((prev) => ({ ...prev, content: e.target.value }));
  };

  const handleFocus = (e) => {
    const textarea = e.target;
    if (textarea.value.trim() !== "") {
      textarea.classList.remove("empty");
    }
  };

  const handleBlur = (e) => {
    const textarea = e.target;
    if (textarea.value.trim() === "") {
      textarea.classList.add("empty");
    }
  };

  const toggleEmojiContainer = () => {
    setShowEmojiContainer((prevState) => !prevState);
  };

  // const toggleGifContainer = () => {
  //   setShowGifContainer((prevState) => !prevState);
  // };

  const handleMediaInput = (e) => {
    const file = e.target.files[0];
    if (file.type.startsWith("image/") || file?.type.startsWith("video/")) {
      if (file.size < 20 * 1024 * 1024) {
        setPostForm((prev) => ({
          ...prev,
          media: file,
          mediaUrl: URL.createObjectURL(file),
          type: file?.type.startsWith("image/") ? "image" : "video",
        }));
      } else {
        console.log("File size must be less than 20mb");
      }
    } else {
      console.log("File must be a video or video or an image");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (postForm?.mediaUrl !== "") {
      if (uploadingGif) {
        const resp = await uploadImage(postForm?.mediaUrl);
        const modifiedPostForm = { ...postForm, mediaUrl: resp.url };
        createPost(modifiedPostForm, authState?.token, dataDispatch);
        setUploadingGif(false);
      } else {
        const resp = await uploadImage(postForm?.media);
        const modifiedPostForm = { ...postForm, mediaUrl: resp.url };
        createPost(modifiedPostForm, authState?.token, dataDispatch);
      }
    } else {
      createPost(postForm, authState?.token, dataDispatch);
    }

    setPostForm({
      firstName,
      lastName,
      content: "",
      mediaUrl: "",
    });
  };

  const handleEmojiClick = (emoji) => {
    setPostForm((prev) => ({
      ...prev,
      content: prev.content + emoji?.emoji,
    }));
  };

  // const handleGifClick = (gif) => {
  //   setUploadingGif(true);
  //   setPostForm((prev) => ({
  //     ...prev,
  //     mediaUrl: gif.url,
  //     type: "image",
  //   }));
  //   setShowGifContainer(false);
  // };

  return (
    <div className="newPost">
      <div className="userAvatar">
        <div className="profilePicture">
          <img
            src={authState?.user?.profileAvatar}
            alt={authState?.user?.username}
          />
        </div>
      </div>
      <form onSubmit={handleSubmit}>
        <textarea
          ref={newPostRef}
          className={`tweetInputHomePage ${
            postForm?.content.trim() === "" ? "empty" : ""
          }`}
          placeholder="What is happening?!"
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          value={postForm?.content}
        />

        {postForm?.mediaUrl && postForm?.type === "image" && (
          <div className="mediaContainer">
            <img src={postForm?.mediaUrl} alt="post-img" />
            <IoMdClose
              onClick={() => {
                setPostForm((prev) => ({
                  ...prev,
                  mediaUrl: "",
                  media: "",
                  type: "",
                }));
                setUploadingGif(false);
              }}
              className="closeMedia"
            />
          </div>
        )}

        {postForm?.mediaUrl && postForm?.type === "video" && (
          <div className="mediaContainer">
            <video controls muted loop>
              <source src={postForm?.mediaUrl}></source>
            </video>
            <IoMdClose
              onClick={() => {
                setPostForm((prev) => ({
                  ...prev,
                  mediaUrl: "",
                  media: "",
                  type: "",
                }));
              }}
              className="closeMedia"
            />
          </div>
        )}

        <div className="createTweetActions">
          <div className="addToTweet">
            <label>
              <input
                type="file"
                className="fileInput"
                onChange={handleMediaInput}
              />
              <div className="insertPicEmoji">
                <MdOutlineInsertPhoto size={23} className="icon blueIcon" />
              </div>
            </label>
            {/* <MdOutlineGifBox
              size={25}
              className="icon"
              onClick={toggleGifContainer}
            /> */}
            <BsEmojiSmile
              size={19}
              className="icon blueIcon"
              onClick={toggleEmojiContainer}
            />
          </div>
          <button
            disabled={postForm?.content === "" && postForm?.mediaUrl === ""}
            type="submit"
          >
            Post
          </button>
        </div>
      </form>
      {showEmojiContainer && (
        <EmojiPicker
          onEmojiClick={handleEmojiClick}
          theme="dark"
          className="emojiPickerContainer"
        />
      )}
      {/* {showGifContainer && (
        <GifPicker
          onGifClick={handleGifClick}
          tenorApiKey="AIzaSyDHZRMhrQg0K7ibOX7Qq6zWjfZEm7j4bH4"
        />
      )} */}
    </div>
  );
}

export default CreatePost;
