const httpStatus = require("http-status");
const pick = require("../middlewares/pick");
const ApiError = require("../middlewares/ApiError");
const { directoryService } = require("../services");

const path = require("path");

const fs = require("fs/promises");

const validatePaths = async (directoryPath) => {
  directoryPath = path.normalize(directoryPath);

  if (!path.isAbsolute(directoryPath)) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Not an absolute path.");
  }

  try {
    await fs.access(directoryPath);
  } catch (error) {
    throw new ApiError(httpStatus.BAD_REQUEST, "No such file or directory");
  }

  if (!(await fs.lstat(directoryPath)).isDirectory()) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      "Provided path is not to a directory."
    );
  }
};

const getDirectoryLists = async (req, res, next) => {
  try {
    const filter = pick(req.query, ["directoryPath"]);
    const options = pick(req.query, ["sortBy", "limit", "page"]);

    await validatePaths(filter.directoryPath);

    const result = await directoryService.getDirectoryLists(filter, options);

    res.json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getDirectoryLists,
};
