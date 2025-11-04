'use client';
import axios from "axios"
import { useRouter } from "next/router";
import React , { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { getSession, useSession } from 'next-auth/react';
import { testURL } from '@/testURL';

export default function Index() {
  const router = useRouter();
  const { data: session } = useSession();
  const { id } = router.query;
    const [formData, setFormData] = useState({
        mulai_promo: "",
        selesai_promo: "",
        harga_diskon: "",
      });
    
      useEffect(() => {
        if (id) {
          axios.get(`${testURL}/api/product/${id}`)
            .then(response => setFormData(response.data))
            .catch(error => console.error("Error fetching user data:", error));
        }
      }, [id]);
      
      const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
      };
    
      const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const response = await axios.put(`${testURL}/api/produk/updatepromo/${id}`, formData);
          if (response.status === 200) {
            Swal.fire({
              icon: "success",
              title: "Success",
              text: "Produk promo successfully",
            }).then(() => {
              router.push("/promo/product");
            });
          }
        } catch (error) {
          console.error("Error updating produk:", error);
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "Failed to update produk",
          });
        }
      };
  return (
    <section className="rounded-lg border border-gray-800 bg-gray-900 p-2 shadow-lg">
    <div className="py-8 px-4 mx-auto w-full lg:py-16">
      <h2 className="mb-4 text-xl font-bold text-white">Tambah Promo Produk</h2>
      <form onSubmit={handleSubmit}>
        <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
          {/* Product Name */}
          <div className="sm:col-span-2">
            <label className="block mb-2 text-sm font-medium text-white">Nama Produk</label>
            <input
              type="text"
              name="nama_produk"
              className="bg-gray-800 border text-white rounded-lg p-2.5 w-full"
              value={formData.nama_produk}
              onChange={handleChange}
              placeholder="Masukkan Nama Produk"
              disabled
            />
          </div>

          {/* Price */}
          <div>
            <label className="block mb-2 text-sm font-medium text-white">Harga Produk</label>
            <input
              type="number"
              name="harga"
              className="bg-gray-800 border text-white rounded-lg p-2.5 w-full"
              value={formData.harga}
              onChange={handleChange}
              placeholder="Masukkan Harga Produk"
              disabled
              required
            />
          </div>

          {/* Price */}
          <div>
            <label className="block mb-2 text-sm font-medium text-white">Potongan Harga</label>
            <input
              type="number"
              name="harga_diskon"
              className="bg-gray-50 border text-gray-900 rounded-lg p-2.5 w-full"
              value={formData.harga_diskon}
              onChange={handleChange}
              placeholder="Masukkan Harga Produk"
              required
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-white">Mulai Promo</label>
            <input
              type="date"
              name="mulai_promo"
              className="bg-gray-50 border text-gray-900 rounded-lg p-2.5 w-full"
              value={formData.mulai_promo}
              onChange={handleChange}
              placeholder="Masukkan Harga Produk"
              required
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-white">Selesai Promo</label>
            <input
              type="date"
              name="selesai_promo"
              className="bg-gray-50 border text-gray-900 rounded-lg p-2.5 w-full"
              value={formData.selesai_promo}
              onChange={handleChange}
              placeholder="Masukkan Harga Produk"
              required
            />
          </div>
        </div>
        <button
          type="submit"
          className="px-5 py-2.5 mt-4 text-sm font-medium text-white bg-blue-500 rounded-lg"
        >
          Tambahkan Promo
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
