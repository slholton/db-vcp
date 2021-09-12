module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define("User", {
        fname: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        }
})
    return User
}