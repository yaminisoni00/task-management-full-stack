import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/UserForm.css"; // Changed to use UserForm.css

export default function TaskForm() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "TODO",
    projectId: "",
    assignedTo: "",
  });

  const [projects, setProjects] = useState([]);
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/api/projects` || "http://localhost:5000/api/projects")
      .then((res) => setProjects(res.data.result.projects || []))
      .catch((err) => console.error("Error fetching projects:", err));

    axios.get(`${process.env.REACT_APP_API_URL}/api/users` || "http://localhost:5000/api/users")
      .then((res) => setUsers(res.data.users || []))
      .catch((err) => console.error("Error fetching users:", err));
  }, []);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/api/tasks/create` || "http://localhost:5000/api/tasks/create", formData);
      navigate("/tasks");
    } catch (err) {
      console.error("Error creating task:", err);
    }
  };

  return (
    <div className="create-container"> {/* Changed from create-task-container */}
      <form onSubmit={handleSubmit} className="create-form"> {/* Changed from create-task-form */}
        <h2>Create Task</h2> {/* Removed form-title class */}

        <div className="form-group">
          <label>Title</label>
          <input type="text" name="title" value={formData.title} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>Description</label>
          <input type="text" name="description" value={formData.description} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label>Status</label>
          <select name="status" value={formData.status} onChange={handleChange}>
            <option value="TODO">Todo</option>
            <option value="IN_PROGRESS">In Progress</option>
            <option value="DONE">Done</option>
          </select>
        </div>

        <div className="form-group">
          <label>Project</label>
          <select name="projectId" value={formData.projectId} onChange={handleChange} required>
            <option value="">Select Project</option>
            {projects.map((p: any) => (
              <option key={p._id} value={p._id}>{p.name}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Assigned To</label>
          <select name="assignedTo" value={formData.assignedTo} onChange={handleChange}>
            <option value="">Select User</option>
            {users.map((u: any) => (
              <option key={u._id} value={u._id}>{u.name}</option>
            ))}
          </select>
        </div>

        <button type="submit" className="submit-button">Create Task</button>
      </form>
    </div>
  );
}
