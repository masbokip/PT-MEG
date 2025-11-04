'use client'
import React, { useState, useEffect } from 'react';
import { useRouter } from "next/router";
import axios from 'axios';
import Swal from 'sweetalert2';
import Link from 'next/link';
import { getSession, useSession } from 'next-auth/react';
import { testURL } from '@/testURL';

export default function Index() {
    const { data: session } = useSession();
    const router = useRouter();
    const { id } = router.query;
    const [formData, setFormData] = useState({
        nama_voucher: '',
        kode_voucher: '',
        potongan: '',
        jumlah_voucher: ''
      });

      useEffect(() => {
        if (id) {
          axios.get(`${testURL}/api/voucher/${id}`)
            .then(response => setFormData(response.data))
            .catch(error => console.error("Error fetching voucher data:", error));
        }
      }, [id]);

      const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
      };
    
      const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const response = await axios.put(`${testURL}/api/voucher/update/${id}`, formData);
          if (response.status === 200) {
            Swal.fire({
              icon: "success",
              title: "Success",
              text: "Voucher updated successfully",
            }).then(() => {
              router.push("/promo/voucher"); 
            });
          }
        } catch (error) {
          console.error("Error updating voucher:", error);
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "Failed to update voucher",
          });
        }
      };
  return (
    <>
    <nav className="rounded-lg border border-gray-800 bg-gray-900 p-4 shadow-lg mt-5">
      <div className="container mx-auto flex justify-center items-center">

        <ul className="flex space-x-4 mx-6">
          <li>
            <Link href="/promo/add">
              <p className="text-green-400">Add Promo Voucher</p>
            </Link>
          </li>
          <li>
            <Link href="/promo/add/produk">
            <p className="hover:text-green-400">Add Promo Produk</p>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
    <section className="rounded-lg border border-gray-800 bg-gray-900 p-2 shadow-lg ">
        <div className="py-8 px-4 mx-auto  w-full lg:py-6">
            <h2 className="mb-4 text-xl font-bold text-white ">Tambahkan Voucher Promo</h2>
            <form onSubmit={handleSubmit} >
                <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
                    <div className="w-full">
                        <label htmlFor="namapromo" className="block mb-2 text-sm font-medium text-white ">Nama Promo</label>
                        <input 
                        type="text"
                        name="nama_voucher"
                        value={formData.nama_voucher}
                        onChange={handleChange}
                        placeholder="Nama Voucher"
                        autoComplete="nama-voucher"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" />
                    </div>
                    <div className="w-full">
                        <label htmlFor="kodevoucher" className="block mb-2 text-sm font-medium text-white ">Kode Voucher</label>
                        <input 
                        type="text"
                        name="kode_voucher"
                        value={formData.kode_voucher}
                        onChange={handleChange}
                        placeholder="Kode Voucher"
                        autoComplete="kode-voucher"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" />
                    </div>
                    <div className="w-full">
                        <label htmlFor="totalpromo" className="block mb-2 text-sm font-medium text-white">Total Promo</label>
                        <input 
                        type="number"
                        name="potongan"
                        value={formData.potongan}
                        onChange={handleChange}
                        placeholder="Potongan Harga (Rp)"
                        autoComplete="Potongan"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" />
                    </div>
                    <div className="w-full">
                        <label htmlFor="jumlahpromo" className="block mb-2 text-sm font-medium text-white">Jumlah Voucher</label>
                        <input 
                        type="number"
                        name="jumlah_voucher"
                        value={formData.jumlah_voucher}
                        onChange={handleChange}
                        placeholder="Jumlah Voucher"
                        autoComplete="jumlah_voucher"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"/>
                    </div>
                    
                </div>
                <button type="submit" className="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-blue-600 rounded-lg focus:ring-4 focus:ring-primary-200 hover:bg-primary-800">
                    Tambah Voucher
                </button>
            </form>
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