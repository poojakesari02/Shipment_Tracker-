
// components/Sidebar.js
"use client"
import Link from 'next/link';
import { FaHome, FaUser } from 'react-icons/fa'; // Import icons
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation'

const Sidebar = () => {

  const router = useRouter();


  const { data: session, status } = useSession();
  if (!session || !session.user) {
    router.push("/");
    return null;
  }
  return (
    <aside className="bg-gray-800 text-white h-screen w-1/6 p-4 ">
{session.user && session.user.role == 'admin'?(
  <>
  <div className="flex items-center mb-4 mt-9">
    
    <h1 className="text-xl font-semibold mx-5">ADMIN Dashboard</h1>
  </div>

      <ul>
    <li>
      <Link href="/dashboard">
        <p className="flex items-center py-2 px-4 hover:bg-gray-600">
          <FaHome className="mr-2" /> 
          Home
        </p>
      </Link>
    </li>
    <li>
      <Link href="/dashboard/drivermanagement">
        <p className="flex items-center py-2 px-4 hover:bg-gray-600">
          <FaUser className="mr-2" /> 
          Driver Management
        </p>
      </Link>
    </li>
    <li>
      <Link href="/dashboard/shipmentmanagement">
        <p className="flex items-center py-2 px-4 hover:bg-gray-600">
          <FaUser className="mr-2" /> 
          Shipment Management
        </p>
      </Link>
    </li>
  </ul>
  </>
):<>
<div className="flex items-center mb-4 mt-9">
  
  <h1 className="text-xl font-semibold mx-5">Driver Dashboard</h1>
</div>

    <ul>
  
  <li>
    <Link href="/dashboard/driverdashboard">
      <p className="flex items-center py-2 px-4 hover:bg-gray-600">
        <FaUser className="mr-2" /> 
        Driver Dashboard
      </p>
    </Link>
  </li>
 
</ul>
</>}

    </aside>
  );
};

export default Sidebar;
