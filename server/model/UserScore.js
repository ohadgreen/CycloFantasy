const mongoose = require("mongoose");
const { Schema } = mongoose;

const raceSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "users" },
  races: [
    {
      race: { type: Schema.Types.ObjectId, ref: "races" },
      score: Number
    }
  ],
  totalScore: Number
});
mongoose.model("users-scores", raceSchema);
