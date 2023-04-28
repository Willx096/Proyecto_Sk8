import express from "express";
import { sequelize } from "../loadSequelize.js";
import { Usuario, Evento, Participacion } from "../Models/models.js";

//login y seguridad
import jsonwebtoken from "jsonwebtoken";
import { autentica} from './middleware.js';
import { secretKey, expiredAfter } from "./loginconfig.js";

//bcrypt es un modulo que nos permite encriptar en una dirección
import bcrypt from "bcrypt";

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
router.get("/", autentica , function (req, res, next) {
  sequelize
    .sync()
    .then(() => {
      Usuario.findAll({
        include: [
          {
            model: Evento,
            include: { model: Usuario },
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

//Para el perfil del usuario
router.get("/:id",autentica, function (req, res, next) {
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
        const hash = bcrypt.hashSync(req.body.pswd, 10);
        req.body.pswd = hash;
        req.body.foto = req.file ? req.file.path.split("\\")[1] : "noFoto.jpg";

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

//para el login
router.post('/login', (req, res) => {
  const response = {};
  //recogemos del front el email i la contraseña
  const { email, pswd } = req.body;
  //si no nos llega el email o la contraseña mostrar error
  if (!email || !pswd) {
     res.status(400).json({ ok: false, msg: "Nose ha recibido el email y la contraseña." });
  }
  //una vez comprovado que nos ha llegado el email y contraseña
  Usuario.findOne({ where: { email} })
  //si se encuentra algun usuario con el mismo email se obtenienen los datos del usuario
        .then((usuario) => {
        console.log(usuario)
        //se compara la contraseña facilitada con la de la base de datos
          if (usuario && bcrypt.compareSync(pswd, usuario.pswd)) {
            //si coinciden se nos devuelven los datos del usuario
              return usuario;
          }
          //sino nos muestra que son incorrectos 
          else {
              throw "email o contraseña incorrectos";
          }
      })
      .then(usuario => {
          response.token = jsonwebtoken.sign(
              {
                  expiredAt: new Date().getTime() + expiredAfter,
                  email,
                  nom: usuario.nombre,
                  id: usuario.id,
                  admin: usuario.admin
                  
              },
              secretKey
          );
          response.ok = true;

          res.json(response);
      })
      .catch(err => res.status(400).json({ ok: false, msg: err }))

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
