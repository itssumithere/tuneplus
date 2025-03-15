import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { postData } from '../../Services/Ops';
import { base } from '../../Constants/Data.constant';

export const ForgetPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [Otp, setOtp] = useState('');
  const [newpassword, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [step, setStep] = useState('email'); // email, otp, or password
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const validateEmail = () => {
    if (!email) {
      setError('Email is required.');
      return false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Invalid email format.');
      return false;
    }
    setError('');
    return true;
  };

  const validateOtp = () => {
    if (!Otp) {
      setError('OTP is required.');
      return false;
    } else if (Otp.length !== 6 || isNaN(Otp)) {
      setError('OTP must be a 6-digit number.');
      return false;
    }
    setError('');
    return true;
  };

  const validatePasswords = () => {
    if (!newpassword || !confirmPassword) {
      setError('Both password fields are required.');
      return false;
    } else if (newpassword !== confirmPassword) {
      setError('Passwords do not match.');
      return false;
    } else if (newpassword.length < 6) {
      setError('Password must be at least 6 characters.');
      return false;
    }
    setError('');
    return true;
  };

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    if (!validateEmail()) return;

    try {
      const body = { email };
      const result = await postData(base.forgetPassword, body);
      if (result.status) {
        setSuccessMessage(result.message);
        setStep('otp'); // Move to OTP verification step
      } else {
        setError(result.message || 'Failed to send OTP. Try again.');
      }
    } catch (error) {
      console.error('Error in forget password:', error);
      setError('An error occurred. Please try again.');
    }
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    if (!validateOtp()) return;

    try {
      const body = { email, Otp };
      const result = await postData(base.verifyOtp, body); // Endpoint for OTP verification
      if (result.status) {
        setSuccessMessage('OTP verified successfully. Proceed to set a new password.');
        setStep('password'); // Move to password reset step
      } else {
        setError(result.message || 'Invalid OTP. Try again.');
      }
    } catch (error) {
      console.error('Error in OTP verification:', error);
      setError('An error occurred. Please try again.');
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    if (!validatePasswords()) return;

    try {
      const body = { email, newpassword };
      const result = await postData(base.setPassword, body); // Endpoint for resetting the password
      if (result.status) {
        setSuccessMessage('Password reset successfully. Redirecting to login...');
        setTimeout(() => navigate('/'), 2000);
      } else {
        setError(result.message || 'Failed to reset password. Try again.');
      }
    } catch (error) {
      console.error('Error in password reset:', error);
      setError('An error occurred. Please try again.');
    }
  };

  return (
    <div className="forget-password-page h-100 justify-content-center d-flex flex-column">
      <div className="container">
        <div className="login-outer d-flex flex-column justify-content-center">
          <div className="login-logo">
            <img className="img-fluid" title="Dashboard" src={require('../../assets/images/logo.png')} />
          </div>
          <div className="login-box-body">
            {step === 'email' ? (
              <>
                <p className="login-box-msg">Set New Password</p>
                <div className="login-form">
                  <form onSubmit={handleEmailSubmit}>
                    <div className="form-group has-feedback">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                    <div className="d-flex justify-content-between align-items-center">
                      <div className="col-xs-4">
                        <button className="btn btn-primary" type="Submit">
                          Submit
                        </button>
                      </div>
                      <div>
                        <button className="btn btn-secondary" onClick={() => navigate('/')}>
                          Back to Login
                        </button>
                      </div>
                    </div>
                    {error && <p className="text-danger">{error}</p>}
                    {successMessage && <p className="text-success">{successMessage}</p>}
                  </form>
                </div>
              </>
            ) : step === 'otp' ? (
              <>
                <p className="login-box-msg">Verify OTP</p>
                <div className="login-form">
                  <form onSubmit={handleOtpSubmit}>
                    <div className="form-group has-feedback">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter the OTP"
                        value={Otp}
                        onChange={(e) => setOtp(e.target.value)}
                      />
                    </div>
                    <div className="row">
                      <div className="d-flex justify-content-between align-items-center">
                        <button className="btn btn-primary" type="Submit">
                          Verify OTP
                        </button>
                      </div>
                      <div>
                        <button className="btn btn-secondary" onClick={() => setStep('email')}>
                          Resend OTP
                        </button>
                      </div>
                    </div>
                    {error && <p className="text-danger">{error}</p>}
                    {successMessage && <p className="text-success">{successMessage}</p>}
                  </form>
                </div>
              </>
            ) : (
              <>
                <p className="login-box-msg">Set New Password</p>
                <div className="login-form">
                  <form onSubmit={handlePasswordSubmit}>
                    <div className="form-group has-feedback">
                      <input
                        type="password"
                        className="form-control"
                        placeholder="New Password"
                        value={newpassword}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>
                    <div className="form-group has-feedback">
                      <input
                        type="password"
                        className="form-control"
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                      />
                    </div>
                    <div className="row">
                      <div className="col-xs-4">
                        <button className="btn btn-primary" type="Submit">
                          Reset Password
                        </button>
                      </div>
                    </div>
                    {error && <p className="text-danger">{error}</p>}
                    {successMessage && <p className="text-success">{successMessage}</p>}
                  </form>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
