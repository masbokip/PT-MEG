// Updated code to make the application responsive
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
  const [totalCategory,setTotalCategory]= useState("");
  const [categoryData, setCategoryData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  useEffect(() => {
    const fetchTotalCategory = async () => {
      try {
        const response = await fetch(`${testURL}/api/total-kategori`);
        const data = await response.json();
        setTotalCategory(data.total);
      } catch (error) {
        console.error("Error fetching total kategori:", error);
      }
    };

    fetchTotalCategory();
  }, []);

  useEffect(() => {
    const fetchTotalUser = async () => {
      try {
        const response = await fetch(`${testURL}/api/totaluser`);
        const data = await response.json();
        setTotalUser(data.total);
      } catch (error) {
        console.error("Error fetching total user:", error);
      }
    };
    fetchTotalUser();
  }, []);
  const fetchData = async (query = "") => {
      try {
        const response = await axios.get(`${testURL}/api/categories`, {
          params: { search: query },
        });
        setCategoryData(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching category data:", error);
        setLoading(false);
      }
    };

    useEffect(() => {
      fetchData();
    }, []);

    const handleSearch = (e) => {
      const query = e.target.value;
      setSearchQuery(query);
      fetchData(query);
    };

   if (loading) {
    return <p className="text-white">Loading...</p>;
  }

  const totalPages = Math.ceil(categoryData.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = categoryData.slice(indexOfFirstItem, indexOfLastItem);

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

  return (
    <>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
                <div className="text-xl font-semibold">{totalCategory !== null ? totalCategory : "Loading..."}</div>
                <div className="text-gray-400">Total Kategori</div>
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
          <p className="hover:text-green-400 text-center">Produk</p>
        </Link>
      </li>
      <li>
        <Link href="/report/category">
          <p className="text-green-400 text-center">Category</p>
        </Link>
      </li>
      <li>
        <Link href="/report/brand">
          <p className="hover:text-green-400 text-center">Brand</p>
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
<div className="rounded-lg border border-gray-800 bg-gray-900 p-6 shadow-lg mt-5">
        <h4 className="mb-6 text-lg font-semibold text-white">Daftar Kategori</h4>
        <div className="flex flex-col">
          <div className="grid grid-cols-4 sm:grid-cols-4 bg-gray-800 p-4 text-sm font-semibold text-gray-400">
            <div className="text-left">No</div>
            <div className="text-left">Foto Kategori</div>
            <div className="text-center">Nama Kategori</div>
            <div className="sm:block text-center">Total Produk</div>
          </div>
          {currentItems.map((category, index) => (
            <div
              key={category.id_kategori}
              className="grid grid-cols-4 sm:grid-cols-4 border-b border-gray-800 p-4 text-sm text-gray-300"
            >
              <div className="text-left font-medium">{index + 1}</div>
              <div className="flex items-center justify-left">
                <img
                  src={`${testURL}/assets/images/category/${category.foto}`}
                  alt={`${category.nama_kategori} logo`}
                  className="w-20 h-auto object-contain"
                />
              </div>
              <div className="text-center text-sm font-medium text-gray-300">{category.nama_kategori}</div>
              <div className="text-center text-sm font-medium text-gray-300">{category.jumlah_produk}</div>
            </div>
          ))}
          <div className="flex justify-between items-center mt-4">
            <button
              className="px-4 py-2 text-sm text-white bg-gray-800 rounded-lg hover:bg-gray-700"
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <p className="text-sm text-white">
              Page {currentPage} of {totalPages}
            </p>
            <button
              className="px-4 py-2 text-sm text-white bg-gray-800 rounded-lg hover:bg-gray-700"
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </div>
      </div>

    
    </>
  )
}
