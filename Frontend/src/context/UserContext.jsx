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
    <div>
        <UserDataContex.Provider value={user}>
            {children}
        </UserDataContex.Provider>
        
    </div>
  )
}

export default UserContext