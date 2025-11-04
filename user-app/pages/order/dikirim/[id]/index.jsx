import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { getSession, useSession } from 'next-auth/react';
import { useRouter } from "next/router";
import Swal from 'sweetalert2';
import { testURL } from '@/testURL';

export default function Index() {
    const router = useRouter();
    const { id } = router.query;
    const { data: session } = useSession();
    const [orderData, setOrderData] = useState({ order: {}, products: [] });
    const [loading, setLoading] = useState(true); 
    const [error, setError] = useState(''); 
    const [formState, setFormState] = useState({});
    

    useEffect(() => {
        const fetchOrderData = async () => {
            try {
                const response = await axios.get(`${testURL}/api/pesanan/${id}`);
                setOrderData(response.data);
                const initialFormState = {};
                response.data.products.forEach((product) => {
                    initialFormState[product.id_produk] = {
                        rating: 0,
                        review: '',
                    };
                });
                setFormState(initialFormState);
            } catch (err) {
                setError(err.message || "Terjadi kesalahan saat memuat data");
            } finally {
                setLoading(false);
            }
        };
        fetchOrderData();
    }, [id]);

    const formatCurrency = (value) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
        }).format(value);
    };

    const handleInputChange = (id_produk, field, value) => {
        setFormState((prevState) => ({
            ...prevState,
            [id_produk]: {
                ...prevState[id_produk],
                [field]: value,
            },
        }));
    };

    const handleSubmit = async (id_produk) => {
        const { rating, review } = formState[id_produk];
        try {
            await axios.post(`${testURL}/api/rating`, {
                id_user: session.user.id_user,
                id_produk,
                rating,
                ulasan: review,
            });
            Swal.fire({
                title: 'Berhasil!',
                text: 'Semua rating dan ulasan berhasil dikirim.',
                icon: 'success',
                confirmButtonText: 'OK'
            });
        } catch (err) {
            Swal.fire({
                title: 'Gagal!',
                text: 'Terjadi kesalahan saat mengirim ulasan.',
                icon: 'error',
                confirmButtonText: 'Coba Lagi'
            });
        }
    };

    if (loading) {
        return <p>Memuat data...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    return (
        <section className="bg-white py-8 antialiased md:py-16">
            <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
                <h2 className="text-xl font-semibold text-gray-900 sm:text-2xl text-center">
                    Pesanan {orderData.order.id_beli}
                </h2>
                <div className="space-y-4 bg-gray-50 p-6">
                    {orderData.products.map((product) => (
                        <div key={product.id_produk} className="space-y-4 p-6">
                            <div className="flex items-center gap-6">
                                <a href="#" className="h-14 w-14 shrink-0">
                                    <img
                                        className="h-full w-full object-cover"
                                        src={
                                            product.photo?.nama
                                                ? `${testURL}/assets/images/product/${product.photo.nama}`
                                                : '/placeholder.png'
                                        }
                                        alt={`Foto ${product.nama_produk}`}
                                    />
                                </a>
                                <a href="#" className="min-w-0 flex-1 font-medium text-gray-900 hover:underline">
                                    Produk {product.nama_produk}
                                </a>
                            </div>
                            <div className="flex items-center justify-between gap-4">
                                <p className="text-sm font-normal text-gray-500">
                                    {product.nama_kategori}
                                </p>
                                <div className="flex items-center justify-end gap-4">
                                    <p className="text-base font-normal text-gray-900">x{product.jumlah}</p>
                                    <p className="text-xl font-bold leading-tight text-gray-900">
                                        {formatCurrency(product.harga)}
                                    </p>
                                </div>
                            </div>
                            {/* Form untuk Rating dan Ulasan */}
                            <div className="mt-4">
                                <label htmlFor={`rating-${product.id_produk}`} className="block text-sm font-medium text-gray-700">
                                    Rating (1-5)
                                </label>
                                <input
                                    type="number"
                                    id={`rating-${product.id_produk}`}
                                    name={`rating-${product.id_produk}`}
                                    min="1"
                                    max="5"
                                    value={formState[product.id_produk]?.rating || 0}
                                    onChange={(e) =>
                                        handleInputChange(product.id_produk, 'rating', e.target.value)
                                    }
                                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                />
                                <label htmlFor={`review-${product.id_produk}`} className="block mt-4 text-sm font-medium text-gray-700">
                                    Ulasan
                                </label>
                                <textarea
                                    id={`review-${product.id_produk}`}
                                    name={`review-${product.id_produk}`}
                                    rows="4"
                                    value={formState[product.id_produk]?.review || ''}
                                    onChange={(e) =>
                                        handleInputChange(product.id_produk, 'review', e.target.value)
                                    }
                                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                />
                                <button
                                    onClick={() => handleSubmit(product.id_produk)}
                                    className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                >
                                    Kirim Rating dan Ulasan
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
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
