import React from "react";
import heroBg from "../assets/hero.jpg";

const Hero: React.FC = () => {
  return (
    <section className="bg-gray-100 py-20">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center justify-center text-center lg:text-left">
          <div className="lg:w-1/2">
            <img
              className="w-full rounded-lg shadow-lg mb-8"
              src={heroBg}
              alt="Book Catalog System"
            />
          </div>
          <div className="lg:w-1/2 lg:pl-16">
            <h1 className="text-4xl lg:text-6xl text-slate-950 font-bold mb-6">
              Welcome to Book Catalog System
            </h1>
            <p className="text-xl lg:text-2xl text-slate-950 mb-8">
              Explore our vast collection of books and discover your next
              favorite read.
            </p>
            <button className="bg-slate-950 text-gray-100 font-bold py-3 px-6 rounded-lg shadow-lg transition-colors duration-300">
              Get Started
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
