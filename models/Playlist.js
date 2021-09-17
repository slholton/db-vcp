module.exports = (sequelize, DataTypes) => {
    const Playlist = sequelize.define("Playlist", {
        publishDate: {
            type: DataTypes.DATE,
            allowNull: false
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        status: {
            type: DataTypes.STRING, 
            allowNull: false
        },
        owner: {
            type: DataTypes.INTEGER
        }
    })
    return Playlist
}