import { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useAuth } from "../contexts/Auth";

import "./Login.css";
import pic1 from "../picture1.png";
import pic2 from "../picture2.png";
import kitchen from "../kitchen.jpg";

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
    <body>
      <section id="banner">
        <header id="banner-text">
          <h2> Welcome to Axpyree.</h2>
          <p>Never let your foods expire again</p>
        </header>
      </section>
      <div id="features">
        <div id="feature-home-page">
          <h2> Reminder function</h2>
          <p>
            {" "}
            Check your home page for a quick summary of your expiring items.{" "}
          </p>
        </div>
        <div id="feature-inventory-page">
          <h2>A neat inventory list</h2>
          <p>Enter new items to your inventory list quickly and seamlessly.</p>
        </div>
      </div>

      <div className="loginDiv">
        <p
          style={{
            textAlign: "center",
            fontSize: "20px",
            margin: "0px",
            padding: "10px",
            fontFamily: "Gill Sans",
          }}
        >
          Login Now!
        </p>
        <form onSubmit={handleSubmit}>
          <label htmlFor="input-email"></label>
          <input
            placeholder="Enter Email here"
            id="input-email"
            type="email"
            ref={emailRef}
          />

          <label htmlFor="input-password"></label>
          <input
            placeholder="Enter Password here"
            id="input-password"
            type="password"
            ref={passwordRef}
          />

          <br />

          <button className="submitButton" type="submit">
            Login
          </button>
        </form>

        <p style={{ textAlign: "center" }}>
          Don't have an account? <Link to="/signup">Sign Up</Link>
        </p>
      </div>
      {/* <div className="title">
        <h1> </h1>
      </div>
      <div className="mainDiv">
        <div className="description">
          <div>
            {" "}
            <p
              style={{
                textAlign: "center",
                fontSize: "35px",
                fontWeight: "bolder",
                margin: "5px",
                padding: "5px",
                fontFamily: "Staatliches",
              }}
            >
              {" "}
              Welcome to Axpyree!
            </p>
            <p style={{ margin: "0px" }}> Never let your foods expire again!</p>
          </div>
          <div className="pictures">
            <div id="pic1">
              <img
                src={pic1}
                width="400"
                height="auto"
                alt="Axpyree Home Page"
              ></img>
            </div>
            <img
              src={pic2}
              width="400"
              height="auto"
              alt="Axpyree Inventory Page"
            ></img>
          </div>
        </div>
        <div className="loginDiv">
          <p
            style={{
              textAlign: "center",
              fontSize: "50px",
              margin: "5px",
              padding: "5px",
              fontFamily: "Gill Sans",
            }}
          ></p>
          <form onSubmit={handleSubmit}>
            <label htmlFor="input-email"></label>
            <input
              placeholder="Enter Email here"
              id="input-email"
              type="email"
              ref={emailRef}
            />

            <label htmlFor="input-password"></label>
            <input
              placeholder="Enter Password here"
              id="input-password"
              type="password"
              ref={passwordRef}
              
            />

            <br />

            <button className="submitButton" type="submit">
              Login
            </button>
          </form>

          <p style={{ textAlign: "center", fontFamily: "Staatliches" }}>
            Don't have an account? <Link to="/signup">Sign Up</Link>
          </p>
        </div>
      </div> */}
    </body>
  );
}
