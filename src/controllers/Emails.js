const { execQuery } = require("../config/functions");
module.exports = {
  async getTemplateClient(pool, idBD, prefix) {
    sql = `call ${idBD}.proc_api_get_templates("${prefix}");`;
    result = execQuery(pool, sql);
    if (result) {
      return result;
    } else {
      return "";
    }
  },

  async getTemplateId(pool, idBD, template_id) {
    sql = `call ${idBD}.proc_api_get_email_template("${template_id}");`;
    result = execQuery(pool, sql);
    if (result) {
      return result;
    } else {
      return "";
    }
  },

  async storeTemplate(
    pool,
    idBD,
    nombretemplate,
    prefix,
    columnas,
    body,
    emailfrom,
    nombrefrom,
    asunto,
    emailreply,
    columnasCalc
  ) {
    console.log(columnas);
    sql = `call ${idBD}.proc_api_inserta_template("${nombretemplate}","${prefix}",'${columnas}',"${body}","${emailfrom}","${nombrefrom}","${asunto}","${emailreply}",'${columnasCalc}')`;
    result = execQuery(pool, sql);
    if (result) {
      return result;
    } else {
      return "";
    }
  },

  async mejorGestion(pool, idBD, fecproc) {
    // sql = `call ${idBD}.proc_get_mejor_gestion("${fec1}","${fec2}","${client_id}")`;
    sql = `call ${idBD}.proc_reporte_diario("${fecproc}")`;
    result = execQuery(pool, sql);
    if (result) {
      return result;
    } else {
      return "";
    }
  },
};
