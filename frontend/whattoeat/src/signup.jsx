import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addUser } from './actions/userAction';
import './signup.css'; 

const SignUp = () => {
  const [newEmail, setNewEmail] = useState('');
  const [newUsername, setNewUsername] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Kirim data sign up ke backend menggunakan fungsi di userAction
      const userData = {
        email: newEmail,
        username: newUsername,
        password: newPassword
      };
      
      const response = await addUser(userData);

      if (response.success) {
        console.log('Sign up successful:', response.data);
        // Redirect ke halaman beranda setelah sign up berhasil
        alert("sign up success");
        navigate('/login');
      } else {
        setError('Failed to sign up');
        alert("Failed to sign up");
      }
    } catch (error) {
      console.error('server error:', error);
      setError('server error');
      alert("Server error");
    }
  };

  return (
    <div className="signup-container">
      <h1 className="page-title1">Welcome to</h1>
      <h1 className="page-title2">TASTY SPOT</h1>
      <form className="signup-form" onSubmit={handleSubmit}>
        <h2 className="signup-title">Sign Up</h2>
        <div className="input-group">
          <label htmlFor="newEmail">Email</label>
          <input
            type="email"
            id="newEmail"
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="newUsername">Username</label>
          <input
            type="text"
            id="newUsername"
            value={newUsername}
            onChange={(e) => setNewUsername(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="newPassword">Password</label>
          <input
            type="password"
            id="newPassword"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        </div>
        {error && <p className="error-message">{error}</p>}
        <button type="submit" className="signup-button">Submit</button>
      </form>
    </div>
  );
};

export default SignUp;
