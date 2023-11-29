import {
  addBookmarkService,
  editUserService,
  followUserService,
  getBookmarksService,
  getUserService,
  removeBookmarkService,
  unfollowUserService,
} from "../services/UserServices";

export const getBookmarks = async (token, dataDispatch) => {
  try {
    const res = getBookmarksService(token);
    const resJson = await res.json();
    if (res.status === 200) {
      dataDispatch({ type: "setBookmarks", payload: resJson?.bookmarks });
    }
  } catch (error) {
    console.error(error.message);
  }
};

export const addBookmark = async (_id, token, dataDispatch) => {
  try {
    const res = await addBookmarkService(_id, token);
    const resJson = await res.json();
    if (res.status === 200) {
      dataDispatch({ type: "setBookmarks", payload: resJson?.bookmarks });
    }
  } catch (error) {
    console.error(error.message);
  }
};

export const removeBookmark = async (_id, token, dataDispatch) => {
  try {
    const res = await removeBookmarkService(_id, token);
    const resJson = await res.json();
    if (res.status === 200) {
      dataDispatch({ type: "setBookmarks", payload: resJson?.bookmarks });
    }
  } catch (error) {
    console.error(error.message);
  }
};

export const followUser = async (userId, token, authDispatch) => {
  try {
    const res = await followUserService(userId, token);
    const resJson = await res.json();
    if (res.status === 200) {
      authDispatch({ type: "setUser", payload: resJson?.user });
    }
  } catch (error) {
    console.error(error.message);
  }
};

export const unfollowUser = async (userId, token, authDispatch) => {
  try {
    const res = await unfollowUserService(userId, token);
    const resJson = await res.json();
    if (res.status === 200) {
      authDispatch({ type: "setUser", payload: resJson?.user });
    }
  } catch (error) {
    console.error(error.message);
  }
};

export const getUserInfo = async (userId, dataDispatch) => {
  try {
    const res = await getUserService(userId);
    const resJson = await res.json();
    if (res.status === 200) {
      dataDispatch({ type: "setUserProfile", payload: resJson?.user });
    }
  } catch (error) {
    console.error(error.message);
  }
};

export const editUser = async (
  token,
  userProfile,
  dataDispatch,
  authDispatch,
  remainingUsers
) => {
  try {
    const res = await editUserService(token, userProfile);
    const resJson = await res.json();
    const finalData = [...remainingUsers, resJson?.user];
    dataDispatch({
      type: "setUsers",
      payload: finalData,
    });
  } catch (error) {
    console.error(error.message);
  }
};

export function convertDateFormat(inputDate) {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const dateParts = inputDate.split("T");
  const dateString = dateParts[0];
  const timeString = dateParts[1].split("+")[0];

  const [year, month, day] = dateString.split("-");
  const [hour, minute, second] = timeString.split(":");

  const newDate = new Date(year, month - 1, day, hour, minute, second);
  const formattedDate = `${
    months[newDate.getMonth()]
  } ${newDate.getDate()}, ${newDate.getFullYear()}`;

  return formattedDate;
}
