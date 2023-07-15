import React from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedin,
  FaMedium,
  FaQuora,
  FaTwitter,
} from "react-icons/fa";
import logo from "../assets/Vector_Book_blue.svg.png";

const Footer: React.FC = () => {
  return (
    <footer className="bg-indigo-900 text-white py-10">
      <div className="container mx-auto px-4 flex flex-col lg:flex-row items-center justify-center lg:justify-between">
        <div className="text-center lg:text-left">
          <img src={logo} alt="The Book Oasis Ltd." className="w-16 mb-4" />
          <p className="font-bold text-lg text-indigo-100">
            Book Catalog System
          </p>
          <p className="text-indigo-200">
            Explore our vast collection of books.
          </p>
        </div>
        <div className="mt-4 lg:mt-0">
          <p className="font-bold text-lg text-indigo-100">
            Get in touch on social media
          </p>

          <div className="flex gap-4 mt-8 text-2xl">
            <FaFacebookF className="cursor-pointer text-indigo-200 hover:text-indigo-300" />
            <FaTwitter className="cursor-pointer text-indigo-200 hover:text-indigo-300" />
            <FaInstagram className="cursor-pointer text-indigo-200 hover:text-indigo-300" />
            <FaMedium className="cursor-pointer text-indigo-200 hover:text-indigo-300" />
            <FaQuora className="cursor-pointer text-indigo-200 hover:text-indigo-300" />
            <FaLinkedin className="cursor-pointer text-indigo-200 hover:text-indigo-300" />
          </div>
        </div>
      </div>
      <div className="mt-8 text-center text-indigo-200">
        <p>&copy; 2023 - All rights reserved by Mizba Uddin Tareq</p>
      </div>
    </footer>
  );
};

export default Footer;
