import logo from "../assets/Vector_Book_blue.svg.png";
import { FaFacebookF, FaTwitter, FaWhatsapp } from "react-icons/fa6";

export default function Footer() {
  return (
    <footer className="footer footer-center p-10 bg-gray-800 text-white">
      <div>
        <img src={logo} alt="" className="w-16" />
        <p className="font-bold">
          The Book Oasis Ltd. <br />
          Providing Service since 2021
        </p>
        <p>Copyright © 2023 - All right reserved</p>
      </div>
      <div>
        <div className="grid grid-flow-col gap-4 text-2xl">
          <FaFacebookF className="cursor-pointer" />
          <FaTwitter className="cursor-pointer" />
          <FaWhatsapp className="cursor-pointer" />
        </div>
      </div>
    </footer>
  );
}
