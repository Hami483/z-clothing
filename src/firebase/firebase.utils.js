import firebase from 'firebase/app'

import 'firebase/firestore'
import 'firebase/auth'

const config = {
    apiKey: "AIzaSyBZntd7AMzxTyS4iNj3EsGarGt_TDL5FaQ",
    authDomain: "crwn-db-37875.firebaseapp.com",
    projectId: "crwn-db-37875",
    storageBucket: "crwn-db-37875.appspot.com",
    messagingSenderId: "1053029937115",
    appId: "1:1053029937115:web:db8ff36cb0311184e4c1fe"
}

export const createUserProfileDocument = async (userAuth,additionalData) => {
    if(!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`)

    const snapShot = await userRef.get()

    if(!snapShot.exists){
        const {displayName,email} = userAuth
        const createdAt = new Date()

        try{
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            })
        }catch(err){
            console.log(err.message)
        }
    }

    return userRef
}

firebase.initializeApp(config)

export const auth = firebase.auth()
export const firestore= firebase.firestore()

const provider = new firebase.auth.GoogleAuthProvider()

provider.setCustomParameters({prompt:'select_account'})
export const signInWithGoogle= () => auth.signInWithPopup(provider)

export default firebase