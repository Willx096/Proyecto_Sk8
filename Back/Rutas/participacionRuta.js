import express from "express";
import { sequelize } from "../loadSequelize.js";
import {
  Usuario,
  Evento,
  Participacion,
  FotosEvento,
} from "../Models/models.js";

import multer from "multer";

//Conexiones entre tablas
Participacion.belongsTo(Usuario, { foreignKey: "id_usuario" });

const router = express.Router();

//Lo que indica donde y como se guarda la foto
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "fotosEvento");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage }).single("file");

//Para la lista de participantes
router.get("/", function (req, res, next) {
  sequelize
    .sync()
    .then(() => {
      Participacion.findAll({
        include: [
          { model: Usuario },
          {
            model: Evento,
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

//Para valorar
router.put(
  "/usuario/:id_usuario/evento/:id_evento/valoracion",
  function (req, res, next) {
    
    sequelize
      .sync()
      .then(() => {
        Participacion.findOne({
          where: {
            id_evento: req.params.id_evento,
            id_usuario: req.params.id_usuario,
            
          },
        })
        .then((data) => data.update(req.body))
          .then((el) => console.log(res.json({ ok: true, data: el })))
          .catch((error) => res.json({ ok: false, error: error.message }));
      })
      .catch((error) => {
        res.json({
          ok: false,
          error: error.message,
        });
      });
  }
);

//Para subir foto
router.post("/subir-fotos", function (req, res, next) {
  upload(req, res, function (err) {
    if (err) {
      return res.status(500).json(err);
    }

    sequelize
      .sync()
      .then(() => {
        req.body.foto = req.file.filename;
        FotosEvento.create(req.body)

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
});

//Para el apuntarse el valorar?
router.post("/apuntarse",
  function (req, res, next) {
    sequelize
      .sync()
      .then(() => {
        Participacion.create(req.body)
          .then((el) => res.json({ ok: true, data: el }))
          .catch((error) => res.json({ ok: false, error: error.message }));
      })
      .catch((error) => {
        res.json({
          ok: false,
          error: error.message,
        });
      });
  }
  );

  //Para que el usuario pueda desapuntarse
  router.delete("/apuntarse", function (req, res, next) {
    const {id_evento,id_usuario} = req.body
    sequelize
      .sync()
      .then(() => {
        Participacion.destroy({ where: {id_evento, id_usuario } })
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
//Para que el admin pueda eliminar una participacion
router.delete("/:id", function (req, res, next) {
  sequelize
    .sync()
    .then(() => {
      Participacion.destroy({ where: { id: req.params.id } })
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

//demomento sin uso
// router.get("/:id", function (req, res, next) {
//   sequelize
//     .sync()
//     .then(() => {
//       Participacion.findOne({
//         where: { id: req.params.id },
//         include: {
//           model: Evento,
//         },
//       })

//         .then((el) =>
//           res.json({
//             ok: true,
//             data: el,
//           })
//         )
//         .catch((error) =>
//           res.json({
//             ok: false,
//             error: error,
//           })
//         );
//     })
//     .catch((error) => {
//       res.json({
//         ok: false,
//         error: error,
//       });
//     });
// });

// router.put("/:id", function (req, res, next) {
//   sequelize
//     .sync()
//     .then(() => {
//       Participacion.findOne({ where: { id: req.params.id } })
//         .then((data) => data.update(req.body))
//         .then((data) =>
//           res.json({
//             ok: true,
//             data: data,
//           })
//         )
//         .catch((error) =>
//           res.json({
//             ok: false,
//             error: error.message,
//           })
//         );
//     })
//     .catch((error) => {
//       res.json({
//         ok: false,
//         error: error.message,
//       });
//     });
// });

export default router;
