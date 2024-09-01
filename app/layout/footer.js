import React from "react";
import Link from "next/link";
import {
  FaGithub,
  FaTwitter,
  FaFacebook,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-orange-500 text-white">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center px-6">
        <div className="mb-4 md:mb-0 text-center">
          <p className="text-lg font-semibold mb-2">Follow Us</p>
          <div className="flex gap-4">
            <Link
              href="https://www.facebook.com"
              aria-label="Facebook"
              target="_blank"
            >
              <FaFacebook className="text-white hover:text-orange-700 w-5 h-5" />
            </Link>
            <Link href="https://www.twitter.com" aria-label="Twitter">
              <FaTwitter
                className="text-white hover:text-orange-700 w-5 h-5"
                target="_blank"
              />
            </Link>
            <Link href="https://www.instagram.com" aria-label="Instagram">
              <FaInstagram
                className="text-white hover:text-orange-700 w-5 h-5"
                target="_blank"
              />
            </Link>
            <Link
              href="https://www.linkedin.com/in/NaseerAliShar"
              aria-label="Instagram"
              target="_blank"
            >
              <FaLinkedinIn className="text-white hover:text-orange-700 w-5 h-5" />
            </Link>
            <Link
              href="https://www.github.com/NaseerAliShar"
              aria-label="Instagram"
              target="_blank"
            >
              <FaGithub className="text-white hover:text-orange-700 w-5 h-5" />
            </Link>
          </div>
        </div>
        <div className="text-center">
          <ul>
            <p className="text-lg font-semibold">Quick Links</p>
            <li className="mb-1">
              <Link href="/" className="hover:text-orange-700">
                Home
              </Link>
            </li>
            <li className="mb-1">
              <Link href="/pages/about" className="hover:text-orange-700">
                About Us
              </Link>
            </li>
            <li className="mb-1">
              <Link href="/pages/contact" className="hover:text-orange-700">
                Contact Us
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-orange-400 mt-2 pt-2">
        <p className="text-sm text-center">
          &copy; 2024 InvestEdge. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
