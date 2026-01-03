const express = require('express');
const router = express.Router();
const { getProyectos } = require("../../controllers/base.controllers");
const { validateSearch } = require("../../validators");
// GET /api/v1/proyectos
router.get('/', validateSearch, async (req, res, next) => {
  try {
    const proyectos = await getProyectos(req);
    
    res.json({
      success: true,
      data: proyectos,
      count: proyectos.length
    });
  } catch (error) {
    next(error);
  }
});
module.exports = router;