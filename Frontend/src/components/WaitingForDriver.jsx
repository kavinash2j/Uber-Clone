import React from 'react'

export const WaitingForDriver = ({ setWaitingForDriver, locFormat, vehicleDetails, ride }) => {
    return (
        <div>
            <h5 className='text-center w-[93%] absolute top-0' onClick={() => {
                setWaitingForDriver(false);
            }}><i className="text-3xl ri-arrow-down-wide-line"></i></h5>


            <h3 className='text-lg font-bold  text-left mb-1'>OTP:{ride.otp}</h3>


            <div className='flex items-center justify-between'>
                <img
                    className='h-12'
                    src={vehicleDetails?.image}
                    alt=""
                />
                <div className='text-right'>
                    <h2 className='text-[1.3rem] font-medium capitalize'>{ride.captain?.fullname?.firstname}</h2>
                    <h4 className='text-xl font-bold tracking-tight uppercase '>{ride.captain?.vehicle.plate}</h4>
                    <p className='text-sm text-gray-600 -mt-1 -mb-1'>Honda Bike</p>
                </div>
            </div>

            <div className='flex flex-col items-center bg-white relative '>
                <div className='w-full mt-5 bg-white'>
                    <div className='flex items-center gap-5 p-3 border-b-2'>
                        <i className="text-lg ri-map-pin-range-fill"></i>
                        <div>
                            <h3 className='text-lg font-medium'>{locFormat?.pickup[0]}</h3>
                            <p className='text-sm -mt-1 text-gray-600'>{locFormat?.pickup[1]}</p>
                        </div>
                    </div>
                    <div className='flex items-center gap-5 p-3 border-b-2'>
                        <i className="text-lg ri-square-fill"></i>
                        <div>
                            <h3 className='text-lg font-medium'>{locFormat?.destination[0]}</h3>
                            <p className='text-sm -mt-1 text-gray-600'>{locFormat?.destination[1]}</p>
                        </div>
                    </div>
                    <div className='flex items-center gap-5 p-3'>
                        <i className="ri-currency-line"></i>
                        <div>
                            <h3 className='text-lg font-medium'>&#8377;{vehicleDetails?.price}</h3>
                            <p className='text-sm -mt-1 text-gray-600'>Cash/UPI Only</p>
                        </div>
                    </div>
                </div>
            </div>


        </div>
    )
}
