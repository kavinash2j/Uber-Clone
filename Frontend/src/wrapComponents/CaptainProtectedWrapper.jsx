import axios from 'axios';
// import { response } from 'express';
// import { set } from 'mongoose';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { CaptainDataContext } from '../context/CaptainContext';
// import { console } from 'inspector';

export const CaptainProtectedWrapper = ({ children }) => {
    const token = localStorage.getItem('token');
    const [isLoading, setLoading] = useState(true);

    const navigate = useNavigate();

    const { setCaptain } = useContext(CaptainDataContext);

    useEffect(() => {
        if (!token) {
            navigate('/captain-login');
            return;
        }

        axios.get(`${import.meta.env.VITE_BASE_URL}/captain/profile`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((response) => {
            if (response.status === 200) {
                setCaptain(response.data);
                setLoading(false);
            }
        }).catch(error => {
            console.error("Error fetching captain profile:", error);
            localStorage.removeItem('token');
            navigate('/captain-login');
        });
    }, [token, navigate, setCaptain]);

    if (isLoading) {
        return <div>Loading...</div>;
    }
    return <>{children}</>;
};
