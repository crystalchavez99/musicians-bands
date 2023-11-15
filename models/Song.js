const {sequelize, DataTypes} = require('../db');

// TODO - define the Song model
let Song;
Song = sequelize.define('Song', {
    title: DataTypes.STRING,
    year: DataTypes.INTEGER,
    length: DataTypes.INTEGER
})

Song.prototype.getLongestSong = async () => {
    const allSongs = await Song.findAll()
    let longestSong = allSongs[0]
    allSongs.map((song) => {
        if (song.length > longestSong.length) {
            longestSong = song
        }
    })
    console.log(JSON.stringify(longestSong))
    // console.log(allSongs)
}


module.exports = {
    Song
};