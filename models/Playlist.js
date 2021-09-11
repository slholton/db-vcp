// // One User to Many Playlists Relationship
// const Playlist = sequelize.define("Playlist", {
//     publishDate: {
//         type: DataTypes.DATE
//     },
//     title: {
//         type: DataTypes.STRING
//     },
//     description: {
//         type: DataTypes.STRING
//     },
//     status: {
//         type: DataTypes.STRING
//     }
// })
// User.hasMany(Playlist);
// Playlist.belongsTo(User)