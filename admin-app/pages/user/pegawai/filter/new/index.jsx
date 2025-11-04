'use client';
import React  ,{ useEffect, useState } from "react";
import { HiMiniTrash, HiMiniPencilSquare,HiLockClosed } from "react-icons/hi2";
import { format } from "date-fns";
import Link from "next/link";
import { FiSearch,FiArrowUp} from 'react-icons/fi';
import { useRouter } from "next/router";
import axios from "axios";
import { getSession, useSession } from 'next-auth/react';
import { testURL } from '@/testURL';

export default function Page() {
    const { data: session } = useSession();
    const [userData, setUserData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;
    const [searchQuery, setSearchQuery] = useState("");
    const router = useRouter();

    const handleEdit = (userId) => {
      router.push(`/user/update/${userId}`);
    };
    const handlePW = (userId) => {
      router.push(`/user/update/password/${userId}`);
    };

    const fetchData = async (query = "") => {
      try {
        const response = await axios.get(`${testURL}/api/usersPGWnew`, {
          params: { search: query },
        });
        setUserData(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching users data:", error);
        setLoading(false);
      }
    };
    useEffect(() => {
      fetchData();
    }, []);
    

    const handleDelete = async (id) => {
      if (window.confirm("Are you sure you want to delete this user?")) {
        try {
          await axios.delete(`${testURL}/api/user/${id}`);
          setUserData((prevData) => prevData.filter((user) => user.id_user !== id));
          alert("User deleted successfully");
        } catch (error) {
          console.error("Error deleting user:", error);
          alert("Failed to delete user");
        }
      }
    };

    const handleSearch = (e) => {
      const query = e.target.value;
      setSearchQuery(query);
      fetchData(query); 
    };

  if (loading) {
    return <p className="text-white">Loading...</p>;
  }


  const totalPages = Math.ceil(userData.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = userData.slice(indexOfFirstItem, indexOfLastItem);

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  return (
    <>
     <nav className="rounded-lg border border-gray-800 bg-gray-900 p-4 shadow-lg mt-5">
      <div className="container mx-auto flex justify-between items-center">
      <div className="flex items-center space-x-4">
        <div className="flex items-center bg-gray-800 rounded-lg p-2 ml-4">
          <FiSearch className="text-gray-400" />
          <input
            type="text"
            placeholder="Type to search..."
            className="bg-transparent text-sm text-gray-400 focus:outline-none ml-2"
            value={searchQuery}
            onChange={handleSearch}
          />
        </div>
      </div>
        <ul className="flex space-x-4 mx-6">
          <li>
            <Link href="/user">
              <p className="hover:text-green-400">Semua User</p>
            </Link>
          </li>
          <li>
            <Link href="/user/customer">
              <p className="text-green-400">Pegawai</p>
            </Link>
          </li>
          <li>
            <Link href="/user/pegawai/filter/az">
            <p className="hover:text-green-400">Rilis</p>
            </Link>
          </li>
          <li>
            <Link href="/user/pegawai/filter/old">
            <p className="flex items-center text-green-400">
              Terbaru <FiArrowUp className="ml-1" />
             </p>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
    <div className="rounded-lg border border-gray-800 bg-gray-900 p-6 shadow-lg mt-5">
      <h4 className="mb-6 text-lg font-semibold text-white">Daftar User</h4>

      <div className="flex flex-col">
        {/* Header Row */}
        <div className="grid grid-cols-4 sm:grid-cols-6 bg-gray-800 p-4 text-sm font-semibold text-gray-400">
        <div className="text-left">No</div>
          <div className="text-left ">Id User</div>
          <div className="text-center ">Nama User</div>
          <div className="text-center ">Role</div>
          <div className="text-center">Create At</div>
          <div className="text-center ">Action</div>
        </div>

        {/* Data Rows */}
        {currentItems.map((user, index) => (
          <div
            key={user.id_user}
            className="grid grid-cols-4 items-center border-b border-gray-800 p-8 sm:grid-cols-6"
          >
            <div className="text-left text-sm font-medium text-gray-300">{index + 1}</div>
            <div className="text-left text-sm font-medium text-gray-300">{user.id_user}</div>
            <div className="text-center text-sm font-medium text-gray-300">{user.nama_depan + " " + user.nama_belakang}</div>
            <div className="text-center text-sm font-medium text-gray-300">{user.role}</div>
            <div className="text-center text-sm font-medium text-gray-300">{format(new Date(user.created_at), "dd/MM/yyyy")}</div>
            <div className="hidden sm:flex items-center justify-center text-center text-sm font-medium text-white space-x-1">
              <HiMiniPencilSquare
              className="cursor-pointer"
              onClick={() => handleEdit(user.id_user)} // Pass the user ID to handleEdit
              />
              <HiLockClosed
              className="cursor-pointer"
              onClick={() => handlePW(user.id_user)}
              />
              <HiMiniTrash
                className="cursor-pointer text-red-500"
                onClick={() => handleDelete(user.id_user)}
              />
            </div>
          </div>
        ))}
        <div className="flex justify-between items-center mt-4">
          <button
            className="px-4 py-2 text-sm text-white bg-gray-800 rounded-lg hover:bg-gray-700"
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <p className="text-sm text-white">
            Page {currentPage} of {totalPages}
          </p>
          <button
            className="px-4 py-2 text-sm text-white bg-gray-800 rounded-lg hover:bg-gray-700"
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </div>
    </>
   
  )
};
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
