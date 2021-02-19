const express = require('express');
const {homeRender} = require('../controller/homeController');
const verifyUser = require('../middleware/verifyUser');

const router = express.Router();

router.get('/home', verifyUser, homeRender);

router.get('/logout', (req, res) => {
    res.clearCookie('jwtToken').redirect('/login');
})

module.exports = router;