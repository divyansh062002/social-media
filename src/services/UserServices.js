export const getAllUsersService = async () => {
  try {
    const res = await fetch("/api/users");
    return res;
  } catch (error) {
    console.error(error.message);
  }
};

export const getBookmarksService = async (token) => {
  try {
    const res = await fetch("/api/users/bookmark/", {
      headers: { authorization: token },
    });
    return res;
  } catch (error) {
    console.error(error.message);
  }
};

export const addBookmarkService = async (_id, token) => {
  try {
    const res = await fetch(`/api/users/bookmark/${_id}`, {
      method: "POST",
      headers: { authorization: token },
    });
    return res;
  } catch (error) {
    console.error(error.message);
  }
};

export const removeBookmarkService = async (_id, token) => {
  try {
    const res = await fetch(`/api/users/remove-bookmark/${_id}`, {
      method: "POST",
      headers: { authorization: token },
    });
    return res;
  } catch (error) {
    console.error(error.message);
  }
};

export const followUserService = async (userId, token) => {
  try {
    const res = await fetch(`/api/users/follow/${userId}`, {
      method: "POST",
      headers: { authorization: token },
      body: {},
    });
    return res;
  } catch (error) {
    console.error(error.message);
  }
};

export const unfollowUserService = async (userId, token) => {
  try {
    const res = await fetch(`/api/users/unfollow/${userId}`, {
      method: "POST",
      headers: { authorization: token },
      body: {},
    });
    return res;
  } catch (error) {
    console.error(error.message);
  }
};

export const getUserService = async (userId) => {
  try {
    const res = await fetch(`/api/users/${userId}`);
    return res;
  } catch (error) {
    console.error(error.message);
  }
};

export const editUserService = async (token, data) => {
  try {
    const res = await fetch(`/api/users/edit`, {
      method: "POST",
      headers: {
        authorization: token,
      },
      body: JSON.stringify({
        userData: data,
      }),
    });
    return res;
  } catch (error) {
    console.error(error.message);
  }
};
