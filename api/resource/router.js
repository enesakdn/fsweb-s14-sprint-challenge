const express = require("express");
const router = express.Router();
const resourceModel = require("./model");

router.get("/", async (req, res, next) => {
  try {
    const resources = await resourceModel.fetch();
    res.json(resources);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const newResource = await resourceModel.create(req.body);
    res.status(201).json(newResource);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
