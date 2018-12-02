const keys = require('../../config/keys');
var mongoose = require('mongoose');
// mongoose.connect(keys.mongoURI);
var conn = mongoose.connection;
var multer = require('multer');
var GridFsStorage = require('multer-gridfs-storage');
var Grid = require('gridfs-stream');
var db = mongoose.connection.db;
Grid.mongo = mongoose.mongo;
// var gfs = new Grid('cyclo-dev', Grid.mongo);


module.exports = app => {
    /** Setting up storage using multer-gridfs-storage */
    var storage = GridFsStorage({
        gfs: gfs,
        filename: function (req, file, cb) {
            var datetimestamp = Date.now();
            cb(null, file.fieldname + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length - 1]);
        },
        /** With gridfs we can store aditional meta-data along with the file */
        metadata: function (req, file, cb) {
            cb(null, { originalname: file.originalname });
        },
        root: 'ctFiles' //root name for collection to store files into
    });

    var upload = multer({ //multer settings for single upload
        storage: storage
    }).single('file');

    /** API path that will upload the files */
    app.post('/upload', function (req, res) {
        upload(req, res, function (err) {
            if (err) {
                res.json({ error_code: 1, err_desc: err });
                return;
            }
            res.json({ error_code: 0, err_desc: null });
        });
    });

    app.get('/api/file/:filename', function (req, res) {
        gfs.collection('images-java'); //set collection name to lookup into

        const myFile = req.params.filename;
        /** First check if file exists */
        gfs.files.find({ filename: myFile }).toArray(function (err, files) {
            if (!files || files.length === 0) {
                return res.status(404).json({
                    responseCode: 1,
                    responseMessage: "error"
                });
            }
            else
                console.log('file found ' + myFile);
                
            /** create read stream */
            var readstream = gfs.createReadStream({
                filename: files[0].filename,
                root: "ctFiles"
            });
            /** set the proper content type */
            res.set('Content-Type', files[0].contentType)
            /** return response */
            return readstream.pipe(res);
        });
    });   
}