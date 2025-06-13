import React from 'react'

const RidePopUp = ({ setRidePopUpPanel, setConfirmRidePopUpPanel }) => {
    return (
        <>
            <h3 className='text-2xl font-semibold mb-5'>New Ride Available!</h3>
            <div className='flex items-center justify-between mt-4 p-3 mt-4 bg-yellow-400 rounded-lg'>
                <div className='flex items-center gap-3 '>
                    <img className='h-10 rounded-full object-cover w-10' src="https://img.freepik.com/free-photo/young-female-being-uber-driver_23-2149184277.jpg" alt="" />
                    <h2 className='text-lg font-medium'>Harsh Patel</h2>
                </div>
                <h5 className='text-lg font-semibold'>2.2 KM</h5>
            </div>
            <div className='flex flex-col items-center bg-white relative '>
                <div className=' w-full '>
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
                <div className='w-full flex justify-between'>
                    <button onClick={() => {
                        setRidePopUpPanel(false)
                    }} className='w-[48%] mt-5 bg-gray-400 text-white font-semibold p-2 rounded-lg'>Ignore</button>
                    <button onClick={() => {
                        setRidePopUpPanel(false);
                        setConfirmRidePopUpPanel(true);
                    }} className='w-[48%] mt-5 bg-green-600 text-white font-semibold p-2 rounded-lg'>Accept</button>
                </div>

            </div>
        </>


    )
}

export default RidePopUp