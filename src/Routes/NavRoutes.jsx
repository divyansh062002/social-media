import React from "react";
import { Route, Routes } from "react-router-dom";
import RequiresAuth from "../components/RequiresAuth";
import Home from "../pages/Home/Home";
import Profile from "../pages/Profile/Profile";
import Login from "../pages/Login/Login";
import Signup from "../pages/Signup/Signup";
import Bookmarks from "../pages/Bookmarks/Bookmarks";
import Explore from "../pages/Explore/Explore";
import PostDetails from "../pages/PostDetails/PostDetails";

function NavRoutes() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <RequiresAuth>
            <Home />
          </RequiresAuth>
        }
      />
      <Route
        path="/profile/:username"
        element={
          <RequiresAuth>
            <Profile />
          </RequiresAuth>
        }
      />
      <Route
        path="/bookmarks"
        element={
          <RequiresAuth>
            <Bookmarks />
          </RequiresAuth>
        }
      />
      <Route
        path="/explore"
        element={
          <RequiresAuth>
            <Explore />
          </RequiresAuth>
        }
      />
      <Route
        path="post-details/:postId"
        element={
          <RequiresAuth>
            <PostDetails />
          </RequiresAuth>
        }
      />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
    </Routes>
  );
}

export default NavRoutes;
