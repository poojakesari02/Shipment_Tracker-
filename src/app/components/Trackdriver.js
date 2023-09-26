

"use client"
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { X } from 'feather-icons-react';
import axios from 'axios';
import moment from 'moment';
import { Select, Space } from 'antd';

const Trackdriver = ({ isOpen, onClose, trackdriverdata }) => {
  const router = useRouter();

  const [trackdrivers, setTrackdrivers] = useState([]);




  const senddriverdata = () => {
    setTrackdrivers([])
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      "assigndriverid": trackdriverdata.driverid
    });
console.log(raw,"raw")
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    fetch("/api/drivertrack", requestOptions)
      .then(response => response.text())
      .then(result => {
        console.log(result,"result");
        let arr = JSON.parse(result);
        console.log(arr.data, "result");
        console.log(arr.success, "result");
        if (arr.success == true) {
          setTrackdrivers(arr.data)
        } else {
          setTrackdrivers([])
        }


      })
      .catch(error => console.log('error', error));
  }

  useEffect(() => {
    console.log(trackdriverdata);
    senddriverdata();
  }, [trackdriverdata]);

  ////////////

  const handleChange = (value) => {
    console.log(`selected ${value}`);
    updateStatus(value)
  };

  const updateStatus = (status)=>{
    // e.preventDefault();
    var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

var raw = JSON.stringify({
  "shipmentstatus": status,
  "assigneddriverid": trackdriverdata.driverid
});
console.log(raw,"rauyuyuyuywwww");
var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
};

fetch("/api/updatedriverstatus", requestOptions)
  .then(response => response.text())
  .then(result => {
    let arr = JSON.parse(result)
    console.log(arr,"result");
    if(arr.success==true){
      alert(arr.result);
      onClose()
    }else{
      alert("Something Went Wrong")
    }
  })
  .catch(error => console.log('error', error));
  }

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 ">
      <div className="modal-container backdrop-blur-sm bg-white/3">
        <div className="card bg-white backdrop-blur-md bg-white/60 rounded-lg px-10">
          <div className="h-80 overflow-y-auto">
            <div className='float-right'>
              <button className="modal-close ml-auto" onClick={onClose}>
                <X size={24} />
              </button>
            </div>
            <h1 className='text-center font-bold'>{trackdriverdata.username}</h1>
            <table className="w-full border-collapse border border-gray-300">
              <thead className="bg-gray-800 text-white whitespace-nowrap sticky top-0 mt-5">
                <tr className="bg-gray-800 text-white whitespace-nowrap">
                  <th className="p-4">shipmentID</th>
                  <th className="p-4">Customer Name</th>
                  <th className="p-4">Delivery Address</th>
                  <th className="p-4">Shipment Status</th>
                  <th className="p-4">Delivery Date</th>
                  <th className="p-4">Actual Date</th>
                  <th className="p-4">Update Status</th>
                </tr>
              </thead>
              <tbody>
                {trackdrivers.map((dr, i) => (
                  <tr key={i}>
                    <td className="p-4">{dr.shipmentid}</td>
                    <td className="p-4">{dr.customername}</td>
                    <td className="p-4">{dr.destinationaddress}</td>
                    <td className="p-4">{dr.shipmentstatus}</td>
                    <td className="p-4">{moment(dr.planneddeliverydate).format("DD-MM-YYYY")}</td>
                    {dr.actualdeliverydate !=null ?(
 <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-500">
  <span className="inline-flex rounded-full bg-green-500 px-2 text-xs font-semibold leading-5 text-green-800">
 {moment(dr.actualdeliverydate).format('DD-MM-YYYY')}
 </span>
</td>
                              ): <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-500">
                                 <span className="inline-flex rounded-full bg-red-500 px-2 text-xs font-semibold leading-5 text-green-800">
                              Not Delivered
                              </span>
                             </td>}
                    <td className="p-4">
                    <Select
      placeholder="Choose me"
      style={{ width: 120 }}
      onChange={handleChange}
    
      options={[
        { value: 'delivered', label: 'delivered' }
      ]}
    />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Trackdriver;
