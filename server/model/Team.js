const mongoose = require('mongoose');
const { Schema } = mongoose;

const teamSchema = new Schema({
    sportRadarId: String,
    displayName: String,
    normName: String,
    group: String,
    image: {
        $type: String,
        data: Buffer,
    }
});

mongoose.model('teams', teamSchema);