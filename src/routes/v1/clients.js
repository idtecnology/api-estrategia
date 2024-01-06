const { Router } = require("express");
const router = Router();
const pool = require("../../config/database");
const idBDMaster = process.env.DB_NAME_MASTER;

// Funciones
const {
  getClientes,
  getCanal,
  getCanales,
  getEstructuraTabla,
  updateCanalesCliente,
  getListasDiscador,
} = require("../../controllers/Clientes");

//Raiz
router.get("/clientes", async function (req, res) {
  try {
    await getClientes(pool, idBDMaster).then((st) => {
      res.send(st);
    });
  } catch (e) {
    console.log("Error en proceso: ", e);
    res.send('{"status": "Error getClientes"}');
  }
});

router.put("/cliente/canales", async function (req, res) {
  try {
    await updateCanalesCliente(
      pool,
      idBDMaster,
      req.body.idClient,
      req.body.channels
    ).then((st) => {
      res.send(st);
    });
  } catch (e) {
    console.log("Error en proceso updateCanalesCliente: ", e);
    res.send('{"status": "Error updateCanalesCliente"}');
  }
});

router.get("/canales", async function (req, res) {
  try {
    await getCanales(pool, idBDMaster).then((st) => {
      res.send(st);
    });
  } catch (e) {
    console.log("Error en proceso: ", e);
    res.send('{"status": "Error getCanales"}');
  }
});

router.get("/canales/:id", async function (req, res) {
  var idCanal = req.params.id;
  try {
    await getCanal(pool, idBDMaster, idCanal).then((st) => {
      res.send(st);
    });
  } catch (e) {
    console.log("Error en proceso getCanal: ", e);
    res.send('{"status": "Error getCanal"}');
  }
});

router.get("/estructura/:id", async function (req, res) {
  var idCliente = req.params.id;
  try {
    await getEstructuraTabla(pool, idBDMaster, idCliente).then((st) => {
      res.send(st);
    });
  } catch (e) {
    console.log("Error en proceso getEstructuraTabla: ", e);
    res.send('{"status": "Error getEstructuraTabla"}');
  }
});

router.get("/listasdiscador/:prefix", async function (req, res) {
  try {
    await getListasDiscador(pool, idBDMaster, req.params.prefix).then((st) => {
      res.send(st);
    });
  } catch (e) {
    console.log("Error en proceso getEstrategias: ", e);
    res.send('{"status": "Error getEstrategias"}');
  }
});

//cliente

module.exports = router;
