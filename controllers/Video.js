const Express = require("express");
const router = Express.Router();
let validateJWT = require("../middleware/validate-jwt");
const { Video } = require("../models");

router.get('/', async (req, res) => {
    try {
        const entries = await Video.findAll();
        res.status(200).json(entries);
    } catch (err) {
        res.status(500).json({ error: err });
    }
});

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

router.get("/:title", async (req, res) =>{
    const { title } = req.params;
    try {
        const results = await Video.findAll({
            where: { title: title }
        });
        res.status(200).json(results);
    } catch (err) {
        res.status(500).json({ error: err })
    }
})

router.put("/update:entryId", validateJWT, async (req, res) => {
    const { publishDate, title, description, categoryId, playlist } = req.body.video;
    const videoId = req.params.entryId;
    const userId = req.user.id;
    
    const query = {
        where: {
            id: videoId,
            owner: userId
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
    const ownerId = req.user.id;
    const videoId = req.params.id;

    try {
        const query = {
            where: {
                id: videoId,
                owner: ownerId
            }
        };

        await Video.destroy(query);
        res.status(200).json({ message: "Video Entry Removed" });
    } catch (err) {
        res.status(500).json({ error: err});
    }
})

module.exports = router;