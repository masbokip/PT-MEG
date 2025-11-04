'use client';

import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { getSession, useSession } from 'next-auth/react';
import Swal from "sweetalert2";
import { testURL } from '@/testURL';

export default function ProductDetail() {
  const { data: session } = useSession();
  const [quantity, setQuantity] = useState(1);
  const [mainImage, setMainImage] = useState("");
  const [product, setProduct] = useState(null);
  const router = useRouter();
  const { id } = router.query;
  const [rating, setRating] = useState({ average: 0, reviews: 0 });
  const [reviews, setReviews] = useState([]);
  const incrementQuantity = () => setQuantity(quantity + 1);
  const decrementQuantity = () => quantity > 1 && setQuantity(quantity - 1);
  const handleImageClick = (url) => setMainImage(url);
  const [currentPage, setCurrentPage] = useState(1);
  const reviewsPerPage = 2;

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

  useEffect(() => {
    if (!id) return;
    const fetchProductDetails = async () => {
      try {
        const response = await axios.get(`${testURL}/api/product/${id}`);
        const productData = response.data;
        const imageResponse = await axios.get(`${testURL}/api/productimages`, {
          params: { id: productData.id_produk },
        });
        setProduct({
          ...productData,
          images: imageResponse.data.map(
            (img) => `${testURL}/assets/images/product/${img.nama}`
          ),
        });
        setMainImage(imageResponse.data.length > 0 ? imageResponse.data[0].nama : "");
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };

    fetchProductDetails();
  }, [id]);

  useEffect(() => {
    if (!id) return;
    const fetchRatingAndReviews = async () => {
      try {
        const response = await axios.get(`${testURL}/api/rating/${id}`);
        const data = response.data;
  
        if (data.length > 0) {
          const averageRating = 
            data.reduce((sum, review) => sum + review.rating, 0) / data.length;
  
          setRating({
            average: averageRating,
            reviews: data.length,
          });
          setReviews(data);
        } else {
          setRating({ average: 0, reviews: 0 });
          setReviews([]);
        }
      } catch (error) {
        console.error("Error fetching ratings and reviews:");
      }
    };
  
    fetchRatingAndReviews();
  }, [id]);
  
  
useEffect(() => {
  console.log(session)
}, [session])

  const addToCart = async () => {
    try {
      const response = await axios.post(`${testURL}/api/cart`, {
        id_user: session.user?.id_user,
        id_produk: id,
        jumlah_produk: quantity,
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

  if (!product) {
    return <p>Loading...</p>;
  }

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
    }).format(value);
  };
  const paginateReviews = () => {
    const startIndex = (currentPage - 1) * reviewsPerPage;
    const endIndex = startIndex + reviewsPerPage;
    return reviews.slice(startIndex, endIndex);
  };
  const totalPages = Math.ceil(reviews.length / reviewsPerPage);

const handleNextPage = () => {
  if (currentPage < totalPages) {
    setCurrentPage(currentPage + 1);
  }
};

const handlePreviousPage = () => {
  if (currentPage > 1) {
    setCurrentPage(currentPage - 1);
  }
};


  return (
    <>
    <div className="flex flex-col lg:flex-row gap-8 p-6 lg:p-16 bg-gray-100">
      <div className="w-full lg:w-1/2 space-y-4">
        <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
          <img src={`${testURL}/assets/images/product/${mainImage}`} alt="Main Product" />
        </div>
        <div className="flex gap-2">
          {product.images.map((url, index) => (
            <img
              key={index}
              src={url}
              alt={`Thumbnail ${index + 1}`}
              className="w-20 h-20 rounded-lg object-cover cursor-pointer"
              onClick={() => handleImageClick(url)}
            />
          ))}
        </div>
      </div>
      <div className="w-full lg:w-1/2 space-y-6">
        <div>
          <h1 className="text-3xl font-semibold text-gray-700">{product.nama_produk}</h1>
          <p className="text-l font-semibold text-gray-700">{product.nama_brand}</p>
          <p className="text-l font-semibold text-gray-700">{product.nama_kategori}</p>
          <div className="flex items-center space-x-1">
          <span className="text-yellow-500">
          {"★".repeat(Math.floor(rating.average))}{"☆".repeat(5 - Math.floor(rating.average))}
         </span>
          <p className="text-gray-500">({rating.reviews} reviews)</p>
          </div>
          <p className="text-4xl font-semibold text-gray-700">{ formatCurrency(product.total_harga)}</p>
          
          
          <p className="text-gray-600 mt-4">{product.deskripsi}</p>
        </div>

        {/* Quantity and Cart Button */}
        <div className="flex items-center gap-4">
          <div className="flex items-center border rounded-lg overflow-hidden">
            <button onClick={decrementQuantity} className="px-4 py-2 text-xl text-gray-700">-</button>
            <span className="px-4 py-2 text-gray-700">{quantity}</span>
            <button onClick={incrementQuantity} className="px-4 py-2 text-xl text-gray-700">+</button>
          </div>
          <button  onClick={() => addToFavorite(product.id_produk)}  className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-400">Add to Favorite</button>
        </div>

        {/* Buy Now Button */}
        <button onClick={addToCart} disabled={product.stok<=0} className="w-full py-3 mt-4 bg-indigo-600 text-white text-lg font-medium rounded-lg hover:bg-indigo-700">
          Add Cart
        </button>
      </div>
    </div>
    <section className="py-24 relative bg-white">
  <div className="w-full max-w-7xl px-4 md:px-5 lg:px-6 mx-auto">
    <h2 className="font-manrope font-bold text-3xl sm:text-4xl leading-10 text-black mb-8 text-center">
      Ulasan Pelanggan
    </h2>
    <div className="pb-8 border-b border-gray-200 max-xl:max-w-3xl max-xl:mx-auto">
  <div>
    <h3 className="font-semibold text-lg mb-2 text-gray-900">Rating Produk</h3>
    <div className="flex items-center space-x-2">
      <span className="text-yellow-500">
        {"★".repeat(Math.floor(rating.average))}{"☆".repeat(5 - Math.floor(rating.average))}
      </span>
      <span className="text-gray-600">({rating.reviews} ulasan)</span>
    </div>
  </div>
  {reviews.length === 0 ? (
    <p className="text-gray-900 mt-4">Belum ada ulasan untuk produk ini.</p>
  ) : (
    <ul className="mt-6 space-y-4">
      {paginateReviews().map((review, index) => (
        <li key={index} className="border p-4 rounded-md">
          <p className="font-semibold text-gray-900 ">{review.ulasan}</p>
          <p className="text-sm text-gray-900">Rating: {review.rating} / 5</p>
          <p className="text-sm text-gray-900">
            By: {review.User.nama_depan} {review.User.nama_belakang}
          </p>
        </li>
      ))}
    </ul>
  )}
  {/* Pagination Buttons */}
  <div className="flex justify-center mt-6 space-x-4">
    <button
      onClick={handlePreviousPage}
      disabled={currentPage === 1}
      className={`px-4 py-2 rounded-lg ${currentPage === 1 ? 'bg-gray-500' : 'bg-indigo-500 text-white'}`}
    >
      Previous
    </button>
    <button
      onClick={handleNextPage}
      disabled={currentPage === totalPages}
      className={`px-4 py-2 rounded-lg ${currentPage === totalPages ? 'bg-gray-500' : 'bg-indigo-500 text-white'}`}
    >
      Next
    </button>
  </div>
</div>

  </div>
</section>                                        
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
