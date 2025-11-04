'use client';
import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { getSession, useSession } from 'next-auth/react';
import { testURL } from '@/testURL';

export default function Index() {
  const router = useRouter();
  const { data: session } = useSession();
  const { id } = router.query;

  const [formData, setFormData] = useState({
    nama_produk: '',
    nama_brand: '',
    nama_kategori: '',
    harga: '',
    berat: '',
    garansi: '',
    stok: '',
    deskripsi: '',
  });
  const [images, setImages] = useState([]);
  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loadingBrands, setLoadingBrands] = useState(true);
  const [loadingCategories, setLoadingCategories] = useState(true);

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const response = await fetch(`${testURL}/api/brands`);
        const data = await response.json();
        setBrands(data);
        setLoadingBrands(false);
      } catch (error) {
        console.error('Error fetching brands:', error);
        setLoadingBrands(false);
      }
    };
    fetchBrands();
  }, []);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(`${testURL}/api/categories`);
        const data = await response.json();
        setCategories(data);
        setLoadingCategories(false);
      } catch (error) {
        console.error('Error fetching categories:', error);
        setLoadingCategories(false);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    if (id) {
      axios
        .get(`${testURL}/api/product/${id}`)
        .then((response) => setFormData(response.data))
        .catch((error) => console.error('Error fetching product data:', error));
    }
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 4) {
      alert('You can upload a maximum of 4 images.');
      return;
    }
    setImages(files);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formPayload = new FormData();
      Object.keys(formData).forEach((key) => {
        formPayload.append(key, formData[key]);
      });
      images.forEach((image, index) => {
        formPayload.append(`fotos`, image);
      });

      const response = await axios.put(
        `${testURL}/api/produk/update/${id}`,
        formPayload,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      if (response.status === 200) {
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Produk updated successfully',
        }).then(() => {
          router.push('/produk');
        });
      }
    } catch (error) {
      console.error('Error updating produk:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to update produk',
      });
    }
  };

  return (
    <section className="rounded-lg border border-gray-800 bg-gray-900 p-2 shadow-lg">
      <div className="py-8 px-4 mx-auto w-full lg:py-16">
        <h2 className="mb-4 text-xl font-bold text-white">Update Produk</h2>
        <form onSubmit={handleSubmit}>
          {/* Form Fields */}
          <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
            {/* Product Name */}
            <div className="sm:col-span-2">
              <label className="block mb-2 text-sm font-medium text-white">
                Nama Produk
              </label>
              <input
                type="text"
                name="nama_produk"
                className="bg-gray-50 border text-gray-900 rounded-lg p-2.5 w-full"
                value={formData.nama_produk}
                onChange={handleChange}
                placeholder="Masukkan Nama Produk"
                required
              />
            </div>

            {/* Brand */}
            <div>
              <label className="block mb-2 text-sm font-medium text-white">
                Brand Produk
              </label>
              <select
                name="nama_brand"
                className="bg-gray-50 border text-gray-900 rounded-lg p-2.5 w-full"
                value={formData.nama_brand}
                onChange={handleChange}
                disabled={loadingBrands}
              >
                <option value="">Pilih Brand</option>
                {brands.map((brand) => (
                  <option key={brand.id_brand} value={brand.nama_brand}>
                    {brand.nama_brand}
                  </option>
                ))}
              </select>
            </div>

            {/* Category */}
            <div>
              <label className="block mb-2 text-sm font-medium text-white">
                Kategori Produk
              </label>
              <select
                name="nama_kategori"
                className="bg-gray-50 border text-gray-900 rounded-lg p-2.5 w-full"
                value={formData.nama_kategori}
                onChange={handleChange}
                disabled={loadingCategories}
              >
                <option value="">Pilih Kategori</option>
                {categories.map((category) => (
                  <option key={category.id_kategori} value={category.nama_kategori}>
                    {category.nama_kategori}
                  </option>
                ))}
              </select>
            </div>

            {/* Price */}
            <div>
              <label className="block mb-2 text-sm font-medium text-white">
                Harga Produk
              </label>
              <input
                type="number"
                name="harga"
                className="bg-gray-50 border text-gray-900 rounded-lg p-2.5 w-full"
                value={formData.harga}
                onChange={handleChange}
                placeholder="Masukkan Harga Produk"
                required
              />
            </div>

            {/* Weight */}
            <div>
              <label className="block mb-2 text-sm font-medium text-white">
                Berat Produk (grams)
              </label>
              <input
                type="number"
                name="berat"
                className="bg-gray-50 border text-gray-900 rounded-lg p-2.5 w-full"
                value={formData.berat}
                onChange={handleChange}
                placeholder="Masukkan Berat Produk"
                required
              />
            </div>

            {/* Warranty */}
            <div>
              <label className="block mb-2 text-sm font-medium text-white">
                Garansi Produk (months)
              </label>
              <input
                type="number"
                name="garansi"
                className="bg-gray-50 border text-gray-900 rounded-lg p-2.5 w-full"
                value={formData.garansi}
                onChange={handleChange}
                placeholder="Masukkan Garansi Produk"
                required
              />
            </div>

            {/* Stock */}
            <div>
              <label className="block mb-2 text-sm font-medium text-white">
                Stok Produk
              </label>
              <input
                type="number"
                name="stok"
                className="bg-gray-50 border text-gray-900 rounded-lg p-2.5 w-full"
                value={formData.stok}
                onChange={handleChange}
                placeholder="Masukkan Stok Produk"
                required
              />
            </div>

            {/* Description */}
            <div className="sm:col-span-2">
              <label className="block mb-2 text-sm font-medium text-white">
                Description
              </label>
              <textarea
                name="deskripsi"
                rows="4"
                className="bg-gray-50 border text-gray-900 rounded-lg p-2.5 w-full"
                value={formData.deskripsi}
                onChange={handleChange}
                placeholder="Masukkan Deskripsi Produk"
                required
              />
            </div>

            {/* Image Upload */}
            <div className="sm:col-span-2">
              <label className="block mb-2 text-sm font-medium text-white">
                Upload Images (max 4)
              </label>
              <input
                type="file"
                multiple
                accept="image/*"
                className="bg-gray-50 border text-gray-900 rounded-lg p-2.5 w-full"
                onChange={handleFileChange}
              />
            </div>
          </div>

          <button
            type="submit"
            className="px-5 py-2.5 mt-4 text-sm font-medium text-white bg-blue-500 rounded-lg"
          >
            Update Product
          </button>
        </form>
      </div>
    </section>
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
