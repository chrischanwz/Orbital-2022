import { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useAuth } from "../contexts/Auth";

import "./Login.css";

export function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();

  // Get signUp function from the auth context
  const { signIn } = useAuth();

  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    // Get email and password input values
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    // Calls `signIn` function from the context
    const { error } = await signIn({ email, password });

    if (error) {
      alert("error logging in");
    } else {
      // Redirect user to home

      navigate("/home");
    }
  }

  return (
    <>
      <p
        style={{
          textAlign: "center",
          fontSize: "50px",
          margin: "5px",
          padding: "5px",
          fontFamily: "Gill Sans",
        }}
      >
        Login Page
      </p>
      <form onSubmit={handleSubmit}>
        <label htmlFor="input-email">Email</label>
        <input id="input-email" type="email" ref={emailRef} />

        <label htmlFor="input-password">Password</label>
        <input id="input-password" type="password" ref={passwordRef} />

        <br />

        <button className="submitButton" type="submit">
          Login
        </button>
      </form>

      <p style={{ textAlign: "center" }}>
        Don't have an account? <Link to="/signup">Sign Up</Link>
      </p>
    </>
  );
}
