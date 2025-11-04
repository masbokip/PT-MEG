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
    password: "",
    kpassword: "",
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
      const response = await axios.put(`${testURL}/api/user/update/password/${id}`, formData);
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
                    <h4 class="text-gray-900 text-xl font-semibold leading-loose">Ubah Password</h4>
                    <div class="w-full flex-col justify-start items-start gap-8 flex">
                        <div class="w-full justify-start items-start gap-8 flex sm:flex-row flex-col">
                            <div class="w-full flex-col justify-start items-start gap-1.5 flex">
                                <label for="" class="flex gap-1 items-center text-gray-600 text-base font-medium leading-relaxed">Password
                                    <svg xmlns="http://www.w3.org/2000/svg" width="7" height="7" viewBox="0 0 7 7" fill="none">
                                        <path d="M3.11222 6.04545L3.20668 3.94744L1.43679 5.08594L0.894886 4.14134L2.77415 3.18182L0.894886 2.2223L1.43679 1.2777L3.20668 2.41619L3.11222 0.318182H4.19105L4.09659 2.41619L5.86648 1.2777L6.40838 2.2223L4.52912 3.18182L6.40838 4.14134L5.86648 5.08594L4.09659 3.94744L4.19105 6.04545H3.11222Z" fill="#EF4444"/>
                                    </svg>
                                </label>
                                <input 
                                class="w-full focus:outline-none text-gray-900 placeholder-gray-400 text-lg font-normal leading-relaxed px-5 py-3 rounded-lg shadow-[0px_1px_2px_0px_rgba(16,_24,_40,_0.05)] border border-gray-200 justify-start items-center gap-2 inline-flex" 
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                />
                            </div>
                            <div class="w-full flex-col justify-start items-start gap-1.5 flex">
                                <label for="" class="flex gap-1 items-center text-gray-600 text-base font-medium leading-relaxed">Konfirmasi password
                                    <svg xmlns="http://www.w3.org/2000/svg" width="7" height="7" viewBox="0 0 7 7" fill="none">
                                        <path d="M3.11222 6.04545L3.20668 3.94744L1.43679 5.08594L0.894886 4.14134L2.77415 3.18182L0.894886 2.2223L1.43679 1.2777L3.20668 2.41619L3.11222 0.318182H4.19105L4.09659 2.41619L5.86648 1.2777L6.40838 2.2223L4.52912 3.18182L6.40838 4.14134L5.86648 5.08594L4.09659 3.94744L4.19105 6.04545H3.11222Z" fill="#EF4444"/>
                                    </svg>
                                </label>
                                <input 
                                class="w-full focus:outline-none text-gray-900 placeholder-gray-400 text-lg font-normal leading-relaxed px-5 py-3 rounded-lg shadow-[0px_1px_2px_0px_rgba(16,_24,_40,_0.05)] border border-gray-200 justify-start items-center gap-2 inline-flex"
                                type="password"
                                name="kpassword"
                                value={formData.kpassword}
                                onChange={handleChange}
                                placeholder="Konfirmasi Password" />
                            </div>
                        </div>
                    </div>
                </div>
                <button type="submit" class="mx-auto sm:w-fit w-full px-9 py-3 bg-indigo-600 hover:bg-indigo-700 ease-in-out transition-all duration-700 rounded-xl shadow justify-center items-center flex">
                    <span class="px-3.5 text-center text-white text-lg font-semibold leading-8">Ubah Password </span>
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
