'use client';
import React, { useEffect, useState } from "react";
import axios from "axios";
import {FiSearch} from 'react-icons/fi';
import Link from "next/link";
import { format } from "date-fns";
import { HiEye,HiMiniTrash,HiMiniPencilSquare } from "react-icons/hi2";
import { getSession, useSession } from 'next-auth/react';
import { testURL } from '@/testURL';

export default function Tol() {
  const { data: session } = useSession();
  const [productData, setProductData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const [totalProduk, setTotalProduk] = useState("");
  const [totalUser, setTotalUser] = useState("");
  const [totalPembelian, setTotalPembelian] = useState("");
  const [totalPesanan, setTotalPesanan] = useState("");
  const [totalDibeli, setTotalDibeli] = useState("");
  const [totalDikirim, setTotalDikirim] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  



  if (loading) {
    return <p className="text-white">Loading...</p>;
  }

  const totalPages = Math.ceil(productData.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = productData.slice(indexOfFirstItem, indexOfLastItem);

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
    }).format(value);
  };      
  return (
    <>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
            
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
                {/* <div className="text-xl font-semibold">{totalPembelian !== null ? totalPembelian : "Loading..."}</div> */}
                <div className="text-gray-400">Total Pesanan</div>
            </div>

           
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
                {/* <div className="text-xl font-semibold">{formatCurrency(totalPesanan)}</div> */}
                <div className="text-gray-400">Total Pemasukan</div>
                
            </div>

            
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
                {/* <div className="text-xl font-semibold">{totalDibeli !== null ? totalDibeli : "Loading..."}</div> */}
                <div className="text-gray-400">Pesanan Siap Kirim</div>
            </div>

           
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
                {/* <div className="text-xl font-semibold">{totalDikirim !== null ? totalDikirim : "Loading..."}</div> */}
                <div className="text-gray-400">Pesanan Dikirim</div>
            </div>
    </div>
    <nav className="bg-gray-900 text-white py-4 shadow-lg mt-5">
      <div className="container mx-auto flex justify-between items-center">
      <div className="flex items-center space-x-4">
        {/* <div className="flex items-center bg-gray-800 rounded-lg p-2 ml-4">
                  <FiSearch className="text-gray-400" />
                  <input
                    type="text"
                    placeholder="Type to search..."
                    className="bg-transparent text-sm text-gray-400 focus:outline-none ml-2"
                    value={searchQuery}
                    onChange={handleSearch}
                  />
                </div> */}
      </div>
      </div>
    </nav>
    <div className="rounded-lg border border-gray-800 bg-gray-900 p-6 shadow-lg mt-5">
      <h4 className="mb-6 text-lg font-semibold text-white">Daftar Produk</h4>
      <div className="flex flex-col">
     
        <div className="grid grid-cols-4 sm:grid-cols-7 bg-gray-800 p-4 text-sm font-semibold text-gray-400">
          <div className="text-left">No</div>
          <div className="text-left">Foto Produk</div>
          <div className="text-center">ID Produk</div>
          <div className="text-center">Nama Produk</div>
          <div className="text-center">Stok</div>
          <div className="text-center">Harga</div>
          <div className="text-center">Created At</div>
        </div>
     
        {currentItems.map((product, index) => (
          <div
            key={product.id_produk}
            className="grid grid-cols-4 sm:grid-cols-7 border-b border-gray-800 p-4 text-sm text-gray-300"
          >
            <div className="text-left font-medium">{index + 1}</div>
            <div className="flex items-center justify-left">
            <img
              src={product.imageUrl || ""}
              alt={product.nama_produk}
              className="w-20 h-auto object-contain"
            />
            </div>
            <div className="text-center text-sm font-medium ">{product.id_produk}</div>
            <div className="text-center text-sm font-medium ">{product.nama_produk}</div>
            <div className="text-center text-sm font-medium ">{product.stok}</div>
            <div className="text-center text-sm font-medium ">{formatCurrency(product.total_harga)}</div>
            <div className="text-center text-sm font-medium">
            {format(new Date(product.created_at), "dd/MM/yyyy")}
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-between mt-4">
        <button
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
          className="text-white bg-gray-700 px-4 py-2 rounded disabled:opacity-50"
        >
          Previous
        </button>
        <span className="text-white">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className="text-white bg-gray-700 px-4 py-2 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
    </>
  )
}
export async function getServerSideProps(ctx) {
  const session = await getSession(ctx);

  if (!session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }
  if (session.user.role === 'Customer') {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }
  return {
    props: {
      ...session,
    },
  };
}
