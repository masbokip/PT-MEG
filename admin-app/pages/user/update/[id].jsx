'use client';
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Swal from "sweetalert2";
import { getSession, useSession } from 'next-auth/react';
import { testURL } from '@/testURL';

export default function UpdateUser() {
  const { data: session } = useSession();
  const router = useRouter();
  const { id } = router.query;
  const [formData, setFormData] = useState({
    nama_depan: "",
    nama_belakang: "",
    email:"",
    no_telp: "",
    jenis_kelamin: "",
    provinsi: "",
    kota: "",
    kecamatan: "",
    kelurahan: "",
    kode_pos: "",
    role: "",
    alamat_lengkap: "",
  });
  
  useEffect(() => {
    if (id) {
      axios
        .get(`${testURL}/api/user/${id}`)
        .then((response) => setFormData(response.data))
        .catch((error) => {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: `Data user tidak ditemukan`,
          });
          console.error("Error fetching user data:", error);
        });
    }
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`${testURL}/api/user/update/${id}`, formData);
      if (response.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "User updated successfully",
        }).then(() => {
          router.push("/user");
        });
      }
    } catch (error) {
      console.error("Error updating user:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to update user",
      });
    }
  };

  return (
    <section className="rounded-lg border border-gray-800 bg-gray-900 p-6 shadow-lg mt-5">
      <h2 className="text-white text-xl font-bold">Update User</h2>
      <form onSubmit={handleSubmit}>
        <div className="grid gap-4 sm:grid-cols-2">
          {/* Form fields */}
          <div>
            <label className=" text-white">Nama Depan</label>
            <input
              type="text"
              name="nama_depan"
              value={formData.nama_depan}
              onChange={handleChange}
              className="w-full p-2 rounded bg-gray-50 text-gray-900"
            />
          </div>
          <div className="w-full">
                  <label htmlFor="namabelakang" className="block mb-2 text-sm font-medium text-white ">Nama Belakang</label>
                  <input 
                  type="text"
                  name="nama_belakang"
                  value={formData.nama_belakang}
                  onChange={handleChange}
                  placeholder="Nama Belakang"
                  autoComplete="family-name" 
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "  />
              </div>
              <div className="w-full">
                  <label htmlFor="nomortelepon" className="block mb-2 text-sm font-medium text-white ">Nomor Telepon</label>
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
                  <label htmlFor="category" className="block mb-2 text-sm font-medium text-white ">Jenis Kelamin</label>
                  <select
                   name="jenis_kelamin"
                   autoComplete="sex"
                   value={formData.jenis_kelamin} 
                   onChange={handleChange}
                    className="bg-gray-50 border border-gray-300 text-black text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 ">
                      <option value="-">Pilih Jenis Kelamin</option>
                        <option value="Laki-laki">Laki-laki</option>
                      <option value="Perempuan">Perempuan</option>
                  </select>
              </div>
              <div className="sm:col-span-2">
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-white "
                >
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email"
                  autoComplete="email"
                  disabled
                  className=" border border-gray-300 bg-gray-700 text-gray-100 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                />
              </div>
              <div className="w-full">
                  <label htmlFor="provinsi" className="block mb-2 text-sm font-medium text-white ">Provinsi</label>
                  <input 
                  type="text"
                  name="provinsi"
                  value={formData.provinsi}
                  onChange={handleChange}
                  placeholder="Provinsi"
                  autoComplete="Provinsi"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "/>
              </div>
              <div className="w-full">
                  <label htmlFor="" className="block mb-2 text-sm font-medium text-white ">Kota/Kabupaten</label>
                  <input 
                  type="text"
                  name="kota"
                  value={formData.kota}
                  onChange={handleChange}
                  placeholder="Kota/Kabupaten"
                  autoComplete="Kota"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "/>
              </div>
              <div className="w-full">
                  <label htmlFor="" className="block mb-2 text-sm font-medium text-white ">Kecamatan</label>
                  <input 
                  type="text"
                  name="kecamatan"
                  value={formData.kecamatan}
                  onChange={handleChange}
                  placeholder="Kecamatan"
                  autoComplete="Kecamatan"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "  />
              </div>
              <div className="w-full">
                  <label htmlFor="" className="block mb-2 text-sm font-medium text-white ">Kelurahan/Desa</label>
                  <input 
                  type="text"
                  name="kelurahan"
                  value={formData.kelurahan}
                  onChange={handleChange}
                  placeholder="Kelurahan/Desa" 
                  autoComplete="Desa"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 " />
              </div>
              
              <div>
                  <label htmlFor="kodepos" className="block mb-2 text-sm font-medium text-white ">Kode Pos </label>
                  <input 
                  type="number"
                  name="kode_pos"
                  value={formData.kode_pos}
                  onChange={handleChange}
                  placeholder="Kode Pos"
                  autoComplete="postal-code" 
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 " />
              </div> 
              <div>
                  <label htmlFor="" className="block mb-2 text-sm font-medium text-white ">Role User</label>
                  <select
                   name="role"
                   value={formData.role} 
                   onChange={handleChange}
                    className="bg-gray-50 border border-gray-300 text-black text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 ">
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
                  className="block p-2.5 w-full text-sm text-black bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 " ></textarea>
              </div>
        </div>
        <button type="submit" className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">
          Update User
        </button>
      </form>
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