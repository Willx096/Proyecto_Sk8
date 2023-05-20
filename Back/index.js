import express from "express";
import cors from "cors";
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


import indexRutas from "./Rutas/indexRutas.js";
import usuarioRuta from "./Rutas/usuarioRuta.js";
import eventoRuta from "./Rutas/eventoRuta.js"
import participacionRuta from "./Rutas/participacionRuta.js"
import fotosEventoRuta from "./Rutas/fotosEventoRuta.js"


const app = express();


app.use(cors())

app.use(express.json());

app.use(express.static("fotos"))

app.use(express.static("fotosEvento"))

//app.use('/', indexRutas);

app.use('/api/usuarios', usuarioRuta)

app.use('/api/eventos', eventoRuta)

app.use('/api/participacion', participacionRuta)

app.use('/api/fotos-eventos', fotosEventoRuta)

app.use(express.static("../Front/dist"));

// Sirve el frontend ReactJS en cualquier ruta no definida anteriormente
// importante! no definir rutas en la API que apunten a "/", siempre a "/api/…"
// las rutas genéricas las tenemos que desviar al front
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'Front', 'dist', 'index.html'));
});




const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`La api esta escuchando en el puerto ${PORT}.`))
