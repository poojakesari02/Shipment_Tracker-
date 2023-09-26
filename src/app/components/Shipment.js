"use client"

import React, { useState } from 'react';
import ShipmentRegistration from '../components/ShipmentRegistration'
import { AssignShipment } from './AssignShipment';
import { useRouter } from 'next/navigation';


function Shipment() {

  const [table, setTable] = useState(false);


    const router = useRouter();

    const openModal = () => {
        setModalOpen(true);
      };
    
      const closeModal = () => {
        setModalOpen(false);
      };
    
      ///
    
      const showtables = () => {
        setTable(true);
      }

    const [isModalOpen, setModalOpen] = useState(false);


    return (
      <div>
        <div class="grid grid-cols-2 gap-4">
        <div className="w-[300px] h-[100px] rounded-md border-2 border-black mx-24 mt-8 hover:bg-gray-800">
         
          <div className="p-4 text-center mt-4  hover:bg-gray-800" >
            <h1 className="text-lg font-bold hover:text-white" onClick={openModal}>Create Shipment</h1>
            <ShipmentRegistration isOpen={isModalOpen} onClose={closeModal}/>
         
          </div>
        </div>
    
        <div className="w-[300px] h-[100px] rounded-md border-2 border-black mx-2 float-left mt-8 hover:bg-gray-800">
          
          <div className="p-4 text-center mt-4">
            <h1 className="text-lg font-bold hover:text-white" onClick={showtables}>Shipment List</h1>
           
          </div>
        </div>
        
        
        </div>
        {table!=false ?(
            <AssignShipment/>
        ):null} 
        </div>
    )
  }

  export default Shipment
