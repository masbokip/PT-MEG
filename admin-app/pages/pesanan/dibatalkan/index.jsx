import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Link from "next/link";
import { FiSearch } from 'react-icons/fi';
import {HiEye} from "react-icons/hi2";
import { useRouter } from "next/router";
import { useSession } from 'next-auth/react';
import { testURL } from '@/testURL';
import Swal from 'sweetalert2';
export default function DaftarBeli() {
  const [beliData, setBeliData] = useState([]);
     const [loading, setLoading] = useState(true);
     const [currentPage, setCurrentPage] = useState(1);
     const itemsPerPage = 10;
     const router = useRouter();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${testURL}/api/daftardibatalkan`);
        setBeliData(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch data:", error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const refundOrder = async (idBeli) => {
    try {
      const response = await axios.post(`${testURL}/api/refund-status`, {
        id_beli: idBeli,
      });
  
      if (response.status === 200) {
        Swal.fire({
          title: "Berhasil!",
          text: "Pesanan telah direfund.",
          icon: "success",
          confirmButtonText: "OK",
        });
        router.reload();
      } else {
        Swal.fire({
          title: "Gagal!",
          text: "Gagal refund pesanan.",
          icon: "error",
          confirmButtonText: "OK",
        });
        
      }
    } catch (error) {
      console.error("Error saat refund pesanan:", error);
      Swal.fire({
        title: "Error!",
        text: "Terjadi kesalahan saat refund pesanan.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  const handleView = (beliId) => {
    router.push(`/pesanan/${beliId}`);
  };

  const totalPages = Math.ceil(beliData.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = beliData.slice(indexOfFirstItem, indexOfLastItem);

  const handlePreviousPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
  const handleNextPage = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));

  return (
    <>
      <nav className="bg-gray-900 text-white py-4 shadow-lg mt-5">
          <div className="container mx-auto flex justify-between items-center px-4">
          <ul className="hidden md:flex items-center space-x-10">
            <li>
              <Link href="/pesanan">
                <p className="hover:text-green-400">Semua Pesanan</p>
              </Link>
            </li>
            <li>
              <Link href="/pesanan/masuk">
                <p className="hover:text-green-400">Masuk</p>
              </Link>
            </li>
            <li>
              <Link href="/pesanan/siapkirim">
                <p className="hover:text-green-400">Siap Kirim</p>
              </Link>
            </li>
            <li>
              <Link href="/pesanan/dikirim">
                <p className="hover:text-green-400">Dikirim</p>
              </Link>
            </li>
            <li>
              <Link href="/pesanan/dibatalkan">
                <p className="text-green-400">Dibatalkan</p>
              </Link>
            </li>
            <li>
              <Link href="/pesanan/selesai">
                <p className="hover:text-green-400">Selesai</p>
              </Link>
            </li>
          </ul>
        </div>
        <div className="md:hidden flex flex-col space-y-4 px-4 pt-2">
          <Link href="/pesanan">
            <p className="hover:text-green-400">Semua Pesanan</p>
          </Link>
          <Link href="/pesanan/masuk">
            <p className="hover:text-green-400">Masuk</p>
          </Link>
          <Link href="/pesanan/siapkirim">
            <p className="hover:text-green-400">Siap Kirim</p>
          </Link>
          <Link href="/pesanan/dikirim">
            <p className="hover:text-green-400">Dikirim</p>
          </Link>
          <Link href="/pesanan/dibatalkan">
            <p className="text-green-400">Dibatalkan</p>
          </Link>
          <Link href="/pesanan/selesai">
            <p className="hover:text-green-400">Selesai</p>
          </Link>
        </div>
      </nav>
      <div className="rounded-lg border border-gray-800 bg-gray-900 p-6 shadow-lg mt-5">
  <h4 className="mb-6 text-lg font-semibold text-white">Daftar Pembelian</h4>

  {loading ? (
    <p className="text-center text-gray-400">Loading data...</p>
  ) : (
    <div className="flex flex-col">
      {/* Header Grid */}
      <div className="grid grid-cols-2 bg-gray-800 p-4 sm:grid-cols-4 md:grid-cols-6 gap-2">
        <div className="text-center text-sm font-semibold text-gray-400">No</div>
        <div className="text-center text-sm font-semibold text-gray-400">Nomor Pesanan</div>
        <div className="hidden sm:block text-center text-sm font-semibold text-gray-400">
          Nama Lengkap
        </div>
        <div className="text-center text-sm font-semibold text-gray-400">Total</div>
        <div className="hidden md:block text-center text-sm font-semibold text-gray-400">
          Status
        </div>
        <div className=" md:block text-center text-sm font-semibold text-gray-400">
          Detail Pesanan
        </div>
      </div>

      {/* Data Rows */}
      {currentItems.map((beli, index) => (
        <div
          key={beli.id_beli}
          className="grid grid-cols-2 items-center border-b border-gray-800 p-2 sm:grid-cols-4 md:grid-cols-6 gap-2"
        >
          <div className="text-center text-sm font-medium text-gray-300">{indexOfFirstItem + index + 1}</div>
          <div className="text-center text-sm font-medium text-gray-300">{beli.id_beli}</div>
          <div className="hidden sm:block text-center text-sm font-medium text-gray-300">
            {`${beli.nama_depan} ${beli.nama_belakang}`}
          </div>
          <div className="text-center text-sm font-medium text-green-400">
            Rp{beli.total_beli.toLocaleString()}
          </div>
          <div className=" md:block text-center text-sm font-medium">
            {beli.status_pengiriman === 1 ? (
              <span className="inline-flex items-center bg-gray-100 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                <span className="w-2 h-2 me-1 bg-gray-500 rounded-full"></span>
                Belum Bayar
              </span>
            ) : beli.status_pengiriman === 2 ? (
              <span className="inline-flex items-center bg-yellow-100 text-black text-xs font-medium px-2.5 py-0.5 rounded-full">
                <span className="w-2 h-2 me-1 bg-yellow-500 rounded-full"></span>
                Sudah Bayar
              </span>
            ) : beli.status_pengiriman === 5 && beli.status_pembayaran === 2 ? (
              <div className="flex items-center justify-center">
                <button
                  className="bg-red-500 text-white px-3 py-1 rounded-full text-xs font-medium hover:bg-red-700"
                  onClick={() => refundOrder(beli.id_beli)}
                >
                  Refund
                </button>
              </div>
            ) : beli.status_pengiriman === 5 && beli.status_pembayaran === 3 ? (
              <span className="inline-flex items-center bg-yellow-100 text-black text-xs font-medium px-2.5 py-0.5 rounded-full ">
                <span className="w-2 h-2 me-1 bg-yellow-500 rounded-full"></span>
                Refund Berhasil
              </span>
            ) : beli.status_pengiriman === 5 ? (
              <span className="inline-flex items-center bg-red-100 text-black text-xs font-medium px-2.5 py-0.5 rounded-full ">
                <span className="w-2 h-2 me-1 bg-red-500 rounded-full"></span>
                Dibatalkan
              </span>
            ) : (
              /* Status lainnya */
              <span className="inline-flex items-center bg-red-100 text-black text-xs font-medium px-2.5 py-0.5 rounded-full ">
                <span className="w-2 h-2 me-1 bg-red-500 rounded-full"></span>
                Dibatalkan
              </span>
            )}
          </div>
          <div className="hidden md:flex items-center justify-center text-center text-sm font-medium text-white space-x-1">
            <HiEye className="cursor-pointer" onClick={() => handleView(beli.id_beli)} />
          </div>
        </div>
      ))}
      {/* Pagination */}
      <div className="flex flex-col sm:flex-row justify-between items-center mt-4 space-y-2 sm:space-y-0">
        <button
          className="px-4 py-2 text-sm text-white bg-gray-800 rounded-lg hover:bg-gray-700 disabled:opacity-50"
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <p className="text-sm text-white">
          Page {currentPage} of {totalPages}
        </p>
        <button
          className="px-4 py-2 text-sm text-white bg-gray-800 rounded-lg hover:bg-gray-700 disabled:opacity-50"
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  )}
</div>

    </>
  );
}
