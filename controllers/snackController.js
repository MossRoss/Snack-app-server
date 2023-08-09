const express = require("express");
const router = express.Router();

const {
  getAllSnacks,
  getSnackById,
  createSnack,
  deleteSnack,
  updateSnack,
} = require("../queries/snacks");

const {
  checkName,
  checkIfBoolean,
  validateURL,
} = require("../validations/checkSnack");

// ROUTE "/"

router
  .route("/")
  .get(async (req, res) => {
    const allSnacks = await getAllSnacks();

    if (!allSnacks) {
      res.status(500).json({ error: "Server error" });
    } else {
      res.json(allSnacks);
    }
  })
  .post(checkName, checkIfBoolean, validateURL, async (req, res) => {
    const { name } = req.body;
    const createdSnack = await createSnack(req.body);

    if (!name) {
      res.status(400).json({
        status: false,
        message: "You cannot create an empty snack",
      });
    } else {
      res.json({ status: true, data: createdSnack });
    }
  });

// ROUTE "/:id"
router
  .route("/:id")
  .get(async (req, res) => {
    const { id } = req.params;

    const snackById = await getSnackById(id);

    if (!snackById) {
      res.status(404).json({ message: "Id not found" });
    } else {
      res.json(snackById);
    }
  })

  .delete(async (req, res) => {
    const { id } = req.params;
    const deletedSnack = await deleteSnack(req.params.id);

    if (deletedSnack.length === 0) {
      res.status(404).json({ message: "Id not found!" });
    } else {
      res.json(deletedSnack[0]);
    }
  })

  .put(checkName, checkIfBoolean, validateURL, async (req, res) => {
    const { id } = req.params;
    const updatedSnack = await updateSnack(id, req.body);

    if (updatedSnack.length === 0) {
      res.status(404).json({ message: "Id not found!" });
    } else {
      res.json(updatedSnack);
    }
  });

module.exports = router;
