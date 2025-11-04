import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { FiSearch } from "react-icons/fi";
import { HiEye } from "react-icons/hi2";
import { useRouter } from "next/router";
import { testURL } from '@/testURL';

export default function DaftarBeli() {
    const [beliData, setBeliData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    const router = useRouter();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${testURL}/api/daftardikirim`);
                setBeliData(response.data);
                setLoading(false);
            } catch (error) {
                console.error("Failed to fetch data:", error);
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const handleView = (beliId) => {
        router.push(`/pesanan/${beliId}`);
    };

    const handleUpdateResi = async (id, newResi) => {
        try {
            const response = await axios.put(`${testURL}/api/update-resi/${id}`, { resi: newResi });
            if (response.status === 200) {
                setBeliData((prevData) =>
                    prevData.map((item) =>
                        item.id_beli === id ? { ...item, resi: newResi } : item
                    )
                );
                alert("Resi updated successfully!");
            }
        } catch (error) {
            console.error("Failed to update resi:", error);
            alert("Failed to update resi.");
        }
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
                <p className="text-green-400">Dikirim</p>
              </Link>
            </li>
            <li>
              <Link href="/pesanan/dibatalkan">
                <p className="hover:text-green-400">Dibatalkan</p>
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
            <p className="text-green-400">Dikirim</p>
          </Link>
          <Link href="/pesanan/dibatalkan">
            <p className="hover:text-green-400">Dibatalkan</p>
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
      <div className="grid grid-cols-3 bg-gray-800 p-4 sm:grid-cols-6 md:grid-cols-8 gap-2">
        <div className="text-center text-sm font-semibold text-gray-400">No</div>
        <div className="text-center text-sm font-semibold text-gray-400">Nomor Pesanan</div>
        <div className="hidden sm:block text-center text-sm font-semibold text-gray-400">Nama Lengkap</div>
        <div className="hidden md:block text-center text-sm font-semibold text-gray-400">Kurir</div>
        <div className="text-center text-sm font-semibold text-gray-400">Resi</div>
        <div className="hidden sm:block text-center text-sm font-semibold text-gray-400"></div>
        <div className="hidden md:block text-center text-sm font-semibold text-gray-400">Status</div>
        <div className="text-center text-sm font-semibold text-gray-400">Aksi</div>
      </div>

      {/* Data Rows */}
      {currentItems.map((beli, index) => (
        <div
          key={beli.id_beli}
          className="grid grid-cols-3 items-center border-b border-gray-800 p-2 sm:grid-cols-6 md:grid-cols-8 gap-2"
        >
          <div className="text-center text-sm font-medium text-gray-300">{index + 1}</div>
          <div className="text-center text-sm font-medium text-gray-300">{beli.id_beli}</div>
          <div className="hidden sm:block text-center text-sm font-medium text-gray-300">
            {`${beli.nama_depan} ${beli.nama_belakang}`}
          </div>
          <div className="hidden md:block text-center text-sm font-medium text-gray-300">
            {beli.courier}
          </div>
          <div className="text-center text-sm font-medium text-gray-300">
            <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-2">
              <input
                type="text"
                value={beli.resi}
                onChange={(e) =>
                  setBeliData((prev) =>
                    prev.map((item) =>
                      item.id_beli === beli.id_beli ? { ...item, resi: e.target.value } : item
                    )
                  )
                }
                className="bg-gray-700 text-gray-300 p-1 rounded-md w-full sm:w-auto"
              />
              <button
                onClick={() => handleUpdateResi(beli.id_beli, beli.resi)}
                className="mt-2 sm:mt-0 px-2 py-1 bg-green-600 text-white rounded-md hover:bg-green-500"
              >
                Save
              </button>
            </div>
          </div>
          <div className="hidden sm:block text-center text-sm font-medium text-green-400">
            
          </div>
          <div className="hidden md:block text-center text-sm font-medium">
            <span className="inline-flex items-center bg-blue-100 text-black text-xs font-medium px-2.5 py-0.5 rounded-full">
              <span className="w-2 h-2 mr-1 bg-blue-500 rounded-full"></span>
              Dikirim
            </span>
          </div>
          <div className="flex justify-center items-center text-center text-sm font-medium text-white">
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
