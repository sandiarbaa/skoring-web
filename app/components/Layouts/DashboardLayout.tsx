"use client";
import Image from "next/image";
import React, { useState, useRef, useEffect } from "react";
import UserPhoto from "../Fragments/UserPhoto";
import SidebarLink from "../Fragments/SidebarLink";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";
import Logout from "@/app/(pages)/(auth)/login/logout";
import api from "@/app/(pages)/(auth)/login/api";

interface DashboardLayoutProps {
  children: React.ReactNode;
  hover?: string;
  alokasiKuota?: string;
} 
interface UserData {
  id: number;
  username: string;
  email: string;
  role: string;
  img_profile: string | null;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  children,
  hover = "",
  alokasiKuota,
}) => {
  const [nav, setNav] = useState(false);
  const navRef = useRef<HTMLDivElement | null>(null);
  const [username, setUsername] = useState<string>("None");
  const [role, setRole] = useState<string>("user");
  

  const openNavHandler = () => setNav(true);
  const closeNavHandler = () => setNav(false);

  const handleLogout = async () => {
    await Logout();
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (navRef.current && !navRef.current.contains(event.target as Node)) {
      setNav(false);
    }
  };

  useEffect(() => {
    if (nav) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [nav]);

  const Auth = async () => {
    const accessToken = localStorage.getItem("accessToken");

        try {
            const response = await api.get('/users', {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            })
            setRole(response.data.data.user.role)
            setUsername(response.data.data.user.username)
        } catch (error: any) {
            console.log(error);
        }
    }

    useEffect(() => {
      Auth();
    }, []);

  return (
    <main className="relative w-full h-screen bg-primary">
      <div className="container flex justify-between h-full mx-auto border">
        {/* Overlay */}
        {nav && (
          <div
            className="fixed inset-0 z-[99999] bg-black opacity-50"
            onClick={closeNavHandler}
          ></div>
        )}

        {/* Navbar Mobile */}
        <nav
          ref={navRef}
          id="navbarMobile"
          className={`md:hidden absolute ${
            nav ? "translate-x-0" : "translate-x-[-100%]"
          } bg-white z-[999999] w-full max-w-[250px] h-full top-0 left-0 px-8 py-5 shadow-lg transition-all duration-300 shadow-white`}
        >
          {/* Logo */}
          <Image
            src="/assets/login/mknows_logo.png"
            alt="logo"
            width={100}
            height={100}
          />
          {/* Photo & Username */}
          <UserPhoto username={username} role={role} />
          <hr className="my-5 border-b-2 rounded-full" />

          {/* Sidebar Link */}
          <SidebarLink hover={hover} role={role} />
          <button
            onClick={handleLogout}
            className="absolute flex space-x-3 bottom-5 left-10"
          >
            <Image
              src="/assets/dashboard/sidebarNavbar/logout-1.png"
              alt="exit-icon"
              width={20}
              height={0}
              className="scale-90"
            />
            <span>Keluar</span>
          </button>
        </nav>

        {/* Hamburger Icon to Open Nav */}
        {!nav && (
          <div className="fixed top-0 left-0 z-[9999] flex items-center justify-end w-full h-12 py-3 bg-white shadow sm:px-16 px-11 shadow-ijoToska md:hidden">
            <Bars3Icon
              onClick={openNavHandler}
              className="w-[2rem] text-ijoToska md:hidden cursor-pointer z-50"
            />
          </div>
        )}

        {/* X Icon to Close Nav */}
        {nav && (
          <XMarkIcon
            onClick={closeNavHandler}
            className="w-[2rem] absolute top-5 right-12 sm:top-6 sm:right-14 text-white md:hidden cursor-pointer z-[9999999]"
          />
        )}

        {/* Sidebar Desktop*/}
        <nav className="w-full md:max-w-[220px] lg:max-w-[250px] bg-white p-5 shadow hidden md:block relative">
          {/* Logo */}
          <Image
            src="/assets/login/mknows_logo.png"
            alt="logo"
            width={100}
            height={100}
          />

          {/* Photo & Username */}
          <UserPhoto username={username} role={role}/>
          <hr className="my-5 border-b-2 rounded-full" />

          {/* Sidebar Link */}
          <SidebarLink hover={hover} role={role} />
          <button
            onClick={handleLogout}
            className="absolute flex space-x-3 bottom-5 left-10"
          >
            <Image
              src="/assets/dashboard/sidebarNavbar/logout-1.png"
              alt="exit-icon"
              width={20}
              height={0}
              className="scale-75"
            />
            <span>Keluar</span>
          </button>
        </nav>

        {/* Content */}
        <section className="w-full max-w-3xl p-5 overflow-y-scroll xl:max-w-6xl">
          <div
            // className={`w-full bg-white border rounded-md`}
            className={`w-full bg-white min-h-screen border rounded-md ${
              hover === "/dashboard" ? "max-w-5xl" : ""
            } ${alokasiKuota === "/AlokasiKuota" ? "max-w-xl" : ""}`}
          >
            {children}
          </div>
        </section>
      </div>
    </main>
  );
};

export default DashboardLayout;
