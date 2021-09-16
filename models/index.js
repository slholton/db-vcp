// Grab db instance
const { sequelize, syncDb } = require('../db')
const { DataTypes } = require('sequelize')

// Grab Model Functions
const DefineUser = require('./User')
const DefinePlaylist = require('./Playlist')
const DefineVideo = require('./Video')

const User = DefineUser(sequelize, DataTypes) // Defines the model
const Playlist = DefinePlaylist(sequelize, DataTypes) // Defines the model
const Video = DefineVideo(sequelize, DataTypes) // Defines the model

// Define Associations
User.hasMany(Playlist)
Playlist.belongsTo(User)

User.hasMany(Video)
Video.belongsTo(User)

// Sync
syncDb(sequelize, { alter: true })

module.exports = { User, Video, Playlist }