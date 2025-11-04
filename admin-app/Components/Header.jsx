// Header.js
import { useState, useEffect, useRef } from "react";
import {
  FiSearch,
  FiBell,
  FiMessageSquare,
  FiMoon,
  FiMenu,
  FiChevronDown,
} from "react-icons/fi";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";

export default function Header({ onMenuClick }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const router = useRouter();
  const { data: session, status } = useSession();

  const isLoading = status === "loading";
  const isAuthenticated = !isLoading && session;

  const idUser = session?.user?.id_user; 

  const handleEdit = (userId) => {
    router.push(`/myprofile/${userId}`);
  };
  const handlePW = (userId) => {
    router.push(`/myprofile/password/${userId}`);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    if (isDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownOpen]);

  const handleSignOut = () => {
    signOut({ callbackUrl: `/` });
    localStorage.clear();
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <div>Please log in.</div>;
  }

  return (
    <header className="flex items-center justify-between bg-gray-900 text-white p-4 h-16 shadow-md">
    
      <button className="text-white md:hidden" onClick={onMenuClick}>
        <FiMenu size={24} />
      </button>

    
      <div className="flex items-center space-x-4">
        <div className="flex items-center bg-gray-800 rounded-lg p-2 ml-4"></div>
      </div>

    
      <div className="flex items-center space-x-6 relative">      
        <div className="flex items-center space-x-2 cursor-pointer" onClick={toggleDropdown}>
          <div className="text-sm">
            <div>{session.user.nama_depan} {session.user.nama_belakang}</div>
            <div className="text-gray-400">{session.user.role}</div>
          </div>
          <FiChevronDown />
        </div>

      
        {isDropdownOpen && (
          <div
            ref={dropdownRef}
            className="absolute right-0 top-full mt-2 w-48 bg-gray-800 rounded-md shadow-lg py-2"
          >
            <hr className="border-gray-700" />
            <button
              onClick={() => handleEdit(idUser)}
              className="w-full px-4 py-2 text-left text-sm text-gray-300 hover:bg-gray-700"
            >
              My Profile
            </button>
            <hr className="border-gray-700" />
            <button
              onClick={() => handlePW(idUser)}
              className="w-full px-4 py-2 text-left text-sm text-gray-300 hover:bg-gray-700"
            >
              Ganti Password
            </button>
            <hr className="border-gray-700" />
            <button
              onClick={handleSignOut}
              className="w-full px-4 py-2 text-left text-sm text-gray-300 hover:bg-gray-700"
            >
              Log Out
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
