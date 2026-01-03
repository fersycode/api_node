const express = require("express");
const router = express.Router();
const { getEmpleados } = require("../../controllers/base.controllers");
const { validateSearch } = require("../../validators");
// GET /api/v1/empleados
router.get("/", validateSearch, async (req, res, next) => {
  try {
    const empleados = await getEmpleados(req);
    
    res.json({
      success: true,
      data: empleados,
      count: empleados.length
    });
  } catch (error) {
    next(error);
  }
});
module.exports = router;