import React, { useEffect, useState } from "react";
import { getSession, useSession } from 'next-auth/react';
import axios from 'axios';
import Link from "next/link";
import { format } from "date-fns";
import Swal from "sweetalert2";
import { useRouter } from "next/router";
import { testURL } from '@/testURL';

export default function Index() {
  const { data: session } = useSession();
  const [orderData, setOrderData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const itemsPerPage = 10;
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();
  useEffect(() => {
    const fetchDataOrder = async () => {
      try {
        if (session?.user?.id_user) {
          const response = await axios.get(`${testURL}/api/daftarbelicust?id=${session.user.id_user}`);
          setOrderData(response.data);
        }
      } catch (error) {
        console.error("Data order tidak ada", error);
      } finally {
        setLoading(false);
      }
    };
    if (session) {
      fetchDataOrder();
    }
  }, [session]);

  const cancelOrder = async (idBeli) => {
    try {
      const response = await axios.post(`${testURL}/api/cancel-status`, {
        id_beli: idBeli,
      });
      if (response.status === 200) {
        Swal.fire({
          title: "Berhasil!",
          text: "Pesanan telah dibatalkan.",
          icon: "success",
          confirmButtonText: "OK",
        });
        router.reload();
      } else {
        Swal.fire({
          title: "Gagal!",
          text: "Gagal membatalkan pesanan.",
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    } catch (error) {
      console.error("Error saat membatalkan pesanan:", error);
      Swal.fire({
        title: "Error!",
        text: "Terjadi kesalahan saat membatalkan pesanan.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
    }).format(value);
  };

  const handleView = (beliId)=>{
    router.push(`/order/${beliId}`);
  };

  const totalPages = Math.ceil(orderData.length / itemsPerPage);
  const currentData = orderData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <section className="bg-white py-8 antialiased md:py-16">
    <nav className="bg-white text-gray-800 py-8 shadow-lg">
      <div className="container mx-auto flex flex-col items-center lg:flex-row lg:justify-between px-4">
        <button
          className="block lg:hidden p-2 text-gray-700 hover:bg-gray-100 rounded mb-4 lg:mb-0"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          ☰
        </button>

        <ul
          className={`lg:flex lg:space-x-4 ${
            isMenuOpen ? "block" : "hidden"
          } text-center`}
        >
          <li>
            <Link href="/order">
              <p className="text-blue-900">Semua Pesanan</p>
            </Link>
          </li>
          <li>
            <Link href="/order/masuk">
              <p className="hover:text-blue-900">Masuk</p>
            </Link>
          </li>
          <li>
            <Link href="/order/bayar">
              <p className="hover:text-blue-900">Terbayar</p>
            </Link>
          </li>
          <li>
            <Link href="/order/dikirim">
              <p className="hover:text-blue-900">Dikirim</p>
            </Link>
          </li>
          <li>
            <Link href="/order/batal">
              <p className="hover:text-blue-900">Dibatalkan</p>
            </Link>
          </li>
          <li>
            <Link href="/order/selesai">
              <p className="hover:text-blue-900">Selesai</p>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
      <div className="flex flex-col lg:flex-row max-w-7xl mx-auto p-4 space-y-8 lg:space-y-0 lg:space-x-6">
      <div className="mx-auto w-full">
      {currentData.map((order) => (
        <div
          className="mt-6 flow-root sm:mt-8 border border-gray-200 rounded-lg shadow-sm"
          key={order.id_pesanan}
        >
          <div className="divide-y divide-gray-200">
            <div className="flex flex-wrap items-center gap-y-4 p-6">
              <dl className="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
                <dt className="text-base font-medium text-gray-500">ID Pesanan:</dt>
                <dd className="mt-1.5 text-base font-semibold text-gray-900">
                  <a href="#" className="hover:underline">{order.id_beli}</a>
                </dd>
              </dl>

              <dl className="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
                <dt className="text-base font-medium text-gray-500">Tanggal Pesanan:</dt>
                <dd className="mt-1.5 text-base font-semibold text-gray-900">{format(new Date(order.created_at), "dd/MM/yyyy")}</dd>
              </dl>

              <dl className="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
                <dt className="text-base font-medium text-gray-500">Total Pesanan</dt>
                <dd className="mt-1.5 text-base font-semibold text-gray-900">
                  {formatCurrency(order.total_beli)}
                </dd>
              </dl>

              <dl className="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
                <dt className="text-base font-medium text-gray-500">Status:</dt>
                <dd className="mt-1.5 inline-flex items-center rounded bg-primary-100 px-2.5 py-0.5 text-xs font-medium text-primary-800">
                  {order.status_pengiriman === 1 ? (
                    <span className="inline-flex items-center bg-gray-100 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                      <span className="w-2 h-2 me-1 bg-gray-500 rounded-full"></span>
                      Belum Bayar
                    </span>
                  ) : order.status_pengiriman === 2 ? (
                    <span className="inline-flex items-center bg-yellow-100 text-black text-xs font-medium px-2.5 py-0.5 rounded-full">
                      <span className="w-2 h-2 me-1 bg-yellow-500 rounded-full"></span>
                      Sudah Bayar
                    </span>
                  ) : order.status_pengiriman === 3 ? (
                    <span className="inline-flex items-center bg-blue-100 text-black text-xs font-medium px-2.5 py-0.5 rounded-full">
                      <span className="w-2 h-2 me-1 bg-blue-500 rounded-full"></span>
                      Dikirim
                    </span>
                  ) : order.status_pengiriman === 4 ? (
                    <span className="inline-flex items-center bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                      <span className="w-2 h-2 me-1 bg-green-500 rounded-full"></span>
                      Selesai
                    </span>
                  ) : (
                    <span className="inline-flex items-center bg-red-200 text-black text-xs font-medium px-2.5 py-0.5 rounded-full">
                      <span className="w-2 h-2 me-1 bg-red-500 rounded-full"></span>
                      Dibatalkan
                    </span>
                  )}
                </dd>
              </dl>

              <div className="w-full grid sm:grid-cols-2 lg:flex lg:w-64 lg:items-center lg:justify-end gap-4">
                {order.status_pengiriman === 1 || order.status_pengiriman === 2 ? (
                  <>
                    <button
                      type="button"
                      onClick={() => cancelOrder(order.id_beli)}
                      className="w-full rounded-lg border border-red-700 px-3 py-2 text-center text-sm font-medium text-red-700 hover:bg-red-700 hover:text-white focus:outline-none focus:ring-4 focus:ring-red-300 lg:w-auto"
                    >
                      Cancel order
                    </button>
                    <button
                      type="button"
                      onClick={() => handleView(order.id_beli)}
                      className="w-full inline-flex justify-center rounded-lg border border-gray-900 bg-gray-300 px-3 py-2 text-sm font-medium text-gray-900 hover:bg-yellow-300 hover:text-primary-700 focus:outline-none focus:ring-4 focus:ring-gray-100 lg:w-auto"
                    >
                      View details
                    </button>
                  </>
                ) : (
                  <button
                    type="button"
                    onClick={() => handleView(order.id_beli)}
                    className="w-full inline-flex justify-center rounded-lg border border-gray-900 bg-gray-300 px-3 py-2 text-sm font-medium text-gray-900 hover:bg-yellow-300 hover:text-primary-700 focus:outline-none focus:ring-4 focus:ring-gray-100 lg:w-auto"
                  >
                    View details
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}

          <nav className="mt-6 flex items-center justify-center sm:mt-8" aria-label="Page navigation example">
            <ul className="flex h-8 items-center -space-x-px text-sm">
              <li>
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="ms-0 flex h-8 items-center justify-center rounded-s-lg border border-e-0 border-gray-300 bg-white px-3 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 "
                >
                  Previous
                </button>
              </li>
              {Array.from({ length: totalPages }, (_, i) => (
                <li key={i}>
                  <button
                    onClick={() => handlePageChange(i + 1)}
                    className={`flex h-8 items-center justify-center border px-3 leading-tight ${
                      currentPage === i + 1
                        ? "border-primary-300 bg-primary-50 text-primary-600"
                        : "border-gray-300 bg-white text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                    }`}
                  >
                    {i + 1}
                  </button>
                </li>
              ))}
              <li>
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="flex h-8 items-center justify-center rounded-e-lg border border-gray-300 bg-white px-3 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                >
                  Next
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </section>
  );
}

// export async function getServerSideProps(ctx) {
//   const session = await getSession(ctx);

//   if (!session) {
//     return {
//       redirect: {
//         destination: '/login',
//         permanent: false,
//       },
//     };
//   }
//   if (session.user.role === 'Pegawai' || session.user.role === 'Admin') {
//     return {
//       redirect: {
//         destination: '/login',
//         permanent: false,
//       },
//     };
//   }
//   return {
//     props: {
//       ...session,
//     },
//   };
// }
