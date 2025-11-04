'use client';
import React, { useEffect, useState } from "react";
import axios from "axios";
import {FiSearch} from 'react-icons/fi';
import Link from "next/link";
import { format } from "date-fns";
import { HiEye,HiMiniTrash,HiMiniPencilSquare } from "react-icons/hi2";
import { getSession, useSession } from 'next-auth/react';
import { useRouter } from "next/router";
import { testURL } from '@/testURL';

export default function Tol() {
  const { data: session } = useSession();
  const [productData, setProductData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [totalProduk, setTotalProduk] = useState("");
  const [totalUser, setTotalUser] = useState("");
  const router = useRouter();
  const [beliData, setBeliData] = useState([]);
  const [totalPembelian, setTotalPembelian] = useState("");
  const [totalPesanan, setTotalPesanan] = useState("");
  const [totalDibeli, setTotalDibeli] = useState("");
  const [totalSelesai, setTotalSelesai] = useState("");
  const [totalBatal, setTotalBatal] = useState("");
  const [totalDikirim, setTotalDikirim] = useState("");
  const [totalRefund, setTotalRefund] = useState("");
  const [pesananReund, setPesananRefund] = useState("");

  const [baruItems,setCurrentItems] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [totalBeli, setTotalBeli] = useState(0);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    if (!startDate || !endDate) {
      setTotalBeli(0);
      setBeliData([]);
      return;
    }
    try {
      setLoading(true);

      // Ambil total beli
      const totalResponse = await axios.get(`${testURL}/api/total-beli`, {
        params: { startDate, endDate },
      });
      setTotalBeli(totalResponse.data.total_beli || 0);

      // Ambil daftar transaksi
      const listResponse = await axios.get(`${testURL}/api/list-beli`, {
        params: { startDate, endDate },
      });
      setBeliData(listResponse.data.data || []);

    } catch (err) {
      setError("Gagal mengambil data. Pastikan tanggal valid dan coba lagi.");
      setTotalBeli(0);
      setBeliData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchTotalPembelian = async () => {
      try {
        const response = await fetch(`${testURL}/api/totalpembelian`);
        const data = await response.json();
        setTotalPembelian(data.total);
      } catch (error) {
        console.error("Error fetching total user:", error);
      }
    };

    fetchTotalPembelian();
  }, []);

  useEffect(() => {
    const fetchTotalPesanan = async () => {
      try {
        const response = await fetch(`${testURL}/api/totalpesanan`);
        const data = await response.json();
        setTotalPesanan(data.total);
      } catch (error) {
        console.error("Error fetching total user:", error);
      }
    };

    fetchTotalPesanan();
  }, []);

  useEffect(() => {
    const fetchTotalRefund = async () => {
      try {
        const response = await fetch(`${testURL}/api/totalrefund`);
        const data = await response.json();
        setTotalRefund(data.total);
      } catch (error) {
        console.error("Error fetching total user:", error);
      }
    };

    fetchTotalRefund();
  }, []);

  useEffect(() => {
    const fetchPesananRefund = async () => {
      try {
        const response = await fetch(`${testURL}/api/pesananrefund`);
        const data = await response.json();
        setPesananRefund(data.total);
      } catch (error) {
        console.error("Error fetching total user:", error);
      }
    };

    fetchPesananRefund();
  }, []);

  useEffect(() => {
    const fetchTotalBatal= async () => {
      try {
        const response = await fetch(`${testURL}/api/totalbatal`);
        const data = await response.json();
        setTotalBatal(data.total);
      } catch (error) {
        console.error("Error fetching total user:", error);
      }
    };

    fetchTotalBatal();
  }, []);

  useEffect(() => {
    const fetchTotalSelesai = async () => {
      try {
        const response = await fetch(`${testURL}/api/totalselesai`);
        const data = await response.json();
        setTotalSelesai(data.total);
      } catch (error) {
        console.error("Error fetching total user:", error);
      }
    };

    fetchTotalSelesai();
  }, []);

  useEffect(() => {
    const fetchTotalDikirim = async () => {
      try {
        const response = await fetch(`${testURL}/api/totaldikirim`);
        const data = await response.json();
        setTotalDikirim(data.total);
      } catch (error) {
        console.error("Error fetching total user:", error);
      }
    };

    fetchTotalDikirim();
  }, []);

  useEffect(() => {
    const fetchTotalProses = async () => {
      try {
        const response = await fetch(`${testURL}/api/totalproses`);
        const data = await response.json();
        setTotalDibeli(data.total);
      } catch (error) {
        console.error("Error fetching total user:", error);
      }
    };

    fetchTotalProses();
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
        setProductData(productsWithImages);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching product data:", error);
        setLoading(false);
      }
    };
    fetchProductData();
  }, []);

  if (loading) {
    return <p className="text-white">Loading...</p>;
  }

  const totalPages = Math.ceil(beliData.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = beliData.slice(indexOfFirstItem, indexOfLastItem);

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
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
                <div className="text-xl font-semibold">{totalPembelian !== null ? totalPembelian : "Loading..."}</div>
                <div className="text-gray-400">Total Pesanan</div>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
                <div className="text-xl font-semibold">{formatCurrency(totalPesanan)}</div>
                <div className="text-gray-400">Total Pemasukan</div>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
                <div className="text-xl font-semibold">{totalDibeli !== null ? totalDibeli : "Loading..."}</div>
                <div className="text-gray-400">Pesanan Siap Kirim</div>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
                <div className="text-xl font-semibold">{totalDikirim !== null ? totalDikirim : "Loading..."}</div>
                <div className="text-gray-400">Pesanan Dikirim</div>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
                <div className="text-xl font-semibold">{totalBatal !== null ? totalBatal : "Loading..."}</div>
                <div className="text-gray-400">Pesanan Dibatalkan</div>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
                <div className="text-xl font-semibold">{totalSelesai !== null ? totalSelesai : "Loading..."}</div>
                <div className="text-gray-400">Pesanan Selesai</div>
            </div>
            {/* <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
                <div className="text-xl font-semibold">{formatCurrency(totalRefund)}</div>
                <div className="text-gray-400">Total Refund</div>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
                <div className="text-xl font-semibold">{pesananReund !== null ? pesananReund : "Loading..."}</div>
                <div className="text-gray-400">Pesanan Refund</div>
            </div> */}
    </div>
    <nav className="bg-gray-900 text-white py-4 shadow-lg mt-5">
  <div className="container mx-auto flex justify-center items-center">
    <ul className="flex items-center space-x-10">
      <li>
        <Link href="/report/home">
          <p className="text-green-400 text-center">Pesanan</p>
        </Link>
      </li>
      <li>
        <Link href="/report/product">
          <p className="hover:text-green-400 text-center">Produk</p>
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
</nav>
<section className="rounded-lg border border-gray-800 bg-gray-900 p-4 shadow-lg mt-5">
      <div className="py-8 px-4 mx-auto w-full lg:py-2">
        <h2 className="mb-4 text-xl font-bold text-white">Cek Pendapatan</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label className="block mb-2 text-sm font-medium text-white">Tanggal Awal</label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="bg-gray-50 border text-gray-900 rounded-lg p-2.5 w-full"
              required
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-white">Tanggal Akhir</label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="bg-gray-50 border text-gray-900 rounded-lg p-2.5 w-full"
              required
            />
          </div>
          <button
            type="submit"
            className="inline-flex items-center px-5 py-2.5 mt-4 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700"
          >
            Cek Pendapatan
          </button>
        </form>
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg mt-4">
          <div className="text-xl font-semibold">
          {formatCurrency(totalBeli)}
          </div>
          <div className="text-gray-400">Pendapatan Berdasarkan Tanggal</div>
        </div>
        {error && <div className="mt-4 text-red-500">{error}</div>}
      </div>
    </section>
    <div className="rounded-lg border border-gray-800 bg-gray-900 p-6 shadow-lg mt-5">
    <h4 className="mb-6 text-lg font-semibold text-white">
      Daftar Pembelian Berdasarkan Tanggal
    </h4>

    {loading ? (
          <p className="text-center text-gray-400">Loading data...</p>
        ) : (
          <>
            <div className="grid grid-cols-3 bg-gray-800 p-4 sm:grid-cols-6">
              <div className="text-center text-sm font-semibold text-gray-400">No</div>
              <div className="text-center text-sm font-semibold text-gray-400">Nomor Pesanan</div>
              <div className="text-center text-sm font-semibold text-gray-400">Nama Lengkap</div>
              <div className="text-center text-sm font-semibold text-gray-400">Total</div>
              <div className="text-center text-sm font-semibold text-gray-400">Tanggal Pesanan</div>
              <div className="text-center text-sm font-semibold text-gray-400">Status</div>
              
            </div>
            {currentItems.map((beli, index) => (
              <div
                key={beli.id_beli}
                className="grid grid-cols-3 items-center border-b border-gray-800 p-2 sm:grid-cols-6"
              >
                <div className="text-center text-sm font-medium text-gray-300">{index + 1}</div>
                <div className="text-center text-sm font-medium text-gray-300">{beli.id_beli}</div>
                <div className="text-center text-sm font-medium text-gray-300">{`${beli.nama_depan} ${beli.nama_belakang}`}</div>
                <div className="text-center text-sm font-medium text-green-400">
                  {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(beli.total_beli)}
                </div>
                <div className="text-center text-sm font-medium text-gray-300">
                  {new Date(beli.created_at).toLocaleDateString('id-ID')}
                </div>
                <div className="text-center text-sm font-medium">
                  {beli.status_pengiriman === 1 ? "Belum Bayar" :
                  beli.status_pengiriman === 2 ? "Sudah Bayar" :
                  beli.status_pengiriman === 3 ? "Dikirim" :
                  beli.status_pengiriman === 4 ? "Selesai" :
                  "Dibatalkan"}
                </div>
              </div>
            ))}

        {/* Pagination Controls */}
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
      </>
    )}
  </div>
    
    </>
  )
}
