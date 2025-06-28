const UserDashboardModel = require('../models/UserDashboard.js');

const userDashboard = async (req, res) => {
    const uid = req.params.uid;


    if (!uid) {
        return res.status(400).json({ error: "User ID is required" });
    }

    try {
        const dashboardData = await UserDashboardModel.findOne({ uid });

        if (!dashboardData) {
            return res.status(200).json({ 
                searchCount: 0,
                documentsUploaded: 0,
                plansCreated: 0,
                thisMonthSearchCount: 0,
            });
        }

        res.status(200).json(dashboardData);
    } catch (error) {
        console.error('Error fetching user dashboard:', error);
        res.status(500).json({ error: "Internal server error" });
    }
}

module.exports = userDashboard;