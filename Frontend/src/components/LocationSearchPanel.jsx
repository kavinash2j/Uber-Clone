import React, { useEffect, useState } from 'react'
import axios from 'axios';


export const LocationSearchPanel = (props) => {
    const token = localStorage.getItem('token')
    const [toggle, setToggle] = useState('');

    useEffect(() => {
        async function callbacken() {
            setToggle('pickup');
            const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/map/get-suggestion?address=${props.pickup || 'pune'}`, {
                headers: {
                    Authorization: `Bears ${token}`
                }
            })
            props.setLocation(response.data);
        }
        callbacken();
    }, [props.pickup])
    useEffect(() => {
        async function callbacken() {
            setToggle('destination');
            const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/map/get-suggestion?address=${props.destination || 'pune'}`, {
                headers: {
                    Authorization: `Bears ${token}`
                }
            })
            props.setLocation(response.data);
        }
        callbacken();
    }, [props.destination])

    function onclick(id) {
        if (toggle == 'pickup') {
            props.setPickup(props.Location[id].place_name);
        } else if (toggle == 'destination') {
            props.setDestination(props.Location[id].place_name);
        }
    }
    return (
        <div>
            {
                props.Location.map((ele, id) => {
                    return <div key={id} onClick={() => {
                        onclick(id);
                    }} className='flex border-2 p-3 items-center border-white active:border-black   my-2 rounded-xl mr-4  justify-start'>
                        <h2 className='bg-[#eee] h-8 w-12 flex items-center justify-center  rounded-full'><i className="ri-map-pin-fill"></i></h2>
                        <h4 className='text-medium font-bold ml-3'>{ele.place_name} </h4>
                    </div>
                })
            }

        </div>

    )
}

export default LocationSearchPanel;