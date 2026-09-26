import Redis from '../../shared/redis/redis.js';

const authMiddleware = async (req, res, next) => {
try {
    const sessionId = req.cookies.sessionId;
    if (!sessionId) {
        return res.status(401).json({ message: 'Unauthorized: No session ID' });
        console.log('No session ID found in cookies');
    }
    const user = await Redis.get(`session:${sessionId}`);
    if (!user) {
        return res.status(401).json({ message: 'Unauthorized' });
        console.log('No user found in Redis for session ID:', sessionId);
    }
    req.user = JSON.parse(user);
    console.log('User found in Redis for session ID:', sessionId, 'User:', req.user);
    next();
} catch (error) {
    res.status(500).json({ message: 'Error occurred while verifying session', error: error.message });
}
};

export default authMiddleware;