const mongoose = require('mongoose')

const ConnectToDB = async () => {
    try {
        await mongoose.connect(process.env.URI)

        console.log("server is connecteed!")
    } catch (error) {
        console.log("Error : ", error)
    }
};

module.exports = ConnectToDB