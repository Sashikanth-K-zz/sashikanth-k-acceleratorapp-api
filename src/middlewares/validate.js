const Joi = require("joi");
const httpStatus = require("http-status");
const pick = require("./pick");
const ApiError = require("./ApiError");

const validate = (schema) => (req, res, next) => {
  // get the passed params or query or body
  const validSchema = pick(schema, ["params", "query", "body"]);
  const object = pick(req, Object.keys(validSchema));

  // validate them using JOI
  const { value, error } = Joi.compile(validSchema)
    .prefs({ errors: { label: "key" } })
    .validate(object);

  // if error, report it
  if (error) {
    const errorMessage = error.details
      .map((details) => details.message)
      .join(", ");
    return next(new ApiError(httpStatus.BAD_REQUEST, errorMessage));
  }

  // else pass on to next handler
  Object.assign(req, value);
  return next();
};

module.exports = validate;
