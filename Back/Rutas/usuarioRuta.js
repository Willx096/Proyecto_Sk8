import express from "express";
import { sequelize } from "../loadSequelize.js";
import { Usuario, Evento, Participacion } from "../Models/models.js";

//Instalar para subir y modificar foto
import multer from "multer";

Evento.hasMany(Participacion, { foreignKey: "id_evento" });
Usuario.hasMany(Participacion, { foreignKey: "id_usuario" });
Usuario.hasMany(Evento, { foreignKey: "id_usuario" });

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
          },
          { model: Participacion },
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
  sequelize
    .sync()
    .then(() => {
      Usuario.create(req.body)
        .then((el) => res.json({ ok: true, data: el }))
        .catch((error) => res.json({ ok: false, error: error.message }));
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
