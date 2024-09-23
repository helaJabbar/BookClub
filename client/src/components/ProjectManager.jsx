import React, { useEffect, useState } from "react";
import ProjectList from "./ProjectList";
import AddProjectForm from "./AddProjectForm";
import "./ProjectManager.css";

function ProjectManager() {
  const [projects, setProjects] = useState([]);

  const sortProjectsByDueDate = (projects) => {
    return projects.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
  };

  const fetchProjects = () => {
    fetch('http://localhost:8000/api/projects')
      .then(response => response.json())
      .then(data => {
        const sortedProjects = sortProjectsByDueDate(data);
        setProjects(sortedProjects);
      })
      .catch(error => console.error('Error:', error));
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleStartProject = (projectId) => {
    fetch(`http://localhost:8000/api/projects/${projectId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: "In Progress" })
    })
    .then(() => {
      fetchProjects();
    })
    .catch(error => console.error('Error:', error));
  };

  const handleCompleteProject = (projectId) => {
    fetch(`http://localhost:8000/api/projects/${projectId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: "Completed" })
    })
    .then(() => {
      fetchProjects();
    })
    .catch(error => console.error('Error:', error));
  };

  const handleRemoveProject = (projectId) => {
    fetch(`http://localhost:8000/api/projects/${projectId}`, {
      method: 'DELETE'
    })
    .then(() => {
      fetchProjects();
    })
    .catch(error => console.error('Error:', error));
  };

  const handleAddProject = (newProject) => {
    fetch('http://localhost:8000/api/projects', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newProject)
    })
    .then(() => {
      fetchProjects();
    })
    .catch(error => console.error('Error:', error));
  };

  const isPastDue = (dueDate) => {
    return new Date(dueDate) < new Date();
  };

  return (
    <div className="project-manager">
      <div className="column backlog">
        <h2 id="h2-backlog">Backlog</h2>
        <ProjectList
          projects={projects.filter(project => project.status === "Backlog")}
          onStartProject={handleStartProject}
        />
        <AddProjectForm onAddProject={handleAddProject} />
      </div>

      <div className="column in-progress">
        <h2 id="h2-inProgress">In Progress</h2>
        <ProjectList
          projects={projects.filter(project => project.status === "In Progress")}
          onCompleteProject={handleCompleteProject}
          renderExtraInfo={project => (
            isPastDue(project.dueDate) && <span style={{ color: 'red' }}> - Past Due</span>
          )}
        />
      </div>
      
      <div className="column completed">
        <h2 id="h2-completed">Completed</h2>
        <ProjectList
          projects={projects.filter(project => project.status === "Completed")}
          onRemoveProject={handleRemoveProject}
        />
      </div>
    </div>
  );
}

export default ProjectManager;
