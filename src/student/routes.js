const { Router } = require("express");
const controller = require("./controller");

const router = Router();

// If the route in server.js requests /api/v1/students then localhost:3000/api/v1/students will send this response
router.get("/", controller.getStudents);
router.get("/:id", controller.getStudentsById);
router.post("/", controller.addStudent);
router.put("/:id", controller.updateStudent); //Updates a student that already exists.
router.delete("/:id", controller.deleteStudent);

module.exports = router;
