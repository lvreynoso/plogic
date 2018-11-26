// index.js

import express from 'express'
const index = express.Router()

index.get('/', (req, res) => {
    const currentUser = req.user;
    console.log(req.user);
    console.log(currentUser);
    res.render('index', { currentUser })
})

index.get('/symbols', (req, res) => {
    const currentUser = req.user;
    console.log(req.user);
    console.log(currentUser);
    res.render('test/symbols', { currentUser })
})

export default index;
