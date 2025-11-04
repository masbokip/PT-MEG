'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { FaCartShopping, FaHeart, FaShieldHalved, FaLayerGroup, FaBoxOpen, FaSearchengin, FaArrowUp } from 'react-icons/fa6';
import Link from 'next/link';
import { useRouter } from "next/router";
import { getSession, useSession } from 'next-auth/react';
import Swal from "sweetalert2";
import { testURL } from '@/testURL';

export default function ProductList() {
  const { data: session } = useSession();
  const [productData, setProductData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const itemsPerPage = 6;
  const router = useRouter();
  const { id } = router.query;
  
  const handleDetail = (productId) => {
    router.push(`/product/detail/${productId}`);
  };
  const handleCategory = (nama_kategori) => {
    router.push(`/product/category/${nama_kategori}`);
  };
  const handleBrand = (nama_brand) => {
    router.push(`/product/brand/${nama_brand}`);
  };
  const fetchRatings = async (productId) => {
    try {
      const response = await axios.get(`${testURL}/api/ratings`, {
        params: { id: productId },
      });
      return response.data;
    } catch (error) {
      console.error(`Error fetching rating for product ${productId}:`, error);
      return { averageRating: 0, totalReviews: 0 };
    }
  };

  const fetchProductData = async (query = "") => {
  try {
    const response = await axios.get(`${testURL}/api/productspromo`, {
      params: { search: query },
    });
    const products = response.data;

    const productsWithDetails = await Promise.all(
      products.map(async (product) => {
        try {
          const imageResponse = await axios.get(
            `${testURL}/api/productimages`,
            { params: { id: product.id_produk, number: 1 } }
          );
          const ratingData = await fetchRatings(product.id_produk);
          return {
            ...product,
            imageUrl: imageResponse.data.length > 0
              ? `${testURL}/assets/images/product/${imageResponse.data[0].nama}`
              : null,
            averageRating: ratingData.averageRating || 0,
            totalReviews: ratingData.totalReviews || 0,
          };
        } catch (error) {
          console.error(`Error processing product ${product.id_produk}:`, error);
          return { ...product, imageUrl: null, averageRating: 0, totalReviews: 0 };
        }
      })
    );

    setProductData(productsWithDetails);
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

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
    }).format(value);
  };

  const addToCartSingle = async (productId) => {
      try {
        const response = await axios.post(`${testURL}/api/cartsingle`, {
          id_user: session.user?.id_user,
          id_produk: productId,
        });
        if (response.status === 200) {
          Swal.fire({
            icon: 'success',
            title: 'Success',
            text: response.data.message,
            confirmButtonText: 'OK',
            confirmButtonColor: '#3085d6',
          }).then(() => {
            window.location.reload();
          });
        }
      } catch (error) {
        await Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'An error occurred while added item to cart',
          confirmButtonText: 'OK',
          confirmButtonColor: '#3085d6',
        });
        window.location.reload();
      }
    };

    const addToFavorite = async (productId) => {
      try {
        const response = await axios.post(`${testURL}/api/favorite`, {
          id_user: session.user?.id_user,
          id_produk: productId,
        });
        if (response.status === 200) {
          Swal.fire({
            icon: 'success',
            title: 'Success',
            text: response.data.message,
            confirmButtonText: 'OK',
            confirmButtonColor: '#3085d6',
          }).then(() => {
            window.location.reload();
          });
        }
      } catch (error) {
        await Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'An error occurred while added item to cart',
          confirmButtonText: 'OK',
          confirmButtonColor: '#3085d6',
        });
        window.location.reload();
      }
    };


  if (loading) {
    return <p className="text-center text-gray-800">Loading...</p>;
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

  return (
    <>
      <nav className="bg-white text-gray-800 py-8 drop-shadow-lg">
        <div className="container mx-auto flex justify-between items-center px-4">
          <div className="flex items-center space-x-4">
            <div className="flex items-center bg-gray-100 border border-gray-300 rounded-lg p-2">
              <FaSearchengin className="text-gray-500" />
              <input
                type="text"
                placeholder="Cari produk..."
                className="bg-transparent text-sm text-gray-600 focus:outline-none ml-2"
                value={searchQuery}
                onChange={handleSearch}
              />
            </div>
          </div>
        </div>
      </nav>
      <div className=" mx-auto p-4 lg:p-8 bg-white">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
                  {currentItems.map(product => (
                    <div key={product.id_produk} className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                      <div className="w-auto h-48 object-center mx-auto flex justify-center items-center">
                        <a>
                          <img
                            className="mx-auto h-auto cursor-pointer"
                            onClick={() => handleDetail(product.id_produk)}
                            src={product.imageUrl || ""}
                            alt={product.nama_produk}
                            width={200}
                            height={50}
                          />
                        </a>
                      </div>
                      <div className="pt-6">
                        <div className="mb-4 flex items-center justify-between gap-4">
                          <div className="flex items-center justify-end gap-1">
                            <button
                              type="button"
                              className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900"
                            >
                              <span className="sr-only cursor-pointer">Add to Cart</span>
                              <FaCartShopping className="h-5 w-5" onClick={() => addToCartSingle(product.id_produk)} disabled={product.stok<=0}/>
                            </button>
        
                            <button
                              type="button"
                              className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900 "
                              onClick={() => addToFavorite(product.id_produk)} 
                            >
                              <span className="sr-only cursor-pointer">Add to Favorites</span>
                              <FaHeart className="h-5 w-5" />
                            </button>
                          </div>
                        </div>
        
                        <a href="#" className="text-lg font-semibold leading-tight text-gray-900 hover:underline cursor-pointer" onClick={() => handleDetail(product.id_produk)}>
                          {product.nama_produk}
                        </a>
        
                        <div className="mt-2 flex items-center gap-2">
                          <div className="flex items-center">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <FontAwesomeIcon
                              key={i}
                              icon={faStar}
                              className={i < product.averageRating ? "h-4 w-4 text-yellow-400" : "h-4 w-4 text-gray-300"}
                            />
                          ))}
                          </div>
              
                          <p className="text-sm font-medium text-gray-500">({product.totalReviews} Ulasan)</p>
                        </div>
        
                        <ul className="mt-2 flex items-center gap-4">
                          <li className="flex items-center gap-2">
                            <FaLayerGroup className="h-4 w-4 text-gray-500" />
                            <p className="text-sm font-medium text-gray-500 cursor-pointer" onClick={() => handleCategory(product.nama_kategori)}>{product.nama_kategori}</p>
                          </li>
                          <li className="flex items-center gap-2">
                            <FaBoxOpen className="h-4 w-4 text-gray-500 " />
                            <p className="text-sm font-medium text-gray-500 cursor-pointer"onClick={() => handleBrand(product.nama_brand)}>{product.nama_brand}</p>
                          </li>
                          <li className="flex items-center gap-2">
                            <FaShieldHalved className="h-4 w-4 text-gray-500" />
                            <p className="text-sm font-medium text-gray-500">{product.garansi} Bulan</p>
                          </li>
                        </ul>
        
                        <div className="mt-4 flex items-center justify-between gap-4">
                          <p className="text-2xl font-extrabold leading-tight text-gray-900">{formatCurrency(product.total_harga)}</p>
        
                          <button
                            type="button"
                            className="inline-flex items-center rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300"
                            onClick={() => handleDetail(product.id_produk)}
                          >
                            Detail Produk
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
        <div className="flex justify-center items-center mt-10 gap-4">
      <button
        onClick={handlePreviousPage}
        disabled={currentPage === 1}
        className="px-4 py-2 bg-blue-600 text-white rounded disabled:bg-indigo-300"
      >
        Previous
      </button>
      <span className="text-gray-600">Page {currentPage} of {totalPages}</span>
      <button
        onClick={handleNextPage}
        disabled={currentPage === totalPages}
        className="px-4 py-2 bg-blue-600 text-white rounded disabled:bg-indigo-300"
      >
        Next
      </button>
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
        destination: '/login',
        permanent: false,
      },
    };
  }
  if (session.user.role === 'Pegawai' || session.user.role === 'Admin') {
    return {
      redirect: {
        destination: '/login',
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
