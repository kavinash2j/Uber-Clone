import React, { useRef, useState, useContext } from 'react'
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { LocationSearchPanel } from '../components/LocationSearchPanel';
import { VehiclePanel } from '../components/VehiclePanel';
import { ConfirmRidePanel } from '../components/ConfirmRidePanel';
import { LookingForDriver } from '../components/LookingForDriver';
import { WaitingForDriver } from '../components/WaitingForDriver';
import axios from 'axios';
import { UserDataContex } from '../context/UserContext';
import { SocketContext } from '../context/SocketContext';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LiveMap from '../components/LiveMap';


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
  const [Location, setLocation] = useState([]);
  const [vehicleFare, setVehicleFare] = useState({});
  const [vehicleDetails, setVehicleDetails] = useState({});
  const [locFormat, setLocFormat] = useState({ pickup: [0, 1], destination: [0, 1] });
  const { socket } = useContext(SocketContext);
  const { user } = useContext(UserDataContex);
  const [ride, setRide] = useState({});

  const navigate = useNavigate();

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
      setLocFormat({
        pickup: [pickup.split(",")[0], pickup.split(",").slice(1).join(",")], destination: [destination.split(",")[0], destination.split(",").slice(1).join(",")]
      });
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

  useEffect(() => {
    socket.emit('join', { userType: "user", userId: user._id });
  }, [user])

  socket.on('ride-confirmed', (ride) => {
    setVehicleFound(false);
    setWaitingForDriver(true);
    setRide(ride);
    console.log(ride);
  })
  socket.on('ride-started', ride => {
    setWaitingForDriver(false);
    navigate('/riding', {
      state: {
        vehicleDetails: vehicleDetails,
        locFormat: locFormat,
        ride: ride
      }
    })
  })

  async function onFromClick() {
    setPanelOpen(false);
    const resopnse = await axios.get(`${import.meta.env.VITE_BASE_URL}/rides/get-fare?pickup=${pickup}&destination=${destination}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
    if (resopnse.status === 200) {
      setVehicleFare(resopnse.data);
    }
    else {
      console.error("Error fetching fare data");
    }
    setVehiclePanelOpen(true);
  }

  return (
    <div className='h-screen relative overflow-hidden'>

      <img className='w-16 absolute left-5 top-5' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="" />

      <div className='w-screen h-screen'>
        {/* image for temporary use */}
        <div className='h-full w-full object-cover'>
          <LiveMap></LiveMap>
        </div>
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
                required
              />

              {/* Input 2 */}
              <input
                value={destination}
                onClick={() => setPanelOpen(true)}
                onChange={(e) => setDestination(e.target.value)}
                className="bg-[#eee] px-12 py-2 text-lg rounded-lg w-full mt-4"
                type="text"
                placeholder="Enter your destination"
                required
              />
            </div>
          </form>
        </div>
        <div className='flex justify-between w-full bg-white items-center flex-col h-14'>
          <button onClick={onFromClick} className=' bg-black text-white rounded-lg h-9 w-[90%] p-1 px-4' >Make a Trip</button>
        </div>
        <div ref={panelRef} className=' pl-2 bg-white '>
          <LocationSearchPanel destination={destination} setDestination={setDestination} setPanelOpen={setPanelOpen} Location={Location} setLocation={setLocation}
            pickup={pickup} setPickup={setPickup} setVehcilePanelOpen={setVehiclePanelOpen}></LocationSearchPanel>
        </div>
      </div>
      <div ref={VehiclePanelRef} className='fixed w-full z-10 px-3 py-8 bg-white bottom-0 translate-y-[100%] pt-12'>
        <VehiclePanel setVehicleDetails={setVehicleDetails} vehicleFare={vehicleFare} setVehiclePanelOpen={setVehiclePanelOpen} setCofirmRidePanel={setConfirmRidePanel}></VehiclePanel>
      </div>
      <div ref={confirmRidePanelRef} className='fixed w-full z-10 px-3 py-8 bg-white bottom-0 translate-y-[100%] pt-12'>
        <ConfirmRidePanel locFormat={locFormat} vehicleDetails={vehicleDetails} setConfirmRidePanel={setConfirmRidePanel} VehiclePanelRef={VehiclePanelRef} setVehicleFound={setVehicleFound}></ConfirmRidePanel>
      </div>
      <div ref={vehicleFoundRef} className='fixed w-full z-10 px-3 py-8 bg-white bottom-0 translate-y-[100%] pt-12'>
        <LookingForDriver locFormat={locFormat} vehicleDetails={vehicleDetails} setVehicleFound={setVehicleFound} ></LookingForDriver>
      </div>
      <div ref={waitingForDriverRef} className='fixed w-full z-10 px-3 py-4 translate-y-[100%] bg-white bottom-0 pt-9'>
        <WaitingForDriver
          ride={ride}
          locFormat={locFormat} vehicleDetails={vehicleDetails} setWaitingForDriver={setWaitingForDriver} ></WaitingForDriver>
      </div>

    </div>
  )
}
