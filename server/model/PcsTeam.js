const mongoose = require('mongoose');
const { Schema } = mongoose;

const teamSchema = new Schema({
    sportRadarId: String,
    displayName: String,
    normName: String,
    classification: String,
    pageUrl: String,
});

mongoose.model('teams', teamSchema);