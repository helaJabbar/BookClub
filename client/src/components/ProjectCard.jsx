import React from "react";

function ProjectCard({ project, onStart, onComplete, onDelete }) {
  const handleStart = () => onStart(project._id);
  const handleComplete = () => onComplete(project._id);
  const handleDelete = () => onDelete(project._id);  

  return (
    <div className="project-card">
      <h3 style={{ textTransform: 'uppercase' }}>{project.name}</h3>
      <p>Due Date: {new Date(project.dueDate).toLocaleDateString()}</p>
      <p>Status: {project.status}</p>
      {project.status === "Backlog" && <button onClick={handleStart}>Start</button>}
      {project.status === "In Progress" && <button onClick={handleComplete}>Complete</button>}
      {project.status === "Completed" && <button onClick={handleDelete}>Delete</button>}
    </div>
  );
}

export default ProjectCard;
