var express = require('express');
var bodyParser = require('body-parser');
var router = express.Router();
var app = express();
app.use('/', router);

const app = express();
const port = process.env.PORT || 5000;

app.get('/api/hello', (req, res) => {
    res.send({ msg: 'Hello From Express' });
});

app.listen(port, () => console.log(`Listening on port ${port}`));