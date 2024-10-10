const express = require("express");
const pool = require("../../../config/postgresql.config");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM movies'); // Adjust the table name as necessary
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});



module.exports = router;
