import { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/Auth";
import "./Login.css";

export function Signup() {
  const emailRef = useRef();
  const passwordRef = useRef();

  // Get signUp function from the auth context
  const { signUp } = useAuth();

  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    // Get email and password input values
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    // Calls `signUp` function from the context
    const { error } = await signUp({ email, password });

    if (error) {
      alert("Error signing up");
    } else {
      // Redirect user to Dashboard
      alert("Kindly follow the instructions sent to your email. Thank you!");

      navigate("/");
    }
  }

  // @TODO: add sign up logic

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
        Signup Page
      </p>
      <form onSubmit={handleSubmit}>
        <label htmlFor="input-email">Email</label>
        <input id="input-email" type="email" ref={emailRef} />

        <label htmlFor="input-password">Password</label>
        <input
          id="input-password"
          type="password"
          ref={passwordRef}
          placeholder="minimum 6 characters"
        />

        <br />

        <button className="submitButton" type="submit">
          Sign up
        </button>
      </form>

      <p style={{ textAlign: "center" }}>
        Already have an account? <Link to="/login">Log In</Link>
      </p>
    </>
  );
}
