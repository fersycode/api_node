﻿const {
  connectSQLDatabase,
  queryDatabase,
} = require("../database/sqlserver-config");
const sql = require('mssql');
async function getEtapas(_user) {
  try {
    await connectSQLDatabase();
    const proyectosResult = await queryDatabase("SELECT * FROM database_proyectos");
    const proyectos = proyectosResult.recordset;
    if (proyectos.length === 0) {
      return [];
    }
    const proyectoCodes = proyectos.map((proyecto) => proyecto.Company_Code);
    const jobNumbers = proyectos.map((proyecto) => proyecto.Job_Number);
    const request = new sql.Request();
    
    const codesPlaceholders = proyectoCodes.map((_, i) => `@code${i}`).join(',');
    const numbersPlaceholders = jobNumbers.map((_, i) => `@number${i}`).join(',');
    
    proyectoCodes.forEach((code, i) => {
      request.input(`code${i}`, sql.NVarChar, code);
    });
    
    jobNumbers.forEach((number, i) => {
      request.input(`number${i}`, sql.NVarChar, number);
    });
    const query = `
      SELECT * FROM database_etapas
      WHERE Company_Code IN (${codesPlaceholders}) 
      AND Job_Number IN (${numbersPlaceholders})
    `;
    const result = await request.query(query);
    const modifiedResult = result.recordset.map((record) => ({
      ...record,
      Phase_Code: parseInt(record.Phase_Code.trim(), 10),
    }));
    const uniqueResult = modifiedResult.reduce((acc, current) => {
      const key = `${current.Company_Code}-${current.Job_Number}-${current.Phase_Code}-${current.Cost_Type}-${current.Description}`;
      if (!acc[key]) {
        acc[key] = current;
      }
      return acc;
    }, {});
    return Object.values(uniqueResult);
  } catch (error) {
    console.error('Error in getEtapas:', error.message);
    throw new Error('Error al obtener las etapas');
  }
}
module.exports = getEtapas;