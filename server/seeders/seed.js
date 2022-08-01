const db = require('../config/connection');
const { Sport, User, Ad } = require('../models');
const userSeeds = require('./userSeeds.json');
const adSeeds = require('./adSeeds.json');
const sportSeeds = require('./sportSeeds.json');


db.once('open', async () => {
    try {
        await Sport.deleteMany({});
        await User.deleteMany({});
        await Ad.deleteMany({});


        await User.create(userSeeds);
        await Sport.create(sportSeeds);
        // const User = await User.insertMany(schoolData);
        // const Sport = await Sport.insertMany(classData);
        // const Ad = await Ad.insertMany(professorData);


        for (let i = 0; i < adSeeds.length; i++) {
            const { _id, adAuthor, sportName } = await Ad.create(adSeeds[i]);

            const sport = await Sport.findOneAndUpdate(
                { name: sportName },
                {
                    $addToSet: {
                        ads: _id,
                    },
                }
            );
            const user = await User.findOneAndUpdate(
                { username: adAuthor },
                {
                    $addToSet: {
                        ads: _id,
                    },
                }
            );
        }
    } catch (err) {
        console.error(err);
        process.exit(1);
    }

    console.log('all done!');
    process.exit(0);
});
