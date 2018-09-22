const express = require('express');
const router = express.Router();

module.exports = app => {
    app.use('/', router);
    router.get('/api/auth/test', function (req, res) { res.send({ msg: 'User auth test' })});
}