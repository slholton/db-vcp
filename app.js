require('dotenv').config()
const express = require('express')
const app = express()
const port = 3000

;(async () => {
    app.use(express.json())

    // CRUD for User
    const auth = require('./controllers/Auth') 
    app.use("/auth", auth)

    // CRUD for Videos
    const video = require('./controllers/VideoController') 
    app.use("/videos", video)

    // CRUD for Playlists
    const playlist = require('./controllers/PlaylistController') 
    app.use("/playlists", playlist)

    app.listen(port, () => {
        console.log(`App is listening on http://localhost:${port}`)
    })
})()