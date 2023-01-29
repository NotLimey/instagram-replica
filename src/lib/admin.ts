import admin from 'firebase-admin';
import {
    FIREBASE_CLIENT_EMAIL,
    FIREBASE_PRIVATE_KEY
} from "$env/static/private"
import {
    PUBLIC_FIREBASE_PROJECT_ID
} from "$env/static/public"

if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert({
            projectId: PUBLIC_FIREBASE_PROJECT_ID,
            clientEmail: FIREBASE_CLIENT_EMAIL,
            privateKey: FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
        }),
    });
}

const db = admin.firestore();
const auth = admin.auth();
const storage = admin.storage();

export { db, auth, storage };