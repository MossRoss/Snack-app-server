const db = require("../db/dbConfig");

const getAllSnacks = async () => {
  try {
    const allSnacks = await db.any("SELECT * FROM snacks");
    return allSnacks;
  } catch (e) {
    console.log(e);
  }
};

const getSnackById = async (id) => {
  try {
    const getSnackById = await db.any(`SELECT * FROM snacks WHERE id = $1`, id);

    return getSnackById;
  } catch (e) {
    console.log(e);
  }
};

const createSnack = async (data) => {
  try {
    const newSnack = await db.one(
      `INSERT INTO snacks (name, fiber, protein, added_sugar, is_healthy, image_url)VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
      [
        data.name,
        data.fiber,
        data.protein,
        data.added_sugar,
        data.is_healthy,
        data.image_url,
      ]
    );

    return newSnack;
  } catch (e) {
    return e;
  }
};

const deleteSnack = async (id) => {
  try {
    const deletedSnack = await db.any(
      `DELETE FROM snacks WHERE id = $1 RETURNING *`,
      id
    );
    console.log(deletedSnack);
    return deletedSnack;
  } catch (e) {
    console.log(e);
  }
};

const updateSnack = async (id, snack) => {
  //   let { name, fiber, protein, added_sugar, is_healthy, image_url } = snack;
  try {
    const updatedSnack = await db.any(
      `UPDATE snacks SET name = $1, fiber = $2, protein = $3, added_sugar = $4, is_healthy = $5, image_url = $6 WHERE id = $7 RETURNING *`,
      [
        snack.name,
        snack.fiber,
        snack.protein,
        snack.added_sugar,
        snack.is_healthy,
        snack.image_url,
        id,
      ]
    );

    return updatedSnack;
  } catch (e) {
    console.log(e);
  }
};

module.exports = {
  getAllSnacks,
  getSnackById,
  createSnack,
  deleteSnack,
  updateSnack,
};
