"use strict";
const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = new Sequelize('disneyApp2', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
});
module.exports = { sequelize, DataTypes, Model };
//# sourceMappingURL=connection.js.map