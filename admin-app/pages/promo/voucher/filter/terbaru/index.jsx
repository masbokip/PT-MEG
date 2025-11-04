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
    const [voucherData, setVoucherData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState("");
    const itemsPerPage = 5;
    const router = useRouter();

    const handleEdit = (voucherId) => {
      router.push(`/promo/voucher/update/${voucherId}`);
    };
  
    const fetchData = async (query = "") => {
      try {
        const response = await axios.get(`${testURL}/api/vouchersNEW`, {
          params: { search: query },
        });
        setVoucherData(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching voucher data:", error);
        setLoading(false);
      }
    };
    useEffect(() => {
      fetchData();
    }, []);

    const handleDelete = async (id) => {
      if (window.confirm("Are you sure you want to delete this voucher?")) {
        try {
          await axios.delete(`${testURL}/api/voucher/${id}`);
          setVoucherData((prevData) => prevData.filter((voucher) => voucher.id_voucher !== id));
          alert("Voucher deleted successfully");
        } catch (error) {
          console.error("Error deleting voucher:", error);
          alert("Failed to delete voucher");
        }
      }
    };
    const handleSearch = (e) => {
      const query = e.target.value;
      setSearchQuery(query);
      fetchData(query);
    };

  const totalPages = Math.ceil(voucherData.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = voucherData.slice(indexOfFirstItem, indexOfLastItem);

    if (loading) {
      return <p className="text-white">Loading...</p>;
    }
  
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
          <Link href="/promo/voucher">
            <p className="hover:text-green-400">Semua Voucher</p>
          </Link>
        </li>
        <li>
          <Link href="/promo/voucher/filter/az">
            <p className="hover:text-green-400">Nama</p>
          </Link>
        </li>
        <li>
          <Link href="/promo/voucher/filter/terlama">
            <p className="text-green-400">Terbaru</p>
          </Link>
        </li>
      </ul>
    </div>
  </nav>

  <div className="rounded-lg border border-gray-800 bg-gray-900 p-4 sm:p-6 shadow-lg mt-5">
    <h4 className="mb-4 text-base sm:text-lg font-semibold text-white">Daftar Voucher</h4>

    <div className="flex flex-col">
      {/* Header Row */}
      <div className="hidden sm:grid grid-cols-4 sm:grid-cols-7 bg-gray-800 p-4 text-xs sm:text-sm font-semibold text-gray-400">
        <div className="text-left">No</div>
        <div className="text-center">ID Promo</div>
        <div className="text-center">Nama Promo</div>
        <div className="text-center">Kode Voucher</div>
        <div className="text-center">Jumlah Voucher</div>
        <div className="text-center">Status</div>
        <div className="hidden sm:block text-center">Action</div>
      </div>

      {/* Data Rows */}
      {currentItems.map((voucher, index) => (
        <div
          key={voucher.id_voucher}
          className="flex flex-col sm:grid grid-cols-4 sm:grid-cols-7 border-b border-gray-800 p-4 text-xs sm:text-sm text-gray-300 space-y-2 sm:space-y-0"
        >
          <div className="text-left">{index + 1}</div>
          <div className="text-center">{voucher.id_voucher}</div>
          <div className="text-center">{voucher.nama_voucher}</div>
          <div className="text-center">{voucher.kode_voucher}</div>
          <div className="text-center">{voucher.jumlah_voucher}</div>
          <div className="text-center">
            {voucher.status === 1 ? "Active" : "Inactive"}
          </div>
          <div className="flex justify-center space-x-2 sm:space-x-1">
            <HiMiniPencilSquare
              className="cursor-pointer"
              onClick={() => handleEdit(voucher.id_voucher)}
            />
            <HiMiniTrash
              className="cursor-pointer text-red-500 hover:text-red-700"
              onClick={() => handleDelete(voucher.id_voucher)}
            />
          </div>
        </div>
      ))}
    </div>

    {/* Pagination Controls */}
    <div className="flex flex-col sm:flex-row justify-between items-center mt-4 space-y-2 sm:space-y-0">
      <button
        className="px-4 py-2 text-sm text-white bg-gray-800 rounded-lg hover:bg-gray-700 disabled:opacity-50"
        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
        disabled={currentPage === 1}
      >
        Previous
      </button>
      <span className="text-gray-400 px-2">{`Page ${currentPage} of ${totalPages}`}</span>
      <button
        className="px-4 py-2 text-sm text-white bg-gray-800 rounded-lg hover:bg-gray-700 disabled:opacity-50"
        onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
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
