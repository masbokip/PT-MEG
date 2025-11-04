// DefaultLayout.jsx
'use client'
import { useState } from 'react';
import Sidebars from './Sidebars';
import Header from './Header';

function DefaultLayout({ children }) {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex flex-col min-h-screen md:flex-row">
      <div
        className={`fixed inset-0 z-40 md:relative md:block ${isSidebarOpen ? 'block' : 'hidden'}`}
        onClick={() => setSidebarOpen(false)}
      >
        <Sidebars />
      </div>
      <div className="flex-1 md:ml-64">
        <Header onMenuClick={toggleSidebar} />
        <main className="p-6 bg-gray-950 min-h-screen text-white">
          {children}
        </main>
      </div>
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}
    </div>
  );
}

export default DefaultLayout;

