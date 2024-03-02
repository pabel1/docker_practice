const express = require("express");

const musicRouter = require("../app/modules/music/music.route");

const router = express.Router();

const routes = [
  {
    path: "/music",
    route: musicRouter,
  },
];

routes.forEach((route) => router.use(route.path, route.route));

module.exports = router;
