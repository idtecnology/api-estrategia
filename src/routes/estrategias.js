const { Router } = require("express");
const router = Router();
const pool = require("../config/database");
const idBDMaster = process.env.DB_NAME_MASTER || "report00";

const {
  getEstrategias,
  insertEstrategia,
  deleteEstrategia,
  stopEstrategia,
  startEstrategia,
  getDisenoEstrategia,
  recordsEstrategia,
  estrategiaTipo,
  estrategiaHistorico,
  estrategiasActivaCanal,
  procEstrategia,
  stopProcessEstrategia,
} = require("../controllers/Estrategias");

router.get("/estrategias/:prefix", async function (req, res) {
  try {
    await getEstrategias(pool, idBDMaster, req.params.prefix).then((st) => {
      res.send(st);
    });
  } catch (e) {
    console.log("Error en proceso getEstrategias: ", e);
    res.send('{"status": "Error getEstrategias"}');
  }
});

router.post("/estrategia", async function (req, res) {
  try {
    await insertEstrategia(
      pool,
      idBDMaster,
      req.body.onlyWhere,
      req.body.channels,
      req.body.table_name,
      req.body.prefix_client,
      req.body.registros_unicos,
      req.body.registros_repetidos,
      req.body.total_registros,
      req.body.cobertura,
      req.body.type,
      req.body.registros,
      req.body.idEmailTemplate
    ).then((st) => {
      res.send(st);
    });
  } catch (e) {
    console.log("Error en proceso insertEstrategia: ", e);
    res.send('{"status": "Error insertEstrategia"}');
  }
});

router.get("/estrategias/diseno/:prefix", async function (req, res) {
  try {
    await getDisenoEstrategia(pool, idBDMaster, req.params.prefix).then(
      (st) => {
        res.send(st);
      }
    );
  } catch (e) {
    console.log("Error en proceso getDisenoEstrategia: ", e);
    res.send('{"status": "Error getDisenoEstrategia"}');
  }
});

router.put("/estrategia/activar/:id", async function (req, res) {
  try {
    await startEstrategia(pool, idBDMaster, req.params.id).then((st) => {
      res.send(st);
    });
  } catch (e) {
    console.log("Error en proceso startEstrategia: ", e);
    res.send('{"status": "Error startEstrategia"}');
  }
});

router.put("/estrategia/procesar/:id", async function (req, res) {
  try {
    await procEstrategia(pool, idBDMaster, req.params.id).then((st) => {
      res.send(st);
    });
  } catch (e) {
    console.log("Error en proceso startEstrategia: ", e);
    res.send('{"status": "Error startEstrategia"}');
  }
});

router.put("/estrategia/detener/:id", async function (req, res) {
  try {
    await stopEstrategia(pool, idBDMaster, req.params.id).then((st) => {
      res.send(st);
    });
  } catch (e) {
    console.log("Error en proceso stopEstrategia: ", e);
    res.send('{"status": "Error stopEstrategia"}');
  }
});

router.put("/estrategia/detener/proceso/:id", async function (req, res) {
  try {
    await stopProcessEstrategia(pool, idBDMaster, req.params.id).then((st) => {
      res.send(st);
    });
  } catch (e) {
    console.log("Error en proceso stopProcessEstrategia: ", e);
    res.send('{"status": "Error stopProcessEstrategia"}');
  }
});

router.get("/estrategia/records/", async function (req, res) {
  try {
    await recordsEstrategia(
      pool,
      idBDMaster,
      req.body.idCliente,
      req.body.cartera,
      req.body.criterio,
      req.body.template,
      req.body.canal
    ).then((st) => {
      res.send(st);
    });
  } catch (e) {
    console.log("Error en proceso stopEstrategia: ", e);
    res.send('{"status": "Error stopEstrategia"}');
  }
});

router.get("/estrategias/activas/canal/:idCanal", async function (req, res) {
  try {
    await estrategiasActivaCanal(pool, idBDMaster, req.params.idCanal).then(
      (st) => {
        res.send(st);
      }
    );
  } catch (e) {
    console.log("Error en proceso estrategiaActivaCanal: ", e);
    res.send('{"status": "Error estrategiaActivaCanal"}');
  }
});

router.delete("/estrategia/eliminar/:id", async function (req, res) {
  try {
    await deleteEstrategia(pool, idBDMaster, req.params.id).then((st) => {
      res.send(st);
    });
  } catch (e) {
    console.log("Error en proceso deleteEstrategia: ", e);
    res.send('{"status": "Error deleteEstrategia"}');
  }
});

router.get("/estrategia/tipo/", async function (req, res) {
  try {
    await estrategiaTipo(pool, idBDMaster, req.body.prefix, req.body.type).then(
      (st) => {
        res.send(st);
      }
    );
  } catch (e) {
    console.log("Error en proceso estrategiaTipo: ", e);
    res.send('{"status": "Error deleteEstrategia"}');
  }
});

router.get("/estrategia/historico/", async function (req, res) {
  try {
    await estrategiaHistorico(
      pool,
      idBDMaster,
      req.body.prefix,
      req.body.canal
    ).then((st) => {
      res.send(st);
    });
  } catch (e) {
    console.log("Error en proceso estrategiaTipo: ", e);
    res.send('{"status": "Error estrategiaHistorico"}');
  }
});

//cliente

module.exports = router;
