let express = require('express')
let router = express.Router()

// ADD ALL ENDPOINTS TO: Reads and Deletes Videos & Playlists
router.get("", (req, res) => {
    res.send("Hello World")
})

module.exports = router