"use client";
import Web3 from "web3";
import Link from "next/link";
import { useState } from "react";
import { toast } from "react-toastify";
import { usePathname } from "next/navigation";
import { FaBars, FaTimes } from "react-icons/fa";

const Header = () => {
  const path = usePathname();
  const [account, setAccount] = useState(null);
  const [balance, setBalance] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const connectWallet = async () => {
    if (!window.ethereum) {
      toast.error("MetaMask is not installed");
      return;
    }

    if (account) {
      toast.info("Wallet already connected");
      return;
    }

    try {
      const web3 = new Web3(window.ethereum);
      await window.ethereum.request({ method: "eth_requestAccounts" });
      const accounts = await web3.eth.getAccounts();
      const balance = await web3.eth.getBalance(accounts[0]);

      setAccount(accounts[0]);
      setBalance(web3.utils.fromWei(balance, "ether"));
      toast.success(`Wallet connected successfully`);
    } catch (error) {
      console.error("Error connecting to MetaMask:", error);
      toast.error("Failed to connect wallet");
    }
  };

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen); // Toggle menu function

  return (
    <>
      <div className="flex justify-between items-center bg-white px-6 md:px-10 h-20 shadow-md relative z-10">
        {/* Logo */}
        <div className="text-2xl md:text-3xl font-semibold">
          Invest
          <span className="text-orange-500">
            <Link href="/">Edge</Link>
          </span>
        </div>

        {/* Toggle Button for Mobile */}
        <div className="md:hidden">
          <button onClick={toggleMenu}>
            {isMenuOpen ? <FaTimes size={28} /> : <FaBars size={28} />}
          </button>
        </div>

        {/* Navigation Links */}
        <div
          className={`absolute top-20 left-0 w-full bg-white shadow-md md:static md:bg-transparent md:shadow-none transition-all duration-300 ease-in-out ${
            isMenuOpen ? "block" : "hidden md:block"
          }`}
        >
          <ul className="flex flex-col md:flex-row gap-6 p-4 md:p-0 text-lg md:text-xl justify-center md:justify-center">
            <li>
              <Link
                className={`transition-all duration-300 ease-in-out hover:text-orange-500 hover:scale-110 ${
                  path === "/"
                    ? "text-orange-500 font-semibold"
                    : "text-gray-800"
                }`}
                href="/"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                className={`transition-all duration-300 ease-in-out hover:text-orange-500 hover:scale-110 ${
                  path === "/pages/campaigns"
                    ? "text-orange-500 font-semibold"
                    : "text-gray-800"
                }`}
                href="/pages/campaigns"
              >
                Campaigns
              </Link>
            </li>
            <li>
              <Link
                className={`transition-all duration-300 ease-in-out hover:text-orange-500 hover:scale-110 ${
                  path === "/pages/about"
                    ? "text-orange-500 font-semibold"
                    : "text-gray-800"
                }`}
                href="/pages/about"
              >
                About
              </Link>
            </li>
            <li>
              <Link
                className={`transition-all duration-300 ease-in-out hover:text-orange-500 hover:scale-110 ${
                  path === "/pages/contact"
                    ? "text-orange-500 font-semibold"
                    : "text-gray-800"
                }`}
                href="/pages/contact"
              >
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Wallet Connect Button (Hidden on Mobile) */}
        <div className="hidden md:block">
          <button
            className={`${
              account ? "bg-green-500 px-2" : "bg-orange-500 w-32 py-2"
            } text-white rounded transition duration-300 ease-in-out transform hover:scale-105`}
            onClick={connectWallet}
          >
            {account ? (
              <span>
                <div>({balance.substring(0, 6)} ETH)</div>
                {account.substring(0, 9)}...
                {account.substring(account.length - 4)}
              </span>
            ) : (
              "Connect Wallet"
            )}
          </button>
        </div>
      </div>

      {/* Wallet Connect Button for Mobile (Visible when menu is open) */}
      {isMenuOpen && (
        <div className="md:hidden mt-4 px-6">
          <button
            className={`${
              account ? "bg-green-500 px-4" : "bg-orange-500 p-2"
            } text-white rounded transition duration-300 ease-in-out transform hover:scale-105`}
            onClick={connectWallet}
          >
            {account ? (
              <span>
                <div>({balance.substring(0, 6)} ETH)</div>
                {account.substring(0, 9)}...
                {account.substring(account.length - 4)}
              </span>
            ) : (
              "Connect Wallet"
            )}
          </button>
        </div>
      )}

      <div className="border-b border-gray-300"></div>
    </>
  );
};

export default Header;
