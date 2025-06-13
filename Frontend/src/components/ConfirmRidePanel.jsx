import React from 'react'

export const ConfirmRidePanel = ({ setConfirmRidePanel, VehiclePanelRef, setVehicleFound }) => {
    return (
        <div>
            <h5 className='p-1 text-center w-[93%] absolute top-0' onClick={() => {
                setConfirmRidePanel(false);
            }}><i className="text-3xl ri-arrow-down-wide-line"></i></h5>
            <h3 className='text-2xl font-semibold mb-3'>Confirm your Ride</h3>
            <div className='flex flex-col items-center bg-white relative pt-12'>

                {/* <div className="absolute top-6 w-60 h-36 bg-blue-200 rounded-full blur-2xl opacity-50 z-0"></div> */}
                <div className="absolute top-12 w-40 h-28 bg-blue-400 rounded-full blur-xl opacity-70 z-0"></div>

                <img className='h-20 relative z-10' src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1649231091/assets/2c/7fa194-c954-49b2-9c6d-a3b8601370f5/original/Uber_Moto_Orange_312x208_pixels_Mobile.png" alt="" />
                <div className=' w-full mt-5'>
                    <div className='flex items-center gap-5 p-3 border-b-2'>
                        <i className="text-lg ri-map-pin-range-fill"></i>
                        <div>
                            <h3 className='text-lg font-medium'>562/11-A</h3>
                            <p className='text-sm -mt-1 text-gray-600'>Kankariya Talab, Bhopal</p>
                        </div>
                    </div>
                    <div className='flex items-center gap-5 p-3 border-b-2'>
                        <i className="text-lg ri-square-fill"></i>
                        <div>
                            <h3 className='text-lg font-medium'>562/11-A</h3>
                            <p className='text-sm -mt-1 text-gray-600'>Kankariya Talab, Bhopal</p>
                        </div>
                    </div>
                    <div className='flex items-center gap-5 p-3 '>
                        <i className="ri-currency-line"></i>
                        <div>
                            <h3 className='text-lg font-medium'>&#8377;65.17</h3>
                            <p className='text-sm -mt-1 text-gray-600'>Cash/UPI Only</p>
                        </div>
                    </div>
                </div>
                <button onClick={() => {
                    setConfirmRidePanel(false);
                    setVehicleFound(true)
                }} className='w-full mt-5 bg-green-600 text-white font-semibold p-2 rounded-lg'>Confirm Ride</button>
            </div>

        </div>
    )
}
