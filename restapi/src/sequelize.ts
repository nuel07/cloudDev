import { Sequelize } from 'sequelize-typescript';
import { config } from './config/config';

const c = config.dev;

//instantiating a new sequelize instance
export const sequelize = new Sequelize({
    "username": c.username,
    "password": c.password,
    "database": c.database,
    "host": c.host,

    dialect: 'postgres',
    storage: ':memory',

});