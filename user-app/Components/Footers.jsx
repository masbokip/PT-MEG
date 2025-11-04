// components/Footer.js
import React from 'react';
import Link from "next/link";
import { FaFacebook, FaInstagram, FaTwitter, FaGithub, FaYoutube } from 'react-icons/fa';

const Footers = () => {
  return (
    <footer className="bg-gray-900 text-gray-400 py-8">
      <div className="container mx-auto px-4 flex flex-col items-center">
        <p className="text-gray-500 text-sm">
          © 2024 PT Megah Era Gunakarya, Inc. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footers;
