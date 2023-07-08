import Lottie from "lottie-react";
import { Link } from "react-router-dom";
import login from "../animation/login.json";
import "./Login.css";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export const Login = () => {
  const { loginHandler } = useContext(AuthContext);
  return (
    <>
      <div className="login-container">
        <Lottie animationData={login} loop={true} className="login-animation" />
        <form
          className="login-form"
          onSubmit={(e) =>
            loginHandler(
              e,
              e.target.elements.login_username.value,
              e.target.elements.login_password.value
            )
          }
        >
          <img
            className="login-image"
            src={require("../images/logo.png")}
            alt="hangout logo"
          />
          <h1 className="login-form-heading">Login</h1>

          <input
            className="login-input"
            id="login_username"
            placeholder="Username"
            type="text"
            required
          />

          <input
            className="login-input"
            id="login_password"
            placeholder="password"
            type="password"
            required
          />

          <label htmlFor="show_password" className="login-show-password">
            <input type="checkbox" id="show_password" />
            Show Password
          </label>
          <button className="login-btn" type="submit">
            Login
          </button>
          <button
            className="login-btn"
            onClick={(e) => loginHandler(e, "test", "123")}
          >
            Login using test credentials
          </button>
          <Link className="login-signup-link" to="/signup">
            Don't have an account? Signup
          </Link>
        </form>
      </div>
    </>
  );
};