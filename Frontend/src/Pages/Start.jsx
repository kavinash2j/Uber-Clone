import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { UserDataContex } from '../context/UserContext'

const Start = () => {
    const first = useContext(UserDataContex);
    console.log(first);
    return (
        <div >
            <div className='bg-cover bg-bottom bg-[url(https://images.unsplash.com/photo-1527603815363-e79385e0747e?q=80&w=1952&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)] h-screen flex justify-between pt-7 flex-col w-full ' >
                <img className='w-20 ml-8' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="" />
                <div className='bg-white pb-7 py-5 px-5'>
                    <h2 className='text-3xl font-bold font-inter'>Get started with Uber</h2>
                    <Link
                        to="/login"
                        className="relative flex justify-center items-center w-full bg-black text-white py-3 rounded mt-5"
                    >
                        <span className='font-bold '>Continue</span>
                        <i className="ri-arrow-right-line absolute right-4 text-xl"></i>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Start