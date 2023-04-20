import React, { createContext, useEffect, useState } from 'react';
import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import app from '../firebase/firebase.config';

export const AuthContext = createContext(null);

const auth = getAuth(app);

const googleProvider = new GoogleAuthProvider();


const AuthProvider = ({children}) => {

    const [user, setUser] = useState(null);

    const [loading, setLoading] = useState(true);


    
    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }

    const loginUser = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }


    const signInWithGoogle = () => {
        return signInWithPopup(auth, googleProvider);
    }

    
    const logOut = () => {
        return signOut(auth);
    }


    // observe user auth state change
    useEffect( () => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            console.log('User auth state observe' , currentUser);
            setUser(currentUser);
            setLoading(false);
        });
        // to stop observing while unmounting
        return () => unsubscribe();
    } , [])


    const authInfo = {user, loading, createUser, loginUser, signInWithGoogle, logOut}


    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;