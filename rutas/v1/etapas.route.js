const express = require('express');
const router = express.Router();
const getEtapas = require("../../controllers/etapas.controllers");
const { validateSearch } = require("../../validators");
// GET /api/v1/etapas
router.get('/', validateSearch, async (req, res, next) => {
  try {
    const etapas = await getEtapas(req);
    
    res.json({
      success: true,
      data: etapas,
      count: etapas.length
    });
  } catch (error) {
    next(error);
  }
});
module.exports = router;