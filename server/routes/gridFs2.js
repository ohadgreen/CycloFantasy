var express = require('express');
var mongoose = require('mongoose');
var gridfs = require('gridfs-stream');
var fs = require('fs');
const path = require('path');
const keys = require('../config/keys');

var app = express();
/*
	Make a MongoDB connection
*/
mongoose.connect(keys.mongoURI);
mongoose.Promise = global.Promise;

gridfs.mongo = mongoose.mongo;
/*
	Check MongoDB connection
*/
var connection = mongoose.connection;
connection.on('error', console.error.bind(console, 'connection error:'));

connection.once('open', () => {
    var gfs = gridfs(connection.db);
    
    app.get('/', (req, res) => {
        res.send('Download/Upload GridFS files to MongoDB <br>- by grokonez.com');
    });

    // Upload a file from loca file-system to MongoDB
    app.get('/api/file/upload', (req, res) => {
        console.log('upoad route');
        
        const name = req.query.name;
        const imagePath = path.resolve(__dirname, `../resource/images/${name}.jpg`);
        console.log('image name: ', name);

        // const imageFile = fs.readFileSync(imagePath, (err, info) => { console.log('image file read') });

        var writestream = gfs.createWriteStream({ filename: name });
        fs.createReadStream(imagePath).pipe(writestream);
        writestream.on('close', (file) => {
            res.send('Stored File: ' + file.filename);
        });
    });

    // Download a file from MongoDB - then save to local file-system
    app.get('/api/file/download', (req, res) => {
        // http://localhost:8081/api/file/download/?filename=team-sky

        var filename = req.query.filename;

        gfs.exist({ root: 'images-java', filename: filename }, (err, file) => {
            if (err || !file) {
                res.status(404).send('File Not Found');
                return
            }

            var readstream = gfs.createReadStream({ filename: filename, root: 'images-java' });
            readstream.pipe(res);
        });
    });

    // Get file information(File Meta Data) from MongoDB
    app.get('/api/file/meta', (req, res) => {

        var filename = req.query.filename;

        gfs.exist({ filename: filename }, (err, file) => {
            if (err || !file) {
                res.send('File Not Found');
                return;
            }

            gfs.files.find({ filename: filename }).toArray((err, files) => {
                if (err) res.send(err);
                res.json(files);
            });
        });
    });

    var server = app.listen(8081, () => {

        var host = server.address().address
        var port = server.address().port

        console.log("App listening at http://%s:%s", host, port);
    });

});