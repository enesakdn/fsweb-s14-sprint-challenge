const express = require("express");
const router = express.Router();
const projectModel = require("./model");

router.get("/", async (req, res, next) => {
  try {
    const projects = await projectModel.fetch();
    res.json(projects);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const newProject = await projectModel.create(req.body);
    res.status(201).json(newProject);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
