import { pool } from "../config/database.js";

const getCars = async (req, res) => {
  try {
    const results = await pool.query(
      "SELECT is_convertible AS isConvertible, * FROM cars ORDER BY id DESC",
    );
    res.status(200).json(results.rows);
  } catch (err) {
    res.status(409).json({ error: err.message });
  }
};

const getCar = async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    const results = await pool.query(
      "SELECT is_convertible AS isConvertible, * FROM cars WHERE id = $1",
      [id],
    );
    res.status(200).json(results.rows[0]);
  } catch (err) {
    res.status(409).json({ error: err.message });
  }
};

const createCar = async (req, res) => {
  try {
    const { name, price, isConvertible, roof, wheels, exterior, interior } =
      req.body;

    const results = await pool.query(
      "INSERT INTO cars (name, price, is_convertible, roof, wheels, exterior, interior) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *",
      [name, price, isConvertible, roof, wheels, exterior, interior],
    );
    res.status(201).json(results.rows[0]);
  } catch (err) {
    res.status(409).json({ error: err.message });
    console.error(err);
  }
};

const updateCar = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { name, price, isConvertible, roof, wheels, exterior, interior } =
      req.body;

    const results = await pool.query(
      "UPDATE cars SET name = $1, price = $2, is_convertible = $3, roof = $4, wheels = $5, exterior = $6, interior = $7 WHERE id = $8",
      [name, price, isConvertible, roof, wheels, exterior, interior, id],
    );
    res.status(200).json(results.rows[0]);
  } catch (err) {
    response.status(409).json({ error: err.message });
  }
};

const deleteCar = async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    const results = await pool.query("DELETE FROM cars WHERE id = $1", [id]);
    console.log(results);
    res.status(200).json(results.rows[0]);
  } catch (err) {
    res.status(409).json({ error: err.message });
  }
};

export default {
  createCar,
  getCars,
  getCar,
  updateCar,
  deleteCar,
};
