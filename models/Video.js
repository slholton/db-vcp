module.exports = (sequelize, DataTypes) => {

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
        categoryId: {
            type: DataTypes.STRING
        },
        playlist: {
            type: DataTypes.STRING
        }
    })
    return Video
}