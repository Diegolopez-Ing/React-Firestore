import firebase from 'firebase/app'
import 'firebase/firestore'


const config=
{
    apiKey: "AIzaSyCVgkNnQ2h5ZB_kdnAiwYxM2cV4_Ya1FOo",
    authDomain: "pruebas-react-dd7b7.firebaseapp.com",
    projectId: "pruebas-react-dd7b7",
    storageBucket: "pruebas-react-dd7b7.appspot.com",
    messagingSenderId: "924232347982",
    appId: "1:924232347982:web:b273fc4093d80854af2e1f"
}
const fireb=firebase.initializeApp(config)
const store=fireb.firestore()

export{store}