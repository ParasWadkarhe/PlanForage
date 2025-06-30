 const mongoose = require('mongoose')

const UserDashboardSchema = new mongoose.Schema({
    uid: {
        type: String
    },
    searchCount: {
        type: Number,
        default: 0
    },
    documentsUploaded: {
        type: Number,
        default: 0
    },
    plansCreated: {
        type: Number,
        default: 0
    },
})


module.exports = mongoose.model("UserDashboard", UserDashboardSchema);