// levels.js

import express from 'express'
const levels = express.Router();

levels.get('/level-:id', (req, res) => {
    const currentUser = req.user;
    console.log(req.user);
    console.log(currentUser);
    res.render(`levels/${req.params.id}`, { currentUser })
})

export default levels;
