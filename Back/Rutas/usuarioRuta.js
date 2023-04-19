import express from "express";
import { sequelize } from "../loadSequelize.js";
import { Usuario } from "../Models/models.js";
import multer from "multer";
import jsonwebtoken from 'jsonwebtoken';

import { secretKey, expiredAfter } from './loginconfig.js';

//bcrypt es un modulo que nos permite encriptar en una dirección
import bcrypt from 'bcrypt';

const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "fotos");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage }).single("file");

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
router.post("/", function (req, res, next) {
  upload(req, res, function (err) {
    if (err) {
      return res.status(500).json(err);
    }

    sequelize
      .sync()
      .then(() => {
        const hash = bcrypt.hashSync(req.body.pswd, 10);
        req.body.pswd = hash;
        req.body.foto = req.file.path.split("\\")[1];
        console.log("body", req.body.file);
        Usuario.create(req.body)

          .then((el) => res.json({ ok: true, data: el }))
          .catch((error) => res.json({ ok: false, error }));
        // return res.status(200).send(req.file);
      })
      .catch((error) => {
        res.json({
          ok: false,
          error: error,
        });
      });
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
