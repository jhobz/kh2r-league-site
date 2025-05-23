import { initializeApp } from 'firebase/app'

const firebaseConfig = {
    apiKey: 'AIzaSyC1OJYFqBzitwgA9g3AWVo0kwCIKmxEpUU',
    authDomain: 'kh2-rando.firebaseapp.com',
    projectId: 'kh2-rando',
    storageBucket: 'kh2-rando.firebasestorage.app',
    messagingSenderId: '236974274163',
    appId: '1:236974274163:web:25bd6eeeb30aa6ce74dc06',
    measurementId: 'G-9YJDMBYYNC',
}

export const app = initializeApp(firebaseConfig)
