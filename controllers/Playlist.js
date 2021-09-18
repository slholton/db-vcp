const Express = require("express");
const router = Express.Router();
let validateJWT = require("../middleware/validate-jwt");
const { Playlist } = require("../models");

router.get("/mine", validateJWT, async (req, res) => {
    const { id } = req.user;
    try {
        const userPlaylists = await Playlist.findAll({
            where: {
                owner: id
            }
        })
        res.status(200).json(userPlaylists);
    } catch (err) {
        res.status(500).json({ error: err });
    }
})

router.post("/insert", validateJWT, async (req, res) => {
    const { publishDate, title, description, status } = req.body.playlist;
    const { id } = req.user;
    const playlistEntry = {
        publishDate,
        title,
        description,
        status,
        owner: id
    }
    try {
        const newPlaylist = await Playlist.create(playlistEntry);
        res.status(200).json(newPlaylist);
    } catch (err) {
        res.status(500).json({ error: err });
    }
    Playlist.create(playlistEntry)
})

router.put("/update/:entryId", validateJWT, async (req, res) => {
    const { publishDate, title, description, status } = req.body.playlist;
    const playlistId = req.params.entryId;
    const { id } = req.user
    
    const query = {
        where: {
            id: playlistId,
            owner: id
        }
    }
    
    const updatedPlaylist = {
        publishDate: publishDate,
        title: title,
        description: description,
        status: status
    }

    try {
        const update = await Playlist.update(updatedPlaylist, query);
        res.status(200).json(update);
    } catch (err) {
        res.status(500).json({ error: err });
    }
});

router.delete("/delete/:id", validateJWT, async (req, res) => {
    const playlistId = req.params.id;
    const user = req.user.id

    try {
        const query = {
            where: {
                id: playlistId,
                owner: user
            }
        };

        await Playlist.destroy(query);
        res.status(200).json({ message: "Playlist Removed" });
    } catch (err) {
        res.status(500).json({ error: err });
    }
});

module.exports = router;