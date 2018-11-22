const mongoose = require('mongoose');
const gridfs = require('gridfs-stream');
const keys = require('../config/keys');
mongoose.connect(keys.mongoURI);
gridfs.mongo = mongoose.mongo;
let gfs;
const connection = mongoose.connection;
connection.on('error', console.error.bind(console, 'connection error:'));

module.exports = app => {

    connection.once('open', () => {
        gfs = gridfs(connection.db);
    })

    app.get('/api/file/download', (req, res) => {
        // http://localhost:8081/api/file/download/?filename=team-sky

        const filename = req.query.filename;

        console.log('conn:' + connection.db);
        console.log('filename:' + filename);
        
        gfs.exist({ root: 'images-java', filename: filename }, (err, file) => {
            if (err || !file) {
                res.status(404).send('File Not Found');
                return
            }

            var readstream = gfs.createReadStream({ filename: filename, root: 'images-java' });
            readstream.pipe(res);
        });
    });
    
}