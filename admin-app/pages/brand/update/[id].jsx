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
        nama_brand: ''
      });
      
      const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
      };
    
      useEffect(() => {
        if (id) {
          axios.get(`${testURL}/api/brand/${id}`)
            .then(response => setFormData(response.data))
            .catch(error => console.error("Error fetching category data:", error));
        }
      }, [id]);

      const [file, setFile] = useState(null);
      const handleFileChange = (e) => {
        setFile(e.target.files[0]);
      };
    
      const handleSubmit = async (e) => {
        e.preventDefault();
        const formDataObj = new FormData();
        formDataObj.append("nama_brand",formData.nama_brand);
        if (file) {
          formDataObj.append("foto",file)
        }
        try {
          const response = await axios.put(`${testURL}/api/brand/update/${id}`, formDataObj, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });
          if (response.status === 200) {
            Swal.fire({
              icon: "success",
              title: "Success",
              text: "User updated successfully",
            }).then(() => {
              router.push("/brand");
            });
          }
        } catch (error) {
          console.error("Error updating brand:", error);
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "Failed to update brand",
          });
        }
      };

  return (
    <section className="rounded-lg border border-gray-800 bg-gray-900 p-4 shadow-lg mt-5">
  <div className="py-8 px-4 mx-auto  w-full lg:py-2">
      <h2 className="mb-4 text-xl font-bold text-white">Update Brand </h2>
      <form onSubmit={handleSubmit}>
          <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
              <div className="sm:col-span-2">
                  <label  className="block mb-2 text-sm font-medium text-white">Nama Brand</label>
                  <input 
                  type="text"
                  name="nama_brand"
                  value={formData.nama_brand}
                  onChange={handleChange}
                  placeholder="Nama Brand"
                  autoComplete="nama-brand" 
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 " 
                   />
              </div>
              <div className="sm:col-span-2">
            {formData.foto && (
              <img
                src={`${testURL}/assets/images/brand/${formData.foto}`}
                alt="Brand"
                className="w-100 h-auto object-contain"
              />
            )}
            <label className="block mb-2 text-sm font-medium text-white" htmlFor="user_avatar">
              Upload foto
            </label>
            <input
              className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50"
              id="user_avatar"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
            />
          </div>
          </div>
          <button type="submit" className="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-blue-600 rounded-lg focus:ring-4 focus:ring-primary-200 hover:bg-primary-800">
              Add Brand
          </button>
      </form>
  </div>
</section>
  )
}
export async function getServerSideProps(ctx) {
  const session = await getSession(ctx);
  if (!session || !session.user) {
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
