'use client'
import Image from 'next/image';
import React,{ useState } from 'react';
import { getSession, useSession } from 'next-auth/react';
export default function Page() {
    const { data: session } = useSession();
    const [wishlistItems, setWishlistItems] = useState([
        {
          id: 1,
          name: 'Rumah Lampu Persegi',
          image: '/images/product/rlampu2.jpg',
          price: '50.000',
        },
        {
          id: 2,
          name: 'Rumah Lampu Persegi',
          image: '/images/product/rlampu2.jpg',
          price: '50.000',
        },
        {
          id: 3,
          name: 'Rumah Lampu Persegi',
          image: '/images/product/rlampu2.jpg',
          price: '50.000',
        },
      ]);
    
      const removeItem = (id) => {
        setWishlistItems(wishlistItems.filter((item) => item.id !== id));
      };
  return (
    <div className="p-8">
      <h2 className="text-4xl font-bold text-indigo-900 mb-4">Produk Favorit</h2>
      <div className="overflow-x-auto">
        <table className="w-full text-left border border-gray-200">
          <thead>
            <tr>
              <th className="px-4 py-2 text-gray-600 font-semibold">Foto Produk</th>
              <th className="px-4 py-2 text-gray-600 font-semibold">Nama Produk</th>
              <th className="px-4 py-2 text-gray-600 font-semibold">Masukkan Keranjang</th>
              <th className="px-4 py-2 text-gray-600 font-semibold">Harga</th>
              <th className="px-4 py-2 text-gray-600 font-semibold">Hapus</th>
            </tr>
          </thead>
          <tbody>
            {wishlistItems.map((item) => (
              <tr key={item.id} className="border-t border-gray-200">
                <td className="px-4 py-4">
                  <div className="w-16 h-16 relative">
                    <Image
                      src={item.image}
                      alt={item.name}
                      layout="fill"
                      objectFit="cover"
                      className="rounded"
                    />
                  </div>
                </td>
                <td className="px-4 py-4 text-gray-800">{item.name}</td>
                <td className="px-4 py-4">
                  <button className="px-4 py-2 bg-purple-600 text-white font-semibold rounded hover:bg-purple-700 transition">
                    Add To Cart
                  </button>
                </td>
                <td className="px-4 py-4 text-gray-800">Rp {item.price}</td>
                <td className="px-4 py-4">
                  <button
                    onClick={() => removeItem(item.id)}
                    className="text-red-500 font-semibold"
                  >
                    &times;
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
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