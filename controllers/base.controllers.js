const { connectSQLDatabase, queryDatabase } = require('../database/sqlserver-config');
async function getProveedores(user) {
  try {
    await connectSQLDatabase();
    const result = await queryDatabase('SELECT * FROM database_proveedor');
    return result.recordset;
  } catch (error) {
    console.error('Error in getProveedores:', error.message);
    throw new Error('Error al obtener proveedores');
  }
}
async function getProyectos(user) {
  try {
    await connectSQLDatabase();
    const result = await queryDatabase('SELECT * FROM database_proyectos');
    return result.recordset;
  } catch (error) {
    console.error('Error in getProyectos:', error.message);
    throw new Error('Error al obtener proyectos');
  }
}
async function getEmpleados(user) {
  try {
    await connectSQLDatabase();
    const result = await queryDatabase("SELECT * FROM database_empleados");
    return result.recordset;
  } catch (error) {
    console.error('Error in getEmpleados:', error.message);
    throw new Error('Error al obtener empleados');
  }
}
async function getEquipos(user) {
  try {
    await connectSQLDatabase();
    const result = await queryDatabase("SELECT * FROM database_equipos");
    return result.recordset;
  } catch (error) {
    console.error('Error in getEquipos:', error.message);
    throw new Error('Error al obtener equipos');
  }
}
module.exports = {
  getProveedores,
  getProyectos,
  getEmpleados,
  getEquipos
};