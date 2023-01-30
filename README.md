# Instagram replica

Instagram replica buildt with mongodb, sveltekit, firebase and tailwind.

Just a learning project


## Firebase
Used for authentication and storing images

## Mongodb 
Used for handling data storage and complex relations between users, posts, likes and comments

## Sveltekit
Used as a server rendered frontend tool with apis to access db

## Tailwind
Used as a replacement for css


## Wanna test it?

You need to define these in `.env` file in root
```env
PUBLIC_FIREBASE_API_KEY=[Firebase api key here]
PUBLIC_FIREBASE_AUTH_DOMAIN=[Firebase auth domain here]
PUBLIC_FIREBASE_PROJECT_ID=[Firebase project id here]
PUBLIC_FIREBASE_STORAGE_BUCKET=[Firebase storage bucket here]
PUBLIC_FIREBASE_MESSAGING_SENDER_ID=[Firebase messaging sender id here]
PUBLIC_FIREBASE_APP_ID=[Firebase app id here]
DB_URL=[Mongodb connection url here]
FIREBASE_CLIENT_EMAIL=[Firebase admin client email here]
FIREBASE_PRIVATE_KEY=[Firebase admin private key here]
```
