import React from 'react'
import axios from 'axios';



export const ConfirmRidePanel = ({ setConfirmRidePanel, locFormat, vehicleDetails, VehiclePanelRef, setVehicleFound }) => {

    async function onClickHandle(e) {
        setConfirmRidePanel(false);
        setVehicleFound(true)
        console.log("pickup:", locFormat.pickup.join(","));
        console.log("destination:", locFormat.destination.join(","));
        console.log("vehicleType:", vehicleDetails.vehicleType);
        const response = await axios.post(
            `${import.meta.env.VITE_BASE_URL}/rides/create`,
            {
                pickup: locFormat.pickup.join(","),
                destination: locFormat.destination.join(","),
                vehicleType: vehicleDetails.vehicleType,
            },
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            }
        );

        console.log(response.status);
    }

    return (
        <div>
            <h5 className='p-1 text-center w-[93%] absolute top-0' onClick={() => {
                setConfirmRidePanel(false);
            }}><i className="text-3xl ri-arrow-down-wide-line"></i></h5>
            <h3 className='text-2xl font-semibold mb-3'>Confirm your Ride</h3>
            <div className='flex flex-col items-center bg-white relative pt-12'>

                {/* <div className="absolute top-6 w-60 h-36 bg-blue-200 rounded-full blur-2xl opacity-50 z-0"></div> */}
                <div className="absolute top-12 w-40 h-28 bg-blue-400 rounded-full blur-xl opacity-70 z-0"></div>

                <img className='h-20 relative z-10' src={vehicleDetails.image} alt="" />
                <div className=' w-full mt-5'>
                    <div className='flex items-center gap-5 p-3 border-b-2'>
                        <i className="text-lg ri-map-pin-range-fill"></i>
                        <div>
                            <h3 className='text-lg font-medium'>{locFormat.pickup[0]}</h3>
                            <p className='text-sm -mt-1 text-gray-600'>{locFormat.pickup[1]}</p>
                        </div>
                    </div>
                    <div className='flex items-center gap-5 p-3 border-b-2'>
                        <i className="text-lg ri-square-fill"></i>
                        <div>
                            <h3 className='text-lg font-medium'>{locFormat.destination[0]}</h3>
                            <p className='text-sm -mt-1 text-gray-600'>{locFormat.destination[1]}</p>
                        </div>
                    </div>
                    <div className='flex items-center gap-5 p-3 '>
                        <i className="ri-currency-line"></i>
                        <div>
                            <h3 className='text-lg font-medium'>&#8377;{vehicleDetails.price}</h3>
                            <p className='text-sm -mt-1 text-gray-600'>Cash/UPI Only</p>
                        </div>
                    </div>
                </div>
                <button onClick={onClickHandle} className='w-full mt-5 bg-green-600 text-white font-semibold p-2 rounded-lg'>Confirm Ride</button>
            </div>

        </div>
    )
}
