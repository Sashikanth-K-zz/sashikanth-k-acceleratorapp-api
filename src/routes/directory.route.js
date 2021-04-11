const express = require("express");
const validate = require("../middlewares/validate");
const Joi = require("joi");

const { directoryController } = require("../controllers");

const router = express.Router();

const queryPath = {
  query: Joi.object().keys({
    directoryPath: Joi.string().required(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

router
  .route("/")
  .get(validate(queryPath), directoryController.getDirectoryLists);

module.exports = router;
