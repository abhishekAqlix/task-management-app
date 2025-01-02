import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";

function Login() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const response = await axios.post("http://localhost:4000/user/login", {
        email,
        password,
      }
      // ,{
      // headers: {
      //   Authorization: `Bearer ${response.data.token}`, 
      // }}
    );

      if (response.data.status === "success") {
        console.log("Login Successful:", response.data.message);

        const token = response.data.token; 
        localStorage.setItem("token", token); 
      
        navigate("/task");
      } else {
        setError(response.data.message || "Login failed.");
      }
    } catch (err) {
      console.log("Login Error:", err);
      setError("An error occurred during login. Please try again.");
    }
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      const res = await axios.post("http://localhost:4000/user/google-signin", {
        credential: credentialResponse.credential,
      });

      if (res.data.status === "success") {
        console.log("Google loggged Successfullyy:", res.data.message);
        localStorage.setItem("token", res.data.token);
        navigate("/task");
      } else {
        setError(res.data.message || "Google Sign-In failed.");
      }
    } catch (err) {
      console.log("Google Sign-In error:", err);
      setError("An error occurred during Google sign-In. Please try any other mehtod.");
    }
  };

  return (
    <GoogleOAuthProvider clientId="1035481739398-q8op22g2gepm54ugmvp1m4cpn1i46u35.apps.googleusercontent.com">
      <div className="d-flex justify-content-center bg-secondary vh-100 align-items-center">
        <div className="bg-white p-3 rounded w-25">
          <h2>Login</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="email">
                <strong>Email</strong>
              </label>
              <input
                type="email"
                placeholder="Enter Email"
                autoComplete="off"
              name="email"
                className="form-control rounded-0"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-3">
            <label htmlFor="email">
                <strong>Password</strong>
              </label>
              <input
                type="password"
                placeholder="Enter Password"
                autoComplete="off"
              name="password"
                className="form-control rounded-0"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          
            {error && <div className="alert alert-danger">{error}</div>}
          
            <button type="submit" className="btn btn-success w-100 rounded-0">
              Login
            </button>
          </form>
          <p>Create an Account</p>
          <Link
            to="/"
            className="btn btn-default border w-100 bg-light rounded-0 text-decoration-none"
          >
            Register
          </Link>
          <div className="mt-3">
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={() => {
                setError("Google Sign-In was unsuccessful. Try again later.");
              }}
            />
          </div>
        </div>
      </div>
    </GoogleOAuthProvider>
  );
}
export default Login;
