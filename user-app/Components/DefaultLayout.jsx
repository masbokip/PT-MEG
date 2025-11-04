'use client'
import React from 'react'
import Navbars from './Navbars'
import Footers from './Footers'
export default function DefaultLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar always at the top */}
      <Navbars />

      {/* Main content with padding to prevent overlap with fixed navbar */}
      <main className="flex-grow pt-16 bg-white">
        {children}
      </main>

      {/* Footer always at the bottom */}
      <Footers />
    </div>
  )
}
