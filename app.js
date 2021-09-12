require('dotenv').config()
const express = require('express')
const app = express()
const port = 3000

;(async () => {
    app.use(express.json())

    // Reads and Deletes Videos & Playlists
    const auth = require('./controllers/Auth') 
    app.use("/auth", auth)

    // Creates Videos & Playlists
    const insert = require('./controllers/Insert') 
    app.use("/insert", insert)

    // Updates Videos & Playlists
    const update = require('./controllers/Update') 
    app.use("/update", update)

    app.listen(port, () => {
        console.log(`Example app listening at http://localhost:${port}`)
    })
})()