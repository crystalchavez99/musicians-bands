const {Sequelize, sequelize, DataTypes} = require('../db');

// TODO - define the Song model
let Song;
Song = sequelize.define('Song', {
    title: DataTypes.STRING,
    year: DataTypes.INTEGER,
    length: DataTypes.INTEGER
})

module.exports = {
    Song
};