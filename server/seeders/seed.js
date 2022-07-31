const db = require('../config/connection');
const { User, Ad } = require('../models');
const userSeeds = require('./userSeeds.json');
const adSeeds = require('./adSeeds.json');

db.once('open', async () => {
    try {
        await Ad.deleteMany({});
        await User.deleteMany({});

        await User.create(userSeeds);

        for (let i = 0; i < adSeeds.length; i++) {
            const { _id, adAuthor } = await Ad.create(adSeeds[i]);
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