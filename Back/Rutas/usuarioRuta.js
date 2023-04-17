import express from "express";
import { sequelize } from "../loadSequelize.js";
import { Usuario } from "../Modulos/moduls.js";
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

export default router;
