import { firebase } from '../../utils/db/firebase';

const db = firebase.firestore();
const COLLECTION_ID_Rooms = "rooms"
const COLLECTION_ID_Users = "users"
const COLLECTION_ID_MESSAGES = "messages"

async function userHasRoom(userID) {
    const roomRef = await db.collection(COLLECTION_ID_Users).doc(userID).get()
    return roomRef.exists
}

export async function createRoom(userID) {
    // if (userHasRoom(userID)) {
    const roomRef = db.collection(COLLECTION_ID_Rooms).doc()
    await roomRef.set({});
    await saveRoomIDinUser(roomRef.id, userID)
        //     }
}

async function saveRoomIDinUser(roomID, userId) {
    await db.collection("users").doc(userId).set({ roomId: roomID })
}

export async function getRoom(userId) {
    const roomRef = await db.collection(COLLECTION_ID_Users).get()
    let room
    roomRef.forEach(doc => {
        room = doc.data().roomId
    });
    return room
}

export async function postMessage(roomID, messageObjc) {
    await db.collection(COLLECTION_ID_Rooms).doc(roomID)
        .collection(COLLECTION_ID_MESSAGES).doc().set(messageObjc);;
}

export async function loadMessages(roomID) {
    let data = []

    const snapshot = await db.collection(COLLECTION_ID_Rooms)
        .doc(roomID)
        .collection(COLLECTION_ID_MESSAGES).get()

    snapshot.forEach((doc) => {
        data.push(doc.data());
    });

    return data
}