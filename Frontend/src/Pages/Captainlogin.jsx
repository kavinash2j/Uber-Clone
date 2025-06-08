import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { CaptainDataContext } from '../context/CaptainContext';

const Captainlogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [captainData, setCaptainData] = useState({});

    const navigate = useNavigate();
    const { captain, setCaptain } = useContext(CaptainDataContext);
    console.log(captain);

    async function submitHandler(e) {
        e.preventDefault();
        const newCaption = { email:email, password:password };
        console.log(newCaption);

        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captain/login`, newCaption);

        if (response.status === 200) {
            const data = response.data;
            setCaptain(data.captain);
            localStorage.setItem('token', data.token);
            console.log(captain);
            navigate('/captain-home');
        }
    }

    return (
        <div className='p-7 h-screen flex flex-col justify-between'>
            <div>
                <img className='h-14 mb-3' src="https://static.vecteezy.com/system/resources/previews/027/127/451/non_2x/uber-logo-uber-icon-transparent-free-png.png" alt="" />

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
                <p className='text-center'>Join a fleet? <Link to={"/captain-signup"} className='text-blue-600'>Register as a Captain</Link></p>
            </div>
            <div>
                <Link to={'/login'}
                    className='bg-[#b5621e] flex justify-center items-center text-white font-semibold mb-5 rounded px-4 py-2 w-full text-lg placeholder:text-base'
                >Sign in as User</Link>
            </div>
        </div>
    )
}

export default Captainlogin