import { getAuth } from 'firebase-admin/auth';
import User from '../models/user.model.js';
import redis from '../../../shared/redis/redis.js';
import crypto from 'crypto';

const googleSignIn = async (req, res) => {
  const { idToken } = req.body;
  try {
    const decoded = await getAuth().verifyIdToken(idToken);
    const user = await User.findOneAndUpdate(
      { firebaseUID: decoded.uid },
      {
        firebaseUID: decoded.uid,
        email: decoded.email,
        username: decoded.name,
        avatar: decoded.picture,
      },
      { upsert: true, new: true }
    );

    const sessionId = crypto.randomBytes(16).toString('hex');
    res.cookie('sessionId', sessionId, { httpOnly: true, secure: false, sameSite: 'Strict', maxAge: 7 * 24 * 60 * 60 * 1000 }); // 7 days

    await redis.setex(`session:${sessionId}`, 7 * 24 * 60 * 60, JSON.stringify(user));
    console.log('Session stored in Redis:', `session:${sessionId}`);
    res.status(200).json({ message: 'Login successful', user });
  } catch (error) {
    res.status(401).json({ message: 'Invalid token', error: error.message });
  }
};


const logout = async (req, res) => {
  try {
    const sessionId = req.cookies.sessionId;
    if (sessionId) {
      await redis.del(`session:${sessionId}`);
      res.clearCookie('sessionId');
    }
    res.status(200).json({ message: 'Logout successful' });
    console.log('Session removed from Redis:', `session:${sessionId}`);
  } catch (error) {
    res.status(500).json({ message: 'Error occurred during logout', error: error.message });
  }
};

export { googleSignIn, logout };

