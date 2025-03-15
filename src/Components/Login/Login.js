import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import LoginController from '../../Controllers/Login-controller/LoginController';
export const Login = () => {
  const navigate = useNavigate();
  const { handleSubmit, email, setEmail, password, setPassword, isLoading } = LoginController();
  const [errors, setErrors] = useState({ email: '', password: '' });
  const validate = () => {
    let isValid = true;
    const newErrors = { email: '', password: '' };
    // Email validation
    if (!email) {
      newErrors.email = 'Email is required.';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Invalid email format.';
      isValid = false;
    }
    // Password validation
    if (!password) {
      newErrors.password = 'Password is required.';
      isValid = false;
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters long.';
      isValid = false;
    }
    setErrors(newErrors);
    return isValid;
  };
  const onSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      handleSubmit(e); // Call your login handler
    }
  };
  return (
    <div className="login-page h-100 justify-content-center d-flex flex-column">
      <div className="container">
        <div className="login-outer d-flex flex-column justify-content-center">
          <div className="login-logo">
            <img className="img-fluid" title="Dashboard" src={require('../../assets/images/logo.png')} />
          </div>
          <div className="login-box-body">
            {/* <h2>Welcome to Tune</h2> */}
            <p className="login-box-msg">Login Your Account for More</p>
            <div className="login-form">
              <form id="dataform" onSubmit={onSubmit}>
                <div className="form-group has-feedback">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <span className="glyphicon glyphicon-envelope form-control-feedback"></span>
                  {errors.email &&
                    <p className="text-danger">{errors.email}</p>
                  }
                </div>
                <div className="form-group has-feedback">
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <span className="glyphicon glyphicon-lock form-control-feedback"></span>
                  {errors.password &&
                    <p className="text-danger">{errors.password}</p>
                  }
                </div>
                <div className="d-flex justify-content-between align-items-center">
                  <div className="col-xs-4">
                    {!isLoading ? (
                      <button className="btn btn-primary" type="Submit">
                        Sign In
                      </button>
                    ) : (
                      <button className="btn btn-primary" disabled>
                        Loading...
                      </button>
                    )}
                  </div>
                  <div>
                    <Link to="/forgetpassword" className="btn btn-primary">Forget Password</Link>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};