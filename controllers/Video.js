const Express = require("express");
const router = Express.Router();
let validateJWT = require("../middleware/validate-jwt");
const { Video } = require("../models");

router.get("/mine", validateJWT, async (req, res) => {
    const { id } = req.user;
    try {
        const userVideos = await Video.findAll({
            where: {
                owner: id
            }
        })
        res.status(200).json(userVideos);
    } catch (err) {
        res.status(500).json({ error: err });
    }
})

router.post("/insert", validateJWT, async (req, res) => {
    const { publishDate, title, description, categoryId, playlist } = req.body.video;
    const { id } = req.user;
    const videoEntry = {
        publishDate,
        title,
        description,
        categoryId,
        playlist,
        owner: id
    }
    try {
        const newVideo = await Video.create(videoEntry);
        res.status(200).json(newVideo);
    } catch (err) {
        res.status(500).json({ error: err });
    }
    Video.create(videoEntry)
})

router.put("/update/:entryId", validateJWT, async (req, res) => {
    const { publishDate, title, description, categoryId, playlist } = req.body.video;
    const videoId = req.params.entryId;
    const { id } = req.user
    
    const query = {
        where: {
            id: videoId,
            owner: id
        }
    }
    
    const updatedVideo = {
        publishDate: publishDate,
        title: title,
        description: description,
        categoryId: categoryId,
        playlist: playlist
    }

    try {
        const update = await Video.update(updatedVideo, query);
        res.status(200).json(update);
    } catch (err) {
        res.status(500).json({ error: err });
    }
});

router.delete("/delete/:id", validateJWT, async (req, res) => {
    const videoId = req.params.id;
    const user = req.user.id

    try {
        const query = {
            where: {
                id: videoId,
                owner: user
            }
        };

        await Video.destroy(query);
        res.status(200).json({ message: "Video Entry Removed" });
    } catch (err) {
        res.status(500).json({ error: err});
    }
});

module.exports = router;