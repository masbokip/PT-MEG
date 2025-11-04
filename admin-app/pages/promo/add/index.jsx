import React, { useState} from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import Link from "next/link";
import { FiSearch, FiArrowDown} from 'react-icons/fi';
import { getSession, useSession } from 'next-auth/react';
import { testURL } from '@/testURL';

export default function Index() {
  const { data: session } = useSession();
    const [formData, setFormData] = useState({
        nama_voucher: '',
        kode_voucher: '',
        potongan: '',
        jumlah_voucher: ''
      });
      const [message, setMessage] = useState('');
      const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
      };
    
      const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const response = await axios.post(`${testURL}/api/addvoucher`, formData);
          if (response.status===201) {
           await Swal.fire({
              icon: 'success',
              title: 'Success',
              text: response.data.message,
              confirmButtonText: 'OK',
              confirmButtonColor: "#3085d6"
            }).then(() => {
              window.location.reload();
            });
          };
        } catch (error) {
          alert(error);
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
            <h2 className="mb-4 text-xl font-bold text-white">Tambahkan Voucher Promo</h2>
            <form onSubmit={handleSubmit} method="POST">
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
                        <label htmlFor="kodevoucher" className="block mb-2 text-sm font-medium text-white">Kode Voucher</label>
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
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "/>
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
