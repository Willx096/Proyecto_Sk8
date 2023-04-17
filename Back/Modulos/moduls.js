import { dataType, sequelize } from "../loadSequelize.js";

export const Usuario = sequelize.define('Usuario', {
    nombre: dataType.STRING,
    apellido: dataType.STRING,
    email: dataType.STRING,
    nivel: dataType.STRING,
    fecha_nacimiento: dataType.DATE,

} , {tablename: 'usuarios', timestamps: false})