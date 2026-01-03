const Joi = require('joi');
const schemas = {
  // Schema para validar IDs en params
  id: Joi.object({
    id: Joi.number().integer().positive().required()
  }),
  // Schema para validar Company_Code y Job_Number
  proyectoParams: Joi.object({
    companyCode: Joi.string().max(10).required(),
    jobNumber: Joi.string().max(20).required()
  }),
  // Schema para query params de paginación
  pagination: Joi.object({
    page: Joi.number().integer().min(1).default(1),
    limit: Joi.number().integer().min(1).max(100).default(10)
  }),
  // Schema para filtros de búsqueda
  searchQuery: Joi.object({
    search: Joi.string().max(100).optional(),
    orderBy: Joi.string().valid('asc', 'desc').default('asc')
  })
};
module.exports = schemas;