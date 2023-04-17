import express from "express";

import indexRutas from "./Rutas/indexRutas.js";
import usuarioRuta from "./Rutas/usuarioRuta.js";

const app = express();

app.use(express.json());

app.use('/api/usuarios', usuarioRuta)

app.use('/', indexRutas);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`La api esta escuchando en el puerto ${PORT}.`))
