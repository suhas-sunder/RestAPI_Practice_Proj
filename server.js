const express = require("express");
const studentRoutes = require("./src/student/routes");

const app = express();
const port = 3000;

// A middleware to allow POST and GET JSON from endpoints
app.use(express.json());

// When someone goes to this route, send something back to the browser.
app.get("/", (req, res) => {
  // Send a response back
  res.send("Hello World!");
});

// Once the user goes to this path, a response will be sent based on the extension in the routes.js file
app.use("/api/v1/students", studentRoutes);

// Listen to port 3000
app.listen(port, () => console.log(`app listening on port ${port}`));
