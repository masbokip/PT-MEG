'use client';

import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogPanel,
  Popover,
  PopoverButton,
  PopoverGroup,
  PopoverPanel,
} from '@headlessui/react';
import {
  Bars3Icon,
  XMarkIcon,
  FingerPrintIcon,
  DevicePhoneMobileIcon,
  ChevronDownIcon,
  ShoppingCartIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { testURL } from '@/testURL';

const products = [
  { name: 'Tentang Kami', description: 'Kenali lebih dekat siapa kami!', href: '/about', icon: FingerPrintIcon },
  { name: 'Hubungi Kami', description: 'Ada pertanyaan? Hubungi kami.', href: '/contact', icon: DevicePhoneMobileIcon },
];

export default function Navbars() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const router = useRouter();
  const { data: session, status } = useSession();

  const isLoading = status === 'loading';
  const isAuthenticated = !isLoading && session;
  const idUser = session?.user?.id_user;

  const handleSignOut = () => {
    signOut({ callbackUrl: `/` });
    localStorage.clear();
  };

  const handleEdit = () => idUser && router.push(`/profile/${idUser}`);
  const handlePW = () => idUser && router.push(`/profile/password/${idUser}`);

  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
  const fetchCartCount = async () => {
    try {
      const response = await axios.get(`${testURL}/api/cart?id=${session?.user?.id_user}`);
      const count = response.data.data.length;
      setCartCount(count);
    } catch (error) {
      setCartCount(0);
    }
  };
  if (session) fetchCartCount();
}, [session]);

  return (
    <header className="bg-white fixed top-0 left-0 w-full z-50 shadow-md">
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-5 lg:px-8">
        <div className="flex lg:flex-1">
          <Link href="/">
            <img alt="Logo" src="/images/logo/logopanjang.png" className="h-8 w-auto" />
          </Link>
        </div>
        <div className="flex lg:hidden">
          <button onClick={() => setMobileMenuOpen(true)} className="p-2.5 text-gray-700">
            <Bars3Icon className="h-6 w-6" />
          </button>
        </div>
        <PopoverGroup className="hidden lg:flex lg:gap-x-12">
          <Link href="/product"><p className="text-sm font-semibold text-gray-900">Produk</p></Link>
          <Link href="/category"><p className="text-sm font-semibold text-gray-900">Kategori</p></Link>
          <Link href="/brand"><p className="text-sm font-semibold text-gray-900">Brand</p></Link>
          {isAuthenticated && (
          <Link href="/favorit"><p className="text-sm font-semibold text-gray-900">Favorit</p></Link>
          )}
          <Popover className="relative">
            <PopoverButton className="flex items-center text-sm font-semibold text-gray-900">
              Tentang Kami <ChevronDownIcon className="h-5 w-5 text-gray-400" />
            </PopoverButton>
            <PopoverPanel className="absolute -left-8 top-full z-10 mt-3 w-max rounded-lg bg-white shadow-lg ring-1 ring-gray-900/5">
              <div className="p-4">
                {products.map((item) => (
                  <div key={item.name} className="flex items-center gap-x-6 p-4 hover:bg-gray-50">
                    <div className="h-11 w-11 flex items-center justify-center rounded-lg bg-gray-50">
                      <item.icon className="h-6 w-6 text-gray-600" />
                    </div>
                    <div>
                      <Link href={item.href} className="block font-semibold text-gray-900">{item.name}</Link>
                      <p className="text-gray-600">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </PopoverPanel>
          </Popover>
        </PopoverGroup>
        
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
        {isAuthenticated && (
            <Link href="/cart" className="relative mx-4">
            <ShoppingCartIcon className="h-10 w-10 text-black" />
            {cartCount > 0 && (
              <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
                {cartCount}
              </span>
            )}
          </Link>
          )}
        {isAuthenticated ? ( 
            <Popover className="relative">
              <PopoverButton><UserCircleIcon className="h-10 w-10 text-gray-900 cursor-pointer mx-4" /> 
              </PopoverButton>
              <PopoverPanel className="absolute right-0 z-10 mt-3 w-48 rounded-lg bg-white shadow-lg ring-1 ring-gray-900/5">
                <div className="p-4">
                  <Link href="/order"><p className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100">Pesanan Saya</p></Link>
                  <button onClick={handleEdit} className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100">Edit Profil</button>
                  <button onClick={handlePW} className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100">Ubah Password</button>
                  <button onClick={handleSignOut} className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100">Logout</button>
                </div>
              </PopoverPanel>
            </Popover>
          ) : (
            <div className="flex gap-4">
              <Link href="/login" className="px-4 py-2 text-sm font-medium text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-100">Login</Link>
              <Link href="/register" className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700">Register</Link>
            </div>
          )}
        </div>
      </nav>
      {/* Mobile Menu */}
      <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
        <DialogPanel className="fixed inset-y-0 right-0 z-10 w-full bg-white px-6 py-6 sm:max-w-sm">
          <div className="flex items-center justify-between">
            <Link href="/"><img alt="Logo" src="/images/logo/logopanjang.png" className="h-8 w-auto" /></Link>
            <button onClick={() => setMobileMenuOpen(false)} className="p-2.5 text-gray-700">
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>
          <div className="mt-6">
            <Link href="/product" className="block py-2 text-gray-900">Produk</Link>
            <Link href="/category" className="block py-2 text-gray-900">Kategori</Link>
            <Link href="/brand" className="block py-2 text-gray-900">Brand</Link>
            
            {isAuthenticated ? (
              <>
                <Link href="/cart" className="block py-2 text-gray-900">Cart</Link>
                <Link href="/favorit" className="block py-2 text-gray-900">Favorit</Link>
                <Link href="/order" className="block py-2 text-gray-900">Pesanan Saya</Link>
                <button onClick={handleEdit} className="block py-2 text-gray-900">Edit Profil</button>
                <button onClick={handlePW} className="block py-2 text-gray-900">Ubah Password</button>
                <button onClick={handleSignOut} className="block py-2 text-gray-900">Logout</button>
              </>
            ) : (
              <>
                <Link href="/login" className="block py-2 text-gray-900">Login</Link>
                <Link href="/register" className="block py-2 text-gray-900">Register</Link>
              </>
            )}
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  );
}
