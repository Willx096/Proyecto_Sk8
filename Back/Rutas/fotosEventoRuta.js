import express from "express";
import { sequelize } from "../loadSequelize.js";
import {
  FotosEvento,
  Usuario,
  Evento,
  Participacion,
} from "../Models/models.js";


//Conexiones entre tablas
Evento.hasMany(FotosEvento, { foreignKey: "id_evento" });
Usuario.hasMany(FotosEvento, { foreignKey: "id_usuario" });

FotosEvento.belongsTo(Evento, { foreignKey: "id_evento" });
FotosEvento.belongsTo(Usuario, { foreignKey: "id_usuario" });

const router = express.Router();


//Para mostrar las fotos de las valoraciones
router.get("/", function (req, res, next) {
  
    sequelize
      .sync()
      .then(() => {
        
        FotosEvento.findAll()
          .then((usuarios) =>
            res.json({
              ok: true,
              data: usuarios,
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


//Aqui ira el que muestre las fotos de un usuario y evento concreto
router.get("/:id", function (req, res, next) {
  sequelize
    .sync()
    .then(() => {
      FotosEvento.findOne({
        where: { id: req.params.id},
      })
        .then((el) =>
          res.json({
            ok: true,
            data: el,
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

//Eliminar fotos
router.delete("/:id", function (req, res, next) {
  sequelize
    .sync()
    .then(() => {
      FotosEvento.destroy({ where: { id: req.params.id } })
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
