import { Sequelize, DataTypes } from 'sequelize';
import { config } from 'dotenv';
config();

export const sequelize = new Sequelize(process.env.DBNAME, process.env.DBUSER, process.env.DBPASSWORD, {
    host: process.env.DBENVIROMENT,
    dialect: process.env.DBDIALECT,
});

export const Book = sequelize.define('Book', {
    title: DataTypes.STRING,
    author: DataTypes.ARRAY(DataTypes.STRING),
    isbn: DataTypes.STRING,
    genre: DataTypes.ARRAY(DataTypes.STRING),
});

await Book.sync({ force: true });

