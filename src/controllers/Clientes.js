const { execQuery } = require("../config/functions");

module.exports = {
  async getClientes(pool, idBD, idCall) {
    sql = `call ${idBD}.proc_api_get_clientes(${idCall});`;
    result = execQuery(pool, sql);
    if (result) {
      return result;
    } else {
      return "";
    }
  },

  async getCliente(pool, idBD, idClient) {
    sql = `call ${idBD}.proc_api_get_client(${idClient});`;
    result = execQuery(pool, sql);
    if (result) {
      return result;
    } else {
      return "";
    }
  },

  async getCanal(pool, idBD, idCliente) {
    sql = `call ${idBD}.proc_api_get_Canal(${idCliente})`;
    result = execQuery(pool, sql);
    if (result) {
      return result;
    } else {
      return "";
    }
  },

  async getCanales(pool, idBD) {
    sql = `call ${idBD}.proc_api_get_Canales`;
    result = execQuery(pool, sql);
    if (result) {
      return result;
    } else {
      return "";
    }
  },
  async getListasDiscador(pool, idBD, prefix) {
    sql = `call ${idBD}.proc_api_get_listas_discador('${prefix}')`;
    result = execQuery(pool, sql);
    if (result) {
      return result;
    } else {
      return "";
    }
  },
  async updateCanalesCliente(pool, idBD, idClient, channels) {
    sql = `call ${idBD}.proc_api_update_client_channels(${idClient},'${channels}')`;
    result = execQuery(pool, sql);
    if (result) {
      return result;
    } else {
      return "";
    }
  },

  async getEstructuraTabla(pool, idBD, idCliente) {
    sql = `call ${idBD}.proc_api_get_estructura_tabla(${idCliente})`;
    result = execQuery(pool, sql);
    if (result) {
      return result;
    } else {
      return "";
    }
  },

  async getBetterStrucre(pool, idBD, idCliente) {
    sql = `call ${idBD}.proc_get_estrucutra_tabla_mejor_gestion(${idCliente})`;
    result = execQuery(pool, sql);
    if (result) {
      return result;
    } else {
      return "";
    }
  },
};
