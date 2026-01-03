const express = require('express');
const router = express.Router();
const { getProveedores } = require("../../controllers/base.controllers");
const { validatePagination, validateSearch } = require("../../validators");
// GET /api/v1/proveedores
router.get('/', validateSearch, async (req, res, next) => {
  try {
    const proveedores = await getProveedores(req);
    
    res.json({
      success: true,
      data: proveedores,
      count: proveedores.length
    });
  } catch (error) {
    next(error);
  }
});
module.exports = router;