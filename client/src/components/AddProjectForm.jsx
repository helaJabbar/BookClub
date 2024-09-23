import React from "react";
import { useNavigate } from "react-router-dom";
import "./AddProjectForm.css";

function AddProjectForm() {
  const navigate = useNavigate();

  const handleClick = (e) => {
    e.preventDefault();
    navigate('/new-project'); 
  };

  return (
    <form>
      <button type="submit" className="btn-add" onClick={handleClick}>
        Add New Project ➕
      </button>
    </form>
  );
}

export default AddProjectForm;
