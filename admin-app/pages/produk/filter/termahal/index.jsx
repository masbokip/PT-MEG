
'use client';
import React, { useEffect, useState } from "react";
import axios from "axios";
import { HiMiniTrash, HiMiniPencilSquare } from "react-icons/hi2";
import {FiSearch,FiArrowDown} from 'react-icons/fi';
import Link from "next/link";
import { format } from "date-fns";
import { useRouter } from "next/router";
import { getSession, useSession } from 'next-auth/react';
import { testURL } from '@/testURL';

export default function Index() {
  const { data: session } = useSession();
  const [productData, setProductData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const itemsPerPage = 5;
  const router = useRouter();

  const handleEdit = (productId) => {
    router.push(`/produk/update/${productId}`);
  };

  const fetchProductData = async (query = "") => {
    try {
      const response = await axios.get(`${testURL}/api/productsMAH`, {
        params: { search: query },
      });
      const products = response.data;
      const productsWithImages = await Promise.all(
        products.map(async (product) => {
          try {
            const imageResponse = await axios.get(
              `${testURL}/api/productimages`,
              { params: { id: product.id_produk, number: 1 } }
            );
            return {
              ...product,
              imageUrl: imageResponse.data.length > 0
                ? `${testURL}/assets/images/product/${imageResponse.data[0].nama}`
                : null,
            };
          } catch (error) {
            console.error(`Error fetching image for product ${product.id_produk}:`, error);
            return { ...product, imageUrl: null };
          }
        })
      );
  
      setProductData(productsWithImages);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching product data:", error);
      setLoading(false);
    }
  };
  
  useEffect(() => {
    fetchProductData();
  }, []);

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    fetchProductData(query);
  };
  

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await axios.delete(`${testURL}/api/produk/${id}`);
        setProductData((prevData) => prevData.filter((product) => product.id_produk !== id));
        alert("Product deleted successfully");
      } catch (error) {
        console.error("Error deleting produk:", error);
        alert("Failed to delete product");
      }
    }
  };

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
  <nav className="bg-gray-900 text-white py-4 shadow-lg">
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
          <Link href="/produk">
            <p className="hover:text-green-400">Semua Produk</p>
          </Link>
        </li>
        <li>
          <Link href="/produk/filter/termurah">
            <p className="text-green-400">Termahal</p>
          </Link>
        </li>
        <li>
          <Link href="/produk/filter/stokUp">
            <p className="hover:text-green-400">Stok</p>
          </Link>
        </li>
        <li>
          <Link href="/produk/filter/terbaru">
            <p className="hover:text-green-400">Rilis</p>
          </Link>
        </li>
      </ul>
    </div>
  </nav>

  <div className="rounded-lg border border-gray-800 bg-gray-900 p-4 sm:p-6 shadow-lg mt-5">
    <h4 className="mb-4 text-base sm:text-lg font-semibold text-white">Daftar Produk</h4>
    <div className="flex flex-col">
      {/* Header Row */}
      <div className="hidden sm:grid grid-cols-4 sm:grid-cols-8 bg-gray-800 p-4 text-xs sm:text-sm font-semibold text-gray-400">
        <div className="text-left">No</div>
        <div className="text-left">Foto Produk</div>
        <div className="text-center">ID Produk</div>
        <div className="text-center">Nama Produk</div>
        <div className="text-center">Stok</div>
        <div className="text-center">Harga</div>
        <div className="text-center">Created At</div>
        <div className="text-center">Action</div>
      </div>
      {/* Data Rows */}
      {currentItems.map((product, index) => (
        <div
          key={product.id_produk}
          className="flex flex-col sm:grid grid-cols-4 sm:grid-cols-8 border-b border-gray-800 p-4 text-xs sm:text-sm text-gray-300 space-y-2 sm:space-y-0"
        >
          <div className="text-left font-medium">{index + 1}</div>
          <div className="flex justify-center">
            <img
              src={product.imageUrl || ""}
              alt={product.nama_produk}
              className="w-16 h-auto object-contain"
            />
          </div>
          <div className="text-center">{product.id_produk}</div>
          <div className="text-center">{product.nama_produk}</div>
          <div className="text-center">{product.stok}</div>
          <div className="text-center">{formatCurrency(product.total_harga)}</div>
          <div className="text-center">
            {format(new Date(product.created_at), "dd/MM/yyyy")}
          </div>
          <div className="flex justify-center space-x-2">
            <HiMiniPencilSquare
              className="cursor-pointer"
              onClick={() => handleEdit(product.id_produk)}
            />
            <HiMiniTrash
              className="cursor-pointer text-red-500"
              onClick={() => handleDelete(product.id_produk)}
            />
          </div>
        </div>
      ))}
    </div>
    {/* Pagination Controls */}
    <div className="flex flex-col sm:flex-row justify-between items-center mt-4 space-y-2 sm:space-y-0">
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