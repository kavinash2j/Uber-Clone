import React from 'react'
import { useState } from 'react';

export const VehiclePanel = ({ setVehiclePanelOpen, setVehicleDetails, setCofirmRidePanel, vehicleFare }) => {
    function onclick(image, fare, vehicleType) {
        setCofirmRidePanel(true);
        // setVehiclePanelOpen(false);

        setVehicleDetails({
            image: image,
            price: fare,
            vehicleType: vehicleType
        })
    }
    const [vehicleImage, setVehicleImage] = useState({
        bike: "https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1649231091/assets/2c/7fa194-c954-49b2-9c6d-a3b8601370f5/original/Uber_Moto_Orange_312x208_pixels_Mobile.png",
        auto: "https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1648431773/assets/1d/db8c56-0204-4ce4-81ce-56a11a07fe98/original/Uber_Auto_558x372_pixels_Desktop.png",
        car: "https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_538,w_956/v1688398986/assets/90/34c200-ce29-49f1-bf35-e9d250e8217a/original/UberX.png"
    });


    return (
        <>
            <h5 className='p-1 text-center w-[93%] absolute top-0' onClick={() => {
                setVehiclePanelOpen(false);
            }}><i className="text-3xl ri-arrow-down-wide-line"></i></h5>

            <h3 className='text-2xl font-semibold mb-3'>Choose a Vehicle</h3>

            <div onClick={() => { onclick(vehicleImage.bike, vehicleFare.bike, "bike") }} className=' border-2 mb-3 active:border-black rounded-xl w-full flex items-center justify-between h-20'>
                <img className='h-11 ' src={vehicleImage.bike} alt="" />
                <div className=' w-1/2'>
                    <h4 className='font-medium text-sm'>Bike <span><i className="ri-user-fill"></i>1</span></h4>
                    <h5 className='font-medium text-sm'>3 mins away</h5>
                    <p className='font-medium text-xs text-gray-600'>Affordable, motorcycle rides</p>
                </div>
                <h2 className='text-lg font-semibold pr-3'>&#8377;{vehicleFare.bike}</h2>
            </div>

            <div onClick={() => { onclick(vehicleImage.auto, vehicleFare.auto, "auto") }} className=' border-2 mb-3 active:border-black  rounded-xl w-full flex items-center justify-between h-20'>
                <img className='h-11 ' src={vehicleImage.auto} alt="" />
                <div className=' w-1/2'>
                    <h4 className='font-medium text-sm'>UberAuto <span><i className="ri-user-fill"></i>3</span></h4>
                    <h5 className='font-medium text-sm'>6 mins away</h5>
                    <p className='font-medium text-xs text-gray-600'>Affordable Auto ride</p>
                </div>
                <h2 className='text-lg font-semibold pr-3'>&#8377;{vehicleFare.auto}</h2>
            </div>

            <div onClick={() => { onclick(vehicleImage.car, vehicleFare.car, "car") }} className=' border-2 mb-3 active:border-black  rounded-xl w-full flex items-center justify-between h-20'>
                <img className='h-11 ' src={vehicleImage.car} alt="" />
                <div className=' w-1/2'>
                    <h4 className='font-medium text-sm'>UberGO <span><i className="ri-user-fill"></i>4</span></h4>
                    <h5 className='font-medium text-sm'>2 mins away</h5>
                    <p className='font-medium text-xs text-gray-600'>Affordable, Compact rides</p>
                </div>
                <h2 className='text-lg font-semibold pr-3'>&#8377;{vehicleFare.car}</h2>
            </div>
        </>
    )
}
