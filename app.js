require('dotenv').config()
const express = require('express')
const app = express()
const { sequelize } = require('./db')
const { DefineUser } = require('./models/User')

;(async () => {
    try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
    } catch (error) {
    console.error('Unable to connect to the database:', error);
    }
    DefineUser(sequelize)

    sequelize.sync({force: true})
})()

const port = 3000
const auth = require('./controllers/Auth');
app.use("/", auth)

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})

// DB Set Up BEGIN
// ;(async () => {
//     await sequelize.sync({force: true});
// })()
// DB Set Up END