async function execQuery(pool, sql) {
  try {
    result = await pool.query(sql);
    return result;
  } catch (e) {
    console.log("Error en el MySql", e);
    return { status: false, error: e };
  }
}
module.exports = { execQuery };
