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
    networkDevicesname: {
        type: String,
        required: true
    },
    paymentStatus: {
       type: String,
       required: true
    },
    connectedDevices: {
        type: String,
        required: true
    },
    connectionStatus: {
        type: String,
        required: true 
    },
    networkSpeed: {
        type: String,
        required: true   
    },
    signalStrength: {
        type: String,
        required: true
    },
    Amount: {
        type: String,
        required: true
    },
    currentBalance: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    networkDevicesname: {
        type: String,
        required: true
    },
    paymentStatus: {
        type: String,
        required: true
    },
    connectedDevices: {
        type: String,
        required: true
    },
    connectionStatus: {
        type: String,
        required: true
    },
    networkSpeed: {
        type: String,
        required: true
    },
    signalStrength: {
        type: String,
        required: true
    },
    Amount: {
        type: String,
        required: true
    },
    currentBalance: {
        type: String,
        required: true
    },
    RemainingDays: {
        type: String,
        required: true
    },
    subscriptionStartDate: {
        type: Date, // You might want to use Date type for subscription start date
        required: true
    }
    

});

const LogInCollection = new mongoose.model('LogInCollection', logInSchema);

module.exports = LogInCollection;
