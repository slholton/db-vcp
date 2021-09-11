require('dotenv').config()

const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize(
    process.env.DB_DBNAME,
    process.env.DB_USER, 
    process.env.DB_PASS, 
    {
        host: process.env.DB_HOST,
        dialect: 'postgres'
    }
)

const User = sequelize.define("User", {
    firstname: {
        type: DataTypes.STRING
    },
    email: {
        type: DataTypes.STRING
    },
    password: {
        type: DataTypes.STRING
    }
})

// One User to One Video Relationship
const Video = sequelize.define("Video", {
    publishDate: {
        type: DataTypes.DATE
    },
    title: {
        type: DataTypes.STRING
    },
    description: {
        type: DataTypes.STRING
    },
    playlist: {
        type: DataTypes.STRING
    }
})

User.hasOne(Video, {
    onDelete: "CASCADE",
    // onUpdate: 'RESTRICT'
});
Video.belongsTo(User);

// One User to Many Playlists Relationship
const Playlist = sequelize.define("Playlist", {
    publishDate: {
        type: DataTypes.DATE
    },
    title: {
        type: DataTypes.STRING
    },
    description: {
        type: DataTypes.STRING
    },
    status: {
        type: DataTypes.STRING
    }
})
User.hasMany(Playlist);
Playlist.belongsTo(User)

;(async () => {
    await sequelize.sync({force: true});
})()