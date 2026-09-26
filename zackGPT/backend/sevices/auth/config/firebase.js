import {cert, initializeApp} from 'firebase-admin';
import serviceAccount from '../serviceAccountKey.json' with { type: 'json' };

const firebaseApp = initializeApp({
    credential: cert(serviceAccount),
});

export default firebaseApp;