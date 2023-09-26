"use client"
import React, { useState } from 'react';
import { X } from 'feather-icons-react';
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useRouter } from 'next/navigation';
import { signIn} from 'next-auth/react'
import Swal from 'sweetalert2'



const LoginModal = ({ isOpen, onClose }) => {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState(null); 


  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    const credentials= {email, password};

    const result = await signIn('credentials', {
      redirect: false,
      email: credentials.email,
      password: credentials.password,
    });

    if (result.error) {
      setError(result.error);
      // console.error('Sign-in failed:', result.error);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong!',
       
      })
    } else if (result.ok) {
      // Redirect to the dashboard upon successful sign-in
      Swal.fire(
        'Successfully Login',
        'You clicked the button!',
        'success'
      )
      router.push('/dashboard');
    }

    

    // Perform your authentication logic here, and navigate if successful
    // const isAuthenticated = true; // Replace with your authentication logic

    // if (isAuthenticated) {
    //   router.push('/dashboard');
    // }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="modal-container">
        <div className="modal-content">
        {error && <p className="text-red-500">Credentials is not correct.</p>} {/* Display error message */}
          <form className="p-4 space-y-4" onSubmit={handleLogin}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-center">Login</h2>
              <button className="modal-close ml-auto" onClick={onClose}>
                <X size={24} />
              </button>
            </div>

            <div className="space-y-2">
              <label className="w-full">
                <p className="text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem] font-bold text-md">
                  Email Address<sup className="text-red">*</sup>
                </p>
                <input
                  type="email"
                  className='bg-black rounded-[0.5rem] text-white w-full p-[12px]'
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </label>
            </div>

            <div className="space-y-2 relative">
              <label className="w-full">
                <p className="text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem] font-bold text-md ">
                  Password<sup className="text-red">*</sup>
                </p>
                <input
                id='password'
                  type={showPassword ? 'text' : 'password'}
                  className='bg-black rounded-[0.5rem] text-white w-full p-[12px]'
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <span
                  className='absolute right-3 top-[38px] cursor-pointer'
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ?
                    (<AiOutlineEyeInvisible fontSize={24} fill='#ffffff' />)
                    :
                    (<AiOutlineEye fontSize={24} fill='#ffffff' />)
                  }
                </span>
              </label>
            </div>

            

<button
            className="bg-black text-black  py-[10px] px-[10px] rounded-md font-mullish font-bold
            bg-cyan-500 hover:bg-cyan-600 transition-all duration-200 place-content-center" onClick={handleLogin}
            >LOG IN</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
