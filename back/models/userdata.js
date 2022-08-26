const mongoose = require('mongoose')

const UserData = mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    type: { type: String, required: true },
    lat: { type: Number, required: true },
    lng: { type: Number, required: true },
});

module.exports = {
    UserData: mongoose.model('UserData', UserData)
};
