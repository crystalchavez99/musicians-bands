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
        // TODO - test updating a musician
        expect('NO TEST').toBe('EXPECTED VALUE HERE');
    })

    test('can delete a Band', async () => {
        // TODO - test deleting a band
        expect('NO TEST').toBe('EXPECTED VALUE HERE');
    })

    test('can delete a Musician', async () => {
        // TODO - test deleting a musician
        expect('NO TEST').toBe('EXPECTED VALUE HERE');
    })
})