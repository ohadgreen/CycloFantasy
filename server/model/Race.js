const mongoose = require('mongoose');
const { Schema } = mongoose;
const competitorSchema = require('./Competitor');

const raceSchema = new Schema({
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
    competitors: [competitorSchema],
    results: [{
        competitor: competitorSchema,
        rank: Number
    }]
});
mongoose.model('races', raceSchema);