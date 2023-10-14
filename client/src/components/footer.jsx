import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-[#cfd4db] text-gray-800">
      <div className="container mx-auto py-4 px-6">
        <div className="flex justify-between items-center">
          <p className="text-sm">&copy; 2023 All rights reserved.</p>
          <div>
            <Link to="/" className="text-gray-900 hover:text-gray-400 mx-2">
              Home
            </Link>
            <Link to="/about" className="text-gray-900 hover:text-gray-400 mx-2">
              About
            </Link>
            <Link to="/course" className="text-gray-900 hover:text-gray-400 mx-2">
              course
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
