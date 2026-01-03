# BASE API
API REST versionada para gestión de proyectos, etapas, proveedores, equipos y empleados.
## Tecnologías
- Node.js
- Express.js
- MSSQL
- Joi (validación)
## Instalación
```bash
npm install
```
## Configuración
Crear archivo `.env` basado en `.env.example`:
```env
SQL_USER=test_usuario
SQL_PASSWORD=test_contraseña
SQL_SERVER=test_servidor
SQL_DATABASE=test_base_datos
PORT=3017
NODE_ENV=development
```
## Ejecución
```bash
# Desarrollo
npm run dev
# Producción
npm start
```
## Versionado de API
La API utiliza versionado en la URL. Versión actual: **v1**
Base URL: `http://localhost:3017/api/v1`
## Endpoints v1
Todos los endpoints retornan respuestas en formato:
```json
{
  "success": true,
  "data": [...],
  "count": 10
}
```
### GET /api/v1/etapas
Obtiene las etapas de todos los proyectos activos.
**Query params opcionales:**
- `search` - Buscar en descripción (string, max 100 chars)
- `orderBy` - Orden: `asc` o `desc` (default: `asc`)
**Response:**
```json
{
  "success": true,
  "data": [
    {
      "Company_Code": "001",
      "Job_Number": "12345",
      "Phase_Code": 1,
      "Cost_Type": "LAB",
      "Description": "Fase inicial"
    }
  ],
  "count": 1
}
```
### GET /api/v1/proveedores
Obtiene todos los proveedores.
**Query params opcionales:**
- `search` - Filtro de búsqueda
- `orderBy` - Orden: `asc` o `desc`
### GET /api/v1/proyectos
Obtiene todos los proyectos.
### GET /api/v1/equipos
Obtiene todos los equipos.
### GET /api/v1/empleados
Obtiene todos los empleados.
## Validación
La API valida automáticamente:
- Query parameters (búsqueda, paginación, orden)
- Tipos de datos
- Longitud de strings
- Valores permitidos
Ejemplo de error de validación:
```json
{
  "error": "Error de validación",
  "details": [
    {
      "field": "search",
      "message": "\"search\" length must be less than or equal to 100 characters long"
    }
  ]
}
```
## Estructura del proyecto
```
├── controllers/
│   ├── base.controllers.js
│   └── etapas.controllers.js
├── database/
│   └── sqlserver-config.js
├── middleware/
│   └── errorHandler.js
├── rutas/
│   └── v1/
│       ├── index.js
│       ├── etapas.routes.js
│       ├── proveedores.routes.js
│       ├── proyectos.routes.js
│       ├── equipos.routes.js
│       └── empleados.routes.js
├── validators/
│   ├── index.js
│   └── schemas.js
├── .env
├── .env.example
├── index.js
└── package.json
```
## Seguridad
- Parámetros preparados para prevenir SQL injection
- Validación de entrada con Joi
- No expone información sensible en errores de producción
- Sanitización automática de datos
## Características
- API versionada (v1)
- Validación de datos
- Manejo centralizado de errores
- Logging de requests
- CORS configurado
- Respuestas estandarizadas
## Mejoras pendientes
- Implementar autenticación JWT
- Agregar rate limiting
- Agregar tests unitarios e integración
- Documentación con Swagger/OpenAPI
- Paginación real en base de datos
- Caché con Redis
- Monitoreo con Winston/Morgan
