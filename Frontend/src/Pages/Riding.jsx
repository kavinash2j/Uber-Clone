import React from 'react'
import { Link } from 'react-router-dom'
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { SocketContext } from '../context/SocketContext';
import { useNavigate } from 'react-router-dom';
import LiveMap from '../components/LiveMap';

const Riding = () => {
    const location = useLocation();
    const { socket } = React.useContext(SocketContext);
    const navigate = useNavigate();

    socket.on("ride-ended", () => {
        console.log("Ride socket event received");
        navigate('/home');
    })

    const { vehicleDetails, locFormat, ride } = location.state || {};
    if (!vehicleDetails || !locFormat || !ride) {
        throw new Error("Required data is missing in the location state");
    }
    return (
        <div className='h-screen'>
            <Link to='/home' className='fixed right-2 top-2 h-10 w-10 bg-white flex items-center justify-center rounded-full'><i className="text-lg ri-home-5-line"></i></Link>
            <div className='h-[55%]'>
                <div className='h-full w-full object-cover'>
                    <LiveMap></LiveMap>
                </div>
            </div>
            <div className='h-[45%] px-3 flex flex-col justify-around'>
                <div className='flex items-center justify-between'>
                    <img
                        className='h-[4rem]'
                        src={vehicleDetails?.image}
                        alt=""
                    />
                    <div className='text-right'>
                        <h2 className='text-[1.2rem] font-medium'>{ride?.captain.fullname.firstname + " " + ride?.captain.fullname.lastname}</h2>
                        <h4 className='text-xl font-bold tracking-tight uppercase'>{ride?.captain.vehicle.plate}</h4>
                        <p className='text-sm text-gray-600 -mt-1 -mb-1'>Honda </p>
                    </div>
                </div>

                <div className='flex flex-col items-center bg-white relative '>
                    <div className='w-full  bg-white'>
                        <div className='flex items-center gap-5 p-2 border-b-2'>
                            <i className="text-lg ri-map-pin-range-fill"></i>
                            <div>
                                <h3 className='text-lg font-medium'>{locFormat?.destination[0]}</h3>
                                <p className='text-sm -mt-1 text-gray-600'>{locFormat?.destination[1]}</p>
                            </div>
                        </div>

                        <div className='flex items-center gap-5 p-2'>
                            <i className="ri-currency-line"></i>
                            <div>
                                <h3 className='text-lg font-medium'>&#8377;{vehicleDetails?.price}</h3>
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