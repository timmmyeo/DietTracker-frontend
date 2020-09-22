import React, { Component, createContext, useEffect } from "react";
import { auth } from "../../config/firebaseConfig";

export const UserContext = createContext(null);
function UserProvider(props) {
  const [user, setUser] = React.useState(null);

  useEffect(() => {
      auth.onAuthStateChanged(userAuth => setUser(userAuth));
    }
  )
    return (
      <UserContext.Provider value={user}>
        {props.children}
      </UserContext.Provider>
    );
    }
export default UserProvider;