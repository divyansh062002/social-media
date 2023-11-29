export const getAllPostsService = async () => {
  try {
    const res = await fetch("/api/posts");
    return res;
  } catch (error) {
    console.error(error.message);
  }
};

export const createPostService = async (postForm, token) => {
  try {
    const res = await fetch("/api/posts", {
      method: "POST",
      body: JSON.stringify({
        postData: { ...postForm },
      }),
      headers: { authorization: token },
    });
    return res;
  } catch (error) {
    console.error(error.message);
  }
};

export const likePostService = async (postId, token) => {
  try {
    const res = await fetch(`/api/posts/like/${postId}`, {
      method: "POST",
      headers: { authorization: token },
    });
    return res;
  } catch (error) {
    console.error(error.message);
  }
};

export const dislikePostService = async (postId, token) => {
  try {
    const res = await fetch(`/api/posts/dislike/${postId}`, {
      method: "POST",
      headers: { authorization: token },
    });
    return res;
  } catch (error) {
    console.error(error.message);
  }
};

export const deletePostService = async (postId, token) => {
  try {
    const res = await fetch(`/api/posts/${postId}`, {
      method: "DELETE",
      headers: { authorization: token },
    });
    return res;
  } catch (error) {
    console.error(error.message);
  }
};

export const editPostService = async (postId, postForm, token) => {
  try {
    const res = await fetch(`/api/posts/edit/${postId}`, {
      method: "POST",
      body: JSON.stringify({
        postData: { ...postForm },
      }),
      headers: { authorization: token },
    });
    return res
  } catch (error) {
    console.error(error.message);
  }
};

export const getCommentsService = async(postId) => {
  try {
    const res = await fetch(`/api/comments/${postId}`)
    return res
  } catch (error) {
    console.error(error.message)
  }
}

export const addCommentsService = async(postId, commentData, token) => {
  try {
    const res = await fetch(`/api/comments/add/${postId}`, {
      method: "POST",
      body:JSON.stringify({
        commentData: {...commentData}
      }),
      headers: {authorization: token}
    })
    return res;
  } catch (error) {
    console.error(error.message);
  }
}