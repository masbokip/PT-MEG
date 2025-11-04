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
  const [totalTerjual, setTotalTerjual] = useState("");
  const [produkTerjual, setProdukTerjual] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchProdukTerjual = async () => {
      try {
        const response = await fetch(`${testURL}/api/produk-terjual-bijian`);
        const data = await response.json();

        if (data.success) {
          setProdukTerjual(data.data); 
        } else {
          console.error("Error: Data tidak berhasil diambil.");
        }
      } catch (error) {
        console.error("Error fetching produk terjual:", error);
      }
    };

    fetchProdukTerjual();
  }, []);
  
  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const productResponse = await axios.get(`${testURL}/api/products`);
        const products = productResponse.data;
        const productsWithImages = await Promise.all(
          products.map(async (product) => {
            const imageResponse = await axios.get(
              `${testURL}/api/productimages?id=${product.id_produk}&number=1`
            );
            return {
              ...product,
              imageUrl: imageResponse.data.length > 0
                ? `${testURL}/assets/images/product/${imageResponse.data[0].nama}`
                : null,
            };
          })
        );
        const mergedData = productsWithImages.map((product) => {
          const terjualData = produkTerjual.find(
            (terjual) => terjual.id_produk === product.id_produk
          );
          return {
            ...product,
            totalTerjual: terjualData ? terjualData.total_terjual : 0,
          };
        });

        setProductData(mergedData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching product data:", error);
        setLoading(false);
      }
    };
    fetchProductData();
  }, [produkTerjual]);

  useEffect(() => {
    const fetchTotalTerjual = async () => {
      try {
        const response = await fetch(`${testURL}/api/produk-terjual`);
        const data = await response.json();

        if (data.success) {
          setTotalTerjual(data.total);
        } else {
          console.error("Error: Data tidak berhasil diambil.");
        }
      } catch (error) {
        console.error("Error fetching total produk:", error);
      }
    };

    fetchTotalTerjual();
  }, []);

  useEffect(() => {
    const fetchTotalProduk = async () => {
      try {
        const response = await fetch(`${testURL}/api/totalproduk`);
        const data = await response.json();
        setTotalProduk(data.total);
      } catch (error) {
        console.error("Error fetching total produk:", error);
      }
    };
    fetchTotalProduk();
  }, []);

  if (loading) {
    return <p className="text-white">Loading...</p>;
  }
  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredProductData = productData.filter((product) =>
    product.nama_produk.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sortedProductData = [...filteredProductData].sort((a, b) => b.totalTerjual - a.totalTerjual);

  const totalPages = Math.ceil(sortedProductData.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sortedProductData.slice(indexOfFirstItem, indexOfLastItem);


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
      {/* Statistik Produk */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <div className="text-xl font-semibold">{totalProduk !== null ? totalProduk : "Loading..."}</div>
          <div className="text-gray-400">Total Produk</div>
        </div>
      </div>
      <nav className="bg-gray-900 text-white py-4 shadow-lg mt-5">
  <div className="container mx-auto flex justify-center items-center">
    <ul className="flex items-center space-x-10">
      <li>
        <Link href="/report/home">
          <p className="hover:text-green-400 text-center">Pesanan</p>
        </Link>
      </li>
      <li>
        <Link href="/report/product">
          <p className="text-green-400 text-center">Produk</p>
        </Link>
      </li>
      <li>
        <Link href="/report/category">
          <p className="hover:text-green-400 text-center">Category</p>
        </Link>
      </li>
      <li>
        <Link href="/report/brand">
          <p className="hover:text-green-400 text-center">Brand</p>
        </Link>
      </li>
    </ul>
  </div>
  <div className="container mx-auto flex justify-center items-center">
    <ul className="flex items-center space-x-10">
      <li>
        <Link href="/report/product">
          <p className="text-green-400 text-center">Produk Terlaris</p>
        </Link>
      </li>
      <li>
        <Link href="/report/product2">
          <p className="hover:text-green-400 text-center">Produk Terfavorit</p>
        </Link>
      </li>
    </ul>
  </div>
</nav>
<nav className="bg-gray-900 text-white py-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
      <div className="flex items-center space-x-4">
        <div className="flex items-center bg-gray-800 rounded-lg p-2 ml-4">
        <FiSearch className="text-gray-400" />
            <input
              type="text"
              placeholder="Type to search..."
              className="bg-transparent text-sm text-gray-400 focus:outline-none ml-2"
              value={searchQuery}
              onChange={handleSearch}
            />
        </div>
        
      </div>
      </div>
    </nav>
  
      {/* Daftar Produk */}
      <div className="rounded-lg border border-gray-800 bg-gray-900 p-6 shadow-lg mt-5">
        <h4 className="mb-6 text-lg font-semibold text-white">Produk Terlaris</h4>
        <div className="flex flex-col">
          {/* Header Row */}
          <div className="grid grid-cols-4 bg-gray-800 p-4">
            <div className="text-center text-sm font-semibold text-gray-400">No</div>
            <div className="text-center text-sm font-semibold text-gray-400">Gambar</div>
            <div className="text-center text-sm font-semibold text-gray-400">Nama Produk</div>
            <div className="text-center text-sm font-semibold text-gray-400">Jumlah Terjual</div>
          </div>
          {/* Data Rows */}
          {currentItems.map((product, index) => (
            <div
              key={index}
              className="grid grid-cols-4 items-center border-b border-gray-800 p-2"
            >
              <div className="text-center text-sm font-medium text-gray-300">
                {indexOfFirstItem + index + 1}
              </div>
              <div className="text-center text-sm font-medium text-gray-300">
              {product.imageUrl ? (
                  <img src={product.imageUrl} alt={product.nama_produk} className="h-12 w-12 object-cover rounded-lg mx-auto" />
                ) : (
                  "Tidak ada gambar"
                )}</div>
              <div className="text-center text-sm font-medium text-gray-300">{product.nama_produk}</div>
              <div className="text-center text-sm font-medium text-gray-300">
                {product.totalTerjual}
              </div>
            </div>
          ))}
        </div>
      </div>
  
      {/* Pagination */}
      <div className="flex justify-between items-center mt-4">
        <button
          className={`px-4 py-2 bg-gray-700 text-white rounded ${
            currentPage === 1 ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-600"
          }`}
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
        >
          Sebelumnya
        </button>
        <div className="text-white">
          Halaman {currentPage} dari {totalPages}
        </div>
        <button
          className={`px-4 py-2 bg-gray-700 text-white rounded ${
            currentPage === totalPages ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-600"
          }`}
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
        >
          Berikutnya
        </button>
      </div>
    </>
  );
}
