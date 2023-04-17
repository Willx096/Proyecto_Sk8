import express from "express";
import { sequelize } from "../loadSequelize.js";
import { Evento } from "../Models/models.js";

const router = express.Router();

router.get("/", function (req, res, next) {
    sequelize
      .sync()
      .then(() => {
        Evento.findAll()
          .then((eventos) =>
            res.json({
              ok: true,
              data: eventos,
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
  
// GET DE UN SOLO EVENTO
router.get('/:id', function (req, res, next) {
    sequelize.sync().then(() => {
  
        Evento.findOne({ where: { id: req.params.id } })
            .then(al => res.json({
                ok: true,
                data: al
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
        
        Evento.create(req.body)
            .then((el) => res.json({ ok: true, data: el }))
            .catch((error) => res.json({ ok: false, error: error.message }))
  
  
    }).catch((error) => {
        res.json({
            ok: false,
            error: error.message
        })
    });
  });
  
  
  //PUT DE UN SOLO EVENTO
  router.put('/:id', function (req, res, next) {
    sequelize.sync().then(() => {
  
        Evento.findOne({ where: { id: req.params.id } })
            .then(evento =>
                evento.update(req.body)
            )
            .then(eventoMod => res.json({
                ok: true,
                data: eventoMod
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
  
  
  
  //ELIMINAR
  router.delete('/:id', function (req, res, next) {
  
    sequelize.sync().then(() => {
  
        Evento.destroy({ where: { id: req.params.id } })
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