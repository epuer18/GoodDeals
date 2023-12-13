import React, { useContext, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../components/user/userContext";
import "../asset/style/LoginPage.css";

export function LoginPage() {
  const loginFormRef = useRef(null);
  const [message, setMessage] = useState("");
  const { login } = useContext(UserContext);
  const navigate = useNavigate();
  async function onSignIn(event) {
    event.preventDefault();
    const formData = new FormData(loginFormRef.current);

    const res = await fetch("/api/login/password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(Object.fromEntries(formData.entries())),
    });

    if (!res.ok) {
      const errorData = await res.json();
      setMessage("Sign in failed: Email or Password is not correct.");
      return;
    }

    const userData = await res.json();
    login(userData);
    setMessage("Sign in successful!");
    navigate("/");
  }

  return (
    <>
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-10">
            <h2>Please Sign In</h2>
            <div className="form-signin">
              <form ref={loginFormRef} onSubmit={onSignIn}>
                <label htmlFor="email">Email</label>
                <div className="form-group mb-3">
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    className="form-control"
                    id="floatingInput"
                    required
                  />
                </div>
                <label htmlFor="password">Password</label>
                <div className="form-group mb-3">
                  <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    className="form-control"
                    id="floatingPassword"
                    required
                  />
                </div>
                <div className="mb-2">
                  <button className="btn btn-secondary w-30 py-2" type="submit">
                    Sign In
                  </button>
                </div>
                {message && <div className="alert alert-info">{message}</div>}
              </form>
              <div className="signup">
                <p>Don't have an account?</p>
                <Link to="/signup" className="btn btn-secondary w-30 py-2">
                  Sign Up
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

LoginPage.propTypes = {};
