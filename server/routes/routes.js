const express = require("express");
const router = express.Router();
const projectController = require("../controllers/controllerProject");
const userController = require("../controllers/controllerUser");

router.get("/projects", projectController.getAllProjects);
router.post("/projects", projectController.createProject);
router.get("/projects/:id", projectController.getProjectById);
router.put("/projects/:id", projectController.updateProject);
router.delete("/projects/:id", projectController.deleteProject);

router.post("/users", userController.createUser); 
router.post("/users/verify", userController.verifyUser); 

module.exports = router;
