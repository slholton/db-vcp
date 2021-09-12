require('dotenv').config()
const Express = require('express')
const app = Express()
const port = 3000

;(async () => {
    app.use(Express.json())

    // CRUD for User
    const auth = require('./controllers/Auth') 
    app.use("/user", auth)

    // CRUD for Videos
    const video = require('./controllers/VideoController') 
    app.use("/videos", video)

    // CRUD for Playlists
    const playlist = require('./controllers/PlaylistController') 
    app.use("/playlists", playlist)

    app.listen(port, () => {
        console.log(`Example app listening at http://localhost:${port}`)
    })

})()