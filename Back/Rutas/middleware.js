import jsonwebtoken from "jsonwebtoken";
import { secretKey } from "./loginconfig.js";

//Para evitar que alguien lo autorizado entre a la ruta qe quieran
export const autentica = (req, res, next) => {
  let token = req.headers.authorization || "";
  if (!token) {
    res.status(400).json({ ok: false, error: "token ausente" });
  }
  jsonwebtoken.verify(token, secretKey, (error, decoded) => {
    if (error) {
      res.status(400).json({ ok: false, error: "token invalido" });
    } else {
      const { expiredAt } = decoded;
      if (expiredAt > new Date().getTime()) {
        next();
      } else {
        res.status(400).json({ ok: false, error: "token caducado" });
      }
    }
  });
};
