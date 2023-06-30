import { Link } from "react-router-dom";
import Lottie from "lottie-react";
import signup from "./animation/signup.json";
import "./Signup.css";

export const Signup = () =>{
    return (
        <>
        <div className="signup-container">
        <Lottie
          className="signup-animation"
          animationData={signup}
          loop={true}
        />
        <form className="signup-form">
        <img
            className="login-image"
            src={require("./images/logo.png")}
            alt="hangout logo"
          />
          <h1 className="signup-form-heading">Sign up</h1>
          <input
            className="signup-form-input"
            type="text"
            required
            placeholder="First Name"
          />
          <input
            className="signup-form-input"
            type="text"
            required
            placeholder="Last Name"
          />
          <input
            className="signup-form-input"
            type="text"
            required
            placeholder="Username"
          />
          <input
            className="signup-form-input"
            type="password"
            required
            placeholder="Password"
          />
          <input
            className="signup-form-input"
            type="password"
            required
            placeholder="Confirm Password"
          />
          <label
            className="signup-show-password"
            htmlFor="signup_show_password"
          >
            <input id="signup_show_password" type="checkbox" />
            Show Password
          </label>
          <button className="signup-btn" type="submit">
            Create Account
          </button>
          <Link className="login-signup-link" to="/login">
            Already have an account?
          </Link>
        </form>
      </div>
        </>
    )
}