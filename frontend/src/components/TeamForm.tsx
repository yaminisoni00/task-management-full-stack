// src/components/TeamForm.tsx
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/UserForm.css';

interface User {
  _id: string;
  name: string;
  email: string;
}

export default function TeamForm() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [members, setMembers] = useState<string[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:5000/api/users')
      .then((res) => {
        setUsers(res.data.users || []);
      })
      .catch((err) => {
        console.error('Error fetching users:', err);
      });
  }, []);

  const handleAddMember = (userId: string) => {
    if (userId && !members.includes(userId)) {
      setMembers([...members, userId]);
      setSelectedUser('');
    }
  };

  const handleRemoveMember = (userId: string) => {
    setMembers(members.filter(id => id !== userId));
  };

  const getSelectedMemberNames = () => {
    return members.map(memberId => {
      const user = users.find(u => u._id === memberId);
      return user ? `${user.name} (${user.email})` : '';
    }).filter(Boolean);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/teams/create', {
        name,
        description,
        members,
      });
      setMessage('Team created successfully');
      setTimeout(() => navigate('/teams'), 500);
    } catch (error) {
      console.error('Error creating team:', error);
      setMessage('Failed to create team');
    }
  };

  return (
    <div className="create-container">
      <form onSubmit={handleSubmit} className="create-form">
        <h2>Create Team</h2>
        <div className="form-group">
          <label>Team Name:</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Description:</label>
          <input
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Add Members:</label>
          <select
            value={selectedUser}
            onChange={(e) => {
              setSelectedUser(e.target.value);
              handleAddMember(e.target.value);
            }}
          >
            <option value="">Select a user to add</option>
            {users
              .filter(user => !members.includes(user._id))
              .map((user) => (
                <option key={user._id} value={user._id}>
                  {user.name} ({user.email})
                </option>
              ))}
          </select>
        </div>
        
        {members.length > 0 && (
          <div className="form-group">
            <label>Selected Members:</label>
            <div style={{ 
              border: '1px solid #ccc', 
              borderRadius: '5px', 
              padding: '10px',
              backgroundColor: '#f9f9f9',
              maxHeight: '150px',
              overflowY: 'auto'
            }}>
              {getSelectedMemberNames().map((memberName, index) => (
                <div 
                  key={members[index]} 
                  style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center',
                    padding: '5px 0',
                    borderBottom: index < members.length - 1 ? '1px solid #eee' : 'none'
                  }}
                >
                  <span>{memberName}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveMember(members[index])}
                    style={{
                      backgroundColor: '#ff5722',
                      color: 'white',
                      border: 'none',
                      borderRadius: '3px',
                      padding: '2px 8px',
                      cursor: 'pointer',
                      fontSize: '12px'
                    }}
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        <button type="submit" className="submit-button">
          Create Team
        </button>
        {message && <p className="message-text">{message}</p>}
      </form>
    </div>
  );
}