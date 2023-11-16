const { sequelize } = require('./db');
const { Band, Musician, Song } = require('./index')



describe('Band, Musician, and Song Models', () => {
    /**
     * Runs the code prior to all tests
     */
    beforeAll(async () => {
        // the 'sync' method will create tables based on the model class
        // by setting 'force:true' the tables are recreated each time the 
        // test suite is run
        await sequelize.sync({ force: true });
        const seedSongs = async () => { 
            await Song.bulkCreate([
            {title: "Claire de lune", year: 1960, length: 600},
            {title: "Oklahoma Home", year: 1960, length: 300},
            {title: "Hesitation Blues", year: 1930, length: 200}
            ])}
        seedSongs()
    })

    test('can create a Band', async () => {
        const testBand = await Band.create({name: "The Heliocentrics", genre: "Ethio-Jazz"})
        expect(testBand.name).toBe("The Heliocentrics");
    })

    test('can create a Musician', async () => {
        const testMusician = await Musician.create({name: "Lucio Battisti", instrument: "Guitar"})
        expect(testMusician.instrument).toBe("Guitar");
    })
 
    test('can create a Song', async () => {
        const testSong = await Song.create({title: "Love Song of the Waterfall", year: 1960, length: 300})
        expect(testSong.title).toBe("Love Song of the Waterfall");
    })

    test('can update a Band', async () => {
        const testBand = await Band.create({name: "The Heliocentrics", genre: "Ethio-Jazz"})
        testBand.update({genre: "Jazz"})
        expect(testBand.genre).toBe("Jazz");
    })
// ----------------- up till

    test('can update a Musician', async () => {
        const testMusician = await Musician.create({name: "Thundercat", instrument: "Bass"})
        testMusician.update({instrument: "triangle"});
        expect(testMusician.instrument).toBe("triangle");
    })

    test('can update a Song', async () => {
        const testSong = await Song.create({title: "Battle of Queenstown", year: 1950, length: 200})
        testSong.update({length: 175})
        expect(testSong.length).toBe(175);
    })

    test('can delete a Band', async () => {
        const del = await Band.destroy({where: {id: 1}});
        expect(del).toBe(1);
    })

    test('can delete a Musician', async () => {
        // const testMusician = await Musician.create({name: "test", instrument: "idk"})
        // const del = await Musician.destroy({where: {name: 'test'}});
        const del = await Musician.destroy({where: {id: 1}});
        // const invalid = await Musician.findOne({where: {name: 'test'}});
        // console.log(invalid)
        // expect(invalid).toBeFalsy();
        expect(del).toBe(1);
    })

    test('can delete a Song', async () => {
        const del = await Song.destroy({where: {title: "Love Song of the Waterfall"}})
        expect(del).toBe(1);
    })

    test('returning string', async () => {
        await Song.prototype.getLongestSong()
    })

    test('Band and Musician tables have correct association', async () => {
        const bands = await Band.findAll();
        const band = bands[0];

        const musician = await Musician.findOne({where : {name : 'Thundercat'}, include: Band});
        await band.addMusicians(musician);
        // console.log(JSON.stringify(musician, null, 2));
        const musicians = await band.getMusicians();
        expect(musicians[0].dataValues).toHaveProperty('BandId');
    })
})
