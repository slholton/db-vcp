module.exports = (sequelize, DataTypes) => {
    const Video = sequelize.define("Video", {
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
            allowNull: false
        },
        categoryId: {
            type: DataTypes.STRING
        },
        playlist: {
            type: DataTypes.STRING
        },
        owner: {
            type: DataTypes.INTEGER
        }
    })
    return Video
}