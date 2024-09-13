import React from "react";
import Link from "next/link";
import {
  FaGithub,
  FaTwitter,
  FaFacebook,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";
function ContactUs() {
  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center py-12">
      <div className="max-w-3xl w-full px-4">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-8 text-gray-800">
          Contact Us
        </h1>
        <p className="text-lg md:text-xl text-center mb-8 text-gray-600">
          We would love to hear from you! Whether you have questions, feedback,
          or need support, feel free to reach out to us through the form below
          or contact us via social media.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
          <div className="bg-white p-4 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold text-gray-800 mb-2 text-center">
              Get in Touch
            </h2>
            <form
              action="https://formspree.io/f/your-form-id" // Replace with your Formspree form endpoint or other form handling service
              method="POST"
              className="space-y-2"
            >
              <div>
                <label htmlFor="name" className="block text-gray-700 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="w-full p-2 border border-gray-300 rounded-lg"
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="w-full p-2 border border-gray-300 rounded-lg"
                  required
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-gray-700 mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows="4"
                  className="w-full p-2 border border-gray-300 rounded-lg"
                  required
                ></textarea>
              </div>
              <button
                type="submit"
                className="bg-orange-500 text-white py-2 px-4 w-full rounded-lg shadow hover:bg-orange-600 transition"
              >
                Send Message
              </button>
            </form>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
              Our Contact Information
            </h2>
            <p className="text-gray-600 mb-4">
              <strong>Address:</strong> 123 Blockchain Ave, Crypto City, ETH 101
            </p>
            <p className="text-gray-600 mb-4">
              <strong>Email:</strong> support@investedge.com
            </p>
            <p className="text-gray-600 mb-4">
              <strong>Phone:</strong> +1 (234) 567-890
            </p>
            <div className="flex justify-center space-x-4 mt-4">
              <Link
                href="https://www.facebook.com"
                aria-label="Facebook"
                target="_blank"
              >
                <FaFacebook className="hover:text-orange-700 w-6 h-6" />
              </Link>
              <Link href="https://www.twitter.com" aria-label="Twitter">
                <FaTwitter
                  className="hover:text-orange-700 w-6 h-6"
                  target="_blank"
                />
              </Link>
              <Link href="https://www.instagram.com" aria-label="Instagram">
                <FaInstagram
                  className="hover:text-orange-700 w-6 h-6"
                  target="_blank"
                />
              </Link>
              <Link
                href="https://www.linkedin.com/in/NaseerAliShar"
                aria-label="Instagram"
                target="_blank"
              >
                <FaLinkedinIn className="hover:text-orange-700 w-6 h-6" />
              </Link>
              <Link
                href="https://www.github.com/NaseerAliShar"
                aria-label="Instagram"
                target="_blank"
              >
                <FaGithub className="hover:text-orange-700 w-6 h-6" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactUs;
