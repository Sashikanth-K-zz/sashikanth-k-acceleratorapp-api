const express = require("express");
const directoryRoute = require("./directory.route");
const config = require("../config/config");

const router = express.Router();

const defaultRoutes = [
  {
    path: "/directory",
    route: directoryRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;
