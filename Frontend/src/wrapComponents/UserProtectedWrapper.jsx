import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserDataContex } from '../context/UserContext';
import axios from 'axios';


export const UserProtectedWrapper = ({ children }) => {
  const token = localStorage.getItem('token');
  const navigate = useNavigate();
  const { setUser } = useContext(UserDataContex);
  const [isloading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) {
      setUser();
      navigate('/login');
      return;
    }

    axios.get(`${import.meta.env.VITE_BASE_URL}/user/profile`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then((response) => {
      if (response.status === 200) {
        setUser(response.data);
        setLoading(false);
      }
    }).catch(error => {
      console.error("Error fetching user profile:", error);
      localStorage.removeItem('token');
      navigate('/login');
    });
  }, [token, navigate, setUser]);

  if (isloading) {
    return <div>Loading...</div>;
  }

  return <>{children}</>;
};
