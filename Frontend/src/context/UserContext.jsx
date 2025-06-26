import React, { createContext, useState } from 'react'

export const UserDataContex = createContext();

const UserContext = ({ children }) => {
    const [user, setUser] = useState({
        email: '',
        fullname: {
            firstName: '',
            lastName: ''
        }
    })

    return (
        <UserDataContex.Provider value={{ user, setUser }}>
            {children}
        </UserDataContex.Provider>
    )
}

export default UserContext