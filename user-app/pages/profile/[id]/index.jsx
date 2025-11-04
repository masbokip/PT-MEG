'use client';
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Swal from "sweetalert2";
import { getSession, useSession } from 'next-auth/react';
import { testURL } from '@/testURL';

export default function Index() {
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
          router.push("/home");
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
    <section class="relative pt-36 pb-24">
    <div class="w-full max-w-7xl mx-auto px-7 md:px-8">
    <form onSubmit={handleSubmit}>
        <div class="flex items-center justify-center gap-5">
        <div class="w-full max-w-7xl px-4 md:px-5 lg:px-5 mx-auto">
            <div class="w-full flex-col justify-start items-start lg:gap-14 md:gap-10 gap-8 inline-flex">
                <div class="w-full flex-col justify-start items-start gap-6 flex">
                    <h4 class="text-gray-900 text-xl font-semibold leading-loose">My Profile</h4>
                    <div class="w-full flex-col justify-start items-start gap-8 flex">
                        <div class="w-full justify-start items-start gap-8 flex sm:flex-row flex-col">
                            <div class="w-full flex-col justify-start items-start gap-1.5 flex">
                                <label for="" class="flex gap-1 items-center text-gray-600 text-base font-medium leading-relaxed">Nama Depan
                                    <svg xmlns="http://www.w3.org/2000/svg" width="7" height="7" viewBox="0 0 7 7" fill="none">
                                        <path d="M3.11222 6.04545L3.20668 3.94744L1.43679 5.08594L0.894886 4.14134L2.77415 3.18182L0.894886 2.2223L1.43679 1.2777L3.20668 2.41619L3.11222 0.318182H4.19105L4.09659 2.41619L5.86648 1.2777L6.40838 2.2223L4.52912 3.18182L6.40838 4.14134L5.86648 5.08594L4.09659 3.94744L4.19105 6.04545H3.11222Z" fill="#EF4444"/>
                                    </svg>
                                </label>
                                <input 
                                class="w-full focus:outline-none text-gray-900 placeholder-gray-400 text-lg font-normal leading-relaxed px-5 py-3 rounded-lg shadow-[0px_1px_2px_0px_rgba(16,_24,_40,_0.05)] border border-gray-200 justify-start items-center gap-2 inline-flex" 
                                type="text"
                                name="nama_depan"
                                value={formData.nama_depan}
                                onChange={handleChange}
                                />
                            </div>
                            <div class="w-full flex-col justify-start items-start gap-1.5 flex">
                                <label for="" class="flex gap-1 items-center text-gray-600 text-base font-medium leading-relaxed">Nama Belakang
                                    <svg xmlns="http://www.w3.org/2000/svg" width="7" height="7" viewBox="0 0 7 7" fill="none">
                                        <path d="M3.11222 6.04545L3.20668 3.94744L1.43679 5.08594L0.894886 4.14134L2.77415 3.18182L0.894886 2.2223L1.43679 1.2777L3.20668 2.41619L3.11222 0.318182H4.19105L4.09659 2.41619L5.86648 1.2777L6.40838 2.2223L4.52912 3.18182L6.40838 4.14134L5.86648 5.08594L4.09659 3.94744L4.19105 6.04545H3.11222Z" fill="#EF4444"/>
                                    </svg>
                                </label>
                                <input 
                                class="w-full focus:outline-none text-gray-900 placeholder-gray-400 text-lg font-normal leading-relaxed px-5 py-3 rounded-lg shadow-[0px_1px_2px_0px_rgba(16,_24,_40,_0.05)] border border-gray-200 justify-start items-center gap-2 inline-flex"
                                type="text"
                                name="nama_belakang"
                                value={formData.nama_belakang}
                                onChange={handleChange}
                                placeholder="Nama Belakang"
                                autoComplete="family-name" />
                            </div>
                        </div>
                        <div class="w-full justify-start items-start gap-8 flex sm:flex-row flex-col">
                            <div class="w-full flex-col justify-start items-start gap-1.5 flex">
                                <label for="" class="flex gap-1 items-center text-gray-600 text-base font-medium leading-relaxed">Nomor Telepon
                                    <svg xmlns="http://www.w3.org/2000/svg" width="7" height="7" viewBox="0 0 7 7" fill="none">
                                        <path d="M3.11222 6.04545L3.20668 3.94744L1.43679 5.08594L0.894886 4.14134L2.77415 3.18182L0.894886 2.2223L1.43679 1.2777L3.20668 2.41619L3.11222 0.318182H4.19105L4.09659 2.41619L5.86648 1.2777L6.40838 2.2223L4.52912 3.18182L6.40838 4.14134L5.86648 5.08594L4.09659 3.94744L4.19105 6.04545H3.11222Z" fill="#EF4444"/>
                                    </svg>
                                </label>
                                <input type="text" 
                                class="w-full focus:outline-none text-gray-900 placeholder-gray-400 text-lg font-normal leading-relaxed px-5 py-3 rounded-lg shadow-[0px_1px_2px_0px_rgba(16,_24,_40,_0.05)] border border-gray-200 justify-start items-center gap-2 inline-flex" 
                                name="no_telp"
                                value={formData.no_telp}
                                onChange={handleChange}
                                placeholder="Nomor Telepon"
                                autoComplete="tel"/>
                            </div>
                            <div class="w-full flex-col justify-start items-start gap-1.5 flex">
                                <label for="" class="flex gap-1 items-center text-gray-600 text-base font-medium leading-relaxed">Email
                                    <svg xmlns="http://www.w3.org/2000/svg" width="7" height="7" viewBox="0 0 7 7" fill="none">
                                        <path d="M3.11222 6.04545L3.20668 3.94744L1.43679 5.08594L0.894886 4.14134L2.77415 3.18182L0.894886 2.2223L1.43679 1.2777L3.20668 2.41619L3.11222 0.318182H4.19105L4.09659 2.41619L5.86648 1.2777L6.40838 2.2223L4.52912 3.18182L6.40838 4.14134L5.86648 5.08594L4.09659 3.94744L4.19105 6.04545H3.11222Z" fill="#EF4444"/>
                                    </svg>
                                </label>
                                <input 
                                class="w-full focus:outline-none text-gray-900 placeholder-gray-400 text-lg font-normal leading-relaxed px-5 py-3 rounded-lg shadow-[0px_1px_2px_0px_rgba(16,_24,_40,_0.05)] border border-gray-200 justify-start items-center gap-2 inline-flex" 
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Email"
                                autoComplete="email"
                                disabled/>
                            </div>
                        </div>
                        <div class="w-full justify-start items-start gap-8 flex sm:flex-row flex-col">
                            <div class="w-full flex-col justify-start items-start gap-1.5 flex">
                                <label for="" class="flex gap-1 items-center text-gray-600 text-base font-medium leading-relaxed">Jenis Kelamin
                                    <svg xmlns="http://www.w3.org/2000/svg" width="7" height="7" viewBox="0 0 7 7" fill="none">
                                        <path d="M3.11222 6.04545L3.20668 3.94744L1.43679 5.08594L0.894886 4.14134L2.77415 3.18182L0.894886 2.2223L1.43679 1.2777L3.20668 2.41619L3.11222 0.318182H4.19105L4.09659 2.41619L5.86648 1.2777L6.40838 2.2223L4.52912 3.18182L6.40838 4.14134L5.86648 5.08594L4.09659 3.94744L4.19105 6.04545H3.11222Z" fill="#EF4444"/>
                                    </svg>
                                </label>
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
                            <div class="w-full flex-col justify-start items-start gap-1.5 flex">
                                <label for="" class="flex gap-1 items-center text-gray-600 text-base font-medium leading-relaxed">Provinsi
                                    <svg xmlns="http://www.w3.org/2000/svg" width="7" height="7" viewBox="0 0 7 7" fill="none">
                                        <path d="M3.11222 6.04545L3.20668 3.94744L1.43679 5.08594L0.894886 4.14134L2.77415 3.18182L0.894886 2.2223L1.43679 1.2777L3.20668 2.41619L3.11222 0.318182H4.19105L4.09659 2.41619L5.86648 1.2777L6.40838 2.2223L4.52912 3.18182L6.40838 4.14134L5.86648 5.08594L4.09659 3.94744L4.19105 6.04545H3.11222Z" fill="#EF4444"/>
                                    </svg>
                                </label>
                                <input 
                                class="w-full focus:outline-none text-gray-900 placeholder-gray-400 text-lg font-normal leading-relaxed px-5 py-3 rounded-lg shadow-[0px_1px_2px_0px_rgba(16,_24,_40,_0.05)] border border-gray-200 justify-start items-center gap-2 inline-flex" 
                                type="text"
                                name="provinsi"
                                value={formData.provinsi}
                                onChange={handleChange}
                                placeholder="Provinsi"
                                autoComplete="Provinsi"/>
                            </div>
                        </div>
                        <div class="w-full justify-start items-start gap-8 flex sm:flex-row flex-col">
                            <div class="w-full flex-col justify-start items-start gap-1.5 flex">
                                <label for="" class="flex gap-1 items-center text-gray-600 text-base font-medium leading-relaxed">Kota/Kabupaten
                                    <svg xmlns="http://www.w3.org/2000/svg" width="7" height="7" viewBox="0 0 7 7" fill="none">
                                        <path d="M3.11222 6.04545L3.20668 3.94744L1.43679 5.08594L0.894886 4.14134L2.77415 3.18182L0.894886 2.2223L1.43679 1.2777L3.20668 2.41619L3.11222 0.318182H4.19105L4.09659 2.41619L5.86648 1.2777L6.40838 2.2223L4.52912 3.18182L6.40838 4.14134L5.86648 5.08594L4.09659 3.94744L4.19105 6.04545H3.11222Z" fill="#EF4444"/>
                                    </svg>
                                </label>
                                <input
                                class="w-full focus:outline-none text-gray-900 placeholder-gray-400 text-lg font-normal leading-relaxed px-5 py-3 rounded-lg shadow-[0px_1px_2px_0px_rgba(16,_24,_40,_0.05)] border border-gray-200 justify-start items-center gap-2 inline-flex" 
                                type="text"
                                name="kota"
                                value={formData.kota}
                                onChange={handleChange}
                                placeholder="Kota/Kabupaten"
                                autoComplete="Kota"/>
                            </div>
                            <div class="w-full flex-col justify-start items-start gap-1.5 flex">
                                <label for="" class="flex gap-1 items-center text-gray-600 text-base font-medium leading-relaxed">Kecamatan
                                    <svg xmlns="http://www.w3.org/2000/svg" width="7" height="7" viewBox="0 0 7 7" fill="none">
                                        <path d="M3.11222 6.04545L3.20668 3.94744L1.43679 5.08594L0.894886 4.14134L2.77415 3.18182L0.894886 2.2223L1.43679 1.2777L3.20668 2.41619L3.11222 0.318182H4.19105L4.09659 2.41619L5.86648 1.2777L6.40838 2.2223L4.52912 3.18182L6.40838 4.14134L5.86648 5.08594L4.09659 3.94744L4.19105 6.04545H3.11222Z" fill="#EF4444"/>
                                    </svg>
                                </label>
                                <input
                                class="w-full focus:outline-none text-gray-900 placeholder-gray-400 text-lg font-normal leading-relaxed px-5 py-3 rounded-lg shadow-[0px_1px_2px_0px_rgba(16,_24,_40,_0.05)] border border-gray-200 justify-start items-center gap-2 inline-flex" 
                                type="text"
                                name="kecamatan"
                                value={formData.kecamatan}
                                onChange={handleChange}
                                placeholder="Kecamatan"
                                autoComplete="Kecamatan"/>
                            </div>
                        </div>
                        <div class="w-full justify-start items-start gap-8 flex sm:flex-row flex-col">
                            <div class="w-full flex-col justify-start items-start gap-1.5 flex">
                                <label for="" class="flex gap-1 items-center text-gray-600 text-base font-medium leading-relaxed">Kelurahan
                                    <svg xmlns="http://www.w3.org/2000/svg" width="7" height="7" viewBox="0 0 7 7" fill="none">
                                        <path d="M3.11222 6.04545L3.20668 3.94744L1.43679 5.08594L0.894886 4.14134L2.77415 3.18182L0.894886 2.2223L1.43679 1.2777L3.20668 2.41619L3.11222 0.318182H4.19105L4.09659 2.41619L5.86648 1.2777L6.40838 2.2223L4.52912 3.18182L6.40838 4.14134L5.86648 5.08594L4.09659 3.94744L4.19105 6.04545H3.11222Z" fill="#EF4444"/>
                                    </svg>
                                </label>
                                <input 
                                class="w-full focus:outline-none text-gray-900 placeholder-gray-400 text-lg font-normal leading-relaxed px-5 py-3 rounded-lg shadow-[0px_1px_2px_0px_rgba(16,_24,_40,_0.05)] border border-gray-200 justify-start items-center gap-2 inline-flex" 
                                type="text"
                                name="kelurahan"
                                value={formData.kelurahan}
                                onChange={handleChange}
                                placeholder="Kelurahan/Desa" 
                                autoComplete="Desa"/>
                            </div>
                            <div class="w-full flex-col justify-start items-start gap-1.5 flex">
                                <label for="" class="flex gap-1 items-center text-gray-600 text-base font-medium leading-relaxed">Kode Pos
                                    <svg xmlns="http://www.w3.org/2000/svg" width="7" height="7" viewBox="0 0 7 7" fill="none">
                                        <path d="M3.11222 6.04545L3.20668 3.94744L1.43679 5.08594L0.894886 4.14134L2.77415 3.18182L0.894886 2.2223L1.43679 1.2777L3.20668 2.41619L3.11222 0.318182H4.19105L4.09659 2.41619L5.86648 1.2777L6.40838 2.2223L4.52912 3.18182L6.40838 4.14134L5.86648 5.08594L4.09659 3.94744L4.19105 6.04545H3.11222Z" fill="#EF4444"/>
                                    </svg>
                                </label>
                                <input 
                                type="number"
                                name="kode_pos"
                                value={formData.kode_pos}
                                onChange={handleChange}
                                placeholder="Kode Pos"
                                autoComplete="postal-code" 
                                class="w-full focus:outline-none text-gray-900 placeholder-gray-400 text-lg font-normal leading-relaxed px-5 py-3 rounded-lg shadow-[0px_1px_2px_0px_rgba(16,_24,_40,_0.05)] border border-gray-200 justify-start items-center gap-2 inline-flex" 
                               />
                            </div>
                        </div>
                        <div class="w-full justify-start items-start gap-8 flex sm:flex-row flex-col">
                            <div class="w-full flex-col justify-start items-start gap-1.5 flex">
                                <label for="" class="flex gap-1 items-center text-gray-600 text-base font-medium leading-relaxed">Alamat Lengkap
                                    <svg xmlns="http://www.w3.org/2000/svg" width="7" height="7" viewBox="0 0 7 7" fill="none">
                                        <path d="M3.11222 6.04545L3.20668 3.94744L1.43679 5.08594L0.894886 4.14134L2.77415 3.18182L0.894886 2.2223L1.43679 1.2777L3.20668 2.41619L3.11222 0.318182H4.19105L4.09659 2.41619L5.86648 1.2777L6.40838 2.2223L4.52912 3.18182L6.40838 4.14134L5.86648 5.08594L4.09659 3.94744L4.19105 6.04545H3.11222Z" fill="#EF4444"/>
                                    </svg>
                                </label>
                                <textarea 
                                type="text"
                                name="alamat_lengkap"
                                value={formData.alamat_lengkap}
                                onChange={handleChange}
                                placeholder="Alamat Lengkap"
                                rows="8" 
                                class="w-full focus:outline-none text-gray-900 placeholder-gray-400 text-lg font-normal leading-relaxed px-5 py-3 rounded-lg shadow-[0px_1px_2px_0px_rgba(16,_24,_40,_0.05)] border border-gray-200 justify-start items-center gap-2 inline-flex" 
                                 >
                                    </textarea>
                            </div>
                            
                        </div>
                    </div>
                </div>
                <button type="submit" class="mx-auto sm:w-fit w-full px-9 py-3 bg-indigo-600 hover:bg-indigo-700 ease-in-out transition-all duration-700 rounded-xl shadow justify-center items-center flex">
                    <span class="px-3.5 text-center text-white text-lg font-semibold leading-8">Update Data</span>
                </button>
            </div>
        </div>   
    </div>
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
