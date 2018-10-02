const axios = require('axios');
const mongoose = require("mongoose");
const Race = mongoose.model('races');

const BASE_URL = 'http://api.sportradar.us/cycling-t1/en/stages/sr:stage:@@@/summary.json';
const API_KEY = 'gddfnj6ve2g64u4hgfd99c5b';
const proxyurl = "https://cors-anywhere.herokuapp.com/";

module.exports = app => {
    app.get("/api/race/getrace", async (req, res) => {
        const { raceId } = req.query;
        const raceInfoApiUrl = BASE_URL.replace('@@@', raceId) + '?api_key=' + API_KEY;
        console.log('raceUrl: ' + raceInfoApiUrl);

        const response = await axios({
            url: /* proxyurl +  */raceInfoApiUrl,
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Access-Control-Allow-Origin': '*',
            }
        });

        if (response.status === 200) {
            const raceInfo = response.data;
            console.log('race name: ', raceInfo.stage.race.name);
            const race = new Race({
                raceInfo: {
                    apiRaceId: raceId,
                    raceName: raceInfo.stage.race.name,
                    stage: raceInfo.stage.name,
                    date: raceInfo.stage.scheduled,
                    distance: raceInfo.stage.course.distance,
                    departureCity: raceInfo.stage.course.departure_city,
                    arrivalCity: raceInfo.stage.course.arrival_city,
                    classification: raceInfo.stage.course.classification,
                },
                competitors: raceInfo.competitors.map(comp => {
                    return {
                        name: comp.name,
                        nationality: comp.nationality,
                        team: comp.team.name,
                    }
                }),
                results: []
            });
            try {
                await race.save();
                res.send({ message: "new race saved" });
            }
            catch (error) {
                res.status(420).send(error);
            }
        }
    })
}