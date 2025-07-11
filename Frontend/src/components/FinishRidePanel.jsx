import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const FinishRidePanel = ({ setFinshRidePanel, ride }) => {
    const navigator = useNavigate();
    console.log(ride);
    const onButtonClick = async () => {
        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/end-ride`, {
            rideId: ride._id,
            captain: ride.captain
        }, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        if (response.status === 200) {
            navigator('/captain-home')
        }
    }
    return (
        <div className='flex flex-col h-full' >
            <div className='h-[8%]'>
                <h5 className='text-center w-[93%] absolute top-0' onClick={() => {
                    setFinshRidePanel(false);
                }}>
                    <i className="text-gray-300 text-3xl ri-arrow-down-wide-line"></i>
                </h5>
                <h3 className='text-2xl font-bold h-full text-center p-3'>Finish this Ride</h3>
            </div>
            <div className='h-[16%]'>
                <div className='flex items-center justify-between  mt-4 p-3 mt-4 bg-yellow-400 rounded-lg'>
                    <div className='flex items-center gap-3 '>
                        <img className='h-10 rounded-full object-cover w-10' src="https://techcrunch.com/wp-content/uploads/2024/07/GettyImages-1211516204.jpeg?w=1024" alt="" />
                        <h2 className='text-lg font-medium capitalize'>{ride?.user.fullname.firstname + " " + ride?.user.fullname.lastname}</h2>
                    </div>
                </div>
            </div>

            <div className='flex flex-col items-center h-[40%] justify-evenly bg-white relative '>
                <div className=' w-full h-full flex flex-col justify-evenly'>
                    <div className='flex items-center gap-5 p-3 border-b-2'>
                        <i className="text-lg ri-map-pin-range-fill"></i>
                        <div>
                            <h3 className='text-lg font-medium'>{ride?.pickup.split(' ')[0]}</h3>
                            <p className='text-sm -mt-1 text-gray-600'>{ride?.pickup}</p>
                        </div>
                    </div>
                    <div className='flex items-center gap-5 p-3 border-b-2'>
                        <i className="text-lg ri-square-fill"></i>
                        <div>
                            <h3 className='text-lg font-medium'>{ride?.destination.split(' ')[0]}</h3>
                            <p className='text-sm -mt-1 text-gray-600'>{ride?.destination}</p>
                        </div>
                    </div>
                    <div className='flex items-center gap-5 p-3 '>
                        <i className="ri-currency-line"></i>
                        <div>
                            <h3 className='text-lg font-medium'>&#8377;{ride?.fare}</h3>
                            <p className='text-sm -mt-1 text-gray-600'>Cash/UPI Only</p>
                        </div>
                    </div>
                </div>

                <div className='w-full h-[20%] flex flex-col items-center justify-between'>
                    <button onClick={onButtonClick} className='w-full flex justify-center mt-5 bg-green-600 text-white font-semibold p-2 rounded-lg'>Finish Ride</button>
                    <p className='mt-10 text-xs'>click on finish ride button if you have Complete the payment </p>
                </div>

            </div>
        </div>
    )
}

export default FinishRidePanel