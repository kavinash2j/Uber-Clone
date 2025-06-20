import React, { createContext, useEffect, useState } from 'react'

export const CaptainDataContext = createContext();

const CaptainContext = ({ children }) => {
  const [captain, setCaptain] = useState({ default: "default value" });

  return (
    <CaptainDataContext.Provider value={{ captain, setCaptain }} >
      {children}
    </CaptainDataContext.Provider>
  )
}

export default CaptainContext