import express from "express";
import { sequelize } from "../loadSequelize.js";
import {
  Usuario,
  Evento,
  Participacion,
  FotosEvento,
} from "../Models/models.js";

// Login y seguridad
import jsonwebtoken from "jsonwebtoken";
import { autentica } from "./middleware.js";
import { secretKey, expiredAfter } from "./loginconfig.js";

// Para encriptar la contraseña
import bcrypt from "bcrypt";

// Para subir y modificar foto
import multer from "multer";

//Conexiones entre tablas
Usuario.hasMany(Participacion, { foreignKey: "id_usuario" });
Usuario.hasMany(Evento, { foreignKey: "id_usuario" });
Usuario.hasMany(FotosEvento, { foreignKey: "id_usuario" });
Participacion.belongsTo(Evento, { foreignKey: "id_evento" });

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
router.get("/", autentica, function (req, res, next) {
  sequelize
    .sync()
    .then(() => {
      Usuario.findAll()
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

//Para el perfil del usuario
router.get("/:id", autentica, function (req, res, next) {
  sequelize
    .sync()
    .then(() => {
      Usuario.findOne({
        where: { id: req.params.id },
        include: [
          {
            model: Evento,
            include: [{ model: Usuario }, { model: Participacion }],
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

//Para modificar un usuario
router.put("/:id", function (req, res, next) {
  upload(req, res, function (err) {
    if (err) {
      return res.status(500).json(err);
    }
    sequelize
      .sync()
      .then(() => {
        delete req.body.pswd
        req.body.foto = req.file ? req.file.path.split("\\")[1] : "noFoto.jpg";
        Usuario.findOne({ where: { id: req.params.id } })
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

//Para registrarse
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
        console.log("body", req.body);
        req.body.foto = req.file ? req.file.path.split("\\")[1] : "noFoto.jpg";
        Usuario.create(req.body)
          .then((data) => res.json({ ok: true, data: data }))
          .catch((error) => res.json({ ok: false, error }));
      })
      .catch((error) => {
        res.json({
          ok: false,
          error: error,
        });
      });
  });
});

//Para el login
router.post("/login", (req, res) => {
  const response = {};
  const { email, pswd } = req.body;
  if (!email || !pswd) {
    res
      .status(400)
      .json({ ok: false, msg: "No se ha recibido el email y la contraseña." });
  }
  Usuario.findOne({ where: { email } })
    .then((usuario) => {
      console.log(usuario);
      if (usuario && bcrypt.compareSync(pswd, usuario.pswd)) {
        return usuario;
      }
      else {
        throw "Email o contraseña incorrectos";
      }
    })
    .then((usuario) => {
      response.token = jsonwebtoken.sign(
        {
          expiredAt: new Date().getTime() + expiredAfter,
          email,
          nombre: usuario.nombre,
          id: usuario.id,
          admin: usuario.admin,
        },
        secretKey
      );
      response.ok = true;

      res.json(response);
    })
    .catch((err) => res.status(400).json({ ok: false, msg: err }));
});

//Eliminar usuario
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
