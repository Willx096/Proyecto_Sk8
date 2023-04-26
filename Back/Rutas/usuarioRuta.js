import express from "express";
import { sequelize } from "../loadSequelize.js";
import multer from "multer";
import jsonwebtoken from "jsonwebtoken";

import { secretKey, expiredAfter } from "./loginconfig.js";

//bcrypt es un modulo que nos permite encriptar en una dirección
import bcrypt from "bcrypt";

const router = express.Router();

import { Usuario, Evento, Participacion } from "../Models/models.js";


//Instalar para subir y modificar foto
import multer from "multer";

//conexion entre tablas
Usuario.hasMany(Participacion, { foreignKey: "id_usuario" });
Usuario.hasMany(Evento, { foreignKey: "id_usuario" });
Participacion.belongsTo(Evento, { foreignKey: "id_evento" });

//conexiones no necesarios por ahora
// Evento.hasMany(Participacion, { foreignKey: "id_evento" });

const router = express.Router();

//Lo que indica donde y como se guarda la foto
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "fotos");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage }).single("file");

//Para la lista de usuarios que tendra el admin
router.get("/", function (req, res, next) {
  sequelize
    .sync()
    .then(() => {
      Usuario.findAll({
        include: [
          {
            model: Evento,
            include: 
              
              { model: Usuario },
            
          },
          {
            model: Participacion,
            include: [
              {
                model: Evento,
              },
              { model: Usuario },
            ],
          },
        ],
      })
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
//Para el perfil del usuario
router.get("/:id", function (req, res, next) {
  sequelize
    .sync()
    .then(() => {
      Usuario.findOne({
        where: { id: req.params.id },
        include: [
          {
            model: Evento,
            include: 
                           [ { model: Usuario },
              { model: Participacion }]
                      },
          {
            model: Participacion,
            include: [{
              model: Evento,
            },
            { model: Usuario }]
          },
        ],
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

//Para modificar un usuario
router.put("/:id", function (req, res, next) {
  upload(req, res, function (err) {
    if (err) {
      return res.status(500).json(err);
    }

    sequelize

      .sync()
      .then(() => {
        req.body.foto = req.file.path.split("\\")[1];

        Usuario.findOne({ where: { id: req.params.id } })
          .then((al) => al.update(req.body))
          .then((ret) =>
            res.json({
              ok: true,
              data: ret,
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
});

// POST
router.post("/", function (req, res, next) {
  upload(req, res, function (err) {
    if (err) {
      return res.status(500).json(err);
    }
    console.log("guardado usuario");

    sequelize
      .sync()
      .then(() => {
        const hash = bcrypt.hashSync(req.body.pswd, 10);
        req.body.pswd = hash;
        console.log("body", req.body);
        req.body.foto = req.file ? req.file.path.split("\\")[1] : "noFoto.jpg";
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
router.put("/:id", function (req, res, next) {
  sequelize
    .sync()
    .then(() => {
      Usuario.findOne({ where: { id: req.params.id } })
        .then((usuario) => usuario.update(req.body))
        .then((usuarioMod) =>
          res.json({
            ok: true,
            data: usuarioMod,
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



// DELETE
router.delete("/:id", function (req, res, next) {
  sequelize
    .sync()
    .then(() => {
      Usuario.destroy({ where: { id: req.params.id } })
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
