

import React from 'react';

async function ShipmentList (){
  let data = await fetch("http://localhost:3000/api/dashboard");
  data = data.json()
  return data
  }

  export default async function dashboard  () {
    let shipment = await ShipmentList();
    console.log(shipment.data,"ytytytyty");
  return (
    // <div className="container  px-10 text-center">
    <div>
                <div class="grid grid-cols-4 gap-3">

    <div className="w-50 bg-white rounded-lg shadow-md mx-5 mt-10 p-6 hover:bg-sky-700 border-2 border-black">
      <div className="w-16 mx-auto relative -mt-10 mb-3">
        <div className="rounded-full bg-red-400 px-5 py-5">
          <p className="text-2xl text-white text-center">{shipment.data[0].totalshipment}</p>
        </div>
      </div>
      <span className="block text-gray-800 text-md mb-3">
        Total No of Shipment
      </span>
      <div className="flex items-center justify-between">
        <a
          className="text-xs text-gray-400 mr-1 hover:text-gray-800"
          href="#"
        >
          Learn More
        </a>
        <div className="w-1/2">
          {/* Uncomment the button below if needed */}
          <button
            type="button"
            className="py-2 px-4 bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
    <div className="w-50 bg-white rounded-lg shadow-md mx-8 mt-10 p-6 hover:bg-sky-700 border-2 border-black">
      <div className="w-16 mx-auto relative -mt-10 mb-3">
        <div className="rounded-full bg-red-400 px-5 py-5">
          <p className="text-2xl text-white text-center">{shipment.data[0].intransitshipment}</p>
        </div>
      </div>
      <span className="block text-gray-800 text-md mb-3">
        Total No of In Transit
      </span>
      <div className="flex items-center justify-between">
        <a
          className="text-xs text-gray-400 mr-1 hover:text-gray-800"
          href="#"
        >
          Learn More
        </a>
        <div className="w-1/2">
          {/* Uncomment the button below if needed */}
          <button
            type="button"
            className="py-2 px-4 bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg"
          >
            Accept
          </button>
        </div>
      </div>
    </div>

    <div className="w-50 bg-white rounded-lg shadow-md mx-5 mt-10 p-6 hover:bg-sky-700 border-2 border-black">
      <div className="w-16 mx-auto relative -mt-10 mb-3">
        <div className="rounded-full bg-red-400 px-5 py-5">
          <p className="text-2xl text-white text-center">{shipment.data[0].deliveredshipment}</p>
        </div>
      </div>
      <span className="block text-gray-800 text-md mb-3">
        Total No of Delivery
      </span>
      <div className="flex items-center justify-between">
        <a
          className="text-xs text-gray-400 mr-1 hover:text-gray-800"
          href="#"
        >
          Learn More
        </a>
        <div className="w-1/2">
          {/* Uncomment the button below if needed */}
          <button
            type="button"
            className="py-2 px-4 bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg"
          >
            Accept
          </button>
        </div>
      </div>
    </div>

    <div className="w-50 bg-white rounded-lg shadow-md mx-5 mt-10 p-6 hover:bg-sky-700 border-2 border-black">
      <div className="w-16 mx-auto relative -mt-10 mb-3">
        <div className="rounded-full bg-red-400 px-5 py-5">
          <p className="text-2xl text-white text-center">{shipment.data[0].pendingshipment}</p>
        </div>
      </div>
      <span className="block text-gray-800 text-md mb-3">
        Total No of Pending
      </span>
      <div className="flex items-center justify-between">
        <a
          className="text-xs text-gray-400 mr-1 hover:text-gray-800"
          href="#"
        >
          Learn More
        </a>
        <div className="w-1/2">
          {/* Uncomment the button below if needed */}
          <button
            type="button"
            className="py-2 px-4 bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  </div>
  </div>
  )
};


