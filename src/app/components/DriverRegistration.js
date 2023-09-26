"use client"

import React, { useState, useEffect } from 'react';
import { X } from 'feather-icons-react';
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import axios from 'axios'; 
import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2'



const DriverRegistration = ({ isOpen, onClose, editData }) => {


  const [emailError, setEmailError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState('');
  const router = useRouter();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    email: '',
    roleid: 'driver',
    vehiclenumber: '',
    licensenumber: '',
    contactnumber: '',
  });


  useEffect(() => {
    if (editData) {
      //  console.log(editData,"editData");
        setFormData({
            username: editData.username,
            password: editData.password,
            email: editData.email,
            roleid: 'driver',
            vehiclenumber: editData.vehiclenumber,
            licensenumber: editData.licensenumber,
            contactnumber: editData.contactnumber,
        });
    }
}, [editData]);

// const axios = require('axios'); // Make sure you have Axios installed

const updatedriver = async (e) => {
  e.preventDefault();

  const requestData = {
    username: formData.username,
    password: formData.password,
    email: formData.email,
    driverid: editData.driverid,
    vehiclenumber: formData.vehiclenumber,
    licensenumber: formData.licensenumber,
    contactnumber: formData.contactnumber,
  };

  try {
    const response = await axios.post("http://localhost:3000/api/updatedriver", requestData);

    // Handle the response data here
    const responseData = response.data;
    // console.log(responseData, "responseData");
    if(responseData.success == true){
      onClose()
      // alert(responseData.result)
      Swal.fire(
        'Successfully Updated',
        'You clicked the button!',
        'success'
      )
    }else{
      alert("something went wrong");
    }
  } catch (error) {
    console.error('Error:', error);
  }
};



  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'email') {
      if (!isValidEmail(value)) {
        setEmailError('Invalid email format');
      } else {
        setEmailError('');
      }
    } else if (name === 'contactnumber') {
      // Check if it contains only digits and has a length of 10
      if (/^\d{10}$/.test(value)) {
        setContactNumberError('');
      } else {
        setContactNumberError('Contact Number must be a 10-digit number');
      }
    }

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const isValidEmail = (email) => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailRegex.test(email);
  };

  const [validationError,setValidationError] =  useState('');
  const [licenseNumberError, setLicenseNumberError] = useState('');
  const [contactNumberError, setContactNumberError] = useState('');

  const handleSubmit = async (e) => {
    console.log(formData,"formData");
    e.preventDefault();
    try {
      // Validate the vehicle number (for example, check if it's not empty)
      if (formData.vehiclenumber.trim() === '') {
        setValidationError('Vehicle Number is required');
        return; // Do not submit the form if validation fails
      }else if(formData.licensenumber.trim() === ''){
        setLicenseNumberError('License Number is required')
      }else if(formData.contactnumber.trim()===''){
        setContactNumberError('Contact Number is required')
      }

      const response = await axios.post(
        'http://localhost:3000/api/registration',
        formData
      );
      console.log('Response:', response.data);
      setFormData({})
      onClose()

      // showSuccessToast('Account created successfully');
      // router.push('/')
      // alert("Success")
      Swal.fire(
        'Successfully Registration',
        'You clicked the button!',
        'success'
      )
    } catch (error) {
      // showErrorToast('An error occurred while creating the account');
      console.error('Error:', error);
    }
  };
    

    

   




    

    

  if (!isOpen) return null;

  return (
    
    <div className="fixed inset-0 flex items-center justify-center z-50 ">
      <div className="modal-container backdrop-blur-sm bg-white/3">
        <div className="card bg-white backdrop-blur-md bg-white/60 rounded-lg px-10">
   
          <form className="p-4 space-y-4">

            <div className='float-right'>
              <button className="modal-close ml-auto" onClick={onClose}>
                <X size={24} />
              </button>
            </div>
          <div className="flex flex-col items-center">
            
            <div className="text-center">
              {editData ? (
                <h2 className="text-2xl font-bold">Edit Driver Details</h2>
              ) : (
                <h2 className="text-2xl font-bold">Driver Registration</h2>
              )}
            </div>
            
          </div>
         
          <div className='flex gap-x-4 mt-[20px]'>
                    <label className='w-full'>
                        <p className='text-[1rem] text-black font-bold  mb-1 leading-[1.375rem]'>Driver Name</p>
                        <input
                            required
                            type="text"
                            id="username"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            placeholder="Enter Name"
                            
                            className=' px-4 py-2 border rounded-md outline-none focus:ring focus:ring-blue-500'
                        />
                    </label>

                    <label className='w-full'>
                        <p className='text-[0.875rem] text-black font-bold mb-1 leading-[1.375rem]'>Email</p>
                        <input
                            required
                            type="email"
                      placeholder="Email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                            className=' px-4 py-2 border rounded-md outline-none focus:ring focus:ring-blue-400'
                        />
                                             {emailError && <div className="text-red-500 text-sm mt-1">{emailError}</div>}

                    </label>
            </div>

            <div className='flex gap-x-4 mt-[20px]'>
            <label className='w-full relative'>
                    <p className='text-[0.875rem] text-black font-bold mb-1 leading-[1.375rem]'>Password</p>
                    <input
                        required
                        type= {showPassword ? ("text") : ("password")}
                        name="password"
                        id="password"
                      value={formData.password}
                      onChange={handleChange}
                        placeholder="Password"
                        
                        className=' px-4 py-2 border rounded-md outline-none focus:ring focus:ring-blue-400'
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
                            id="vehiclenumber"
                            name="vehiclenumber"
                            value={formData.vehiclenumber}
                            onChange={handleChange}                      
                            placeholder="Vehicle Number"
                            className=' px-4 py-2 border rounded-md outline-none focus:ring focus:ring-blue-400'
                        />
                    </label>
            </div>



            <div className='flex gap-x-4 mt-[20px]'>
                    <label className='w-full'>
                        <p className='text-[0.875rem] text-black font-bold mb-1 leading-[1.375rem]'>License Number<sup className='text-pink-200'>*</sup></p>
                        <input
                            required
                            placeholder="License Number"
                      id="licensenumber"
                      name="licensenumber"
                      value={formData.licensenumber}
                      onChange={handleChange}
                            
                            className=' px-4 py-2 border rounded-md outline-none focus:ring focus:ring-blue-400'
                        />
                    </label>

                    <label className='w-full'>
                        <p className='text-[0.875rem] text-black font-bold mb-1 leading-[1.375rem]'>Mobile Number</p>
                        <input
                            required
                            id="contactnumber"
                      name="contactnumber"
                      value={formData.contactnumber}
                      onChange={handleChange}
                      maxLength="10"
                      placeholder="Mobile Number"
                            className=' px-4 py-2 border rounded-md outline-none focus:ring focus:ring-blue-400'
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




{editData?(
                    <button className="bg-black text-black  py-[10px] px-[10px] rounded-md font-mullish font-bold
                    bg-cyan-500 hover:bg-cyan-600 transition-all duration-200 place-content-center" onClick={updatedriver}>update</button>
                  ):
                 
 <button
 className="bg-black text-black  py-[10px] px-[10px] rounded-md font-mullish font-bold
 bg-cyan-500 hover:bg-cyan-600 transition-all duration-200 place-content-center" onClick={handleSubmit}
 >SUBMIT</button>}
            
          </form>
          </div>
        </div>
      </div>
   
    
  );
};

export default DriverRegistration
