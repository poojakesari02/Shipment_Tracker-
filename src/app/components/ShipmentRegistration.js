import React, { useState,useEffect } from 'react';
import { X } from 'feather-icons-react';
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useRouter } from 'next/navigation';
import axios from 'axios'; 
import Swal from 'sweetalert2'



const ShipmentRegistration = ({ isOpen, onClose,eData }) => {

   

    useEffect(() => {
      // If there is editData, set the form data based on it
      
      if (eData) {
        
        console.log(eData.shipmentid,"editData.planneddeliverydate");
        const plannedDeliveryDate = new Date(eData.planneddeliverydate);
        const formattedDate = plannedDeliveryDate.toISOString().split('T')[0];
        setFormData({
          customername: eData.customername || '',
          destinationaddress: eData.destinationaddress || '',
          shipmentstatus: eData.shipmentstatus || '',
          planneddeliverydate: formattedDate || '',
        });
      }
    }, [eData]);
  
    

    // setChildData(editData)

    // const togglePasswordVisibility = () => {
    //     setShowPassword(!showPassword);
    //   };

    // const handleLogin = (e) => {
    //     e.preventDefault();
    
        // Perform your authentication logic here, and navigate if successful
        const isAuthenticated = true; // Replace with your authentication logic
    
        // if (isAuthenticated) {
        //   router.push('/dashboard');
        // }
      // };

      const [formData, setFormData] = useState({
        customername: '',
        destinationaddress: '',
        planneddeliverydate: '',
      });

      const [errors, setErrors] = useState({});
      const router = useRouter();
  
      const validateForm = () => {
          const newErrors = {};
  
          if (!formData.customername.trim()) {
              newErrors.customername = 'Customer name is required';
          }
  
          if (!formData.destinationaddress.trim()) {
              newErrors.destinationaddress = 'Destination address is required';
          }
  
         
          if (!formData.planneddeliverydate) {
              newErrors.planneddeliverydate = 'Planned delivery date is required';
          }
  
          setErrors(newErrors);
          return Object.keys(newErrors).length === 0;
      };
  
      const handleInputChange = (e) => {
          const { name, value } = e.target;
          setFormData({ ...formData, [name]: value });
      };

      const handleLogin = async (e) => {
        e.preventDefault();
        console.log(formData);
        if (validateForm()) {
            try {
                const response = await axios.post("http://localhost:3000/api/shipmentregistration", formData, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
               


                console.log(response.data);
                setFormData({})
                onClose();
                Swal.fire(
                  'Successfully Create shipment',
                  'You clicked the button!',
                  'success'
                )
                // Redirect to dashboard or perform other actions on success
                // router.push('/dashboard');
            } catch (error) {
                console.error('Error:', error);
            }
        }
    };
    
  if (!isOpen) return null;

///UPDATE 

const updateshipment = async(e)=>{
  debugger
  e.preventDefault();
  var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

var raw = JSON.stringify({
  "customername": formData.customername,
  "destinationaddress": formData.destinationaddress,
  "planneddeliverydate": formData.planneddeliverydate,
  "shipmentid": eData.shipmentid
});
console.log(raw,"rawwwwwwupdateshipment");

var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
};

fetch("http://localhost:3000/api/updateshipment", requestOptions)
  .then(response => response.text())
  .then(result => {
    Swal.fire(
      'Successfully Updated',
      'You clicked the button!',
      'success'
    )
    onClose()
  })
  .catch(error => console.log('error', error));
}


  return (
    
    <div className="fixed inset-0 flex items-center justify-center z-50 ">
    <div className="modal-container backdrop-blur-sm bg-white/3">
      <div className="card bg-white backdrop-blur-md bg-white/60 rounded-lg px-10">
          <form className="p-4 space-y-4">
          <div className="flex items-center justify-between mx-12 mb-6">
            {eData?(
              <h2 className="text-2xl font-bold ">Edit Shipment</h2>
            ):<h2 className="text-2xl font-bold ">Shipment Registration</h2>}
          
           {/* <h2 className="text-2xl font-bold ">Shipment Registration</h2> */}
              <button className="modal-close ml-auto" onClick={onClose}>
                <X size={24} />
              </button>
              </div>
         
          <div className='flex gap-x-4 mt-[20px]'>
                    <label className='w-full'>
                        <p className='text-[0.875rem] text-black font-bold  mb-1 leading-[1.375rem]'>Customer Name</p>
                        <input
                            required
                            type="text"
                            name="customername"
                            value={formData.customername}
                            onChange={handleInputChange}
                            placeholder="Enter Name"
                            
                            className='w-40 h-10 px-4 py-2 border rounded-md outline-none focus:ring focus:ring-blue-500'
                        />
                    </label>

                    <label className='w-full'>
                        <p className='text-[0.875rem] text-black font-bold mb-1 leading-[1.375rem]'>Destination Address</p>
                        <input
                            required
                            type="text"
                            name="destinationaddress"
                            value={formData.destinationaddress}
                            onChange={handleInputChange}
                            placeholder="Enter Address"
                            className='w-40 h-10 px-4 py-2 border rounded-md outline-none focus:ring focus:ring-blue-400'
                        />
                    </label>
            </div>

            <div className='flex gap-x-4 mt-[20px]'>
            <label className='w-full'>
                        <p className='text-[0.875rem] text-black font-bold  mb-1 leading-[1.375rem]'>Shipment Status</p>
                        <input
                            required
                            type="text"
                            name="shipmentstatus"
                            
                         value="Pending"
                            readOnly
                           
                            // placeholder="Enter Name"
                            
                            className='w-40 h-10 px-4 py-2 border rounded-md outline-none focus:ring focus:ring-blue-500'
                        />
                    </label>

                    <label className='w-full'>
                        <p className='text-[0.875rem] text-black font-bold mb-1 leading-[1.375rem]'>Planned Delivery Date</p>
                        <input
                            required
                            type='date'
                            name="planneddeliverydate"
                            value={formData.planneddeliverydate}
                            onChange={handleInputChange}
                            // placeholder="License Number"
                            
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
                  {eData?(
                    <button className="bg-black text-black  py-[10px] px-[10px] rounded-md font-mullish font-bold
                    bg-cyan-500 hover:bg-cyan-600 transition-all duration-200 place-content-center" onClick={updateshipment}>update</button>
                  ):
                  <button
                              className="bg-black text-black  py-[10px] px-[10px] rounded-md font-mullish font-bold
                              bg-cyan-500 hover:bg-cyan-600 transition-all duration-200 place-content-center" onClick={handleLogin}
                              >SUBMIT</button>}
                                

            
          </form>
          </div>
        </div>
      </div>
   
    
  );
};

export default ShipmentRegistration;
