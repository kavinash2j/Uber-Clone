import React from 'react'
import { Link } from 'react-router-dom'

const Riding = () => {
    return (
        <div className='h-screen'>
            <Link to='/home' className='fixed right-2 top-2 h-10 w-10 bg-white flex items-center justify-center rounded-full'><i className="text-lg ri-home-5-line"></i></Link>
            <div className='h-[55%]'>
                <img className='h-full w-full object-cover' src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif" alt="" />
            </div>
            <div className='h-[45%] px-3 flex flex-col justify-around'>
                <div className='flex items-center justify-between'>
                    <img
                        className='h-[4rem]'
                        src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1649231091/assets/2c/7fa194-c954-49b2-9c6d-a3b8601370f5/original/Uber_Moto_Orange_312x208_pixels_Mobile.png"
                        alt=""
                    />
                    <div className='text-right'>
                        <h2 className='text-[1.2rem] font-medium'>Avinash</h2>
                        <h4 className='text-xl font-bold tracking-tight'>MH26 AB 1234</h4>
                        <p className='text-sm text-gray-600 -mt-1 -mb-1'>Honda Bike</p>
                    </div>
                </div>

                <div className='flex flex-col items-center bg-white relative '>
                    <div className='w-full  bg-white'>
                        <div className='flex items-center gap-5 p-2 border-b-2'>
                            <i className="text-lg ri-map-pin-range-fill"></i>
                            <div>
                                <h3 className='text-lg font-medium'>562/11-A</h3>
                                <p className='text-sm -mt-1 text-gray-600'>Kankariya Talab, Bhopal</p>
                            </div>
                        </div>

                        <div className='flex items-center gap-5 p-2'>
                            <i className="ri-currency-line"></i>
                            <div>
                                <h3 className='text-lg font-medium'>&#8377;65.17</h3>
                                <p className='text-sm -mt-1 text-gray-600'>Cash/UPI Only</p>
                            </div>
                        </div>
                    </div>
                </div>
                <button className='w-full bg-green-600 text-white font-semibold p-2  rounded-lg'>Make a Payment</button>
            </div>
        </div>
    )
}

export default Riding