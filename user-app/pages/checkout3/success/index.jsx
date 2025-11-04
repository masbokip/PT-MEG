import React from 'react'
import { getSession, useSession } from 'next-auth/react';
export default function Index() {
  const { data: session } = useSession();
  return (
    <section class="bg-white py-8 antialiased dark:bg-gray-900 md:py-16">
    <div class="mx-auto max-w-screen-xl px-4 2xl:px-0">
      <h2 class="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">Pesanan MEG-ODR-10102024-0001</h2>
  
      <div class="mt-6 sm:mt-8 lg:flex lg:gap-8">
        <div class="w-full divide-y divide-gray-200 overflow-hidden rounded-lg border border-gray-200 dark:divide-gray-700 dark:border-gray-700 lg:max-w-xl xl:max-w-2xl">
          <div class="space-y-4 p-6">
            <div class="flex items-center gap-6">
              <a href="#" class="h-14 w-14 shrink-0">
                <img class="h-full w-full dark:hidden" src="/images/product/lampu1.jpg" alt="imac image" />
              </a>
  
              <a href="#" class="min-w-0 flex-1 font-medium text-gray-900 hover:underline dark:text-white">Philips Kap Rumah Lampu Downlight Glass Recessed WH 13803 1X11W 230V</a>
            </div>
  
            <div class="flex items-center justify-between gap-4">
              <p class="text-sm font-normal text-gray-500 dark:text-gray-400"><span class="font-medium text-gray-900 dark:text-white"> </span> Lampu Plafon</p>
  
              <div class="flex items-center justify-end gap-4">
                <p class="text-base font-normal text-gray-900 dark:text-white">x1</p>
  
                <p class="text-xl font-bold leading-tight text-gray-900 dark:text-white">Rp. 89.000</p>
              </div>
            </div>
          </div>
  
          <div class="space-y-4 p-6">
            <div class="flex items-center gap-6">
              <a href="#" class="h-14 w-14 shrink-0">
                <img class="h-full w-full dark:hidden" src="/images/product/lampu2.jpg" alt="phone image" />
              </a>
  
              <a href="#" class="min-w-0 flex-1 font-medium text-gray-900 hover:underline dark:text-white"> Lampu Philips Bohlam ESS LED Candle 6W E27 2700K Kuning </a>
            </div>
  
            <div class="flex items-center justify-between gap-4">
              <p class="text-sm font-normal text-gray-500 dark:text-gray-400"><span class="font-medium text-gray-900 dark:text-white"></span> Lampu LED</p>
  
              <div class="flex items-center justify-end gap-4">
                <p class="text-base font-normal text-gray-900 dark:text-white">x2</p>
  
                <p class="text-xl font-bold leading-tight text-gray-900 dark:text-white">Rp. 27.500</p>
              </div>
            </div>
          </div>
          <div class="space-y-4 bg-gray-50 p-6 dark:bg-gray-800">
            <div class="space-y-2">
              <dl class="flex items-center justify-between gap-4">
                <dt class="font-normal text-gray-500 dark:text-gray-400">Total Pembelian</dt>
                <dd class="font-medium text-gray-900 dark:text-white">Rp. 144.000</dd>
              </dl>
  
              <dl class="flex items-center justify-between gap-4">
                <dt class="font-normal text-gray-500 dark:text-gray-400">Pengiriman</dt>
                <dd class="font-medium text-gray-900 dark:text-white">Rp. 10.000</dd>
              </dl>
  
              <dl class="flex items-center justify-between gap-4">
                <dt class="font-normal text-gray-500 dark:text-gray-400">Pajak</dt>
                <dd class="font-medium text-gray-900 dark:text-white">Rp. 10.000</dd>
              </dl>
  
              <dl class="flex items-center justify-between gap-4">
                <dt class="font-normal text-gray-500 dark:text-gray-400">Voucher</dt>
                <dd class="font-medium text-gray-900 dark:text-white">Rp. 0</dd>
              </dl>
            </div>
  
            <dl class="flex items-center justify-between gap-4 border-t border-gray-200 pt-2 dark:border-gray-700">
              <dt class="text-lg font-bold text-gray-900 dark:text-white">Total</dt>
              <dd class="text-lg font-bold text-gray-900 dark:text-white">$7,191.00</dd>
            </dl>
          </div>
        </div>
      </div>
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
