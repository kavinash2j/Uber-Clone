import React, { createContext, useState } from 'react'
import App from '../App'

export const UserDataContex = createContext();

const UserContext = ({children}) => {
    const [user,setUser] = useState({
        email:'',
        fullname:{
            firstName:'',
            lastName:''
        }
    })

    return (
        <UserDataContex.Provider value={{user,setUser}}>
            {children}
        </UserDataContex.Provider>
  )
}

export default UserContext