"use client"
// components/Layout.js
import React from 'react';
import SideBar from './SideBar';
import TopBox from './TopBox';

function LayoutD({children }) {
  return (
    <div className="flex">
      {/* Sidebar */}
      <SideBar />

      <div className="flex-1">
        {/* Add your header, navigation, or any other layout elements here */}
        <header>
          <TopBox  />
        </header>

        {/* Content */}
        <main>{children}</main>

        {/* Footer or additional layout elements */}
        <footer>{/* Footer content */}</footer>
      </div>
    </div>
  );
}

export default LayoutD;
