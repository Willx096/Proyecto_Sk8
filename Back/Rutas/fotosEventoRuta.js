import express from "express";
import { sequelize } from "../loadSequelize.js";
import { FotosEvento, Usuario, Evento, Participacion } from "../Models/models.js";

import multer from "multer";

//Conexiones entre tablas
Evento.hasMany(FotosEvento, { foreignKey: "id_evento" });
Usuario.hasMany(FotosEvento, { foreignKey: "id_usuario" });

FotosEvento.belongsTo(Evento, { foreignKey: "id_evento" });
FotosEvento.belongsTo(Usuario, { foreignKey: "id_usuario" });


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

//Para mostrar las fotos de las valoraciones
router.get("/",  function (req, res, next) {
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
        where: { id: req.params.id },
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

//Para modificar las fotos colgadas
router.put("/:id", function (req, res, next) {
  upload(req, res, function (err) {
    if (err) {
      return res.status(500).json(err);
    }

    sequelize

      .sync()
      .then(() => {
        const hash = bcrypt.hashSync(req.body.pswd, 10);
        req.body.pswd = hash;
        req.body.foto = req.file ? req.file.path.split("\\")[1] : "noFoto.jpg";

        FotosEvento.findOne({ where: { id: req.params.id } })
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

//Para colgar las fotos
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
        FotosEvento.create(req.body)
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
