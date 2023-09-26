// components/Layout.js
"use client"

import React, { useState, useEffect, Fragment } from 'react';
import Navbar from "./Navbar";



function Layout({ children }) {

 
  return (
    <div>
      {/* Add your header, navigation, or any other layout elements here */}
      <header>
       <Navbar/>
      </header>

      {/* Content */}
      <main>{children}</main>

      {/* Footer or additional layout elements */}
      <footer>
       
        {/* Footer content */}
      </footer>
    </div>

    
   
  );
}



export default Layout;
