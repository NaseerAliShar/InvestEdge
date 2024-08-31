import React from "react";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="flex justify-around items-center bg-orange-500 text-white py-2">
      <div>
        <p>&copy; 2024 InvestEdge. All rights reserved.</p>
      </div>
      <div>
        <p className="text-center mb-5">Follow Us</p>
        <div className="flex gap-2"></div>
      </div>
      <div>
        <nav>
          <ul>
            <p>Quick Links</p>
            <li>
              <Link href="/" className="hover:text-orange-800">
                Home
              </Link>
            </li>
            <li>
              <Link href="/pages/about" className="hover:text-orange-800">
                About Us
              </Link>
            </li>
            <li>
              <Link href="/pages/contact" className="hover:text-orange-800">
                Contact Us
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
