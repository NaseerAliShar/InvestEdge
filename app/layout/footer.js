import React from "react";
import Link from "next/link";
import {
  FaGithub,
  FaFacebook,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-700 text-white py-4">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-left">
          {/* Logo text */}
          <div className="mb-6 md:mb-0">
            <h1 className="text-2xl font-bold">
              Invest<span className="text-orange-500">Edge</span>
            </h1>
            <p className="text-sm mt-1">
              Empowering your investments with cutting-edge technology.
            </p>
          </div>

          {/* Social media icons */}
          <div className="mb-6 md:mb-0">
            <p className="text-xl font-semibold mb-2 text-center">
              Let's Connect
            </p>
            <div className="flex justify-center space-x-5">
              <Link
                href="https://www.facebook.com"
                aria-label="Facebook"
                target="_blank"
              >
                <FaFacebook className="text-white hover:text-orange-500 w-5 h-5" />
              </Link>
              <Link
                href="https://www.instagram.com"
                aria-label="Instagram"
                target="_blank"
              >
                <FaInstagram className="text-white hover:text-orange-500 w-5 h-5" />
              </Link>
              <Link
                href="https://www.linkedin.com/in/NaseerAliShar"
                aria-label="LinkedIn"
                target="_blank"
              >
                <FaLinkedinIn className="text-white hover:text-orange-500 w-5 h-5" />
              </Link>
              <Link
                href="https://www.github.com/NaseerAliShar"
                aria-label="GitHub"
                target="_blank"
              >
                <FaGithub className="text-white hover:text-orange-500 w-5 h-5" />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div className="text-center md:text-center">
            <p className="text-lg font-bold">Quick Links</p>
            <ul className="mt-2">
              <li className="mb-2">
                <Link href="/" className="hover:text-orange-500">
                  Home
                </Link>
              </li>
              <li className="mb-2">
                <Link href="/pages/about" className="hover:text-orange-500">
                  About Us
                </Link>
              </li>
              <li className="mb-2">
                <Link href="/pages/contact" className="hover:text-orange-500">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer bottom */}
        <div className="border-t border-orange-500 mt-4 pt-4">
          <p className="text-sm text-center">
            &copy; 2024 InvestEdge. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
