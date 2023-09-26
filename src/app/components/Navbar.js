"use client";


import React, { useState,useEffect } from 'react';
import LoginModal from '../components/LoginModal';
import Registration from '../components/Registration';
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';
import { signIn } from 'next-auth/react';

function Navbar() {
const Pathname = usePathname()
  const router = useRouter();
  // const navigate = (page) => {
  //   router.push("/Registration" + page)
  // }



  const [isModalOpen, setIsModalOpen] = useState(false);

  // const openModal = () => {
  //   setIsModalOpen(true);
  // };

  // if(Pathname =='/signIn'){
  //   setIsModalOpen(true);
  // }else{
  //   setIsModalOpen(false);
  // }

  useEffect(()=>{
    if(Pathname =='/signIn'){
      setIsModalOpen(true);
    }else{
      setIsModalOpen(false);
    }
  },[])

  const closeModal = () => {
    setIsModalOpen(false);
  };
  return (
    <nav className="bg-slate-950">
      <div className="relative w-[1080px] mx-auto flex items-center justify-between">
        {/* Logo */}
        <a href="/" className="cursor-pointer py-7 pr-7">
          {/* <img src="/om.png" width="125px" height="20px" /> */}
          <h3 className="text-white text-md">OM LOGISTICS LTD</h3>
        </a>

   
        <h2 className="text-white text-4xl">SHIPMENT TRACKER</h2>

        {/* Language and Log In/Sign Up */}
        <div className="flex space-x-6">
        <img src="/india-flag.svg" width="50px" height="10px" ></img>
          <button className="py-3 px-5 font-mullish text-white border-lightBlue border rounded-sm text-sm font-bold :hover:bg-sky-700"  onClick={() => signIn()}>
            Log in
          </button>
          <LoginModal isOpen={isModalOpen} onClose={closeModal} />

          <button className="py-3 px-4 font-mullish rounded-sm text-sm font-bold bg-white text-lightBlue300 border transition-all duration-200 hover:text-lightBlue500 flex" onClick={() => router.push('/registration')}>
            Sign Up
            <svg
              viewBox="0 0 24 24"
              focusable="false"
              className="w-[14px] h-[14px] ml-3"
            >
              <path
                fill="currentColor"
                d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"
              ></path>
            </svg>
          </button>
        </div>
      </div>
    </nav>
    
  );
}



function NavItem({ label }) {
  return (
    <li className="text-white font-mullish py-7 hover:text-lightBlue cursor-pointer transition-all duration-200 relative group">
      <a href="#">{label}</a>
      <div className="absolute bottom-0 w-full h-1 bg-lightBlue hidden group-hover:block transition-all duration-200"></div>
    </li>
  );
}

export default Navbar;
