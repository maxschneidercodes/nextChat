import { firebase } from '../../utils/db/firebase';

const db = firebase.firestore();

export function addDocument(collection, doc, data) {
    //await db.collection("users").doc(user.uid).set(JSON.parse(JSON.stringify(user)));
    await db.collection(collection).doc(doc).set(JSON.parse(JSON.stringify(data)));
}