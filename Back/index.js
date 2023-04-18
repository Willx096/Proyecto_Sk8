import express from "express";
import cors from "cors"

import indexRutas from "./Rutas/indexRutas.js";
import usuarioRuta from "./Rutas/usuarioRuta.js";
import eventoRuta from "./Rutas/eventoRuta.js"
import participacionRuta from "./Rutas/participacionRuta.js"

const app = express();

app.use(cors())
app.use(express.json());

app.use('/', indexRutas);

app.use('/api/usuarios', usuarioRuta)

app.use('/api/eventos', eventoRuta)

app.use('/api/participacion', participacionRuta)

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`La api esta escuchando en el puerto ${PORT}.`))
