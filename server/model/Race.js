const mongoose = require('mongoose');
const { Schema } = mongoose;

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
    riders: [{ type: Schema.Types.ObjectId, ref: 'riders' }],
    riderResults: [{
        rider: { type: Schema.Types.ObjectId, ref: 'Rider' },
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