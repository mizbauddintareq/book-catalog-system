import React from "react";
import {
  FaFacebookF,
  FaLinkedinIn,
  FaMedium,
  FaQuora,
  FaTwitter,
} from "react-icons/fa";
import logo from "../assets/logo.png";

const Footer: React.FC = () => {
  return (
    <footer className=" text-slate-950 py-10 border-y-2">
      <div className="container mx-auto px-4 flex flex-col lg:flex-row items-center justify-center lg:justify-between">
        <div className="text-center lg:text-left">
          <img src={logo} alt="The Book Oasis Ltd." className="w-20 mb-4" />
          <p className="font-serif font-bold uppercase ">
            Book Catalog System.
          </p>
          <p className="">Explore our vast collection of book.</p>
        </div>
        <div className="mt-4 lg:mt-0">
          <p className="font-serif font-bold uppercase mb-6">
            get in touch on social media.
          </p>
          <div className="flex gap-4 text-2xl">
            <FaFacebookF className="cursor-pointer" />
            <FaTwitter className="cursor-pointer " />
            <FaLinkedinIn className="cursor-pointer " />
            <FaQuora className="cursor-pointer " />
            <FaMedium className="cursor-pointer " />
          </div>
        </div>
      </div>
      <div className="mt-8 text-center">
        <p>&copy; 2023 - All rights reserved by Mizba Uddin Tareq</p>
      </div>
    </footer>
  );
};

export default Footer;
