"use client"

import React, { useState } from 'react';
import DriverRegistration from '../components/DriverRegistration'
import { DriverStatus } from './DriverStatus';

import { useRouter } from 'next/navigation';

function Driver() {
    const router = useRouter();

    const [isModalOpen, setModalOpen] = useState(false);
    const [showtable, setShowtable] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  ///

  const showtables = () => {
    setShowtable(true);
  }


  return (
    <div>
    <div class="grid grid-cols-2 gap-4">
    <div className="w-[300px] h-[100px] rounded-md border-2 border-black  mx-24 mt-8 hover:bg-gray-800">
     
      <div className="p-4 text-center mt-4  hover:bg-gray-800" >
        <h1 className="text-lg font-bold hover:text-white" onClick={openModal}>Create Driver</h1>
        <DriverRegistration isOpen={isModalOpen} onClose={closeModal} />
     
      </div>
    </div>

    <div className="w-[300px] h-[100px] rounded-md border-2  border-black mx-2 float-left mt-8 hover:bg-gray-800">
      
      <div className="p-4 text-center mt-4">
        <h1 className="text-lg font-bold hover:text-white" onClick={showtables}>Driver List</h1>
       
      </div>
    </div>
   
    
    </div>
    {showtable!=false ?(
        <DriverStatus/>
    ):null}
    </div>
  )
}

export default Driver