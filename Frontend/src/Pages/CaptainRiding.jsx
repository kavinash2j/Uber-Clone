import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import FinishRidePanel from '../components/FinishRidePanel'
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

const CaptainRiding = () => {

    const [finishRidePanel, setFinshRidePanel] = useState(false);
    const finishRideRef = useRef(null);

    useGSAP(function () {
        if (finishRidePanel) {
            gsap.to(finishRideRef.current, {
                transform: 'translateY(0)'
            })
        } else {
            gsap.to(finishRideRef.current, {
                transform: 'translateY(100%)'
            })
        }

    }, [finishRidePanel])
    return (
        <div className='h-screen'>

            <div className='fixed p-6 top-0 flex items-center justify-between w-screen'>
                <img className='h-14' src="https://static.vecteezy.com/system/resources/previews/027/127/451/non_2x/uber-logo-uber-icon-transparent-free-png.png" alt="" />
                <Link to='/captain-logout' className='h-10 w-10 bg-white flex items-center justify-center rounded-full'>
                    <i className="ri-logout-box-r-line"></i>
                </Link>

            </div>
            <div className='h-4/5'>
                <img className='h-full w-full object-cover' src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif" alt="" />
            </div>
            <h5 className='text-center  w-full w-[93%] absolute rotate-180' onClick={() => {

            }}>
                <i className=" text-black-900 text-3xl ri-arrow-down-wide-line"></i>
            </h5>
            <div className='h-1/5 p-6 flex items-center
             justify-between bg-yellow-400'>

                <h4 className='text-xl font-semibold'>4 KM away</h4>
                <button onClick={() => {
                    setFinshRidePanel(true);
                }} className=' bg-green-600 text-white font-semibold p-3 px-10 rounded-lg'>Complete Ride</button>
            </div>
            <div ref={finishRideRef} className='fixed w-full z-10 px-3 py-4 translate-y-[100%] bg-white bottom-0 pt-9'>
                <FinishRidePanel setFinshRidePanel={setFinshRidePanel}></FinishRidePanel>
            </div>
        </div>
    )
}

export default CaptainRiding