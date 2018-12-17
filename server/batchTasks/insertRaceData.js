const axios = require('axios');
const mongoose = require("mongoose");
const Race = mongoose.model('races');
const Team = mongoose.model('teams');
const Rider = mongoose.model('riders');
const keys = require('../config/keys');
const apiRaceSample = require('../sampleData/raceScheduleSample');

const BASE_URL = 'http://api.sportradar.us/cycling-t1/en/stages/sr:stage:@@@/summary.json';

module.exports = app => {
    // should be ran once before grand tour or race once roster available
    app.post("/api/race/updatesrid", async (req, res) => {
        req.setTimeout(5000000);
        const { raceId } = req.query;
        // const raceDataRaw = apiRaceSample;
        const srRaceData = await fetchRaceData(raceId);
        const raceData = apiDataParser(srRaceData, raceId);

        const { teamRidersMap, teamsArray } = teamRidersToMap(raceData.competitors);

        let teamsNotFound = [];
        let ridersNotFoundAll = [];

        for (team of teamsArray) {
            console.log('updating team: ' + team.name);
            const teamNotFound = await updateSingleTeamSrId(team);
            const ridersNotFound = await updateRidersSrId(teamRidersMap.get(team.id));

            if (teamNotFound !== null) {
                teamsNotFound.push(teamNotFound);
            }
            const teamRidersNotFound = { team: team.name, riders: ridersNotFound };
            ridersNotFoundAll.push(teamRidersNotFound);
        }
        res.send({ teamsNotFound: teamsNotFound, ridersNotFoundAll: ridersNotFoundAll });
    });

    // assuming all riders and teams in race are available in teams and riders tables
    app.post("/api/race/insertriders", async (req, res) => {
        // 01-09-2018 stage 8 - 342727
        // 02-09-2018 stage 9 - 342729
        const { raceId } = req.query;
        const apiRaceData = await fetchRaceData(raceId);
        // const raceDataRaw = apiRaceSample;
        const raceData = apiDataParser(apiRaceData, raceId);
        const apiRaceRiders = raceData.competitors;

        let riderSrIdList = [];
        apiRaceRiders.map(rider => { riderSrIdList.push(rider.id) })
        let riderObjIdInDb = await Rider.find({ sportRadarId: {$in: riderSrIdList} });
        console.log(`found riders in db: ${riderObjIdInDb.length} ex: ${riderObjIdInDb[0]}`);

        const race = new Race({
            isActive: true,
            hasResults: false,
            raceInfo: raceData.raceInfo,
            riders: riderObjIdInDb,
            results: []
        });
        // console.log('race: ' + JSON.stringify(race));
        try {
            await race.save();
            res.send({ message: "new race saved" });
        }
        catch (error) {
            res.status(420).send(error);
        }
    });

    async function updateSingleTeamSrId(team) {
        const teamOnDb = await Team.findOne({ sportRadarId: team.id });
        if (!teamOnDb) {
            let teamNotFound;
            const teamNormName = normalizeName(team.name);
            const updateTeam = await Team.updateOne(
                { normName: { $regex: `.*${teamNormName}.*` } },
                { $set: { 'sportRadarId': team.id } },
            );
            // console.log(JSON.stringify(updateTeam));
            if (updateTeam.n !== 1) {
                teamNotFound = { displayName: team.name, normName: teamNormName, id: team.id }
            }
            return teamNotFound;
        }
    }

    function delay() {
        return new Promise(resolve => setTimeout(resolve, 1000))
    }

    async function updateTeamSrId(teams) {
        let totalToUpdate = 0;
        let updateSuccess = 0;
        let teamsNotFound = [];
        for (team of teams) {
            totalToUpdate++;
            const teamNormName = normalizeName(team.name);
            const updateTeam = await Team.updateOne(
                { normName: { $regex: `.*${teamNormName}.*` } },
                { $set: { 'sportRadarId': team.id } },
            );
            // console.log(JSON.stringify(updateTeam));
            if (updateTeam.n !== 1) {
                team.normName = teamNormName;
                teamsNotFound.push(team);
            }
            else {
                updateSuccess++;
            }
        }
        console.log(`update complete, total: ${totalToUpdate} success: ${updateSuccess}`);
        return teamsNotFound;
    }

    async function updateRidersSrId(riders) {
        let totalToUpdate = 0;
        let updateSuccess = 0;
        let ridersNotFound = [];
        for (rider of riders) {
            const riderOnDb = await Rider.findOne({ sportRadarId: rider.id });
            if (!riderOnDb) {
                totalToUpdate++;
                const riderNormName = normalizeName(reverseName(rider.name));
                const updateRider = await Rider.updateOne(
                    { normName: { $regex: `.*${riderNormName}.*` } },
                    { $set: { 'sportRadarId': rider.id } },
                );
                if (updateRider.n === 0) {
                    rider.normName = riderNormName;
                    ridersNotFound.push(rider);
                }
                else {
                    updateSuccess++;
                }
            }
            await delay();
        }
        console.log(`update complete, total: ${totalToUpdate} success: ${updateSuccess}`);
        return ridersNotFound;
    }
}

async function fetchRaceData(raceId) {
    const raceInfoApiUrl = BASE_URL.replace('@@@', raceId) + '?api_key=' + keys.sportsRadarApiKey;
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
        return response.data;
    }
    else {
        console.log('cannot fetch api race data');
        return null;
    }
}

function apiDataParser(apiData, raceId) {
    return {
        raceInfo: {
            apiRaceId: raceId,
            raceName: apiData.stage.race.name,
            stage: apiData.stage.name,
            date: apiData.stage.scheduled,
            distance: apiData.stage.course.distance,
            departureCity: apiData.stage.course.departure_city,
            arrivalCity: apiData.stage.course.arrival_city,
            classification: apiData.stage.course.classification,
        },
        competitors: apiData.competitors,
        results: apiData.results
    }
}

function teamRidersToMap(srTeamRidersData) {
    let teamsArray = [];
    let raceTeamRidersMap = new Map();
    srTeamRidersData.map(c => {
        const srTeamId = c.team.id;
        const srRider = {
            id: c.id,
            name: c.name
        };

        if (!raceTeamRidersMap.has(srTeamId)) {
            const riders = [];
            riders.push(srRider);
            raceTeamRidersMap.set(srTeamId, riders);
            const newTeam = {
                id: c.team.id,
                name: c.team.name
            };
            teamsArray.push(newTeam);
        }
        else {
            let riders = raceTeamRidersMap.get(srTeamId);
            riders.push(srRider);
            raceTeamRidersMap.set(srTeamId, riders);
        }
    });
    return { teamRidersMap: raceTeamRidersMap, teamsArray: teamsArray };
}

function normalizeName(displayName) {
    const lowerCaseName = displayName.trim().toLowerCase();
    return lowerCaseName.replace(new RegExp(' ', 'g'), '-').replace('---', '-').replace('--', '-');
}

function reverseName(apiName) {
    try {
        return apiName.split(',').reverse().join(' ');
    }
    catch (err) {
        console.log(err.text);
        return apiName.trim();
    }
};
