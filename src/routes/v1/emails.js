const { Router } = require("express");
const router = Router();
const pool = require("../../config/database");
const idBDMaster = process.env.DB_NAME_MASTER;

// Funciones
const {
  storeTemplate,
  getTemplateClient,
  getTemplateId,
} = require("../../controllers/Emails");

router.get("/email/template-client/:prefix", async function (req, res) {
  try {
    await getTemplateClient(pool, idBDMaster, req.params.prefix).then((st) => {
      res.send(st);
    });
  } catch (e) {
    console.log("Error en proceso getTemplateClient: ", e);
    res.send('{"status": "Error getTemplateClient"}');
  }
});

router.get("/email/template/:template_id", async function (req, res) {
  try {
    await getTemplateId(pool, idBDMaster, req.params.template_id).then((st) => {
      res.send(st);
    });
  } catch (e) {
    console.log("Error en proceso getTemplateId: ", e);
    res.send('{"status": "Error getTemplateId"}');
  }
});

router.post("/email/store-template", async function (req, res) {
  try {
    await storeTemplate(
      pool,
      idBDMaster,
      req.body.nombreTemplate,
      req.body.prefix,
      req.body.columnas,
      req.body.body,
      req.body.emailFrom,
      req.body.nombreFrom,
      req.body.asunto,
      req.body.emailReply,
      req.body.columnasCalc
    ).then((st) => {
      res.send(st);
    });
  } catch (e) {
    console.log("Error en proceso storeTemplate: ", e);
    res.send('{"status": "Error storeTemplate"}');
  }
});

/*  
  req.body.nombretemplate
  req.body.prefix
  req.body.columns
  req.body.body
  req.body.emailfrom
  req.body.nombrefrom
  req.body.asunto
  req.body.emailreply
  req.body.columnasCalc
  */

module.exports = router;
