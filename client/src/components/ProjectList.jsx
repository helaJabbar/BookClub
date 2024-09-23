import React from "react";
import ProjectCard from "./ProjectCard";

function ProjectList({ projects, onStartProject, onCompleteProject, onRemoveProject }) {
  
  const isPastDue = (dueDate) => {
    return new Date(dueDate).setHours(0, 0, 0, 0) < new Date().setHours(0, 0, 0, 0);
  };

  return (
    <div className="project-list">
      {projects.map((project) => (
        <div key={project._id} className="project-card-wrapper">
          <ProjectCard
            project={{
              ...project,
             
              name: (
                <>
                  {project.status === "In Progress" && isPastDue(project.dueDate) && (
                    <span style={{ color: "red", fontWeight: "bold" }}>Past Due: </span>
                  )}
                  {project.name}
                </>
              ),
            }}
            onStart={onStartProject}
            onComplete={onCompleteProject}
            onDelete={onRemoveProject}
          />
        </div>
      ))}
    </div>
  );
}

export default ProjectList;
