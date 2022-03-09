import { useState, useEffect } from "react";
import { firebase } from "../db/firebase"

const formatAuthUser = (user) => ({
    uid: user.uid,
    email: user.email
});

export default function useFirebaseAuth() {
    const [authUser, setAuthUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const authStateChanged = async (authState) => {
        if (!authState) {
            setAuthUser(null)
            setLoading(false)
            return;
        }

        setLoading(true)
        var formattedUser = formatAuthUser(authState);
        setAuthUser(formattedUser);
        setLoading(false);
    };

    useEffect(() => {
        const unsubscribe = firebase.auth().onAuthStateChanged(authStateChanged);
        return () => unsubscribe();
    }, []);

    const clear = () => {
        setAuthUser(null);
        setLoading(true);
    };

    function resetPassword(newPassword) {
        var user = firebase.auth().currentUser;
        return user.updatePassword(newPassword)
    }

    function signInWithEmailAndPassword(email, password) {
        return firebase.auth().signInWithEmailAndPassword(email, password);
    }

    function createUserWithEmailAndPassword(email, password) {
        return firebase.auth().createUserWithEmailAndPassword(email, password);
    }

    function signOut() {
        firebase.auth().signOut().then(clear);
    }

    useEffect(() => {
        const unsubscribe = firebase.auth().onAuthStateChanged(authStateChanged);
        return () => unsubscribe();
    }, []);

    return {
        authUser,
        loading,
        signInWithEmailAndPassword,
        createUserWithEmailAndPassword,
        signOut,
        resetPassword
    };
}