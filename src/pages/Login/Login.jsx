import React, { useContext, useState } from "react";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";

function Login() {
  const { handleUserLogin, loginError } = useContext(AuthContext);
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const { username, password } = formData;

  const handleSubmit = (event) => {
    event.preventDefault();
    handleUserLogin(username, password);
  };

  const navigateToSignup = () => {
    navigate("/signup");
  };

  const enterTestCredentialsAndLogin = () => {
    setFormData({
      username: "sunil_ballani",
      password: "sunil123",
    });
    handleUserLogin("sunil_ballani", "sunil123");
  };

  return (
    <div className="loginPage">
      <section className="loginVideoContainer">
        <video
          src="https://res.cloudinary.com/dp6uypw0c/video/upload/v1690784032/Untitled_video_-_Made_with_Clipchamp_ityvh3.mp4"
          autoPlay
          playbackRate={1.5}
          muted
          loop
          controls={false}
        />
      </section>
      <main className="loginForm">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
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
          {loginError && <p className="error">{loginError}</p>}
          <div className="buttonContainer">
            <button type="submit" className="loginBtn">
              Login
            </button>
            <button
              type="button"
              className="loginAsGuestBtn"
              onClick={enterTestCredentialsAndLogin}
            >
              Login as Guest
            </button>
          </div>
        </form>
        <p>
          Don't have an account? <span onClick={navigateToSignup}>Sign Up</span>
        </p>
      </main>
    </div>
  );
}

export default Login;
