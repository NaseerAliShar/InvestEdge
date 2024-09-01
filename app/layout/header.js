"use client";
import Web3 from "web3";
import Link from "next/link";
import { useState } from "react";
import { toast } from "react-toastify";
import { usePathname } from "next/navigation";

const Header = () => {
  const path = usePathname();
  const [account, setAccount] = useState(null);
  const [balance, setBalance] = useState(null);

  const connectWallet = async () => {
    if (!window.ethereum) {
      toast.error("MetaMask is not installed");
      return;
    }

    try {
      const web3 = new Web3(window.ethereum);
      await window.ethereum.request({ method: "eth_requestAccounts" });
      const accounts = await web3.eth.getAccounts();
      const balance = await web3.eth.getBalance(accounts[0]);

      setAccount(accounts[0]);
      setBalance(web3.utils.fromWei(balance, "ether"));
      toast.success(`Connected to MetaMask: ${accounts[0]}`);
    } catch (error) {
      console.error("Error connecting to MetaMask:", error);
      toast.error("Failed to connect wallet");
    }
  };

  return (
    <>
      <div className="flex justify-between items-center bg-white px-10 h-20 shadow-md">
        <div className="text-3xl font-semibold">
          Invest
          <span className="text-orange-500">
            <Link href="/">Edge</Link>
          </span>
        </div>
        <div>
          <ul className="flex gap-6 text-xl">
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
        <div>
          <button
            className={`${
              account ? "bg-green-500 px-4" : "bg-orange-500 p-2"
            } text-white rounded-lg transition-all duration-300 ease-in-out hover:scale-110`}
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
      <div className="border-b border-gray-300"></div>
    </>
  );
};

export default Header;
