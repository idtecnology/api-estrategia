const { execQuery } = require("./functions");

module.exports = {
  async getEstrategias(pool, idBD, prefix) {
    sql = `call ${idBD}.proc_api_get_estrategias("${prefix}");`;
    result = execQuery(pool, sql);
    if (result) {
      return result;
    } else {
      return "";
    }
  },

  async insertEstrategia(
    pool,
    idBD,
    onlyWhere,
    channels,
    table_name,
    prefix_client,
    registros_unicos,
    registros_repetidos,
    total_registros,
    cobertura,
    type,
    registros,
    idetemplate
  ) {
    sql = `call ${idBD}.proc_api_insert_estrategia("${onlyWhere}","${channels}","${table_name}","${prefix_client}","${registros_unicos}","${registros_repetidos}","${total_registros}","${cobertura}","${type}",'${registros}',${idetemplate})`;
    result = execQuery(pool, sql);
    if (result) {
      return result;
    } else {
      return "";
    }
  },
  async getDisenoEstrategia(pool, idBD, prefix) {
    sql = `call ${idBD}.proc_api_diseno_estrategia("${prefix}")`;
    result = execQuery(pool, sql);
    if (result) {
      return result;
    } else {
      return '{"status": "400", "message": "error"}';
    }
  },
  async stopEstrategia(pool, idBD, idEstrategia) {
    sql = `call ${idBD}.proc_api_stop_estrategia(${idEstrategia})`;
    result = execQuery(pool, sql);
    if (result) {
      return '{"status": "201", "message": "success"}';
    } else {
      return '{"status": "400", "message": "error"}';
    }
  },
  async stopProcessEstrategia(pool, idBD, idEstrategia) {
    sql = `call ${idBD}.proc_api_stop_process_estrategia(${idEstrategia})`;
    result = execQuery(pool, sql);
    if (result) {
      return '{"status": "201", "message": "success"}';
    } else {
      return '{"status": "400", "message": "error"}';
    }
  },
  async startEstrategia(pool, idBD, idEstrategia) {
    sql = `call ${idBD}.proc_api_start_estrategia(${idEstrategia})`;
    result = execQuery(pool, sql);
    if (result) {
      return '{"status": "201", "message": "success"}';
    } else {
      return '{"status": "400", "message": "error"}';
    }
  },
  async procEstrategia(pool, idBD, idEstrategia) {
    sql = `call ${idBD}.proc_api_process_estrategia(${idEstrategia})`;
    result = execQuery(pool, sql);
    if (result) {
      return '{"status": "201", "message": "success"}';
    } else {
      return '{"status": "400", "message": "error"}';
    }
  },
  async deleteEstrategia(pool, idBD, idEstrategia) {
    sql = `call ${idBD}.proc_api_delete_estrategia(${idEstrategia})`;
    result = execQuery(pool, sql);
    if (result) {
      return '{"status": "201", "message": "success"}';
    } else {
      return '{"status": "400", "message": "error"}';
    }
  },
  async recordsEstrategia(
    pool,
    idBD,
    idCliente,
    cartera,
    criterio,
    template,
    canal
  ) {
    sql = `call ${idBD}.proc_api_get_record_cartera(${idCliente},"${cartera}","${criterio}",${template},${canal})`;
    result = execQuery(pool, sql);
    if (result) {
      return result;
    } else {
      return '{"status": "400", "message": "error"}';
    }
  },
  async estrategiaTipo(pool, idBD, prefix, type) {
    sql = `call ${idBD}.proc_api_get_estrategias_type("${prefix}",${type})`;
    result = execQuery(pool, sql);
    if (result) {
      return result;
    } else {
      return '{"status": "400", "message": "error"}';
    }
  },
  async estrategiaHistorico(pool, idBD, prefix, idCanal) {
    sql = `call ${idBD}.proc_api_get_estrategias_historicas("${prefix}",${idCanal})`;
    result = execQuery(pool, sql);
    if (result) {
      return result;
    } else {
      return '{"status": "400", "message": "error"}';
    }
  },
  async estrategiasActivaCanal(pool, idBD, idCanal) {
    sql = `call ${idBD}.proc_api_get_estrategias_activas_por_canal(${idCanal})`;
    result = execQuery(pool, sql);
    if (result) {
      return result;
    } else {
      return '{"status": "400", "message": "error"}';
    }
  },
};
