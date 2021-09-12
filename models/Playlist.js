module.exports = (sequelize, DataTypes) => {
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
    return Playlist
}