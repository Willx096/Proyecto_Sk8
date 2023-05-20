import config from "./config/config.js";

import { DataTypes, Sequelize } from "sequelize";

export const sequelize = new Sequelize (
    config.database,
    config.username,
    config.password,
    {
        host: config.host,
        port: config.port,
        dialect: config.dialect,
    }
);
    
export const dataType = DataTypes;