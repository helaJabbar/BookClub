import React, { useState } from "react";
import ProjectManager from "./ProjectManager";

const Main = () => {
  const [projects, setProjects] = useState([
    { name: "Take AWS Course", dueDate: "03/11/2020", status: "backlog" },
    { name: "Visit Milan", dueDate: "07/13/2020", status: "backlog" },
    { name: "Paint Fence", dueDate: "08/08/2020", status: "backlog" },
    { name: "Build Portfolio", dueDate: "02/22/2020", status: "in-progress" },
    { name: "Learn to fly", dueDate: "09/16/2020", status: "in-progress" },
    { name: "Python Project", dueDate: "03/01/2020", status: "completed" },
    { name: "Read LotR", dueDate: "04/19/2020", status: "completed" },
  ]);

  const handleStartProject = (index) => {
    const updatedProjects = [...projects];
    updatedProjects[index].status = "in-progress";
    setProjects(updatedProjects);
  };

  const handleCompleteProject = (index) => {
    const updatedProjects = [...projects];
    updatedProjects[index].status = "completed";
    setProjects(updatedProjects);
  };

  const handleRemoveProject = (index) => {
    const updatedProjects = [...projects];
    updatedProjects.splice(index, 1);
    setProjects(updatedProjects);
  };

  return (
    <div>
      <h1 style={{ textAlign: "center", margin: "0", padding: "20px" }}>Project Manager</h1>
      <ProjectManager
        projects={projects}
        onStartProject={handleStartProject}
        onCompleteProject={handleCompleteProject}
        onRemoveProject={handleRemoveProject}
      />
    </div>
  );
};

export default Main;
