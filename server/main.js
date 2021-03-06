const express = require('express');
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const router = express.Router();
require('./model/User');
require('./model/Race');
require('./model/Team');
require('./model/Rider');
const keys = require('./config/keys');

mongoose.connect(keys.mongoURI);

const app = express();
app.use('/', router);

app.use(bodyParser.urlencoded({
    extended: true,
}));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));

require('./routes/auth')(app);
require('./routes/race')(app);
require('./batchTasks/insertRaceData')(app);
require('./batchTasks/insertRaceData')(app);
require('./routes/imagesGridFs/imagesHandle')(app);
require('./routes/imagesGridFs/getImage')(app);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}`));

router.get('/api/hello', (req, res) => {
    res.send({ msg: 'Hello From Express' });
})