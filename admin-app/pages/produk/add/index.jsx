'use client';
import axios from "axios"
import React , { useState, useEffect } from "react";
import { getSession, useSession } from 'next-auth/react';
import Swal from 'sweetalert2';
import { testURL } from '@/testURL';

export default function Index() {
  const { data: session } = useSession();
    const [formData, setFormData] = useState({
        nama_produk: "",
        nama_brand: "",
        nama_kategori: "",
        harga: "",
        berat: "",
        garansi: "",
        stok:"",
        deskripsi: "",
        images: [],
      });
    
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
            console.error("Error fetching brands:", error);
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
            console.error("Error fetching categories:", error);
            setLoadingCategories(false);
          }
        };
        fetchCategories();
      }, []);
    
      useEffect(() => {
        console.log(formData)
        
      }, [formData])
      
    
      const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
      };
    
      const handleFileChange = (e) => {
        const files = Array.from(e.target.files);
        if (files.length > 4) {
          alert("You can upload a maximum of 4 images.");
          return;
        }
        setFormData({ ...formData, images: files });
      };
    
      const handleSubmit = async (e) => {
        e.preventDefault();
      
        const data = new FormData();
        data.append("nama_produk", formData.nama_produk);
        data.append("nama_brand", formData.nama_brand);
        data.append("nama_kategori", formData.nama_kategori);
        data.append("harga", formData.harga);
        data.append("berat", formData.berat);
        data.append("garansi", formData.garansi);
        data.append("stok", formData.stok);
        data.append("deskripsi", formData.deskripsi);
      
        // Append multiple images
        formData.images.forEach((image) => {
          data.append("foto", image); 
        });
      
        try {
          const response = await axios.post(`${testURL}/api/addproduk`, data, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });
      
          
          if (response.status === 201) {
           
            setFormData({
              nama_produk: "",
              nama_brand: "",
              nama_kategori: "",
              harga: "",
              berat: "",
              garansi: "",
              stok:"",
              deskripsi: "",
              images: [],
            });
            await Swal.fire({
              icon: 'success',
              title: 'Success',
              text: response.data.message,
              confirmButtonText: 'OK',
              confirmButtonColor: "#3085d6"
            }).then(() => {
              window.location.reload();
            });
          } else {
            Swal.fire({
              icon: "error",
              title: "error",
              text: `Gagal menambah produk : ${response.data.message}`,
            }).then(() => {
              window.location.reload();
            });
          }
        } catch (error) {
          Swal.fire({
            icon: "error",
            title: "error",
            text: `${error.response?.data?.message}`,
          })
          console.error("Error:", error.response?.data || error.message);
        }
      };
  return (
    <section className="rounded-lg border border-gray-800 bg-gray-900 p-2 shadow-lg">
    <div className="py-8 px-4 mx-auto w-full lg:py-16">
      <h2 className="mb-4 text-xl font-bold text-white">Tambah Produk Baru</h2>
      <form onSubmit={handleSubmit}>
        <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
          <div className="sm:col-span-2">
            <label className="block mb-2 text-sm font-medium text-white">Nama Produk</label>
            <input
              type="text"
              name="nama_produk"
              className="bg-gray-50 border text-gray-900 rounded-lg p-2.5 w-full"
              value={formData.nama_produk}
              onChange={handleInputChange}
              placeholder="Masukkan Nama Produk"
              
            />
          </div>

         
          <div>
            <label className="block mb-2 text-sm font-medium text-white">Brand Produk</label>
            <select
              name="nama_brand"
              className="bg-gray-50 border text-gray-900 rounded-lg p-2.5 w-full"
              value={formData.nama_brand}
              onChange={handleInputChange}
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

          <div>
            <label className="block mb-2 text-sm font-medium text-white">Kategori Produk</label>
            <select
              name="nama_kategori"
              className="bg-gray-50 border text-gray-900 rounded-lg p-2.5 w-full"
              value={formData.nama_kategori}
              onChange={handleInputChange}
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

        
          <div>
            <label className="block mb-2 text-sm font-medium text-white">Harga Produk</label>
            <input
              type="number"
              name="harga"
              className="bg-gray-50 border text-gray-900 rounded-lg p-2.5 w-full"
              value={formData.harga}
              onChange={handleInputChange}
              placeholder="Masukkan Harga Produk"
              
            />
          </div>

     
          <div>
            <label className="block mb-2 text-sm font-medium text-white">Berat Produk (grams)</label>
            <input
              type="number"
              name="berat"
              className="bg-gray-50 border text-gray-900 rounded-lg p-2.5 w-full"
              value={formData.berat}
              onChange={handleInputChange}
              placeholder="Masukkan Berat Produk"
              
            />
          </div>

          
          <div>
            <label className="block mb-2 text-sm font-medium text-white">Garansi Produk (months)</label>
            <input
              type="number"
              name="garansi"
              className="bg-gray-50 border text-gray-900 rounded-lg p-2.5 w-full"
              value={formData.garansi}
              onChange={handleInputChange}
              placeholder="Masukkan Garansi Produk"
              
            />
          </div>

         
          <div>
            <label className="block mb-2 text-sm font-medium text-white">Stok Produk</label>
            <input
              type="number"
              name="stok"
              className="bg-gray-50 border text-gray-900 rounded-lg p-2.5 w-full"
              value={formData.stok}
              onChange={handleInputChange}
              placeholder="Masukkan Stok Produk"
              
            />
          </div>

          {/* Description */}
          <div className="sm:col-span-2">
            <label className="block mb-2 text-sm font-medium text-white">Description</label>
            <textarea
              name="deskripsi"
              rows="4"
              className="bg-gray-50 border text-gray-900 rounded-lg p-2.5 w-full"
              value={formData.deskripsi}
              onChange={handleInputChange}
              placeholder="Masukkan Deskripsi Produk"
              
            />
          </div>
          <div className="sm:col-span-2">
            <label className="block mb-2 text-sm font-medium text-white">Upload Images (max 4)</label>
            <input
              type="file"
              multiple
              accept="images/*"
              className="bg-gray-50 border text-gray-900 rounded-lg p-2.5 w-full"
              onChange={handleFileChange}
            />
          </div>
        </div>

        <button
          type="submit"
          className="px-5 py-2.5 mt-4 text-sm font-medium text-white bg-blue-500 rounded-lg"
        >
          Tambah Produk
        </button>
      </form>
    </div>
  </section>
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
