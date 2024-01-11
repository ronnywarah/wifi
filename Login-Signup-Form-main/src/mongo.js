const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/LoginFormPractice")
    .then(() => {
        console.log('mongoose connected');
    })
    .catch((e) => {
        console.log('failed');
    });

const logInSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    connectionStatus: {
        type: String,
        required: true
    },
    signalStrength: {
        type: Number,
        required: true
    },
    networkSpeed: {
        type: String,
        required: true
    },
    connectedDevices: {
        type: Number,
        required: true
    },
    paymentStatus: {
        type: String,
        required: true
    }
});

const LogInCollection = new mongoose.model('LogInCollection', logInSchema);

module.exports = LogInCollection;
