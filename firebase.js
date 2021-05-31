import firebase from 'firebase'

const firebaseConfig = {
  apiKey: 'AIzaSyCYjmkT5Zw_dY71Q8dfG8mzQ_waApJT-nU',
  authDomain: 'whatsapp1-49293.firebaseapp.com',
  projectId: 'whatsapp1-49293',
  storageBucket: 'whatsapp1-49293.appspot.com',
  messagingSenderId: '341210929144',
  appId: '1:341210929144:web:459b17deb7bfa040d1280d',
  measurementId: 'G-N5FRN77JWE',
}

const app = !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app()

const db = app.firestore()
const auth = app.auth()
const provider = new firebase.auth.GoogleAuthProvider()

export { db, auth, provider }
