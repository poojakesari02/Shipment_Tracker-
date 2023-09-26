"use client"

import React,{useEffect,useState} from 'react';
import { FaEdit, FaTrash ,FaPlus} from 'react-icons/fa';
import axios from 'axios';
import Editshipment from '../components/Editshipment'
import ShipmentRegistration from './ShipmentRegistration';
import { useRouter } from 'next/navigation'

import moment from 'moment';
import AssignTodriver from './AssignTodriver';

export const AssignShipment = ({ isOpen, onClose,plusdata }) => {

    let [allShipments, setAllShipments] = useState([]);


    const router = useRouter();

    const [isModalOpen, setModalOpen] = useState(false);
    const [isModalOpen1, setModalOpen1] = useState(false);

    const [showtable, setShowtable] = useState(false);
    let [showedit, setShowedit] = useState(false);
    let [eData, setEData] = useState([]);
    let [showupdate, setShowupdate] = useState(false);
    let [assignedData, setAssignedData] = useState([]);

    const handleAssign = (id,data) => {
      if(data){
        setAssignedData(data);
        setShowupdate(true);
        openModal1()
      }
      
        
      };


  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const openModal1 = () => {
    setModalOpen1(true);
  };
  
  const closeModal1 = () => {
    setModalOpen1(false);
  };

  ///

  const showtables = () => {
    setShowtable(true);
  }


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

      const handleDelete = (shipmentid,person) => {
        // Implement your delete logic here using the shipmentID
        console.log(`Deleting shipment with ID ${shipmentid}`);
        
      };

    const allShipment = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/assignshipment");
        console.log(response.data, "datataatat");
        setAllShipments(response.data.data);
      } catch (error) {
        console.error('Error:', error);
      }
    };
  
    const handleEdit =(id,data) => {
        
        if(data){
            console.log(data,"data");
            setEData(data)
            openModal()
            setShowedit(true)
        }
       
    }
  
    useEffect(() => {
     
      allShipment();
    }, []);


    allShipment()
    ////
  
    

  return (
//     <div className="mx-11 mt-11 w-full  justify-center items-center">
//     <div>
//       <h1 className="text-center text-black font-bold">Assign Shipment</h1>
// <div className='h-80 overflow-y-auto'>
//       <table className="w-full border-collapse border border-gray-300">
//       <thead>
//   <tr className="bg-gray-800 text-white whitespace-nowrap">
//     <th className="p-4">Customer Name</th>
//     <th className="p-4">Destination Address</th>
//     <th className="p-4">Delivery Date</th>
//     <th className="p-4">Shipment Status</th>
//   </tr>
// </thead>

//         <tbody className= ' '>
//           <tr className="bg-gray-200">
//             <td className="p-4">Alfreds Futterkiste</td>
//             <td className="p-4">Maria Anders</td>
//             <td className="p-4">Germany</td>
//             <td className="p-4">Germany</td>
            

//           </tr>

//           <tr className="bg-gray-200">
//             <td className="p-4">Alfreds Futterkiste</td>
//             <td className="p-4">Maria Anders</td>
//             <td className="p-4">Germany</td>
//             <td className="p-4">Germany</td>
            
            


//           </tr>

//           <tr className="bg-gray-200">
//             <td className="p-4">Alfreds Futterkiste</td>
//             <td className="p-4">Maria Anders</td>
//             <td className="p-4">Germany</td>
//             <td className="p-4">Germany</td>

            


//           </tr>
//           {/* Add more rows here */}
//         </tbody>
//       </table>
//       </div>
//     </div>
//   </div>



 <div className="mx-1 mt-11 w-full justify-center items-center">
      <h1 className="text-center text-black font-bold">You can Assign,Edit and Delete Shipment</h1>
      <div className="h-80 overflow-y-auto">
        <table className="w-full border-collapse border border-gray-300">
          <thead className="bg-gray-800 text-white whitespace-nowrap sticky top-0">
         
            <tr>
              <th className="p-4">Actions</th>
              <th className="p-4">Customer Name</th>
              <th className="p-4">Destination Address</th>
              <th className="p-4">Delivery Date</th>
              <th className="p-4">Shipment Status</th>
              <th className="p-4">Assign Driver</th>
            </tr>
          </thead>
          <tbody>
            {allShipments.map((res, ind) => {
              return (
                <tr className="bg-gray-200" key={ind}>
                  <td className="p-4">
                    <div style={{ display: 'flex' }}>
                      <FaEdit
                        className="cursor-pointer text-blue-500 mr-2"
                        onClick={() => handleEdit(res.shipmentId,res)}
                      />
                      <FaTrash
                        className="cursor-pointer text-red-500"
                        onClick={() => handleDelete(res.shipmentid)}
                      />
                    </div>
                  </td>
                  <td className="grid grid-rows-2 grid-flow-col">
    <span className="mr-2">{res.customername}</span>
    <span className="text-sm text-">{res.shipmentid}</span>
    {/* Add more additional information here */}
  </td>
                  <td className="p-4">{res.destinationaddress}</td>
                  <td className="p-4">{moment(res.planneddeliverydate).format("DD-MM-YYYY")}</td>
                  {/* <td className="p-4">{res.shipmentstatus}</td> */}
                  {res.shipmentstatus =="Pending"?(
 <td className="whitespace-nowrap px-4 py-4">
 <span className="inline-flex rounded-full bg-yellow-100 px-2 text-xs font-semibold leading-5 text-green-800">
 {res.shipmentstatus}
 </span>
</td>
                  ): <td className="whitespace-nowrap px-4 py-4">
                  <span className="inline-flex rounded-full bg-green-100 px-2 text-xs font-semibold leading-5 text-green-800">
                  {res.shipmentstatus}
                  </span>
                </td>}
                  <td className="p-4">
                    
                  <FaPlus className="mr-1"  onClick={() => handleAssign(res.shipmentId,res)}/>
                  {/* <AssignTodriver isOpen={isModalOpen1} onClose={closeModal1} /> */}

                  </td>
                </tr>
              );
            })}
          </tbody>   
        </table>
        {showedit === true?(
        <ShipmentRegistration isOpen={isModalOpen} onClose={closeModal} eData={eData}/>
      ):null}
      {showupdate == true?(
        <AssignTodriver isOpen={isModalOpen1} onClose={closeModal1} data={assignedData} />

      ):null}
    
      </div>
    
      
    </div>
  );
};
