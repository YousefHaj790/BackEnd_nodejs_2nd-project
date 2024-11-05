const express = require('express')
const env = require('dotenv');
env.config();
const users = require('./routes/users')
const ConnectToDB = require('./ConfigFile/db');
const PORT = 3003;



ConnectToDB();

const app = express();

app.use(express.json())

app.use('/profile/users', users)

app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
})