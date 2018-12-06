// playground.js

import express from 'express'
const playground = express.Router()

playground.get('/playground', (req, res) => {
    const currentUser = req.user;
    console.log(req.user);
    console.log(currentUser);
    res.render('playground', { currentUser })
})

export default playground;
