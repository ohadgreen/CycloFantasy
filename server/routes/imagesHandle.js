const mongoose = require("mongoose");
const { Schema } = mongoose;
const fs = require('fs');
const path = require('path');

const Image = new Schema({
    name: String,
    data: Buffer,
    contentType: String
});

const myImage = mongoose.model('images', Image);

module.exports = app => {
    app.post("/api/image", async (req, res) => {
        const name = req.body.name;
        const imagePath = path.resolve(__dirname, `../resource/images/${name}.jpg`);
        console.log('image name: ', name);

        const imageFile = fs.readFileSync(imagePath, (err, info) => { console.log('image file read') });

        const image = new myImage({            
            name: `${name}.jpg`,
            contentType: 'image/jpg',
            data: imageFile,
        });

        try {
            await image.save();
            res.send({ message: "new image saved" });
        }
        catch (error) {
            console.log('error ' + error.message);
            res.status(420).send(error);
        }
    });

    app.get('/api/image/:name', function (req, res, next) {
        const imgDbName = req.params.name + ".jpg";
        console.log('req image name: ' + imgDbName);
        myImage.findOne({ "name": imgDbName }, function (err, image) {

            if (err) return next(err);
            else{
                console.log('found image ' + image.name);
                console.log('image contentType ' + image.contentType);
                // let imageDisplay = team.image.data.toString('base64');
                res.contentType('image/jpg');
                res.send(image.data);
            }

        });
    });

    app.get("/api/image/test", function (req, res, next) {
        res.send({ message: 'test image api' });

    });

}