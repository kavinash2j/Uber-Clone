import React, { useRef, useState } from 'react'
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { LocationSearchPanel } from '../components/LocationSearchPanel';
import { VehiclePanel } from '../components/VehiclePanel';
import { ConfirmRidePanel } from '../components/ConfirmRidePanel';
import { LookingForDriver } from '../components/LookingForDriver';
import { WaitingForDriver } from '../components/WaitingForDriver';


export const Home = () => {
  const [pickup, setPickup] = useState('');
  const [destination, setDestination] = useState('')
  const [panelOpen, setPanelOpen] = useState(false);
  const [VehiclePanelOpen, setVehiclePanelOpen] = useState(false);
  const VehiclePanelRef = useRef(null);
  const [confirmRidePanel, setConfirmRidePanel] = useState(false);
  const confirmRidePanelRef = useRef(null);
  const [vehicleFound, setVehicleFound] = useState(false);
  const vehicleFoundRef = useRef(null);
  const waitingForDriverRef = useRef(null);
  const [waitingForDriver, setWaitingForDriver] = useState(false);

  function submitHandler(e) {
    e.preventDefault();
  }

  const panelRef = useRef(null);
  useGSAP(function () {
    if (panelOpen) {
      gsap.to(panelRef.current, {
        height: '70%'
      })
    } else {
      gsap.to(panelRef.current, {
        height: '0'
      })
    }

  }, [panelOpen])

  useGSAP(function () {
    if (VehiclePanelOpen) {
      gsap.to(VehiclePanelRef.current, {
        transform: 'translateY(0)'
      })
    } else {
      gsap.to(VehiclePanelRef.current, {
        transform: 'translateY(100%)'
      })
    }
  }, [VehiclePanelOpen])

  useGSAP(() => {
    if (confirmRidePanel) {
      gsap.to(confirmRidePanelRef.current, {
        transform: 'translateY(0)'
      })
    }
    else {
      gsap.to(confirmRidePanelRef.current, {
        transform: 'translateY(100%)'
      })
    }
  }, [confirmRidePanel])

  useGSAP(() => {
    if (vehicleFound) {
      gsap.to(vehicleFoundRef.current, {
        transform: 'translateY(0)'
      })
    }
    else {
      gsap.to(vehicleFoundRef.current, {
        transform: 'translateY(100%)'
      })
    }
  }, [vehicleFound])

  useGSAP(() => {
    if (waitingForDriver) {
      gsap.to(waitingForDriverRef.current, {
        transform: 'translateY(0)'
      })
    }
    else {
      gsap.to(waitingForDriverRef.current, {
        transform: 'translateY(100%)'
      })
    }
  }, [waitingForDriver])

  return (
    <div className='h-screen relative overflow-hidden'>

      <img className='w-16 absolute left-5 top-5' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="" />

      <div className='w-screen h-screen'>
        {/* image for temporary use */}
        <img className='h-full w-full object-cover' src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif" alt="" />
      </div>

      <div className=' h-screen  flex flex-col justify-end absolute top-0 w-full '>

        <div className='h-[30%] bg-white p-5 relative' >
          <div className='flex justify-between'>
            <h4 className='text-2xl font-semibold'>Find a trip</h4>
            {panelOpen && <span onClick={() => {
              setPanelOpen(false);
            }} className="material-symbols-outlined">
              keyboard_arrow_down
            </span>}
          </div>


          <form onSubmit={(e) => {
            submitHandler(e);
          }}>

            <div className="relative w-full">
              {/* Vertical line: adjust height to cover half of both inputs */}
              <div className="absolute left-6 top-[2.6rem] h-[3.5rem] w-1 bg-gray-900 rounded-full z-10"></div>

              {/* Input 1 */}
              <input
                value={pickup}
                onClick={() => setPanelOpen(true)}
                onChange={(e) => setPickup(e.target.value)}
                className="bg-[#eee] px-12 py-2 text-lg rounded-lg w-full mt-5"
                type="text"
                placeholder="Add a pick-up location"
              />

              {/* Input 2 */}
              <input
                value={destination}
                onClick={() => setPanelOpen(true)}
                onChange={(e) => setDestination(e.target.value)}
                className="bg-[#eee] px-12 py-2 text-lg rounded-lg w-full mt-4"
                type="text"
                placeholder="Enter your destination"
              />
            </div>


          </form>

        </div>

        <div ref={panelRef} className='h-0 pl-2 bg-white '>
          <LocationSearchPanel setPanelOpen={setPanelOpen} setVehcilePanelOpen={setVehiclePanelOpen}></LocationSearchPanel>
        </div>
      </div>
      <div ref={VehiclePanelRef} className='fixed w-full z-10 px-3 py-8 bg-white bottom-0 translate-y-[100%] pt-12'>
        <VehiclePanel setVehiclePanelOpen={setVehiclePanelOpen} setCofirmRidePanel={setConfirmRidePanel}></VehiclePanel>
      </div>
      <div ref={confirmRidePanelRef} className='fixed w-full z-10 px-3 py-8 bg-white bottom-0 translate-y-[100%] pt-12'>
        <ConfirmRidePanel setConfirmRidePanel={setConfirmRidePanel} VehiclePanelRef={VehiclePanelRef} setVehicleFound={setVehicleFound}></ConfirmRidePanel>
      </div>
      <div ref={vehicleFoundRef} className='fixed w-full z-10 px-3 py-8 bg-white bottom-0 translate-y-[100%] pt-12'>
        <LookingForDriver setVehicleFound={setVehicleFound} ></LookingForDriver>
      </div>
      <div ref={waitingForDriverRef} className='fixed w-full z-10 px-3 py-4 translate-y-[100%] bg-white bottom-0 pt-9'>
        <WaitingForDriver setWaitingForDriver={setWaitingForDriver} ></WaitingForDriver>
      </div>

    </div>
  )
}
