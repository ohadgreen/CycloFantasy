const mongoose = require("mongoose");
const Team = mongoose.model('teams');
const fs = require('fs');
const path = require('path');

module.exports = app => {
    app.post("/api/team/insert", async (req, res) => {
        const name = req.body.name;
        const imagePath = path.resolve(__dirname, `../resource/images/${name}.jpg`);
        console.log('team name: ', name);
        
        const imageFile = fs.readFileSync(imagePath, (err, info) => {console.log('image file read') });

        const team = new Team({
            sportRadarId: '4567',
            displayName: name,
            normName: name.toLowerCase(),
            group: 'first',
            image: {
                name: `'${name}.jpg'`,
                contentType: 'image/jpg',
                data: imageFile,
            }
        });
        // console.log(JSON.stringify(team));
        
        try {
            await team.save();
            res.send({ message: "new team saved" });
        }
        catch (error) {
            console.log('error ' + error.message);
            res.status(420).send(error);
        }        
    });
}