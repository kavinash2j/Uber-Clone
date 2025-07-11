import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { UserDataContex } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const UserLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [userData, setUserData] = useState({});

    const navigate = useNavigate();
    const { user, setUser } = useContext(UserDataContex);

    const submitHandler = async (e) => {
        e.preventDefault();
        const userData = {
            email: email,
            password: password
        }
        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/user/login`, userData);

        if (response.status === 200) {
            const data = response.data;
            setUser(data);
            localStorage.setItem("token", data.token)
            navigate('/home');
        }

        setPassword('')
        setEmail('')
    }
    return (
        <div className='p-7 h-screen flex flex-col justify-between'>
            <div>
                <img className='w-20 mb-10' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="" />

                <form onSubmit={submitHandler}>
                    <h3 className='text-lg font-medium mb-2 text-left pl-1'>What's your email</h3>
                    <input type="email"
                        placeholder='email@example.com' required value={email} onChange={(e) => {
                            setEmail(e.target.value)
                        }}
                        className='bg-[#eeeeee]  mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base'
                    />
                    <h3 className='text-lg font-medium mb-2 text-left pl-1'>Enter Password</h3>
                    <input type="password" required value={password} onChange={(e) => {
                        setPassword(e.target.value)
                    }}
                        className='bg-[#eeeeee]  mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base'
                        placeholder='password' />
                    <button
                        className='bg-[#000000] text-white font-semibold mb-7 rounded px-4 py-2 w-full text-lg placeholder:text-base'
                    >Login</button>
                </form>
                <p className='text-center'>New here? <Link to={"/signup"} className='text-blue-600'>Create new Account</Link></p>
            </div>
            <div>
                <Link to={'/captain-login'}
                    className='bg-[#10b461] flex justify-center items-center text-white font-semibold mb-5 rounded px-4 py-2 w-full text-lg placeholder:text-base'
                >Sign in as Caption</Link>
            </div>
        </div>
    )
}

export default UserLogin