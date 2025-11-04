'use client';
import React, { useEffect, useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { FaCartShopping, FaHeart, FaShieldHalved, FaLayerGroup, FaBoxOpen } from 'react-icons/fa6';
import Link from "next/link";
import { getSession, useSession } from 'next-auth/react';
import { useRouter } from "next/router";
import Swal from "sweetalert2";
import { testURL } from '@/testURL';
export default function Index() {
  const { data: session } = useSession();
  const [categoryData, setCategoryData] = useState([]);
  const router = useRouter();
  
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
            })
          }
        } catch (error) {
          await Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'An error occurred while added item to cart',
            confirmButtonText: 'OK',
            confirmButtonColor: '#3085d6',
          });
        }
      };

  const handleDetail = (productId) => {
    router.push(`/product/detail/${productId}`);
  };
  const handleCategory = (nama_kategori) => {
    router.push(`/product/category/${nama_kategori}`);
  };
  const handleBrand = (nama_brand) => {
    router.push(`/product/brand/${nama_brand}`);
  };
 
  const [productData, setProductData] = useState([]);
  const [promoData, setPromoData] = useState([]);
  const [loading, setLoading] = useState(true);
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

  const fetchProductData = async () => {
    try {
      const response = await axios.get(`${testURL}/api/producthome`);
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
 
    const fetchPromoData = async () => {
      try {
        const response = await axios.get(`${testURL}/api/productspromo`);
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
    
        setPromoData(productsWithDetails);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching product data:", error);
        setLoading(false);
      }
    };
      useEffect(() => {
        fetchPromoData();
      }, []);

  useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch(`${testURL}/api/categories`);
          if (!response.ok) {
            throw new Error("Failed to fetch data");
          }
          const data = await response.json();
          setCategoryData(data);
          setLoading(false);
        } catch (error) {
          console.error("Error fetching brand data:", error);
          setLoading(false);
        }
      };
      fetchData();
    }, []);

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
    }).format(value);
  };

  if (loading) {
    return <p className="text-white">Loading...</p>;
  }
  return (
    <>
    <section class="bg-white py-8 mx-8 antialiased dark:bg-gray-900 md:py-16">
    <div class="mx-auto grid max-w-screen-xl px-2 pb-8 md:grid-cols-12 lg:gap-12 lg:pb-0 xl:gap-0">
      <div class="content-center justify-self-start md:col-span-7 md:text-start">
        <h1 class="mb-4 text-4xl font-extrabold leading-none tracking-tight dark:text-white md:max-w-2xl md:text-5xl xl:text-6xl">PT Megah Era Gunakarya <br />Gunakarya</h1>
        <p class="mb-4 max-w-2xl text-gray-500 dark:text-gray-400 md:mb-12 md:text-lg lg:mb-5 lg:text-xl">Kami menawarkan solusi elektrikal yang andal dan menjangkau seluruh wilayah Indonesia dengan mudah.</p>
        <a href="#" class="inline-block rounded-lg bg-primary-700 px-6 py-3.5 text-center font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Shop Now</a>
      </div>
      <div class="hidden md:col-span-5 md:mt-0 md:flex">
        <img class="dark:hidden" src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/girl-shopping-list.svg" alt="shopping illustration" />
        <img class="hidden dark:block" src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/girl-shopping-list-dark.svg" alt="shopping illustration" />
      </div>
    </div>
    </section>

    <section className="bg-gray-50 py-8 antialiased dark:bg-gray-900 md:py-12">
      <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
        <div className="mb-4 items-end justify-between space-y-4 sm:flex sm:space-y-0 md:mb-8">
          <div>
            <h2 className="mt-3 text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">Produk Baru</h2>
          </div>
        </div>

        {/* Grid for displaying products */}
         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
                          {productData.map(product => (
                            <div key={product.id_produk} className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
                              <div className="w-auto h-48 object-center mx-auto flex justify-center items-center">
                                <a>
                                  <img
                                    className="mx-auto h-auto dark:hidden cursor-pointer"
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
                                      className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                                    >
                                      <span className="sr-only cursor-pointer">Add to Cart</span>
                                      <FaCartShopping className="h-5 w-5" onClick={() => addToCartSingle(product.id_produk)} disabled={product.stok<=0}/>
                                    </button>
                
                                    <button
                                      type="button"
                                      className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                                      onClick={() => addToFavorite(product.id_produk)} 
                                    >
                                      <span className="sr-only cursor-pointer">Add to Favorites</span>
                                      <FaHeart className="h-5 w-5" />
                                    </button>
                                  </div>
                                </div>
                                <a href="#" className="text-lg font-semibold leading-tight text-gray-900 hover:underline dark:text-white cursor-pointer" onClick={() => handleDetail(product.id_produk)}>
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
                                {/* <p className="text-sm font-medium text-gray-900 dark:text-white">{product.averageRating}</p> */}
                                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">({product.totalReviews} Ulasan)</p>
                              </div>
                                <ul className="mt-2 flex items-center gap-4">
                                  <li className="flex items-center gap-2">
                                    <FaLayerGroup className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400 cursor-pointer" onClick={() => handleCategory(product.nama_kategori)}>{product.nama_kategori}</p>
                                  </li>
                                  <li className="flex items-center gap-2">
                                    <FaBoxOpen className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400 cursor-pointer"onClick={() => handleBrand(product.nama_brand)}>{product.nama_brand}</p>
                                  </li>
                                  <li className="flex items-center gap-2">
                                    <FaShieldHalved className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{product.garansi} Bulan</p>
                                  </li>
                                </ul>
                
                                <div className="mt-4 flex items-center justify-between gap-4">
                                  <p className="text-2xl font-extrabold leading-tight text-gray-900 dark:text-white">{formatCurrency(product.total_harga)}</p>
                
                                  <button
                                    type="button"
                                    className="inline-flex items-center rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                                    onClick={() => handleDetail(product.id_produk)}
                                  >
                                    Detail Produk
                                  </button>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>

        <div className="w-full text-center mt-6">
          <button
            type="button"
            className="rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700"
          >
             <Link href="/product">
             Show more
             </Link>
          </button>
        </div>
      </div>
    </section>
      <section className="bg-gray-50 py-8 antialiased dark:bg-gray-900 md:py-12">
      <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
        <div className="mb-4 items-end justify-between space-y-4 sm:flex sm:space-y-0 md:mb-8">
          <div>
            <h2 className="mt-3 text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">Promo Produk</h2>
          </div>
        </div>

        {/* Grid for displaying products */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
                          {promoData.map(product => (
                            <div key={product.id_produk} className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
                              <div className="w-auto h-48 object-center mx-auto flex justify-center items-center">
                                <a>
                                  <img
                                    className="mx-auto h-auto dark:hidden cursor-pointer"
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
                                      className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                                    >
                                      <span className="sr-only cursor-pointer">Add to Cart</span>
                                      <FaCartShopping className="h-5 w-5" onClick={() => addToCartSingle(product.id_produk)} disabled={product.stok<=0}/>
                                    </button>
                
                                    <button
                                      type="button"
                                      className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                                      onClick={() => addToFavorite(product.id_produk)} 
                                    >
                                      <span className="sr-only cursor-pointer">Add to Favorites</span>
                                      <FaHeart className="h-5 w-5" />
                                    </button>
                                  </div>
                                </div>
                
                                <a href="#" className="text-lg font-semibold leading-tight text-gray-900 hover:underline dark:text-white cursor-pointer" onClick={() => handleDetail(product.id_produk)}>
                                  {product.nama_produk}
                                </a>
                
                                <div className="flex items-center">
                                {Array.from({ length: 5 }).map((_, i) => (
                                  <FontAwesomeIcon
                                    key={i}
                                    icon={faStar}
                                    className={i < product.averageRating ? "h-4 w-4 text-yellow-400" : "h-4 w-4 text-gray-300"}
                                  />
                                ))}
                                </div>
                
                                <ul className="mt-2 flex items-center gap-4">
                                  <li className="flex items-center gap-2">
                                    <FaLayerGroup className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400 cursor-pointer" onClick={() => handleCategory(product.nama_kategori)}>{product.nama_kategori}</p>
                                  </li>
                                  <li className="flex items-center gap-2">
                                    <FaBoxOpen className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400 cursor-pointer"onClick={() => handleBrand(product.nama_brand)}>{product.nama_brand}</p>
                                  </li>
                                  <li className="flex items-center gap-2">
                                    <FaShieldHalved className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{product.garansi} Bulan</p>
                                  </li>
                                </ul>
                
                                <div className="mt-4 flex items-center justify-between gap-4">
                                  <p className="text-2xl font-extrabold leading-tight text-gray-900 dark:text-white">{formatCurrency(product.total_harga)}</p>
                
                                  <button
                                    type="button"
                                    className="inline-flex items-center rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                                    onClick={() => handleDetail(product.id_produk)}
                                  >
                                    Detail Produk
                                  </button>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>

        <div className="w-full text-center mt-6">
          <button
            type="button"
            className="rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700"
          >
             <Link href="/product/promo">
             Show more
             </Link>
          </button>
        </div>
      </div>
    </section>
    </>
    
  )
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
