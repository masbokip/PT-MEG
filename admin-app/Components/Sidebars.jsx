'use client'
import React, { useState, useEffect } from 'react';
import { FiGrid, FiCalendar, FiUser, FiClipboard, FiLogIn, FiMenu, FiChevronDown,FiShoppingBag, FiArchive   } from 'react-icons/fi';
import { HiMiniUserGroup, HiMiniShoppingBag } from "react-icons/hi2";
import Link from "next/link";
import { signOut, useSession } from 'next-auth/react';
export default function Sidebars() {

  const [role,setRole]=useState('')
  const { data: session, status } = useSession();
  const [isProdcutOpen, setIsProductOpen] = useState(false);
  const [isUserOpen, setIsUserOpen] = useState(false);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [isBrandOpen, setIsBrandOpen] = useState(false);
  const [isOrderOpen, setIsOrderOpen] = useState(false);
  const [isPromoOpen, setIsPromoOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Toggle sidebar on small screens

  useEffect(() => {
    if (session?.user) {
      setRole(session.user.role);
    }
  }, [session]);

  return (
    <>
      {/* Sidebar Toggle Button (only visible on small screens) */}
      <button
        className="fixed top-4 left-4 z-50 p-2 bg-gray-800 text-white rounded-lg lg:hidden"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        <FiMenu size={24} />
      </button>
      {/* Sidebar Overlay (only on small screens) */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}
      {/* Sidebar Container */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-gray-900 p-5 text-white z-50 transition-transform duration-300 overflow-y-auto lg:translate-x-0 ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <h1 className="text-2xl font-bold flex items-center  mb-8">
          <span className="-500 p-2 rounded-lg">
          <img
                src="/images/logos/logoBw.png"
                width={150}
                height={150}
              />
          </span>
        </h1>
        <nav className="space-y-4">
          <Link href="/home" className="flex items-center space-x-2 hover:bg-gray-800 p-2 rounded-lg">
          <FiGrid />
              <span>Dashboard</span>
          </Link>
          {/* Forms Pesanan */}
          <div>
            <button
              className="flex items-center space-x-2 w-full hover:bg-gray-800 p-2 rounded-lg"
              onClick={() => setIsOrderOpen(!isOrderOpen)}
            >
              <FiShoppingBag />
              <span>Pesanan</span>
              <FiChevronDown />
            </button>
            {isOrderOpen && (
              <div className="ml-6 space-y-2">
                <Link href="/pesanan" className="block p-2 text-gray-400 hover:text-white">List Pesanan</Link>
              </div>
            )}
          </div>
          {/* Forms Menu */}
          {role === 'Pegawai' || (
          <>
          <div>
            <button
              className="flex items-center space-x-2 w-full hover:bg-gray-800 p-2 rounded-lg"
              onClick={() => setIsProductOpen(!isProdcutOpen)}
            >
              <HiMiniShoppingBag />
              <span>Produk</span>
              <FiChevronDown />
            </button>
            {isProdcutOpen && (
              <div className="ml-6 space-y-2">
                <Link href="/produk" className="block p-2 text-gray-400 hover:text-white">Daftar Produk</Link>
                <Link href="/produk/add" className="block p-2 text-gray-400 hover:text-white">Add Produk</Link>      
                <Link href="/produk/kosong" className="block p-2 text-gray-400 hover:text-white">Produk Kosong</Link>   
              </div>
            )}
          </div>
          
          <div>
            <button
              className="flex items-center space-x-2 w-full hover:bg-gray-800 p-2 rounded-lg"
              onClick={() => setIsUserOpen(!isUserOpen)}
            >
               <HiMiniUserGroup />
              <span>User</span>
              <FiChevronDown />
            </button>
            {isUserOpen && (
              <div className="ml-6 space-y-2">
                <Link href="/user" className="block p-2 text-gray-400 hover:text-white">Daftar User</Link>
                <Link href="/user/add" className="block p-2 text-gray-400 hover:text-white">Add User</Link>
              </div>
            )}
          </div>
          <div>
            <button
              className="flex items-center space-x-2 w-full hover:bg-gray-800 p-2 rounded-lg"
              onClick={() => setIsCategoryOpen(!isCategoryOpen)}
            >
               <HiMiniUserGroup />
              <span>Kategori</span>
              <FiChevronDown />
            </button>
            {isCategoryOpen && (
              <div className="ml-6 space-y-2">
                <Link href="/category" className="block p-2 text-gray-400 hover:text-white">Daftar Kategori</Link>
                <Link href="/category/add" className="block p-2 text-gray-400 hover:text-white">Add Kategori</Link>
              </div>
            )}
          </div>
          <div>
            <button
              className="flex items-center space-x-2 w-full hover:bg-gray-800 p-2 rounded-lg"
              onClick={() => setIsBrandOpen(!isBrandOpen)}
            >
               <HiMiniUserGroup />
              <span>Brand</span>
              <FiChevronDown />
            </button>
            {isBrandOpen && (
              <div className="ml-6 space-y-2">
                <Link href="/brand" className="block p-2 text-gray-400 hover:text-white">Daftar Brand</Link>
                <Link href="/brand/add" className="block p-2 text-gray-400 hover:text-white">Add Brand</Link>
              </div>
            )}
          </div>
          <div>
            <button
              className="flex items-center space-x-2 w-full hover:bg-gray-800 p-2 rounded-lg"
              onClick={() => setIsPromoOpen(!isPromoOpen)}
            >
              <FiArchive />
              <span>Promo</span>
              <FiChevronDown />
            </button>
            {isPromoOpen && (
              <div className="ml-6 space-y-2">
                <Link href="/promo/voucher" className="block p-2 text-gray-400 hover:text-white">Promo Voucher</Link>
                <Link href="/promo/product" className="block p-2 text-gray-400 hover:text-white">Promo Produk</Link>
                <Link href="/promo/add" className="block p-2 text-gray-400 hover:text-white">Tambah Promo</Link>
              </div>
            )}
          </div>
          
          <Link href="/report/home" className="flex items-center space-x-2 hover:bg-gray-800 p-2 rounded-lg">
          <FiClipboard />
              <span>Report</span>
          </Link>
          </>
          )}
        </nav>
      </div>
      
    </>
  );
}