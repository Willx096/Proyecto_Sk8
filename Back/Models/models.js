import { dataType, sequelize } from "../loadSequelize.js";

export const Usuario = sequelize.define('Usuario', {
    nombre: dataType.STRING,
    apellido: dataType.STRING,
    email: dataType.STRING,
    nivel: dataType.STRING,
    fecha_nacimiento: dataType.DATE,
    pswd: dataType.STRING,
    experiencia: dataType.INTEGER,
    foto: dataType.STRING,
    descripcion: dataType.STRING,
    nickname: dataType.STRING,
    contacto: dataType.STRING,
    admin: dataType.INTEGER

} , {tableName: 'usuarios', timestamps: false})

export const Evento = sequelize.define('Evento', {
    titulo: dataType.STRING,
    descripcion: dataType.STRING,
    fecha: dataType.DATE,
    hora: dataType.TIME,
    latitud: dataType.DECIMAL(11,7),
    longitud: dataType.DECIMAL(11,7),
    nivel: dataType.STRING,
    participantes: dataType.INTEGER,
    direccion : dataType.STRING

} , {tableName: 'eventos', timestamps: false})

export const Participacion = sequelize.define('Participacion', {
    id_evento: dataType.INTEGER,
    id_usuario: dataType.INTEGER,
    valoracion: {
        type: dataType.STRING,
        allowNull: true,
    },
    puntuacion: {
        type: dataType.INTEGER,
        allowNull: true,
    }

} , {tableName: 'participaciones', timestamps: false})

export const FotosEvento = sequelize.define('FotosEvento', {
    id_evento: dataType.INTEGER,
    id_usuario: dataType.INTEGER,
    fotos: dataType.STRING

} , {tableName: 'fotoseventos', timestamps: false})