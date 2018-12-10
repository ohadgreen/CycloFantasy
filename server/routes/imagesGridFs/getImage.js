const path = require('path');
const fs = require('fs');

// const reqParams = {team: 'ag2r-la-mondiale', normName: 'alexandre-geniez'};
module.exports = app => {
    app.get("/api/image/rider", (req, res) => {
        const { team, normName } = req.query;
        const imageFilePath = `../../resources/images/riders/${team}/${ normName }.png`;
        const imgPath = path.resolve(__dirname, imageFilePath);

        try {
            if (fs.existsSync(imgPath)) {
                res.sendFile(imgPath);
            }
            else{
                res.send({ error: 'no image for ' + normName })
            }
        } catch (err) {
            console.error(err);
            res.send({ error: 'no image' })
        }
    });
}