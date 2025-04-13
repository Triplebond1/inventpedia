"use client";
import  CustomLink  from "./pageFeature/customLink";
import { useState} from "react";
import Image from "next/image";
import { constants } from "@/app/utilites/constants";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const homeMenu = [
    {
      Href: "/",
      Text: "Home",
    },

    {
      Href: "/about_us",
      Text: "About",
    },

    {
      Href: "/categories",
      Text: "Categories",
    },

    {
      Href: "/blogs",
      Text: "Blogs",
    },

    {
      Href: "/contribute",
      Text: "Contribute",
    },

    {
      Href: "/login",
      Text: "Login/SignUp",
    },

    {
      Href: "/support",
      Text: "Support",
    },
  ];
  return (
    <nav
      className={` w-full px-6 py-4 justify-between items-center 
    bg-white/70 backdrop-blur-lg shadow-md border-blaze-orange-600
    border-b-2
    transition-transform duration-300 ease-in-out will-change-transform
   `}
    >
      <div className="container mx-auto px-auto flex justify-between items-center rounded-3xl">
        {/* Logo */}
        <div className="flex items-center gap-1  text-2xl font-bold text-blaze-orange-950">
          <Image
            src="/pngIcons/inventnexus-2.png"
            width={40}
            height={40} // Adjust height to maintain aspect ratio
            alt="InventNexus logo"
            className="object-contain max-h-10 rounded-sm"
          />
          <span className="scale-x-95">{constants.siteName}</span>
        </div>
       
        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-4 font-semibold">
          <ul className="flex space-x-2 ">
            {homeMenu.map((item, index) => (
              <li key={index}>
                <CustomLink Href={item.Href} Text={item.Text} />
              </li>
            ))}
          </ul>
        </div>

        {/* Mobile Menu Icon */}
        <div className="md:hidden">
          <button
            onClick={toggleMobileMenu}
            className="text-black focus:outline-none hover:bg-blaze-one "
            aria-label="Toggle Menu"
            style={{}}
          >
            {isMobileMenuOpen ? (
              // Close Icon
              <svg
                className="w-6 h-6 bg-blaze-one"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              // Hamburger Icon
              <svg
                className="w-6 h-6 "
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="bg-white text-black md:hidden ">
          <ul className="flex flex-col py-5 px-6 divide-y-2 mt-5 divide-blaze-one font-semibold">
            {homeMenu &&
              homeMenu.map((item, index) => (
                <li className="box-border w-full pt-5 " key={index}>
                  <CustomLink Href={item.Href} Text={item.Text} />
                </li>
              ))}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;


             {/* Header */}
          //    <div className="fixed top-0 left-0 w-full backdrop-blur-md bg-white/10 shadow-lg p-4 border-b border-white/20 z-50">
          //    <div className="container mx-auto flex justify-between items-center">
          //      <h1 className="text-xl font-bold">Inventpedia 🚀</h1>
          //      <nav className="space-x-4">
          //        <a href="#home" className="hover:text-orange-500">Home</a>
          //        <a href="#explore" className="hover:text-orange-500">Explore</a>
          //        <a href="#contribute" className="hover:text-orange-500">Contribute</a>
          //        <a href="#blog" className="hover:text-orange-500">Blog</a>
          //        <a href="#community" className="hover:text-orange-500">Community</a>
          //        <a href="#signup" className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600">Sign Up</a>
          //      </nav>
          //    </div>
          //  </div>