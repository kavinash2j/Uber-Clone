import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserDataContex } from '../src/context/UserContext';
import axios from 'axios';


export const UserProtectedWrapper = ({ children }) => {
  const token = localStorage.getItem('token');
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserDataContex);
  const [isloading, setLoading] = useState(true);

  axios.get(`${import.meta.env.VITE_BASE_URL}/user/profile`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }).then((response) => {
    if (response.status === 200) {
      setUser(response.data.user);
      setLoading(false);
    }
  }).catch(error => {
    console.error("Error fetching user profile:", error);
    localStorage.removeItem('token'); 
    navigate('/login');
  });

  useEffect(() => {
    if (!token) {
      setUser()
      navigate('/login');
    }
  }, [token]);

  if (isloading) {
    return <div>Loading...</div>;
  }

  return <>{children}</>;
};
