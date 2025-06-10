import React from 'react'


export const LocationSearchPanel = (props) => {
    console.log(props);
    const Location = [
        "24B, Near Kapoor's cafe, Sheryians Coding School, Bhopal",
        "20B, Near Malhotara's cafe, Sheryians Coding School, Bhopal",
        "23C, Near Singhai's cafe, Sheryians Coding School, Bhopal",
        "16A, Near Sharama's cafe, Sheryians Coding School, Bhopal"
    ]
    function onclick() {
        props.setPanelOpen(false);
        props.setVehcilePanelOpen(true);
    }
    return (
        <div>
            {
                Location.map((ele) => {
                    return <div onClick={onclick} className='flex border-2 p-3 items-center border-white active:border-black   my-2 rounded-xl mr-4  justify-start'>
                        <h2 className='bg-[#eee] h-8 w-12 flex items-center justify-center  rounded-full'><i className="ri-map-pin-fill"></i></h2>
                        <h4 className='text-medium font-bold ml-3'>{ele}</h4>
                    </div>
                })
            }

        </div>

    )
}

export default LocationSearchPanel;