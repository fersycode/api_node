const schemas = require('./schemas');
// Función genérica de validación
function validate(schema, property = 'body') {
  return (req, res, next) => {
    const { error, value } = schema.validate(req[property], {
      abortEarly: false, // Muestra todos los errores
      stripUnknown: true // Elimina propiedades no definidas en el schema
    });
    if (error) {
      const errors = error.details.map(detail => ({
        field: detail.path.join('.'),
        message: detail.message
      }));
      return res.status(400).json({
        error: 'Error de validación',
        details: errors
      });
    }
    // Reemplaza req[property] con los valores validados y sanitizados
    req[property] = value;
    next();
  };
}
// Validadores específicos
const validateId = validate(schemas.id, 'params');
const validateProyectoParams = validate(schemas.proyectoParams, 'params');
const validatePagination = validate(schemas.pagination, 'query');
const validateSearch = validate(schemas.searchQuery, 'query');
module.exports = {
  validate,
  validateId,
  validateProyectoParams,
  validatePagination,
  validateSearch,
  schemas
};