import { getAuth } from 'firebase-admin/auth';
import User from '../models/user.model.js';
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


    res.status(200).json({ message: 'Login successful', user });
  } catch (error) {
    res.status(401).json({ message: 'Invalid token', error: error.message });
  }
};

export default googleSignIn;
