export const sortPosts = (posts, sortBy) => {
  switch (sortBy) {
    case "trending":
      return [...posts].sort(
        (a, b) => a?.likes?.likeCount - b?.likes?.likeCount
      );

    case "latest":
      return [...posts].sort(
        (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
      );

    case "oldest":
      return [...posts].sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );

    default:
      return [...posts];
  }
};
