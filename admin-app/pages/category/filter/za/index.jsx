'use client';
import React, { useEffect, useState } from "react";
import { HiMiniTrash, HiMiniPencilSquare } from "react-icons/hi2";
import { format } from "date-fns";
import Link from "next/link";
import { FiSearch,FiArrowDown } from 'react-icons/fi';
import { useRouter } from "next/router";
import axios from "axios";
import { getSession, useSession } from 'next-auth/react';
import { testURL } from '@/testURL';

export default function CategoryPage() {
  const { data: session } = useSession();
  const [categoryData, setCategoryData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const itemsPerPage = 5;

  const router = useRouter();

  const handleEdit = (categoryId) => {
    router.push(`/category/update/${categoryId}`);
  };

  const fetchData = async (query = "") => {
    try {
      const response = await axios.get(`${testURL}/api/categoriesZA`, {
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

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      try {
        await axios.delete(`${testURL}/api/category/${id}`);
        setCategoryData((prevData) => prevData.filter((category) => category.id_kategori !== id));
        alert("Category deleted successfully");
      } catch (error) {
        console.error("Error deleting category:", error);
        alert("Failed to delete category");
      }
    }
  };

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
      <nav className="rounded-lg border border-gray-800 bg-gray-900 p-4 shadow-lg mt-5">
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
          <ul className="flex space-x-4 mx-6">
            <li>
              <Link href="/category">
                <p className="hover:text-green-400">Semua Kategori</p>
              </Link>
            </li>
            <li>
              <Link href="/category/filter/az">
              <p className="flex items-center text-green-400">
              Nama (Z~a) <FiArrowDown className="ml-1" />
              </p>
              </Link>
            </li>
            <li>
              <Link href="/category/filter/terbaru">
                <p className="hover:text-green-400">Rilis</p>
              </Link>
            </li>
          </ul>
        </div>
      </nav>
      <div className="rounded-lg border border-gray-800 bg-gray-900 p-6 shadow-lg mt-5">
        <h4 className="mb-6 text-lg font-semibold text-white">Daftar Kategori</h4>
        <div className="flex flex-col">
          <div className="grid grid-cols-4 sm:grid-cols-6 bg-gray-800 p-4 text-sm font-semibold text-gray-400">
            <div className="text-left">No</div>
            <div className="text-left">Foto Brand</div>
            <div className="text-center">ID Brand</div>
            <div className="text-center">Nama Brand</div>
            <div className="text-center">Ditambahkan</div>
            <div className="hidden sm:block text-center">Action</div>
          </div>
          {currentItems.map((category, index) => (
            <div
              key={category.id_kategori}
              className="grid grid-cols-4 sm:grid-cols-6 border-b border-gray-800 p-4 text-sm text-gray-300"
            >
              <div className="text-left font-medium">{index + 1}</div>
              <div className="flex items-center justify-left">
                <img
                  src={`${testURL}/assets/images/category/${category.foto}`}
                  alt={`${category.nama_kategori} logo`}
                  className="w-20 h-auto object-contain"
                />
              </div>
              <div className="text-center text-sm font-medium text-gray-300">{category.id_kategori}</div>
              <div className="text-center text-sm font-medium text-gray-300">{category.nama_kategori}</div>
              <div className="text-center font-medium text-green-400">
                {format(new Date(category.created_at), "dd/MM/yyyy")}
              </div>
              <div className="hidden sm:flex items-center justify-center text-center text-sm font-medium text-white space-x-1">
                <HiMiniPencilSquare
                  className="cursor-pointer"
                  onClick={() => handleEdit(category.id_kategori)}
                />
                <HiMiniTrash
                  className="cursor-pointer text-red-500"
                  onClick={() => handleDelete(category.id_kategori)}
                />
              </div>
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
  );
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

  if (session.user.role === 'Pegawai') {
    return {
      redirect: {
        destination: '/home',
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
