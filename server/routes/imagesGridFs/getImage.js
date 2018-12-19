const path = require('path');
const fs = require('fs');

// const reqParams = {team: 'ag2r-la-mondiale', normName: 'alexandre-geniez'};
module.exports = app => {
    app.get("/api/image/rider", (req, res) => {
        const { team, normName } = req.query;
        console.log(`${team} - ${normName}`);
        const riderImageFilePath = `../../resources/images/riders/${team}/${normName}.png`;
        const placeholderImageFilePath = '../../resources/images/misc/rider-placeholder.jpg';
        const riderImage = path.resolve(__dirname, riderImageFilePath);
        const placeholderImage = path.resolve(__dirname, placeholderImageFilePath);

        try {
            if (fs.existsSync(riderImage)) {
                res.sendFile(riderImage);
            }
            else{
                res.sendFile(placeholderImage)
            }
        } catch (err) {
            console.error(err);
            res.send({ error: 'no image' })
        }
    });
}