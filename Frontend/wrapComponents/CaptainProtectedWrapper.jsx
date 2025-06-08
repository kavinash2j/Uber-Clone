import axios from 'axios';
// import { response } from 'express';
// import { set } from 'mongoose';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { CaptainDataContext } from '../src/context/CaptainContext';
// import { console } from 'inspector';

export const CaptainProtectedWrapper = ({ children }) => {
    const token = localStorage.getItem('token');
    const [isloading, setLoading] = useState(true);

    const navigate = useNavigate();

    const { captain, setCaptain } = useContext(CaptainDataContext);

    axios.get(`${import.meta.env.VITE_API_URL}/captain/profile`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }).then((response) => {
        if (response.status === 200) {
            setCaptain(response.data.captain);
            setLoading(false);
        }
    }).catch(error => {
        console.error("Error fetching captain profile:", error);
        localStorage.removeItem('token');
        navigate('/captain-login');
    });

useEffect(() => {
    if (!token) {
        navigate('/captain-login');
    }
}, [token]);

if (isloading) {
    return <div>Loading...</div>;
}
return <>{children}</>;
};
