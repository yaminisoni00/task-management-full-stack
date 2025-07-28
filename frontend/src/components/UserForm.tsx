// src/pages/UserForm.tsx
import { useState } from 'react';
import axios from '../api/axiosInstance';
import '../styles/UserForm.css';

export default function UserForm() {
  const [formData, setFormData] = useState({ name: '', email: '', role: '', password: '' });
  const [message, setMessage] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/users.create` || '/users/create', formData);
      setMessage(res.data.message || 'User created successfully');
      setFormData({ name: '', email: '', role: '', password: '' });
    } catch (err: any) {
      setMessage(err.response?.data?.message || 'Failed to create user');
    }
  };

  return (
    <div className="create-container">
      <form onSubmit={handleSubmit} className="create-form">
        <h2>Create User</h2>

        <div className="form-group">
          <label>Name</label>
          <input name="name" value={formData.name} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>Email</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>Password</label>
          <input type="password" name="password" value={formData.password} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>Role</label>
          <select name="role" value={formData.role} onChange={handleChange} required>
            <option value="">Select Role</option>
            <option value="ADMIN">ADMIN</option>
            <option value="MANAGER">MANAGER</option>
            <option value="MEMBER">MEMBER</option>
          </select>
        </div>

        <button type="submit" className="submit-button">Create User</button>
        {message && <p className="message-text">{message}</p>}
      </form>
    </div>
  );
}
