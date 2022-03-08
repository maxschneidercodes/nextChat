import React from "react";
import useFirebaseAuth from "../utils/db/firebaseAuth"

const Context = React.createContext()

function ContextProvider({ children }) {

    const auth = useFirebaseAuth();

    return (
        <Context.Provider value={auth}>
            {children}
        </Context.Provider>
    )
}

export { ContextProvider, Context }
