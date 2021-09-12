// ADD ALL ENDPOINTS TO: CRUD for Playlists

const Express = require("express");
const router = Express.Router();

router.get('/playlists', (req, res) => {
    res.send('Hey!! This is a playlist practice route!')
});

module.exports = router;