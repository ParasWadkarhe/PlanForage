const admin = require('../firebase/firebaseAdmin');

const verifyFirebaseToken = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Unauthorized: Missing token" });
    }

    const token = authHeader.split(" ")[1];
    try {
        const decodedToken = await admin.auth().verifyIdToken(token);
        req.user = decodedToken;
        next();
    } catch (error) {
        console.error("Firebase token verification failed:", error.message);
        res.status(401).json({ message: "Unauthorized: Invalid token" });
    }
};

module.exports = verifyFirebaseToken;