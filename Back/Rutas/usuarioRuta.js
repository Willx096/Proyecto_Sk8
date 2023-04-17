import express from "express";
import { sequelize } from "../loadSequelize.js";
import { Usuario } from "../Models/models.js";
const router = express.Router();

router.get("/", function (req, res, next) {
  sequelize
    .sync()
    .then(() => {
      Usuario.findAll()
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

// GET de un solo client
router.get('/:id', function (req, res, next) {
  sequelize.sync().then(() => {

      Usuario.findOne({ where: { id: req.params.id } })
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
      
      Usuario.create(req.body)
          .then((el) => res.json({ ok: true, data: el }))
          .catch((error) => res.json({ ok: false, error: error.message }))


  }).catch((error) => {
      res.json({
          ok: false,
          error: error.message
      })
  });
});


// put solo de uno
router.put('/:id', function (req, res, next) {
  sequelize.sync().then(() => {

      Usuario.findOne({ where: { id: req.params.id } })
          .then(usuario =>
              usuario.update(req.body)
          )
          .then(usuarioMod => res.json({
              ok: true,
              data: usuarioMod
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



// DELETE
router.delete('/:id', function (req, res, next) {

  sequelize.sync().then(() => {

      Usuario.destroy({ where: { id: req.params.id } })
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
