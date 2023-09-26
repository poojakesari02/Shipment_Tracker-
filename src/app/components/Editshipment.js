import React, { useState } from 'react';
import { X } from 'feather-icons-react';
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";


const Editshipment = ({ isOpen, onClose }) => {

    

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
      };

    const handleLogin = (e) => {
        e.preventDefault();
    
        // Perform your authentication logic here, and navigate if successful
        const isAuthenticated = true; // Replace with your authentication logic
    
        // if (isAuthenticated) {
        //   router.push('/dashboard');
        // }
      };

    const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  if (!isOpen) return null;

  return (
    
    <div className="fixed inset-0 flex items-center justify-center z-50 ">
      <div className="modal-container">
        <div className="modal-content">
   
          <form className="p-4 space-y-4" onSubmit={handleLogin}>
          <div className="flex items-center justify-between mx-12 mb-6">
          <h2 className="text-2xl font-bold ">Registration</h2>
              <button className="modal-close ml-auto" onClick={onClose}>
                <X size={24} />
              </button>
              </div>
         
          <div className='flex gap-x-4 mt-[20px]'>
                    <label className='w-full'>
                        <p className='text-[0.875rem] text-black font-bold  mb-1 leading-[1.375rem]'>Driver Name</p>
                        <input
                            required
                            type="text"
                            name="firstName"
                            
                            placeholder="Enter Name"
                            
                            className='w-40 h-10 px-4 py-2 border rounded-md outline-none focus:ring focus:ring-blue-500'
                        />
                    </label>

                    <label className='w-full'>
                        <p className='text-[0.875rem] text-black font-bold mb-1 leading-[1.375rem]'>Email</p>
                        <input
                            required
                            type="text"
                            name="Email"
                            
                            placeholder="Enter Email"
                            
                            className='w-40 h-10 px-4 py-2 border rounded-md outline-none focus:ring focus:ring-blue-400'
                        />
                    </label>
            </div>

            <div className='flex gap-x-4 mt-[20px]'>
            <label className='w-full relative'>
                    <p className='text-[0.875rem] text-black font-bold mb-1 leading-[1.375rem]'>Password</p>
                    <input
                        required
                        type= {showPassword ? ("text") : ("password")}
                        name="password"
                        
                        placeholder="Password"
                        
                        className='w-40 h-10 px-4 py-2 border rounded-md outline-none focus:ring focus:ring-blue-400'
                    />
                    <span
                     className='absolute right-2 top-[38px] cursor-pointer' 
                    onClick={() => setShowPassword((prev) => !prev)}>
                        {showPassword ? 

                        (<AiOutlineEyeInvisible fontSize={24} fill='#000000'/>) : 

                        (<AiOutlineEye fontSize={24} fill='#000000'/>)}
                    </span>
                </label>

                    <label className='w-full'>
                        <p className='text-[0.875rem] text-black font-bold mb-1 leading-[1.375rem]'>Vehicle Number</p>
                        <input
                            required
                            type="text"
                            name="lastName"
                            
                            placeholder="Enter Vehicle NO"
                            
                            className='w-40 h-10 px-4 py-2 border rounded-md outline-none focus:ring focus:ring-blue-400'
                        />
                    </label>
            </div>



            <div className='flex gap-x-4 mt-[20px]'>
                    <label className='w-full'>
                        <p className='text-[0.875rem] text-black font-bold mb-1 leading-[1.375rem]'>License Number<sup className='text-pink-200'>*</sup></p>
                        <input
                            required
                            type="text"
                            name="License Number"
                            
                            placeholder="License Number"
                            
                            className='w-40 h-10 px-4 py-2 border rounded-md outline-none focus:ring focus:ring-blue-400'
                        />
                    </label>

                    <label className='w-full'>
                        <p className='text-[0.875rem] text-black font-bold mb-1 leading-[1.375rem]'>Mobile Number</p>
                        <input
                            required
                            type="text"
                            name="lastName"
                            
                            placeholder="Enter Mobile No"
                            
                            className='w-40 h-10 px-4 py-2 border rounded-md outline-none focus:ring focus:ring-blue-400'
                        />
                    </label>
            </div>    

            

           

            

            {/* <button type="submit" className="btn-primary">
              Log In
            </button> */}
            {/* <button
                    type="button"
                    className="inline-flex  items-center justify-center rounded-sm bg-black px-1 py-1  leading-7 text-white"
                  >
                    LOG IN
                  </button> */}

<button
            className="bg-black text-black  py-[10px] px-[10px] rounded-md font-mullish font-bold
            bg-cyan-500 hover:bg-cyan-600 transition-all duration-200 place-content-center"
            >SUBMIT</button>
            
          </form>
          </div>
        </div>
      </div>
   
    
  );
};

export default Editshipment;
