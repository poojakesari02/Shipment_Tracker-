"use client"
import React from 'react';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { signIn, signOut, useSession } from 'next-auth/react';

const TopBox = ()=>{
  const router = useRouter();
  const pathname = usePathname();
  console.log(pathname,"pathname")
  const { data: session } = useSession();


  if(!session){
    router.push("/");
    return null;
  }

return(
    <nav className="bg-gray-800">
      <div className="relative w-[1090px] mx-auto flex items-center justify-between">
       
   
        <h2 className="text-white text-2xl text-center">SHIPMENT TRACKER</h2>

      
        <div className="flex space-x-6">
        
          
        <h2 className="text-white text-xl flex">{session.user.username}</h2>
          <button className="py-2 px-2 font-mullish rounded-md text-sm font-bold bg-white text-lightBlue300 border text-center mx-5 transition-all duration-200 hover:text-lightBlue500 flex"  onClick={() => signOut()}>
           Log out
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
)
};

export default TopBox;
