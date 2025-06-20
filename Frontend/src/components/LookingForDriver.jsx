import React from 'react'

export const LookingForDriver = ({ setVehicleFound, locFormat, vehicleDetails }) => {
    return (
        <div>
            <h5 className='p-1 text-center w-[93%] absolute top-0' onClick={() => {
                setVehicleFound(false);
            }}><i className="text-3xl ri-arrow-down-wide-line"></i></h5>



            <h3 className='text-2xl font-semibold text-center mb-3'>Looking for NearBY Driver</h3>
            <div className='flex flex-col items-center bg-white relative pt-12'>
                <div className="fixed top-[6rem] left-0 w-full h-1 bg-blue-500 animate-pulse z-50"></div>
                <div className="absolute top-10 w-40 h-28 bg-blue-300 rounded-full blur-xl opacity-70 z-0"></div>

                <img
                    className='h-20 relative z-10'
                    src={vehicleDetails.image}
                    alt=""
                />

                <div className='w-full mt-5 bg-white'>
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
                    <div className='flex items-center gap-5 p-3'>
                        <i className="ri-currency-line"></i>
                        <div>
                            <h3 className='text-lg font-medium'>&#8377;{vehicleDetails.price}</h3>
                            <p className='text-sm -mt-1 text-gray-600'>Cash/UPI Only</p>
                        </div>
                    </div>
                </div>
            </div>


        </div>
    )
}
