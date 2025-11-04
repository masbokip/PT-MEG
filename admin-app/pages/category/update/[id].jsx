'use client'
import React, { useState, useEffect } from 'react';
import { useRouter } from "next/router";
import axios from 'axios';
import Swal from 'sweetalert2';
import { getSession, useSession } from 'next-auth/react';
import { testURL } from '@/testURL';

export default function Index() {
  const { data: session } = useSession();
  const router = useRouter();
  const { id } = router.query;
    const [formData, setFormData] = useState({
        nama_kategori: '',
        foto: '',
      });
      const [file, setFile] = useState(null);
    
      const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
      };
    
      useEffect(() => {
        if (id) {
          axios.get(`${testURL}/api/category/${id}`)
            .then(response => setFormData(response.data))
            .catch(error => console.error("Error fetching category data:", error));
        }
      }, [id]);
      const handleFileChange = (e) => {
        setFile(e.target.files[0]);
      };
      const handleSubmit = async (e) => {
        e.preventDefault();
       
        const formDataObj = new FormData();
        formDataObj.append("nama_kategori", formData.nama_kategori);
        if (file) {
          formDataObj.append("foto", file); 
        }
      
        try {
          const response = await axios.put(`${testURL}/api/category/update/${id}`, formDataObj, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });
      
          if (response.status === 200) {
            Swal.fire({
              icon: "success",
              title: "Success",
              text: "Kategori berhasil diperbarui",
            }).then(() => {
              router.push("/category");
            });
          }
        } catch (error) {
          console.error("Error updating kategori:", error);
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "Gagal memperbarui kategori",
          });
        }
      };
    
  return (
    <section className="rounded-lg border border-gray-800 bg-gray-900 p-6 shadow-lg mt-1">
    <div className="py-8 px-4 mx-auto  w-full lg:py-2">
      <h2 className="mb-4 text-xl font-bold text-white">Tambah Kategori Baru</h2>
      <form onSubmit={handleSubmit} method="POST">
        <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
          <div className="sm:col-span-2">
            <label
              htmlFor="namakategori"
              className="block mb-2 text-sm font-medium text-white"
            >
              Nama Kategori
            </label>
            <input
              type="text"
              name="nama_kategori"
              value={formData.nama_kategori}
              onChange={handleChange}
              placeholder="Nama Kategori"
              autoComplete="nama-kategori"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
            />
          </div>
          <div className="sm:col-span-2">
            {formData.foto && (
              <img
                src={`${testURL}/assets/images/category/${formData.foto}`}
                alt="Kategori"
                className="w-32 h-32 object-cover mb-4"
              />
            )}
            <label className="block mb-2 text-sm font-medium text-white" htmlFor="user_avatar">
              Upload foto
            </label>
            <input
              className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
              id="user_avatar"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
            />
          </div>
        </div>
        <button
          type="submit"
          className="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-blue-600 rounded-lg focus:ring-4 focus:ring-primary-200 hover:bg-primary-800"
        >
          Update kategori
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