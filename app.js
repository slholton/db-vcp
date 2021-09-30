require('dotenv').config()
const Express = require("express")
const app = Express()
const port = 3000

app.use(require('./middleware/headers'));

    ; (async () => {
        app.use(Express.json())

        const cors = require('cors');
        // app.use(require('./middleware/headers'));
        app.use(cors());

        // CRUD for User
        const auth = require('./controllers/Auth')
        app.use("/user", auth)

        // CRUD for Videos
        const video = require('./controllers/Video')
        app.use("/videos", video)

        // CRUD for Playlists
        const playlist = require('./controllers/Playlist')
        app.use("/playlists", playlist)

        app.listen(port, () => {
            console.log(`App is listening on http://localhost:${port}`)
        })
    })()