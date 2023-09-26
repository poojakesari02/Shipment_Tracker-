"use client"

import React, { useState } from 'react';
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useRouter } from 'next/navigation';
import Layout from './Layout';
import axios from 'axios';


export default function Registration (){
    // const router = useRouter();

    const [emailError, setEmailError] = useState('');
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

    const handleChange = (e) => {
      const { name, value } = e.target;
      if (name === 'email') {
        if (!isValidEmail(value)) {
          setEmailError('Email Format is not valid');
        } else {
          setEmailError('');
        }
      } else if (name === 'contactnumber') {
        // Check if it contains only digits and has a length of 10
        if (/^\d{10}$/.test(value)) {
          setContactNumberError('');
        } else {
          setContactNumberError('Mobile Number must be a 10-digit number');
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
  
    const handleSubmit = async () => {
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
        // showSuccessToast('Account created successfully');
        router.push('/')
        alert("Success")
      } catch (error) {
        // showErrorToast('An error occurred while creating the account');
        console.error('Error:', error);
      }
    };

    return(
      
        <div className="bg-slate-950 w-full">
      <div className="grid grid-cols-1 lg:grid-cols-2">
        <div className="flex items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
          <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
            <h2 className="text-3xl font-bold leading-tight text-white sm:text-4xl">Sign Up</h2>
            <p className="mt-2 text-base text-white">
              Create an account?{' '}
              <a
                href="#"
                title=""
                className="font-medium text-white transition-all duration-200 hover:underline"
              >
                Login
              </a>
            </p>
            <form action="#" method="POST" className="mt-8">
              
              <div className="space-y-5">
                <div>
                  <label htmlFor="name" className="text-base font-medium text-white">
                    {' '}
                    Full Name{' '}
                  </label>
                  <div className="mt-2">
                    <input
                      className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 text-white"
                      type="text"
                      placeholder="Full Name"
                      id="username"
                      name="username"
                      value={formData.username}
                      onChange={handleChange}
                    ></input>
                  </div>
                </div>
                <div>
                  <label htmlFor="email" className="text-base font-medium text-white">
                    {' '}
                    Email address{' '}
                  </label>
                  <div className="mt-2">
                    <input
                      className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 text-white"
                      type="email"
                      placeholder="Email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                    ></input>
                     {emailError && <div className="text-red-500 text-sm mt-1">{emailError}</div>}
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between">
                    <label htmlFor="password" className="text-base font-medium text-white">
                      {' '}
                      Password{' '}
                    </label>
                  </div>
                  <div className="mt-2">
                    <input
                      className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 text-white"
                      type="password"
                      placeholder="Password"
                      id="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                    ></input>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between">
                    <label htmlFor="password" className="text-base font-medium text-white">
                      {' '}
                      License Number{' '}
                    </label>
                  </div>
                  <div className="mt-2">
                    <input
                      className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 text-white"
                      type="text"
                      placeholder="License Number"
                      id="licensenumber"
                      name="licensenumber"
                      value={formData.licensenumber}
                      onChange={handleChange}
                    
                    ></input>
                     {licenseNumberError && <div className="text-red-500 text-sm mt-1">{licenseNumberError}</div>}
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between">
                    <label htmlFor="password" className="text-base font-medium text-white">
                      {' '}
                      Vehicle Number{' '}
                    </label>
                  </div>
                  <div className="mt-2">
                    <input
                      className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 text-white"
                      id="vehiclenumber"
                      name="vehiclenumber"
                      value={formData.vehiclenumber}
                      onChange={handleChange}
                    ></input>
                     {validationError && <div className="text-red-500 text-sm mt-1">{validationError}</div>}
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between">
                    <label htmlFor="password" className="text-base font-medium text-white">
                      {' '}
                      Contact Number{' '}
                    </label>
                  </div>
                  <div className="mt-2">
                    <input
                      className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 text-white"
                      id="contactnumber"
                      name="contactnumber"
                      value={formData.contactnumber}
                      onChange={handleChange}
                      maxLength="10"
                    ></input>
                     {contactNumberError && <div className="text-red-500 text-sm mt-1">{contactNumberError}</div>}
                  </div>
                </div>
                
                <div>
                  <button
                    type="button"
                    className="inline-flex w-full items-center justify-center rounded-md bg-white px-3.5 py-2.5 font-bold leading-7 text-black hover:bg-white" 
                    onClick={handleSubmit}
                  >
                    Create Account 
                  </button>
                </div>
              </div>
            </form>
            
          </div>
        </div>
        <div className="h-full w-full">
          <img
            className="mx-auto h-full w-full rounded-md object-cover"
            src="https://images.unsplash.com/photo-1559526324-4b87b5e36e44?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1742&q=80"
            alt=""
          />
        </div>
      </div>
        </div>
       
        
    )
}