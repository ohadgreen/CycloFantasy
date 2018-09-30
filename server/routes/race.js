const mongoose = require("mongoose");
const Race = mongoose.model("races");

module.exports = app => {

    app.get("/api/race/stage", async (req, res) => {
        const { stageNum } = req.query;
        let errorMsg;

        const stage = await Race.findOne({ 'stage': stageNum });
        if (!stage) {
            errorMsg = 'stage not found on db';
            console.log(errorMsg);
            res.send({ error: errorMsg });
        }
        else {
            res.send(stage);
        }
    })

}