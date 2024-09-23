import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./NewProject.css"; 

function NewProject() {
  const [projectName, setProjectName] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [errors, setErrors] = useState({}); 
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};

    // Validation
    if (projectName.length < 3) {
      newErrors.projectName = "Project name must be at least 3 characters long";
    }
    if (!dueDate) {
      newErrors.dueDate = "Due date is required";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      await axios.post("http://localhost:8000/api/projects", {
        name: projectName,
        dueDate: dueDate,
        status: "backlog", 
      });
   
      navigate('/');
    } catch (error) {
      console.error("Error adding project:", error);
    }
  };

  return (
    <div className="new-project">
      <button onClick={() => navigate('/')} className="btn-back">
        Back to Dashboard
      </button>

      <fieldset className="project-form">
        <legend>Plan a New Project</legend>

        <form onSubmit={handleSubmit}>
          <label htmlFor="project">
            Project:
            <input
              type="text"
              id="project"
              name="project"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              required
            />
            {errors.projectName && <p className="error-message">{errors.projectName}</p>}
          </label>

          <label htmlFor="due-date">
            Due Date:
            <input
              type="date"
              id="due-date"
              name="due-date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              required
            />
            {errors.dueDate && <p className="error-message">{errors.dueDate}</p>}
          </label>

          <button type="submit" className="btn-plan">
            Plan Project
          </button>
        </form>
      </fieldset>
    </div>
  );
}

export default NewProject;
