import React, { useContext, useState } from "react";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";

function Signup() {
  const { signupError, setSignupError, handleUserSignup } =
    useContext(AuthContext);
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
    profileAvatar:
      "https://res.cloudinary.com/dp6uypw0c/image/upload/v1692093871/default-profile-pic_udl3w4.jpg",
  });

  const { firstName, lastName, email, username, password, confirmPassword } =
    formData;

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
    if (e.target.id === "confirmPassword" && e.target.value === password) {
      setSignupError("");
    }
  };

  const navigateToSignIn = () => {
    navigate("/login");
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    handleUserSignup(formData);
  };

  return (
    <div className="signupPage">
      <section className="signupVideoContainer">
        <video
          src="https://res.cloudinary.com/dp6uypw0c/video/upload/v1690784032/Untitled_video_-_Made_with_Clipchamp_ityvh3.mp4"
          autoPlay
          playbackRate={1.5}
          muted
          loop
          controls={false}
        />
      </section>
      <main className="signupForm">
        <h2>Signup</h2>
        <form onSubmit={handleSubmit}>
          <div className="firstnameInputDiv">
            <input
              type="text"
              className="nameInput"
              id="firstName"
              value={firstName}
              onChange={onChange}
              placeholder="Enter Firstname"
              required
            />
          </div>

          <div className="lastnameInputDiv">
            <input
              type="text"
              className="nameInput"
              id="lastName"
              value={lastName}
              onChange={onChange}
              placeholder="Enter Lastname"
              required
            />
          </div>

          <div className="emailInputDiv">
            <input
              type="email"
              className="emailInput"
              id="email"
              value={email}
              onChange={onChange}
              placeholder="Enter Email"
              required
            />
          </div>

          <div className="usernameInputDiv">
            <input
              type="text"
              className="usernameInput"
              value={username}
              onChange={onChange}
              id="username"
              placeholder="Enter Username"
              required
            />
          </div>

          <div className="passwordInputOuterDiv">
            <div className="passwordInputDiv">
              <input
                type={showPassword ? "text" : "password"}
                className="passwordInput"
                value={password}
                onChange={onChange}
                id="password"
                placeholder="Enter Password"
                minLength={8}
                required
              />
              {!showPassword ? (
                <MdVisibilityOff
                  size={25}
                  className="showPassword"
                  onClick={() => setShowPassword((prevState) => !prevState)}
                />
              ) : (
                <MdVisibility
                  size={25}
                  className="showPassword"
                  onClick={() => setShowPassword((prevState) => !prevState)}
                />
              )}
            </div>
          </div>

          <div className="confirmPasswordInputOuterDiv">
            <div className="passwordInputDiv">
              <input
                type={showConfirmPassword ? "text" : "password"}
                className="passwordInput"
                value={confirmPassword}
                onChange={onChange}
                placeholder="Confirm Password"
                id="confirmPassword"
                minLength={8}
                required
              />
              {!showConfirmPassword ? (
                <MdVisibilityOff
                  size={25}
                  className="showPassword"
                  onClick={() =>
                    setShowConfirmPassword((prevState) => !prevState)
                  }
                />
              ) : (
                <MdVisibility
                  size={25}
                  className="showPassword"
                  onClick={() =>
                    setShowConfirmPassword((prevState) => !prevState)
                  }
                />
              )}
            </div>
          </div>
          {signupError !== "" && <p className="error">{signupError}</p>}
          <button type="submit">Sign up</button>
        </form>
        <p>
          Already have an account? <span onClick={navigateToSignIn}>Login</span>
        </p>
      </main>
    </div>
  );
}

export default Signup;
