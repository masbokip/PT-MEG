'use client'

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';
import Swal from 'sweetalert2';
import { testURL } from '@/testURL';

export default function Registers() {
  const [formData, setFormData] = useState({
    nama_depan: '',
    nama_belakang: '',
    email: '',
    password: '',
    kpassword: '',
    jenis_kelamin: '',
    no_telp: '',
    provinsi: '',
    kota: '',
    kecamatan: '',
    kelurahan: '',
    kode_pos: '',
    alamat_lengkap: '',
  });

  const [provinces, setProvinces] = useState([]);
  const [cities, setCities] = useState([]);
  const [codeProvince, setCodeProvince] = useState('');
  const [message, setMessage] = useState('');
  const [cityCode, setCityCode] = useState('');
  const [subdistricts, setSubdistricts] = useState([]);


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });

    if (e.target.name === 'provinsi') {
      const selectedProvince = provinces.find(p => p.province === e.target.value);
      setCodeProvince(selectedProvince?.province_id || '');
    }

    if (e.target.name === 'kota') {
        const selectedCity = cities.find(c => c.city_name === e.target.value);
        setCityCode(selectedCity?.city_id || '');
      }
      
  };

  useEffect(() => {
    const fetchProvinces = async () => {
      try {
        const response = await axios.get(`${testURL}/api/ongkir/provinsi`);
        setProvinces(response.data.rajaongkir.results);
      } catch (error) {
        console.error('Error fetching provinces:', error);
      }
    };
    fetchProvinces();
  }, []);

  useEffect(() => {
    const fetchSubdistricts = async () => {
      if (!cityCode) return;
      try {
        const response = await axios.get(`${testURL}/api/ongkir/subdistrict?city_id=${cityCode}`);
        setSubdistricts(response.data.rajaongkir.results);
      } catch (error) {
        console.error('Error fetching subdistricts:', error);
      }
    };
    fetchSubdistricts();
  }, [cityCode]);
  

  useEffect(() => {
    const fetchCities = async () => {
      if (!codeProvince) return;
      try {
        const response = await axios.get(`${testURL}/api/ongkir/kota?province_id=${codeProvince}`);
        setCities(response.data.rajaongkir.results);
      } catch (error) {
        console.error('Error fetching cities:', error);
      }
    };
    fetchCities();
  }, [codeProvince]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.kpassword) {
      alert('Passwords do not match');
      return;
    }
    try {
      const response = await axios.post(`${testURL}/api/register`, formData);
      if (response.status === 201) {
        await Swal.fire({
          icon: 'success',
          title: 'Success',
          text: response.data.message,
          confirmButtonText: 'OK',
          confirmButtonColor: "#3085d6"
        }).then(() => window.location.reload());
      } else if (response.status === 400) {
        await Swal.fire({
          icon: 'info',
          title: 'Terdapat Kesalahan Dalam Mengisi Data',
          text: response.data.message,
          confirmButtonText: 'Tutup',
          confirmButtonColor: "#d33"
        });
      }
    } catch (error) {
      console.error('Error registering:', error);
      await Swal.fire({
        icon: 'error',
        title: 'Terjadi Kesalahan',
        text: error.response?.data?.message || 'Gagal melakukan pendaftaran.',
        confirmButtonText: 'Tutup',
        confirmButtonColor: "#d33"
      });
    }
  };

  return (
    <div className="isolate bg-white px-6 py-24 sm:py-32 lg:px-8">
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]"
      >
        <div
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }}
          className="relative left-1/2 -z-10 aspect-[1155/678] w-[36.125rem] max-w-none -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-40rem)] sm:w-[72.1875rem]"
        />
      </div>
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-balance text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl">Daftar Akun</h2>
        <p className="mt-2 text-lg leading-8 text-gray-600">
        Bergabunglah sekarang untuk pengalaman belanja elektronik yang lebih mudah!
        </p>
      </div>
      <form onSubmit={handleSubmit} method="POST" className="mx-auto mt-16 max-w-xl sm:mt-20">
        <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
          <div>
            <label htmlFor="namadepan" className="block text-sm font-semibold leading-6 text-gray-900">
              Nama Depan
            </label>
            <div className="mt-2.5">
              <input
                type="text"
                name="nama_depan"
                value={formData.nama_depan}
                onChange={handleChange}
                placeholder="Nama Depan"
                autoComplete="given-name"
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div>
            <label htmlFor="namabelakang" className="block text-sm font-semibold leading-6 text-gray-900">
              Nama Belakang
            </label>
            <div className="mt-2.5">
              <input
                type="text"
                name="nama_belakang"
                value={formData.nama_belakang}
                onChange={handleChange}
                placeholder="Nama Belakang"
                autoComplete="family-name"
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="email" className="block text-sm font-semibold leading-6 text-gray-900">
              Email
            </label>
            <div className="mt-2.5">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                autoComplete="email"
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-semibold leading-6 text-gray-900">
              Password
            </label>
            <div className="mt-2.5">
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
                autoComplete="current-password"
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div>
            <label htmlFor="kpassword" className="block text-sm font-semibold leading-6 text-gray-900">
            Konfirmasi Password
            </label>
            <div className="mt-2.5">
              <input
                type="password"
                name="kpassword"
                value={formData.kpassword}
                onChange={handleChange}
                placeholder="Konfirmasi Password"
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div>
                <label htmlFor="gender" className="block text-sm font-semibold leading-6 text-gray-900">
                  Jenis Kelamin
                </label>
                <div className="mt-2.5">
                  <select
                    id="gender"
                    name="jenis_kelamin"
                    autoComplete="sex"
                    value={formData.jenis_kelamin} 
                    onChange={handleChange}
                    className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  >
                    <option value="-">Pilih Jenis Kelamin</option>
                    <option value="Laki-laki">Laki-laki</option>
                    <option value="Perempuan">Perempuan</option>
                  </select>
                </div>
          </div>
          <div>
            <label htmlFor="notelepon" className="block text-sm font-semibold leading-6 text-gray-900">
            Nomor Telepon
            </label>
            <div className="mt-2.5">
              <input
                type="text"
                name="no_telp"
                value={formData.no_telp}
                onChange={handleChange}
                placeholder="Nomor Telepon"
                autoComplete="tel"
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
            <div>
            <label htmlFor="provinsi" className="block text-sm font-semibold leading-6 text-gray-900">
                Provinsi
            </label>
            <div className="mt-2.5">
                <select
                name="provinsi"
                value={formData.provinsi}
                onChange={handleChange}
                className="block w-full rounded-md border-0 px-3.5 py-2 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
                >
                <option value="">Pilih Provinsi</option>
                {provinces.map((prov) => (
                    <option key={prov.province_id} value={prov.province}>
                    {prov.province}
                    </option>
                ))}
                </select>
            </div>
            </div>
            <div>
                <label htmlFor="kota" className="block text-sm font-semibold leading-6 text-gray-900">
                    Kota/Kabupaten
                </label>
                <div className="mt-2.5">
                    <select
                    name="kota"
                    value={formData.kota}
                    onChange={handleChange}
                    className="block w-full rounded-md border-0 px-3.5 py-2 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
                    >
                    <option value="">Pilih Kota/Kabupaten</option>
                    {cities.map((city) => (
                        <option key={city.city_id} value={city.city_name}>
                        {city.type} {city.city_name}
                        </option>
                    ))}
                    </select>
                </div>
                </div>
                <div>
                    <label htmlFor="kecamatan" className="block text-sm font-semibold leading-6 text-gray-900">
                        Kecamatan
                    </label>
                    <div className="mt-2.5">
                        <select
                        name="kecamatan"
                        value={formData.kecamatan}
                        onChange={handleChange}
                        className="block w-full rounded-md border-0 px-3.5 py-2 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
                        >
                        <option value="">Pilih Kecamatan</option>
                        {subdistricts.map((sub, index) => (
                            <option key={index} value={sub.subdistrict_name}>
                            {sub.type} {sub.subdistrict_name}
                            </option>
                        ))}
                        </select>
                    </div>
                    </div>
          <div>
            <label htmlFor="first-name" className="block text-sm font-semibold leading-6 text-gray-900">
            Kelurahan/Desa
            </label>
            <div className="mt-2.5">
              <input
                type="text"
                name="kelurahan"
                value={formData.kelurahan}
                onChange={handleChange}
                placeholder="Kelurahan/Desa"
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div>
            <label htmlFor="kodepos" className="block text-sm font-semibold leading-6 text-gray-900">
            Kode Pos
            </label>
            <div className="mt-2.5">
              <input
                type="number"
                name="kode_pos"
                value={formData.kode_pos}
                onChange={handleChange}
                placeholder="Kode Pos"
                autoComplete="postal-code"
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="alamat" className="block text-sm font-semibold leading-6 text-gray-900">
              Alamat Lengkap
            </label>
            <div className="mt-2.5">
              <textarea
                type="text"
                name="alamat_lengkap"
                value={formData.alamat_lengkap}
                onChange={handleChange}
                placeholder="Alamat Lengkap"
                rows={4}
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                autoComplete="street-address"
              />
            </div>
          </div>
        </div>
        <div className="mt-10">
          <button
            type="submit"
            className="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Daftar Sekarang
          </button>
          {message && <p>{message}</p>}
        </div>
      </form>
      <p className="mt-10 text-center text-sm text-gray-500">
              Sudah punya akun ?{' '}
              <Link href="/" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                Login Sekarang <span aria-hidden="true">&rarr;</span>
            </Link>
            </p>
    </div>
  )
}