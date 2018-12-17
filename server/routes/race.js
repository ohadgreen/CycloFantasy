const mongoose = require("mongoose");
require('../model/Rider');
const Race = mongoose.model("races");

module.exports = app => {
    app.get("/api/race/active", async (req, res) => {
        let errorMsg;
        const race = await Race.findOne({ isActive: true, hasResults: false }).populate('riders');
        if (!race) {
            errorMsg = 'stage not found on db';
            console.log(errorMsg);
            res.send({ error: errorMsg });
        }
        else {
            raceRes = { race: race, raceid: race._id };
            res.send(race);
        }
    });

    app.get("/api/race/homepage", async (req, res) => {
        let errorMsg;
        const activeRace = await Race.findOne({ isActive: true, hasResults: false })
        .select({ "raceInfo": 1, "bets": 1 })
        .populate({ path: "bets.user" })
        .populate({ path:  "bets.ridersChoice.rider"});

        if (!activeRace) {
            errorMsg = 'cannot find race';
            console.log(errorMsg);
            res.send({ error: errorMsg });
        }
        else {
            res.send(activeRace);
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

    app.post("/api/race/addbet", async (req, res) => {
        const { raceid, user, ridersChoice } = req.query;

        let dbRidersChoice = [];
        ridersChoice.map((rc, i) => {
            let choice = { rider: mongoose.Types.ObjectId(JSON.parse(rc).rider), rank: JSON.parse(rc).rank };
            console.log('rc parse rank ' + JSON.parse(rc).rank +  'rider ' + JSON.parse(rc).rider);
            dbRidersChoice.push(choice);
        });

        let dbBet = {
            user: mongoose.Types.ObjectId(user),
            ridersChoice: dbRidersChoice
        };
        console.log('db bet: ' + JSON.stringify(dbBet));

        try {
            const updateResult = await Race.findOneAndUpdate(
                { _id: raceid },
                { $push: { bets: dbBet } }
            );
            if(updateResult){
            // console.log(updateResult);
            res.send({ msg: 'update done' });
            }
            else {
                res.send({ error: 'add bet failed' })
            }
        }
        catch (err) {
            console.log(err);
            res.send({ error: err })
        }
    });

    app.post("/api/race/posttest", async (req, res) => {
        console.log('test req.query: ' + JSON.stringify(req.query));
        console.log(req.query.t1);

        res.send({ msg: 'test complete' });
    });
}