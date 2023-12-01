const router = require("express").Router();

// import all api route files here
const apiRoutes = require("./api");

// import all html route files here
// const userHtmlRoutes = require(".html/user.html.routes");

// add api routes to the router
router.use("/api", apiRoutes);

// If error
router.use((req, res) => {
  res.status(400).send("Error,wrong route.");
});

// add HTML routes to the router
// router.use("/user", userHTMLRoutes);

module.exports = router;  