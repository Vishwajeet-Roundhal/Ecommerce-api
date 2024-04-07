const mongoose = require('mongoose')

URI = "mongodb+srv://vishwajeetroundhal0:8y35Is8rkLq6YbBa@restapi.fn424fc.mongodb.net/RestApi?retryWrites=true&w=majority&appName=RestApi"

const connectDB = async () => {
    try {
        await mongoose.connect(URI);
        console.log("connected to database");
    } catch (error) {
        console.error(error,"error getting data")
    }
}

module.exports = connectDB