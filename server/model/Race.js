const mongoose = require('mongoose');
const { Schema } = mongoose;
const competitorSchema = require('./Competitor');
const teamSchema = require('./Team');

const raceSchema = new Schema({
    isActive: Boolean,
    hasResults: Boolean,
    raceInfo: {
        apiRaceId: String,
        raceName: String,
        stage: String,
        date: Date,
        distance: String,
        departureCity: String,
        arrivalCity: String,
        classification: String,
    },
    teamsRiders: [{
        team: teamSchema,
        riders: [{
            normName: String,
            displayName: String,
        }]
    }],
    riderResults: [{
        dbid: String,
        srid: String,
        rank: Number
    }],
    bets: [{
        user: String,
        ridersChoice: [{
            dbid: String,
            rank: Number,
        }]
    }]
});
mongoose.model('races', raceSchema);