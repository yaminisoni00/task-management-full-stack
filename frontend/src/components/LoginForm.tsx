import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/UserForm.css'; // Changed to use UserForm.css

export default function Login() {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState<string | null>(null); // Added message state
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:5000/api/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ identifier, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      localStorage.setItem('user', JSON.stringify(data.user));
      setMessage('Login successful!');
      setTimeout(() => navigate('/user-list'), 500);
    } catch (err: any) {
      setMessage(err.message || 'Login failed');
    }
  };

  useEffect(() => {
    document.body.classList.add('login-page');

    return () => {
      document.body.classList.remove('login-page');
    };
  }, []);

  return (
    <div className="create-container"> {/* Changed from login-container */}
      <form className="create-form" onSubmit={handleLogin}> {/* Changed from login-box and login-form */}
        <h2>Login Form</h2> {/* Removed login-title class */}
        
        <div className="form-group"> {/* Added form-group wrapper */}
          <label>Email or Phone</label>
          <input
            type="text"
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
            required
          />
        </div>

        <div className="form-group"> {/* Added form-group wrapper */}
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="submit-button">LOGIN</button> {/* Changed from login-btn */}
        {message && <p className="message-text">{message}</p>} {/* Added message display */}
      </form>
    </div>
  );
}