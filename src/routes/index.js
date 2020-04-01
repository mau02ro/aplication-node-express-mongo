const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('hola index');
});

router.get('/about', (req, res) => {
    res.send('Hola about');
})

module.exports = router;