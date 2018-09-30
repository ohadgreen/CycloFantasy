const mongoose = require('mongoose');
const { Schema } = mongoose;

const competitorSchema = new Schema({
    name: String,
    nationality: String,
    team: String,
});

module.exports = competitorSchema;