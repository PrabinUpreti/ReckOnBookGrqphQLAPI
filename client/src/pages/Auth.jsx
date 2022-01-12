import React from "react";
import "./Auth.css";

const Authpage = () => {
  return (
    <form className="auth-form">
      <div className="form-control">
        <label htmlFor="email">E-mail</label>
        <input type="email" id="email" />
      </div>
      <div className="form-control">
        <label htmlFor="password">Password</label>
        <input type="password" id="password" />
      </div>
      <div className="form-actions">
        <button type="submit">SignIn</button>
        <button type="button">Switch to SignUp</button>
      </div>
    </form>
  );
};

export default Authpage;
