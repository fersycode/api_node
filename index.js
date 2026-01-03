const express = require("express");
const cors = require("cors");
require("dotenv").config();
const v1Routes = require("./rutas/v1/index");
const errorHandler = require("./middleware/errorHandler");

const app = express();

const port = process.env.PORT || 3017;

// Middleware
app.use(cors());

app.use(express.json({ limit: "25mb" }));
app.use(express.urlencoded({ extended: true, limit: "25mb" }));

app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// Ruta raíz - información de la API
app.get("/", (_req, res) => {
  res.json({
    name: "BASE API",
    version: "1.0.0",
    description: "API para gestión de proyectos, etapas, proveedores, equipos y empleados",
    endpoints: {
      v1: "/api/v1"
    }
  });
});
// Montar rutas versionadas
app.use("/api/v1", v1Routes);
// 404 handler
app.use((req, res) => {
  res.status(404).json({ 
    success: false,
    error: "Ruta no encontrada",
    path: req.path
  });
});
// Error handler
app.use(errorHandler);
app.listen(port, "0.0.0.0", () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
  console.log(`API v1 disponible en http://localhost:${port}/api/v1`);
  console.log(`Entorno: ${process.env.NODE_ENV || 'development'}`);
});