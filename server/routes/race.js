const mongoose = require("mongoose");
require('../model/Rider');
const Race = mongoose.model("races");

module.exports = app => {
    app.get("/api/race/active", async (req, res) => {
        let errorMsg;
        const race = await Race.findOne({ isActive: true, hasResults: false }).populate('riders');
        console.log(race.raceInfo.raceName);
        if (!race) {
            errorMsg = 'stage not found on db';
            console.log(errorMsg);
            res.send({ error: errorMsg });
        }
        else {
            res.send(race);
        }
    });

    app.get("/api/race/bydate", async (req, res) => {
        const { year, month, day } = req.query;
        const dateConcat = `${year}-${month}-${day}T00:00:00.000Z`;
        let errorMsg;
        const race = await Race.findOne({ 'raceInfo.date': { '$gte': new Date(dateConcat) } }).populate('riders');
        if (!race) {
            errorMsg = 'stage not found on db';
            console.log(errorMsg);
            res.send({ error: errorMsg });
        }
        else {
            res.send(race);
        }
    });
}