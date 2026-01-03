const express = require("express");
const router = express.Router();
const etapasRoutes = require("./etapas.routes");
const proveedoresRoutes = require("./proveedores.routes");
const proyectosRoutes = require("./proyectos.routes");
const equiposRoutes = require("./equipos.routes");
const empleadosRoutes = require("./empleados.routes");
// Montar todas las rutas de la v1
router.use("/etapas", etapasRoutes);
router.use("/proveedores", proveedoresRoutes);
router.use("/proyectos", proyectosRoutes);
router.use("/equipos", equiposRoutes);
router.use("/empleados", empleadosRoutes);
// Ruta de información de la API v1
router.get("/", (req, res) => {
  res.json({
    version: "1.0.0",
    endpoints: [
      { path: "/api/v1/etapas", method: "GET", description: "Obtener etapas de proyectos" },
      { path: "/api/v1/proveedores", method: "GET", description: "Obtener proveedores" },
      { path: "/api/v1/proyectos", method: "GET", description: "Obtener proyectos" },
      { path: "/api/v1/equipos", method: "GET", description: "Obtener equipos" },
      { path: "/api/v1/empleados", method: "GET", description: "Obtener empleados" }
    ]
  });
});
module.exports = router;