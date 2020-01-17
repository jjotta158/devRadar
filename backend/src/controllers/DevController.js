const Dev = require('../models/Dev');
const axios  = require('axios');
const parseStringAsArray = require('../utils/parseStringAsArray');

module.exports = {
    async store(req,res) {
        const { github_username, techs, latitude, longitude } = request.body;
        let dev = await Dev.findOne({github_username});

        if (!dev) {
            const apiResponse = await axios.get(`https://api.github.com/users/${github_username}`);
            const { name = login , avatar_url, bio } = apiResponse.data;
            const techsArray = parseStringAsArray(techs);
            const location = {
                type:'Point',
                coordinates:[longitude, latitude],
            }
            dev = await Dev.create({
                github_username,
                name,
                avatar_url,
                bio,
                techs:techsArray,
                location
            })
        }

        return res.json({dev})
    },

    async index(req, res) {
        const dev = await Dev.find();
        return res.json({dev});
    }
}
