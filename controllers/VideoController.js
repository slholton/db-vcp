// ADD ALL ENDPOINTS TO: CRUD for Videos

const Express = require("express");
const router = Express.Router();

router.get('/videos', (req, res) => {
    res.send('Hey!! This is a video practice route!')
});

module.exports = router;