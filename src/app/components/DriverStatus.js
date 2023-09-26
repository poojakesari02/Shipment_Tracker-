"use client"

import React,{useState, useEffect} from 'react';
import { FaEdit, FaTrash ,FaPlus} from 'react-icons/fa';
import axios from 'axios';
import { useRouter } from 'next/navigation'
import DriverRegistration from './DriverRegistration';
import Trackdriver from './Trackdriver';
export const DriverStatus = () => {

  const [isModalOpen, setModalOpen] = useState(false);
  const [isModalOpen1, setModalOpen1] = useState(false);
  let [alldriverss, setAlldriverss] = useState([]);
  const [showtable, setShowtable] = useState(false);
  const [trackdriver, setTrackdriver] = useState(false);
  const [trackdriverdata, setTrackdriverdata] = useState([])
  let [editData, setEditData] = useState([]);
  const router = useRouter();


  const openModal = () => {
    setModalOpen(true);
    
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const openModal1 = () => {
    setModalOpen1(true);
    
  };

  const closeModal1 = () => {
    setModalOpen1(false);
  };



  const handleEdit = (res) => {
    console.log(handleEdit);
    if(res){
      setEditData(res);
      setShowtable(true);
      openModal()
    }
  }

  const handleTrack = (res) => {
    // console.log(handleTrack);
    if(res){
      setTrackdriverdata(res);
      setTrackdriver(true);
      openModal1()
    }
  }




 useEffect(() => {
  alldriver();
}, [])

const alldriver = async () => {
  try {
    const response = await axios.get("http://localhost:3000/api/alldrivers");
    console.log(response.data);
    setAlldriverss(response.data.data);
  } catch (error) {
    console.error('Error:', error);
  }
};

alldriver()

// alldriver();



  return (
    <div>
      {trackdriver ===true?( <Trackdriver isOpen={isModalOpen1} onClose={closeModal1} trackdriverdata={trackdriverdata}/>):null}
     
    <div className="mx-1 mt-10 w-full justify-center items-center">
      <h1 className="text-center text-black font-bold">You can Assign,Edit,Track and Delete Driver</h1>
      <div className="h-80 overflow-y-auto">
        <table className="w-full border-collapse border border-gray-300">
          <thead className="bg-gray-800 text-white whitespace-nowrap sticky top-0">
  <tr className="bg-gray-800 text-white whitespace-nowrap">
  <th className="p-4">Actions</th>
    <th className="p-4">Driver</th>
 
    <th className="p-4">Driver Email</th>
    <th className="p-4">Vehicle Number</th>
    <th className="p-4">License Number</th>
    <th className="p-4">Mobile Number</th>
    <th className="p-4">Status</th>
    
  </tr>
</thead>

        <tbody>

          {alldriverss.map((res, ind) => {
              return (
                <tr className="bg-gray-200" key={ind}>
                  <td className="p-4">
                    <div style={{ display: 'flex' }}>
                      <FaEdit
                        className="cursor-pointer text-blue-500 mr-2" onClick={()=>handleEdit(res)}
                       
                      />
                      <FaTrash
                        className="cursor-pointer text-red-500"
                        
                      />
                    </div>
                  
                  </td>
                  <td className="grid grid-rows-2 grid-flow-col mt-6">
    <span className="mr-2">{res.username}</span>
    <span className="text-sm text-">{res.driverid}</span>
    {/* Add more additional information here */}
  </td>
    
    {/* Add more additional information here */}
  {/* </td> */}

                  
                  <td className="p-4">{res.email}</td>

                  <td className="p-9">{res.vehiclenumber}</td>
                  {/* <td className="p-4">{moment(res.planneddeliverydate).format("DD-MM-YYYY")}</td> */}
                  <td className="p-4">{res.licensenumber}</td>
                  <td className="p-4">{res.contactnumber}</td>
                  <td className="p-4">
  <button className="bg-blue-500 text-white px-2 py-1 rounded-md hover:bg-black" onClick={()=>handleTrack(res)}>
    Track me
  </button>
  {/* <Trackdriver isOpen={isModalOpen} onClose={closeModal} /> */}
</td>
                    
                  {/* <AssignTodriver isOpen={isModalOpen1} onClose={closeModal1} /> */}

                  
                </tr>
              );
            })}

          

          
          {/* Add more rows here */}
        </tbody>
        
      </table>
      {showtable === true?(
        <DriverRegistration isOpen={isModalOpen} onClose={closeModal} editData={editData} />
      ):null}
      </div>
    </div>
    </div>
  );
};
