'use client';
import React,{ useEffect, useState } from "react";
import { HiMiniTrash, HiMiniPencilSquare } from "react-icons/hi2";
import Link from "next/link";
import { FiSearch,FiArrowUp} from 'react-icons/fi';
import { format } from "date-fns";
import axios from "axios";
import { useRouter } from "next/router";
import { getSession, useSession } from 'next-auth/react';
import { testURL } from '@/testURL';

export default function Index() {
  const { data: session } = useSession();
  const [brandData, setBrandData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const itemsPerPage = 5; 
  const router = useRouter();

  const handleEdit = (brandId) => {
    router.push(`/brand/update/${brandId}`);
  };

  const fetchData = async (query = "") => {
    try {
      const response = await axios.get(`${testURL}/api/brandsAZ`, {
        params: { search: query },
      });
      setBrandData(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching brand data:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(); 
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this brand?")) {
      try {
        await axios.delete(`${testURL}/api/brand/${id}`);
        setBrandData((prevData) => prevData.filter((brand) => brand.id_brand !== id));
        alert("Brand deleted successfully");
      } catch (error) {
        console.error("Error deleting brand:", error);
        alert("Failed to delete brand");
      }
    }
  };

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    fetchData(query); // Fetch data based on search query
  };

  if (loading) {
    return <p className="text-white">Loading...</p>;
  }

  const totalPages = Math.ceil(brandData.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = brandData.slice(indexOfFirstItem, indexOfLastItem);

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
      <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
        {/* Search Bar */}
        <div className="flex items-center bg-gray-800 rounded-lg p-2 w-full sm:w-auto">
          <FiSearch className="text-gray-400" />
          <input
            type="text"
            placeholder="Type to search..."
            className="bg-transparent text-sm text-gray-400 focus:outline-none ml-2 w-full"
            value={searchQuery}
            onChange={handleSearch}
          />
        </div>
        {/* Navigation Links */}
        <ul className="flex flex-wrap justify-center sm:justify-end space-x-4">
          <li>
            <Link href="/brand">
              <p className="hover:text-green-400">Semua Brand</p>
            </Link>
          </li>
          <li>
            <Link href="/brand/filter/za">
              <p className="text-green-400">A~z</p>
            </Link>
          </li>
          <li>
            <Link href="/brand/filter/terbaru">
              <p className="hover:text-green-400">Rilis</p>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  
    <div className="rounded-lg border border-gray-800 bg-gray-900 p-4 sm:p-6 shadow-lg mt-5">
      <h4 className="mb-4 text-base sm:text-lg font-semibold text-white">Daftar Brand</h4>
  
      <div className="flex flex-col">
        {/* Header Row */}
        <div className="hidden sm:grid grid-cols-4 sm:grid-cols-6 bg-gray-800 p-4 text-xs sm:text-sm font-semibold text-gray-400">
          <div className="text-left">No</div>
          <div className="text-left">Foto Brand</div>
          <div className="text-center">ID Brand</div>
          <div className="text-center">Nama Brand</div>
          <div className="text-center">Ditambahkan</div>
          <div className="hidden sm:block text-center">Action</div>
        </div>
  
        {/* Data Rows */}
        {currentItems.map((brand, index) => (
          <div
            key={brand.id_brand}
            className="flex flex-col sm:grid grid-cols-4 sm:grid-cols-6 border-b border-gray-800 p-4 text-xs sm:text-sm text-gray-300 space-y-2 sm:space-y-0"
          >
            <div className="text-left font-medium">{index + 1}</div>
            <div className="flex justify-center">
              <img
                src={`${testURL}/assets/images/brand/${brand.foto}`}
                alt={`${brand.nama_brand} logo`}
                className="w-32 h-auto object-contain"
              />
            </div>
            <div className="text-center">{brand.id_brand}</div>
            <div className="text-center">{brand.nama_brand}</div>
            <div className="text-center text-green-400">
              {format(new Date(brand.created_at), "dd/MM/yyyy")}
            </div>
            <div className="flex justify-center space-x-2">
              <HiMiniPencilSquare
                className="cursor-pointer"
                onClick={() => handleEdit(brand.id_brand)}
              />
              <HiMiniTrash
                className="cursor-pointer text-red-500 hover:text-red-700"
                onClick={() => handleDelete(brand.id_brand)}
              />
            </div>
          </div>
        ))}
      </div>
  
      {/* Pagination Controls */}
      <div className="flex flex-col sm:flex-row justify-between items-center mt-4 space-y-2 sm:space-y-0">
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
  </>
  
  )
}
export async function getServerSideProps(ctx) {
  const session = await getSession(ctx);
  if (!session || !session.user) {
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