import React, { useState, useEffect } from "react";
import "./Login.css";
import logo from "../../assets/logo.png";
import { login, signup } from "../../firebase";
import netflix_spinner from '../../assets/netflix_spinner.gif'
import { useNavigate } from "react-router-dom";
import { getUserSession } from "../../utils/session";

const Login = () => {
  const [signState, setsignState] = useState("Sign In");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const session = getUserSession();
    if (session) {
      navigate('/', { replace: true });
    }
  }, [navigate]);

  const user_auth = async (event) => {
    event.preventDefault();
    setLoading(true);
    let success = false;
    
    if (signState === "Sign In") {
        await login(email, password);
        success = getUserSession() !== null;
    } else {
        success = await signup(name, email, password);
    }
    
    setLoading(false);
    
    if (success) {
        navigate('/', { replace: true });
    } else {
        // Clear the form fields on failure
        if (signState === "Sign Up") {
            setName("");
            setEmail("");
            setPassword("");
        }
    }
  };

  return (loading?<div className="login-spinner">
    <img src={netflix_spinner} alt="" />
  </div>:
    <div className="login">
      <img src={logo} className="login-logo" alt="" />
      <div className="login-form">
        <h1>{signState}</h1>
        <form>
          {signState === "Sign Up" ? (
            <input
              value={name}
              onChange={(e) => {
                setName(e.target.value);

                e.target.value;
              }}
              type="text"
              placeholder="Your name"
            />
          ) : (
            <></>
          )}
          <input
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            type="email"
            placeholder="Email"
          />
          <input
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            type="password"
            placeholder="Password"
          />

          <button onClick={user_auth} type="submit">
            {signState}
          </button>

          <div className="form-help">
            <div className="remember">
              <input type="checkbox" name="" id="" />
              <label htmlFor="">Remember Me</label>
            </div>
            <p>Need Help?</p>
          </div>
        </form>
        <div className="form-switch">
          {signState === "Sign In" ? (
            <p>
              New to Netflix?
              <span
                onClick={() => {
                  setsignState("Sign Up");
                }}
              >
                Sign Up Now
              </span>
            </p>
          ) : (
            <p>
              Alraedy have account?
              <span
                onClick={() => {
                  setsignState("Sign In");
                }}
              >
                Sign in Now
              </span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
