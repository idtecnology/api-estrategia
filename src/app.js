const express = require("express");
const body_parser = require("body-parser");
const mysql = require("mysql");
require("dotenv").config();

//Controlador de la conexión a la BD
const pool = require("../config/database");

//Routes
app.use(require("./routes/index"));

//Rutas
const {
  getClientes,
  getCanal,
  getCanales,
  getEstructuraTabla,
  updateCanalesCliente,
  getListasDiscador,
} = require("../api/Clientes");
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
} = require("../api/Estrategias");

//Valores Generales
const idBDMaster = process.env.DB_NAME_MASTER || "report00";

const app = express();
app.use(express.json({ limit: "25mb" }));
//app.use(express.urlencoded({limit: '25mb'}));
app.use(body_parser.urlencoded({ extended: true }));
app.use(body_parser.json());

// Configurar cabeceras y cors
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header(
    "Access-Control-Allow-Headers",
    "Authorization, X-API-KEY, Origin, Content-Type, Accept, Access-Control-Allow-Request-Method, Access-Control-Allow-Credentials"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, DELETE, PUT");
  res.header("Allow", "GET, POST, OPTIONS");
  next();
});

///////////////////
//SECCIÓN DE APIs
//////////////////
app.get("/", function (req, res) {
  res.send("API Server on Line...");
});

app.get("/clientes", async function (req, res) {
  try {
    await getClientes(pool, idBDMaster).then((st) => {
      res.send(st);
    });
  } catch (e) {
    console.log("Error en proceso: ", e);
    res.send('{"status": "Error getClientes"}');
  }
});

app.get("/canales", async function (req, res) {
  try {
    await getCanales(pool, idBDMaster).then((st) => {
      res.send(st);
    });
  } catch (e) {
    console.log("Error en proceso: ", e);
    res.send('{"status": "Error getCanales"}');
  }
});

app.get("/canales/:id", async function (req, res) {
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

app.get("/estructura/:id", async function (req, res) {
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

app.get("/listasdiscador/:prefix", async function (req, res) {
  try {
    await getListasDiscador(pool, idBDMaster, req.params.prefix).then((st) => {
      res.send(st);
    });
  } catch (e) {
    console.log("Error en proceso getEstrategias: ", e);
    res.send('{"status": "Error getEstrategias"}');
  }
});

app.get("/estrategias/:prefix", async function (req, res) {
  try {
    await getEstrategias(pool, idBDMaster, req.params.prefix).then((st) => {
      res.send(st);
    });
  } catch (e) {
    console.log("Error en proceso getEstrategias: ", e);
    res.send('{"status": "Error getEstrategias"}');
  }
});

app.post("/estrategia", async function (req, res) {
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

app.get("/estrategias/diseno/:prefix", async function (req, res) {
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

app.put("/estrategia/activar/:id", async function (req, res) {
  try {
    await startEstrategia(pool, idBDMaster, req.params.id).then((st) => {
      res.send(st);
    });
  } catch (e) {
    console.log("Error en proceso startEstrategia: ", e);
    res.send('{"status": "Error startEstrategia"}');
  }
});

app.put("/estrategia/procesar/:id", async function (req, res) {
  try {
    await procEstrategia(pool, idBDMaster, req.params.id).then((st) => {
      res.send(st);
    });
  } catch (e) {
    console.log("Error en proceso startEstrategia: ", e);
    res.send('{"status": "Error startEstrategia"}');
  }
});

app.put("/estrategia/detener/:id", async function (req, res) {
  try {
    await stopEstrategia(pool, idBDMaster, req.params.id).then((st) => {
      res.send(st);
    });
  } catch (e) {
    console.log("Error en proceso stopEstrategia: ", e);
    res.send('{"status": "Error stopEstrategia"}');
  }
});

app.put("/estrategia/detener/proceso/:id", async function (req, res) {
  try {
    await stopProcessEstrategia(pool, idBDMaster, req.params.id).then((st) => {
      res.send(st);
    });
  } catch (e) {
    console.log("Error en proceso stopProcessEstrategia: ", e);
    res.send('{"status": "Error stopProcessEstrategia"}');
  }
});

app.get("/estrategia/records/", async function (req, res) {
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

app.get("/estrategias/activas/canal/:idCanal", async function (req, res) {
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

app.delete("/estrategia/eliminar/:id", async function (req, res) {
  try {
    await deleteEstrategia(pool, idBDMaster, req.params.id).then((st) => {
      res.send(st);
    });
  } catch (e) {
    console.log("Error en proceso deleteEstrategia: ", e);
    res.send('{"status": "Error deleteEstrategia"}');
  }
});

app.get("/estrategia/tipo/", async function (req, res) {
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

app.get("/estrategia/historico/", async function (req, res) {
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

app.put("/cliente/canales/", async function (req, res) {
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

//////////////////////////
//Levanta el servidor NODE
//////////////////////////
var port = process.env.PORT || 3000;

var server = app.listen(port, function () {
  console.log("Server running on port " + port);
});
