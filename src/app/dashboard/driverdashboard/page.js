"use client"

import React, {useEffect, useState} from 'react'
import LayoutD from '@/app/components/LayoutD'
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Select, Space } from 'antd';
import moment from 'moment';

const Driverdashboard = () => {

    const router = useRouter();


    const { data: session, status } = useSession();

    const driverData = () => {
        if (!session || !session.user) {
            router.push("/");
            return null;
          }
          console.log(session.user);
    
        setIsLoading(true);
        setUniquedriver([])
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
    
        var raw = JSON.stringify({
          "assigndriverid": session.user.driverid,
        });

        console.log(raw,'guhsucsuu');
    
        var requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: raw,
          redirect: 'follow'
        };
    
        fetch("/api/driverdashboard", requestOptions)
          .then(response => response.text())
          .then(result => {
            // console.log(result,"result");
            let arr = JSON.parse(result);
            console.log(arr.data, "result");
            console.log(arr.success, "result");
            if (arr.success == true) {
              setUniquedriver(arr.data)
              setIsLoading(false)
            } else {
              setIsLoading(false)
              setUniquedriver([])
    
            }
    
    
          })
          .catch(error =>{
            setIsLoading(false)
             console.log('error', error)});
      }

    useEffect(() => {
        driverData();
      }, [])

      let [uniquedriver, setUniquedriver] = useState([])
      const [isLoading, setIsLoading] = useState(true);

    
   
    
      

    

      
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
  "assigneddriverid": session.user.driverid
});
console.log(raw,"rawwww");
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
        driverData();

      alert(arr.result);
      
    }else{
      alert("Something Went Wrong")
    }
  })
  .catch(error => console.log('error', error));
  }

  return (



    

    
    <LayoutD>   
        <div className="overflow-x-auto border border-gray-200 md:rounded-lg">
  {isLoading ? (
      <p className='font-weight: 700 text-align: center'>Loading...</p> 
    ) : (
      <div class="shadow-2xl ... mt-5">
                    <table className="w-full border-collapse border border-gray-300">
                      <thead className="bg-blue-500 text-white whitespace-nowrap sticky top-0">
                        <tr className="divide-x divide-gray-200">
                          <th
                            scope="col"
                            className="px-4 py-3.5 text-left text-sm font-bold text-black whitespace-nowrap overflow-hidden overflow-ellipsis"
                          >
                            <span>Shipment Id</span>
                          </th>
                          <th
                            scope="col"
                            className="px-4 py-3.5 text-left text-sm font-bold text-black whitespace-nowrap overflow-hidden overflow-ellipsis"
                          >
                            Customer Name
                          </th>
                          <th
                            scope="col"
                            className="px-4 py-3.5 text-left text-sm font-bold text-black whitespace-nowrap overflow-hidden overflow-ellipsis"
                          >
                            Destination Address
                          </th>
                          <th
                            scope="col"
                            className="px-4 py-3.5 text-left text-sm font-bold text-black whitespace-nowrap overflow-hidden overflow-ellipsis"
                          >
                            Shipment Status
                          </th>
                          <th
                            scope="col"
                            className="px-4 py-3.5 text-left text-sm font-bold text-black whitespace-nowrap overflow-hidden overflow-ellipsis"
                          >
                            Delivery Date
                          </th>
                          <th
                            scope="col"
                            className="px-4 py-3.5 text-left text-sm font-bold text-black whitespace-nowrap overflow-hidden overflow-ellipsis"
                          >
                            Actual Date
                          </th>
                          <th
                            scope="col"
                            className="px-4 py-3.5 text-left text-sm font-bold text-black whitespace-nowrap overflow-hidden overflow-ellipsis"
                          >
                            Update Status
                          </th>



                        </tr>
                      </thead>
                      {uniquedriver.map((res, ind) => {
                        return (
                          <tbody className="divide-y divide-gray-200 bg-white" key={ind}>


                            <tr className="divide-x divide-gray-200" >
                              <td className="whitespace-nowrap px-4 py-4">
                                <div className="flex items-center">

                                 

                                  <div className="ml-4">
                                    <div className="text-sm  font-medium text-gray-900">{res.shipmentid}</div>
                                    <div className="text-sm text-gray-500">{res.customername}</div>
                                  </div>
                                </div>
                              </td>

                              <td className="whitespace-nowrap px-4 py-4">
                              
                                  {res.customername}
                               
                              </td>


                              <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-500">
                                {res.destinationaddress}
                              </td>
                              {res.shipmentstatus =="In Transit"?(
                              <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-500">
                              <span className="inline-flex rounded-full bg-yellow-100 px-2 text-xs font-semibold leading-5 text-green-800">
                                {res.shipmentstatus}
                                </span>
                              </td>
                                ):<td className="whitespace-nowrap px-4 py-4 text-sm text-gray-500">
                                <span className="inline-flex rounded-full bg-green-500 px-2 text-xs font-semibold leading-5 text-green-800">
                                  {res.shipmentstatus}
                                  </span>
                                </td>}

                              <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-500">
                                {moment(res.planneddeliverydate).format('DD-MM-YYYY')}
                              </td>
                              
                              {res.actualdeliverydate !=null ?(
 <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-500">
  <span className="inline-flex rounded-full bg-green-500 px-2 text-xs font-semibold leading-5 text-green-800">
 {moment(res.actualdeliverydate).format('DD-MM-YYYY')}
 </span>
</td>
                              ): <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-500">
                                 <span className="inline-flex rounded-full bg-red-500 px-2 text-xs font-semibold leading-5 text-green-800">
                              Not Delivered
                              </span>
                             </td>}
                             
                              <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-500">
                               
                                <Select
      placeholder="Choose me"
      style={{ width: 120 }}
      onChange={handleChange}
      options={[
        { value: 'delivered', label: 'delivered'},
        { value: 'In Transit', label: 'In Transit'}
      ]}
     
    />
                              
                              </td>

                            </tr>





                          </tbody>
                        )
                      })}

                    </table>
                    </div>
                      )}
                  </div></LayoutD>
  )
}

export default Driverdashboard