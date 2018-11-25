const mongoose = require("mongoose");
require('../model/Rider');
const Race = mongoose.model("races");

module.exports = app => {
    app.get("/api/race/active", async (req, res) => {
        let errorMsg;
        const stage = await Race.findOne({ isActive: true, hasResults: false }).populate('riders');
        if (!stage) {
            errorMsg = 'stage not found on db';
            console.log(errorMsg);
            res.send({ error: errorMsg });
        }
        else {
            res.send(stage);
        }
    });

    app.get("/api/race/stage", async (req, res) => {
        const { raceId } = req.query;
        console.log('req.query', req.query);
        
        let errorMsg;

        const stage = await Race.findOne({ 'raceInfo.stage': raceId });
        if (!stage) {
            errorMsg = 'stage not found on db';
            console.log(errorMsg);
            res.send({ error: errorMsg });
        }
        else {
            res.send(stage);
        }
    });
}