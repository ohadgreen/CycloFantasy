const mongoose = require('mongoose');
const { Schema } = mongoose;

const riderSchema = new Schema({
    sportRadarId: String,
    displayName: String,
    normName: String,
    nationality: String,
    team: String,
    pageUrl: String,
    age: String,
    height: String,
    weight: String,
    grandTours: Number,
    classicRaces: Number,
    proWins: Number
});

mongoose.model('riders', riderSchema);