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
    })

    test('can create a Band', async () => {
        const testBand = await Band.create({name: "The Heliocentrics", genre: "Ethio-Jazz"})
        expect(testBand.name).toBe("The Heliocentrics");
    })

    test('can create a Musician', async () => {
        const testMusician = await Musician.create({name: "Lucio Battisti", instrument: "Guitar"})
        expect(testMusician.instrument).toBe("Guitar");
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
})