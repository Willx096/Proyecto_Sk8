import express from "express";
import { sequelize } from "../loadSequelize.js";
import { Evento, Participacion, Usuario } from "../Models/models.js";

const router = express.Router();

//Conexiones entre tablas
Evento.hasMany(Participacion, { foreignKey: "id_evento" });
Evento.belongsTo(Usuario, { foreignKey: "id_usuario" });

//Para la lista de eventos
router.get("/", function (req, res, next) {
  sequelize
    .sync()
    .then(() => {
      Evento.findAll({
        include: [
          {
            model: Participacion,
            include: { model: Usuario },
          },
          { model: Usuario },
        ],
      })
        .then((data) =>
          res.json({
            ok: true,
            data: data,
          })
        )
        .catch((error) =>
          res.json({
            ok: false,
            false: error,
          })
        );
    })
    .catch((error) =>
      res.json({
        ok: false,
        false: error,
      })
    );
});

//Para el perfil de los eventos
router.get("/:id", function (req, res, next) {
  sequelize
    .sync()
    .then(() => {
      Evento.findOne({
        where: { id: req.params.id },
        include: { model: Participacion, include: { model: Usuario } },
      })
        .then((data) =>
          res.json({
            ok: true,
            data: data,
          })
        )
        .catch((error) =>
          res.json({
            ok: false,
            error: error,
          })
        );
    })
    .catch((error) => {
      res.json({
        ok: false,
        error: error,
      });
    });
});

//Crear evento
router.post("/", function (req, res, next) {
  sequelize
    .sync()
    .then(() => {
      Evento.create(req.body)
        .then((data) => res.json({ ok: true, data: data }))
        .catch((error) => res.json({ ok: false, error: error.message }));
    })
    .catch((error) => {
      res.json({
        ok: false,
        error: error.message,
      });
    });
});

//Editar evento
router.put("/:id", function (req, res, next) {
  sequelize
    .sync()
    .then(() => {
      Evento.findOne({ where: { id: req.params.id } })
        .then((data) => data.update(req.body))
        .then((data) =>
          res.json({
            ok: true,
            data: data,
          })
        )
        .catch((error) =>
          res.json({
            ok: false,
            error: error.message,
          })
        );
    })
    .catch((error) => {
      res.json({
        ok: false,
        error: error.message,
      });
    });
});

//Eliminar evento
router.delete("/:id", function (req, res, next) {
  sequelize
    .sync()
    .then(() => {
      Evento.destroy({ where: { id: req.params.id } })
        .then((data) => res.json({ ok: true, data }))
        .catch((error) => res.json({ ok: false, error }));
    })
    .catch((error) => {
      res.json({
        ok: false,
        error: error,
      });
    });
});

export default router;
