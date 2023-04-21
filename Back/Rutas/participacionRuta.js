import express from "express";
import { sequelize } from "../loadSequelize.js";
import { Usuario, Evento, Participacion } from "../Models/models.js";

Evento.hasMany(Participacion, { foreignKey: "id_evento" });
Usuario.hasMany(Participacion, { foreignKey: "id_usuario" });
Usuario.hasMany(Evento, { foreignKey: "id_usuario" });

const router = express.Router();

//GET GENERAL
router.get("/", function (req, res, next) {
    sequelize
      .sync()
      .then(() => {
        Participacion.findAll({include:
          {
            model: Evento,
          },
          
      })
          .then((participaciones) =>
            res.json({
              ok: true,
              data: participaciones,
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
  
//GET PARA SOLO UNA PARTICIPACION
router.get('/:id', function (req, res, next) {
    sequelize.sync().then(() => {
  
        Participacion.findOne({ where: { id: req.params.id } })
            .then(el => res.json({
                ok: true,
                data: el
            }))
            .catch(error => res.json({
                ok: false,
                error: error
            }))
  
    }).catch((error) => {
        res.json({
            ok: false,
            error: error
        })
    });
  });
  
  // POST
  router.post('/', function (req, res, next) {
    sequelize.sync().then(() => {
        
        Participacion.create(req.body)
            .then((el) => res.json({ ok: true, data: el }))
            .catch((error) => res.json({ ok: false, error: error.message }))
  
  
    }).catch((error) => {
        res.json({
            ok: false,
            error: error.message
        })
    });
  });
  
  
  // PUT SOLO UNA PARTICIPACION
  router.put('/:id', function (req, res, next) {
    sequelize.sync().then(() => {
  
        Participacion.findOne({ where: { id: req.params.id } })
            .then(participaciones =>
              participaciones.update(req.body)
            )
            .then(participacionesMod => res.json({
                ok: true,
                data: participacionesMod
            }))
            .catch(error => res.json({
                ok: false,
                error: error.message
            }));
  
    }).catch((error) => {
        res.json({
            ok: false,
            error: error.message
        })
    });
  });
  
  
  
  // ELIMINAR
  router.delete('/:id', function (req, res, next) {
  
    sequelize.sync().then(() => {
  
        Participacion.destroy({ where: { id: req.params.id } })
            .then((data) => res.json({ ok: true, data }))
            .catch((error) => res.json({ ok: false, error }))
  
    }).catch((error) => {
        res.json({
            ok: false,
            error: error
        })
    });
  
  });

export default router;