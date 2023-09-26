import React, { useState, useEffect } from 'react';
import { X } from 'feather-icons-react';
import axios from 'axios';
const AssignTodriver = ({ isOpen, onClose,data }) => {

  const [formData, setFormData] = useState({
    customerName: '',
    destinationAddress: '',
    plannedDeliveryDate: '',
    AssignDriver: '',
  });

  const [filteredDrivers, setFilteredDrivers] = useState([]);
  const [driverInput, setDriverInput] = useState('');


  const handleSubmit = async (e) => {
    e.preventDefault();
    // Add your submission logic here
    console.log(formData.AssignDriver, "formdata");
  
    try {
      const response = await axios.post("http://localhost:3000/api/assigndriver", {
        assigndriverid: formData.AssignDriver,
        shipmentid: data.shipmentid
      }, {
        headers: {
          "Content-Type": "application/json"
        }
      });
  
      console.log(response.data);
      onClose()
      setFormData({})
    } catch (error) {
      console.error("Error:", error);
    }
  };


  useEffect(() => {
    searchDrivers();
  }, []);


  const searchDrivers = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/assignshipment123');
      const allDrivers = response.data.data;
      const filtered = allDrivers.filter((driver) =>
        driver.username.toLowerCase().includes(driverInput.toLowerCase()) ||
        driver.driverid.toString().includes(driverInput)
      );
      setFilteredDrivers(filtered);
    } catch (error) {
      console.error('Error:', error);
    }
  };


  const handleDriverSelect = (selectedDriver) => {
    setDriverInput(selectedDriver.username);
    setFormData({
      ...formData,
      AssignDriver: selectedDriver.driverid.toString(),
    });
    setFilteredDrivers([]);
  };

  useEffect(() => {
    // If there is editData, set the form data based on it
    if (data) {
      console.log(data.shipmentid,"assigndata");
      const plannedDeliveryDate = new Date(data.planneddeliverydate);
      const formattedDate = plannedDeliveryDate.toISOString().split('T')[0];
      setFormData({
        customerName: data.customername || '',
        destinationAddress: data.destinationaddress || '',
        shipmentstatus: data.shipmentstatus || '',
        plannedDeliveryDate: formattedDate || '',
      });
    }
  }, [data]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  if (!isOpen) return null;
  return (

    
<div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="modal-container">
        <div className="modal-content">
          <form className="p-4 space-y-4" onClick={handleSubmit}>
            <div className="flex items-center justify-between mx-12 mb-6">
              <h2 className="text-2xl font-bold">Assign Shipment</h2>
              <button className="modal-close ml-auto" onClick={onClose}>
                <X size={24} />
              </button>
            </div>

            <div className="flex gap-x-4 mt-[20px]">
              <label className="w-full">
                <p className="text-[0.875rem] text-black font-bold mb-1 leading-[1.375rem]">Customer Name</p>
                <input
                  required
                  type="text"
                  name="customerName"
                  value={formData.customerName}
                  onChange={handleInputChange}
                  
                  readOnly
                  placeholder="Enter Name"
                  className="w-40 h-10 px-4 py-2 border rounded-md outline-none focus:ring focus:ring-blue-500"
                />
              </label>

              <label className="w-full">
                <p className="text-[0.875rem] text-black font-bold mb-1 leading-[1.375rem]">Destination Address</p>
                <input
                  required
                  type="text"
                  name="destinationAddress"
                  value={formData.destinationAddress}
                  readOnly
                  onChange={handleInputChange}
                 
                //   onChange={handleInputChange}
                  placeholder="Enter Destination"
                  className="w-40 h-10 px-4 py-2 border rounded-md outline-none focus:ring focus:ring-blue-400"
                />
              </label>
            </div>

            <div className="flex gap-x-4 mt-[20px]">
              <label className="w-full">
                <p className="text-[0.875rem] text-black font-bold mb-1 leading-[1.375rem]">Shipment Status</p>
                <input
                  required
                  type="text"
                  name="Status"
                  value="In Transit"

                  readOnly
                  placeholder="Enter Name"
                  className="w-40 h-10 px-4 py-2 border rounded-md outline-none focus:ring focus:ring-blue-500"
                />
              </label>
              <label className="w-full">
                <p className="text-[0.875rem] text-black font-bold mb-1 leading-[1.375rem]">Delivery Date</p>
                <input
                  required
                  type="date"
                  name="plannedDeliveryDate"
                  value={formData.plannedDeliveryDate}
                  readOnly
                  onChange={handleInputChange}
                  placeholder="Delivery Date"
                  className="w-40 h-10 px-4 py-2 border rounded-md outline-none focus:ring focus:ring-blue-400"
                />
              </label>
            </div>
            <div className="relative mt-[20px]">
              <label className="w-full">
                <p className="text-[0.875rem] text-black font-bold mb-1 leading-[1.375rem]">Assign Driver</p>
                <input
                  required
                  type="text"
                  name="AssignDriver"
                  onChange={(e) => {
                    setDriverInput(e.target.value);
                    searchDrivers();
                  }}
                  placeholder="Assign Driver"
                  className="w-40 h-10 px-4 py-2 border rounded-md outline-none focus:ring focus:ring-blue-400"
                />
                 {filteredDrivers.length > 0 && (
                  <ul className="absolute z-10 mt-2 bg-white border rounded-md shadow-md max-h-40 overflow-y-auto w-40">
                    {filteredDrivers.map((driver) => (
                      <li
                        key={driver.driverid}
                        className="p-2 cursor-pointer hover:bg-gray-100"
                        onClick={() => handleDriverSelect(driver)}
                      >
                        {`${driver.username} (ID: ${driver.driverid})`}
                      </li>
                    ))}
                  </ul>
                )}
              </label>
            </div>
            <button
              className="bg-black text-black py-[10px] px-[10px] rounded-md font-mullish font-bold bg-cyan-500 hover:bg-cyan-600 transition-all duration-200 place-content-center" type="button" onClick={handleSubmit}
            >
              SUBMIT
            </button>
          </form>
        </div>
      </div>
    </div>  )
}

export default AssignTodriver