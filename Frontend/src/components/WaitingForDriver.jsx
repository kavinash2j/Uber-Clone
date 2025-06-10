import React from 'react'

export const WaitingForDriver = ({ setWaitingForDriver }) => {
    return (
        <div>
            <h5 className='text-center w-[93%] absolute top-0' onClick={() => {
                setWaitingForDriver(false);
            }}><i class="text-3xl ri-arrow-down-wide-line"></i></h5>


            <h3 className='text-lg font-bold  text-left mb-1'>PIN:22310</h3>


            <div className='flex items-center justify-between'>
                <img
                    className='h-12'
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
                <div className='w-full mt-5 bg-white'>
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
                    <div className='flex items-center gap-5 p-3'>
                        <i className="ri-currency-line"></i>
                        <div>
                            <h3 className='text-lg font-medium'>&#8377;65.17</h3>
                            <p className='text-sm -mt-1 text-gray-600'>Cash/UPI Only</p>
                        </div>
                    </div>
                </div>
            </div>


        </div>
    )
}
