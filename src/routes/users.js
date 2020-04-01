const express = require('express');
const router = express.Router();

router.get('/users/signin', (req, res) => {
    res.send('Hola signin');
})

router.get('/users/signup', (req, res) => {
    res.send('Hola signup');
})

module.exports = router;