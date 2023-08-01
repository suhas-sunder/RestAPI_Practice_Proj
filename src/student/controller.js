const pool = require("../../db");
const queries = require("./queries");

const getStudents = (req, res) => {
  pool.query(queries.getStudents, (error, results) => {
    if (error) throw error;
    // If response is ok return results
    res.status(200).json(results.rows);
  });
};

const getStudentsById = (req, res) => {
  // Get the id paramater we established in routs.js as "/:id"
  const id = parseInt(req.params.id);
  // Use the id to query the database
  pool.query(queries.getStudentById, [id], (error, results) => {
    if (error) throw error;
    // If response is ok return results
    res.status(200).json(results.rows);
  });
};

const addStudent = (req, res) => {
  const { name, email, age, dob } = req.body;

  // Check if email exists
  pool.query(queries.checkEmailExists, [email], (error, results) => {
    // Only runs if condition is truthy
    if (results.rows.length) {
      res.send("Email already exists.");
    }

    pool.query(
      queries.addStudent,
      [name, email, age, dob],
      (error, results) => {
        if (error) throw error;
        res.status(201).send("Student created successfully!");
      }
    );
  });
};

const deleteStudent = (req, res) => {
  const id = parseInt(req.params.id);

  pool.query(queries.getStudentById, [id], (error, results) => {
    // If length of results are 0 (falsy), no student found
    const noStudentFound = !results.rows.length;
    if (noStudentFound) res.send("Student does not exist in the database!");

    pool.query(queries.deleteStudent, [id], (error, results) => {
      if (error) throw error;

      res.status(200).send("Students removed successfully!");
    });
  });
};

const updateStudent = (req, res) => {
  const id = parseInt(req.params.id);
  const { name } = req.body;

  pool.query(queries.getStudentById, [id], (error, results) => {
    const noStudentFound = !results.rows.length;
    if (noStudentFound) {
      res.send("Student does not exist in the database");
    }

    pool.query(queries.updateStudent, [name, id], (error, results) => {
      if (error) throw error;

      res.status(200).send("Student updated successfully");
    });
  });
};

module.exports = {
  getStudents,
  getStudentsById,
  addStudent,
  deleteStudent,
  updateStudent,
};
