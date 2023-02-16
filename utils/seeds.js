const connection = require('../config/connection');

const { User, Dahlias } = require('../models')

const dahliaData = [
    {
        name: "Super",
        primaryColor: "blue",
        secondaryColor: "red",
        size: 8,
        have: yes,
        want: no
    },
    {
        name: "Super",
        primaryColor: "blue",
        secondaryColor: "red",
        size: 8,
        have: yes,
        want: no
    },
]


connection.on('error', (err) => err);


connection.once('open', async () => {
    console.log('connected');

    // Drop existing users
    await User.deleteMany({});

    await Dahlias.deleteMany({})


    await Dahlias.collection.insertMany(dahliaData)

    await User.collection.insertOne({
        username: 'DianS',
        email: "dian@diansemail.com",
        dahliaData: [...dahliaData.map(dahliaData=> dahliaData_id)]
    });



    // Log out the seed data to indicate what should appear in the database
    console.table(dahlias);
    console.info('Seeding complete! 🌱');
    process.exit(0);
});