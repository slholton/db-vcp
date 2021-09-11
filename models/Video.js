// // One User to One Video Relationship
// const Video = sequelize.define("Video", {
//     publishDate: {
//         type: DataTypes.DATE
//     },
//     title: {
//         type: DataTypes.STRING
//     },
//     description: {
//         type: DataTypes.STRING
//     },
//     playlist: {
//         type: DataTypes.STRING
//     }
// })

// User.hasOne(Video, {
//     onDelete: "CASCADE",
// });
// Video.belongsTo(User);