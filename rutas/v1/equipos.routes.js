const express = require("express");
const router = express.Router();
const { getEquipos } = require("../../controllers/base.controllers");
const { validateSearch } = require("../../validators");
// GET /api/v1/equipos
router.get("/", validateSearch, async (req, res, next) => {
  try {
    const equipos = await getEquipos(req);
    
    res.json({
      success: true,
      data: equipos,
      count: equipos.length
    });
  } catch (error) {
    next(error);
  }
});
module.exports = router;