'use client'
import React, { useState} from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { getSession, useSession } from 'next-auth/react';
import { testURL } from '@/testURL';

export default function AddUser() {
  const { data: session } = useSession();
    const [formData, setFormData] = useState({
        nama_depan: '',
        nama_belakang: '',
        email: '',
        password: '',
        kpassword: '',
        jenis_kelamin: '',
        no_telp: '',
        provinsi: '',
        kota: '',
        kecamatan: '',
        kelurahan: '',
        kode_pos: '',
        role:'',
        alamat_lengkap: '',
      });
      const [message, setMessage] = useState('');
      const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
      };
    
      const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.password !== formData.kpassword) {
          Swal.fire({
            icon: "error",
            title: "error",
            text: "Password tidak sama",
          })
        }
        try {
          const response = await axios.post(`${testURL}/api/registeradmin`, formData);
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
          Swal.fire({
            icon: "error",
            title: "error",
            text: `${error.response?.data?.message}`,
          })
          console.error("Error:", error.response?.data || error.message);
        }
      };
  return (
    <section className="rounded-lg border border-gray-800 bg-gray-900 p-6 shadow-lg mt-5">
  <div className="py-8 px-4 mx-auto  w-full lg:py-16">
      <h2 className="mb-4 text-xl font-bold text-white">Tambah User Baru</h2>
      <form action="#"onSubmit={handleSubmit} method="POST">
          <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
            <div className="w-full">
                  <label htmlFor="namadepan" className="block mb-2 text-sm font-medium text-white">Nama Depan</label>
                  <input 
                  type="text"
                  name="nama_depan"
                  value={formData.nama_depan}
                  onChange={handleChange}
                  placeholder="Nama Depan"
                  autoComplete="given-name"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"/>
              </div>
              <div className="w-full">
                  <label htmlFor="namabelakang" className="block mb-2 text-sm font-medium text-white">Nama Belakang</label>
                  <input 
                  type="text"
                  name="nama_belakang"
                  value={formData.nama_belakang}
                  onChange={handleChange}
                  placeholder="Nama Belakang"
                  autoComplete="family-name" 
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"  />
              </div>
              <div className="w-full">
                  <label htmlFor="nomortelepon" className="block mb-2 text-sm font-medium text-white">Nomor Telepon</label>
                  <input
                  type="text"
                  name="no_telp"
                  value={formData.no_telp}
                  onChange={handleChange}
                  placeholder="Nomor Telepon"
                  autoComplete="tel"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"  />
              </div>
              <div>
                  <label htmlFor="category" className="block mb-2 text-sm font-medium text-white">Jenis Kelamin</label>
                  <select
                   name="jenis_kelamin"
                   autoComplete="sex"
                   value={formData.jenis_kelamin} 
                   onChange={handleChange}
                    className="bg-gray-50 border border-gray-300 text-black text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5">
                      <option value="-">Pilih Jenis Kelamin</option>
                        <option value="Laki-laki">Laki-laki</option>
                      <option value="Perempuan">Perempuan</option>
                  </select>
              </div>
              <div className="sm:col-span-2">
                  <label htmlFor="email" className="block mb-2 text-sm font-medium text-white">Email</label>
                  <input 
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email"
                  autoComplete="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"/>
              </div>
              <div className="w-full">
                  <label htmlFor="password" className="block mb-2 text-sm font-medium text-white">Password</label>
                  <input 
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Password"
                  autoComplete="current-password"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"/>
              </div>
              <div className="w-full">
                  <label htmlFor="password" className="block mb-2 text-sm font-medium text-white">Konfirmasi Password</label>
                  <input 
                 type="password"
                 name="kpassword"
                 value={formData.kpassword}
                 onChange={handleChange}
                 placeholder="Konfirmasi Password"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"/>
              </div>
              <div className="w-full">
                  <label htmlFor="provinsi" className="block mb-2 text-sm font-medium text-white">Provinsi</label>
                  <input 
                  type="text"
                  name="provinsi"
                  value={formData.provinsi}
                  onChange={handleChange}
                  placeholder="Provinsi"
                  autoComplete="Provinsi"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"/>
              </div>
              <div className="w-full">
                  <label htmlFor="" className="block mb-2 text-sm font-medium text-white">Kota/Kabupaten</label>
                  <input 
                  type="text"
                  name="kota"
                  value={formData.kota}
                  onChange={handleChange}
                  placeholder="Kota/Kabupaten"
                  autoComplete="Kota"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"/>
              </div>
              <div className="w-full">
                  <label htmlFor="" className="block mb-2 text-sm font-medium text-white">Kecamatan</label>
                  <input 
                  type="text"
                  name="kecamatan"
                  value={formData.kecamatan}
                  onChange={handleChange}
                  placeholder="Kecamatan"
                  autoComplete="Kecamatan"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"  />
              </div>
              <div className="w-full">
                  <label htmlFor="" className="block mb-2 text-sm font-medium text-white">Kelurahan/Desa</label>
                  <input 
                  type="text"
                  name="kelurahan"
                  value={formData.kelurahan}
                  onChange={handleChange}
                  placeholder="Kelurahan/Desa" 
                  autoComplete="Desa"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" />
              </div>
              <div>
                  <label htmlFor="kodepos" className="block mb-2 text-sm font-medium text-white">Kode Pos </label>
                  <input 
                  type="number"
                  name="kode_pos"
                  value={formData.kode_pos}
                  onChange={handleChange}
                  placeholder="Kode Pos"
                  autoComplete="postal-code" 
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" />
              </div> 
              <div>
                  <label htmlFor="" className="block mb-2 text-sm font-medium text-white">Role User</label>
                  <select
                   name="role"
                   value={formData.role} 
                   onChange={handleChange}
                    className="bg-gray-50 border border-gray-300 text-black text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5">
                       <option value="-">Pilih Role User</option>
                      <option value="Customer">Customer</option>
                      <option value="Pegawai">Pegawai</option>
                      <option value="Admin">Admin</option>
                  </select>
              </div>
              <div className="sm:col-span-2">
                  <label htmlFor="alamat_lengkap" className="block mb-2 text-sm font-medium text-white">Alamat Lengkap</label>
                  <textarea 
                  type="text"
                  name="alamat_lengkap"
                  value={formData.alamat_lengkap}
                  onChange={handleChange}
                  placeholder="Alamat Lengkap"
                  rows="8" 
                  className="block p-2.5 w-full text-sm text-black bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500" ></textarea>
              </div>
         </div>
          <button type="submit" className="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-blue-400 rounded-lg focus:ring-4 focus:ring-primary-200 hover:bg-primary-800">
              Add User
          </button>
          
      </form>
      
  </div>
</section>
  )
}
