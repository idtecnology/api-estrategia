async function execQuery(pool, sql) {
  try {
    result = await pool.query(sql);
    return result;
  } catch (e) {
    console.log("Error en el MySql", e);
    return false;
  }
}
module.exports = { execQuery };
