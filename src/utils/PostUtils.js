import {
  createPostService,
  deletePostService,
  dislikePostService,
  editPostService,
  likePostService,
} from "../services/PostServices";

export const createPost = async (postForm, token, dataDispatch) => {
  try {
    const res = await createPostService(postForm, token);
    const resJson = await res.json();
    if (res.status === 201) {
      dataDispatch({ type: "setPosts", payload: resJson?.posts });
    }
  } catch (error) {
    console.error(error);
  }
};

export const likePost = async (postId, token, dataDispatch) => {
  try {
    const res = await likePostService(postId, token);
    const resJson = await res.json();
    if (res.status === 201) {
      dataDispatch({ type: "setPosts", payload: resJson?.posts });
    }
  } catch (error) {
    console.error(error.message);
  }
};

export const dislikePost = async (postId, token, dataDispatch) => {
  try {
    const res = await dislikePostService(postId, token);
    const resJson = await res.json();
    if (res.status === 201) {
      dataDispatch({ type: "setPosts", payload: resJson?.posts });
    }
  } catch (error) {
    console.error(error.message);
  }
};

export const deletePost = async (postId, token, dataDispatch) => {
  try {
    const res = await deletePostService(postId, token);
    const resJson = await res.json();
    if (res.status === 201) {
      dataDispatch({ type: "setPosts", payload: resJson?.posts });
    }
  } catch (error) {
    console.error(error.message);
  }
};

export const editPost = async (postId, postForm, token, dataDispatch) => {
  try {
    const res = await editPostService(postId, postForm, token);
    const resJson = await res.json();
    if (res.status === 201) {
      dataDispatch({ type: "setPosts", payload: resJson?.posts });
    }
  } catch (error) {
    console.error(error.message);
  }
};

export default function calculateTimePassed(dateString) {
  const date = new Date(dateString);
  const currentTime = new Date().getTime();

  const timeDifference = currentTime - date.getTime();
  const secondsPassed = Math.floor(timeDifference / 1000);

  if (secondsPassed < 60) {
    return `${secondsPassed} seconds`;
  }

  const minutesPassed = Math.floor(secondsPassed / 60);

  if (minutesPassed < 60) {
    return `${minutesPassed} minutes`;
  }

  const hoursPassed = Math.floor(minutesPassed / 60);

  if (hoursPassed < 24) {
    return `${hoursPassed} hours`;
  }

  const daysPassed = Math.floor(hoursPassed / 24);

  if (daysPassed < 30) {
    return `${daysPassed} days`;
  }

  const monthsPassed = Math.floor(daysPassed / 30);

  if (monthsPassed < 12) {
    return `${monthsPassed} months`;
  }

  const yearsPassed = Math.floor(monthsPassed / 12);
  const remainingMonths = monthsPassed % 12;

  if (remainingMonths === 0) {
    return `${yearsPassed} years`;
  }

  return `${yearsPassed} years and ${remainingMonths} months`;
}
