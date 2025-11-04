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
          router.push("/user");
        });
      }
    } catch (error) {
    //   console.error("Error updating user:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to update user",
      });
    }
  };

  return (
    <section className="rounded-lg border border-gray-800 bg-gray-900 p-6 shadow-lg mt-5">
      <h2 className="text-white text-xl font-bold">Ganti Password</h2>
      <form onSubmit={handleSubmit}>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className=" text-white">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-2 rounded bg-gray-50 text-gray-900"
            />
          </div>
          <div className="w-full">
                  <label htmlFor="namabelakang" className="block mb-2 text-sm font-medium text-white">Konfirmasi Password</label>
                  <input 
                  type="password"
                  name="kpassword"
                  value={formData.kpassword}
                  onChange={handleChange}
                  placeholder="Konfirmasi Password"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"  />
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