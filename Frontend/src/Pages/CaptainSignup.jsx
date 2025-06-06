import React, { useState } from 'react'
import { Link } from 'react-router-dom';

const CaptainSignup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [captainData, setcaptainData] = useState({});
    const submitHandler = (e) => {
        e.preventDefault();
        setcaptainData({
            fullname: {
                firstName: firstName,
                lastName: lastName,
            },
            email, password
        });
        setEmail('')
        setPassword('')
        setFirstName('')
        setLastName('')
        console.log(captainData)
    }
    return (
        <div className='p-7 h-screen flex flex-col justify-between'>
            <div>
                <img className='h-14 mb-3' src="https://static.vecteezy.com/system/resources/previews/027/127/451/non_2x/uber-logo-uber-icon-transparent-free-png.png" alt="" />

                <form onSubmit={submitHandler}>
                    <h3 className='text-lg font-medium mb-2 text-left pl-1'>What's our Captain's name</h3>
                    <div className='flex gap-4 mb-5'>
                        <input type="text"
                            placeholder='First name' required value={firstName} onChange={(e) => {
                                setFirstName(e.target.value)
                            }}
                            className='bg-[#eeeeee] w-1/2  rounded px-4 py-2 border text-lg placeholder:text-base'
                        />
                        <input type="text"
                            placeholder='Last name' required value={lastName} onChange={(e) => {
                                setLastName(e.target.value)
                            }}
                            className='bg-[#eeeeee] w-1/2 rounded px-4 py-2 border text-lg placeholder:text-base'
                        />
                    </div>

                    <h3 className='text-lg font-medium mb-2 text-left pl-1'>What's our Captain's email</h3>
                    <input type="email"
                        placeholder='email@example.com' required value={email} onChange={(e) => {
                            setEmail(e.target.value)
                        }}
                        className='bg-[#eeeeee]  mb-6 rounded px-4 py-2 border w-full text-lg placeholder:text-base'
                    />
                    <h3 className='text-lg font-medium mb-2 text-left pl-1'>Enter Password</h3>
                    <input type="password" required value={password} onChange={(e) => {
                        setPassword(e.target.value)
                    }}
                        className='bg-[#eeeeee]  mb-6 rounded px-4 py-2 border w-full text-lg placeholder:text-base'
                        placeholder='password' />
                    <button
                        className='bg-[#000000] text-white font-semibold mb-7 rounded px-4 py-2 w-full text-lg placeholder:text-base'
                    >Login</button>
                </form>
                <p className='text-center'>Already have a Account? <Link to={"/login"} className='text-blue-600'>Login here</Link></p>
            </div>
            <div>
                <p className='text-[10px]'> This site is protected by reCAPTCHA and the <span className='underline'>Google Privacy Policy</span> and <span className='underline '>Terms of Services apply</span>
                </p>
            </div>
        </div>
    )
}

export default CaptainSignup