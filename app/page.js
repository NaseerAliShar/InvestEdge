"use client";
import "dotenv/config";
import Link from "next/link";
import Typed from "typed.js";
import { ethers } from "ethers";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import CreateCampaign from "./components/create-campaign";
import CampaignFactory from "../artifacts/contracts/Campaign.sol/CampaignFactory.json";

function Home() {
  const [campaigns, setCampaigns] = useState([]);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    // Typed.js initialization
    const typed = new Typed(".typed", {
      strings: ["Welcome to InvestEdge", "Invest in Your Future"],
      typeSpeed: 50,
      backSpeed: 50,
      loop: true,
    });

    // Cleanup Typed.js instance on unmount
    return () => {
      if (typed && typeof typed.destroy === "function") {
        typed.destroy();
      }
    };
  }, []);

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const provider = new ethers.JsonRpcProvider(
          process.env.NEXT_PUBLIC_RPC_URL
        );
        const contract = new ethers.Contract(
          process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
          CampaignFactory.abi,
          provider
        );

        // Get all campaign creation events
        const AllCampaigns = contract.filters.CampaignCreated();
        const AllEvents = await contract.queryFilter(AllCampaigns);
        const Campaigns = AllEvents.map((event) => ({
          title: event.args.title,
          owner: event.args.owner,
          amount: ethers.formatEther(event.args.requiredAmount), // Format amount
          date: parseInt(event.args.timestamp) * 1000, // Convert to milliseconds
          id: event.args.campaignAddress,
        }));
        toast.success("Campaigns fetched successfully!");
        setCampaigns(Campaigns);

        console.log("All Campaigns: ", AllCampaigns);
        console.log("All Events:  ", AllEvents);
        console.log("Campaigns: ", Campaigns);
      } catch (error) {
        console.error("Error fetching campaigns:", error);
        toast.error("Failed to fetch campaigns");
      }
    };
    fetchCampaigns();
  }, []);

  return (
    <div>
      {/* Hero Section */}
      <div className="flex flex-col md:flex-row h-screen py-10 bg-[url('https://images.unsplash.com/photo-1519995451813-39e29e054914?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')] bg-cover bg-center">
        {/* Left Section */}
        <div className="w-full md:w-1/2 p-6 md:p-10">
          <span className="typed text-xl md:text-2xl text-gray-700 font-semibold"></span>
          <h1 className="text-xl md:text-3xl text-gray-700 font-semibold mt-4">
            Empower Your Future with
            <span className="text-orange-600 font-bold"> InvestEdge</span>
          </h1>
          <button
            className="bg-orange-500 p-2 text-white my-5 rounded text-lg md:text-xl w-full md:w-auto"
            onClick={() => setShowPopup(!showPopup)}
          >
            Start a Project
          </button>
        </div>

        {/* Right Section */}
        <div className="w-full md:w-1/2 p-6">
          {showPopup && (
            <div className="popup bg-white p-4 rounded shadow-lg max-w-sm mx-auto">
              <CreateCampaign />
            </div>
          )}
        </div>
      </div>

      {/* Campaigns Section */}
      <div className="bg-orange-50 h-max py-10">
        <h1 className="text-center text-xl md:text-2xl font-semibold">
          All Campaigns ({campaigns.length})
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-3 gap-6 p-6 md:p-10">
          {campaigns.map((campaign, index) => (
            <CampaignCard key={index} campaign={campaign} id={index} />
          ))}
        </div>
      </div>
    </div>
  );
}
export default Home;

const CampaignCard = ({ campaign }) => {
  const { id, title, owner, amount, date } = campaign;

  return (
    <div className="flex flex-col justify-between bg-white shadow-lg rounded-xl overflow-hidden transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl">
      <div className="p-6 flex-grow">
        <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4 leading-snug tracking-tight">
          {title}
        </h2>
        <div className="mb-6 flex items-center">
          <span className="inline-block bg-orange-500 text-white text-xs px-4 py-1 rounded-full">
            {owner.substring(0, 8)}...{owner.substring(owner.length - 4)}
          </span>
          <span className="ml-4 text-xs text-gray-500">Owner</span>
        </div>
        <div className="mb-6">
          <span className="text-gray-700 font-semibold block">
            Required Amount:
          </span>
          <span className="text-xl font-bold text-gray-900">{amount} ETH</span>
        </div>
        <div className="text-gray-600 text-sm">
          <span className="block text-gray-700 font-semibold">Date:</span>
          <span>{new Date(date).toLocaleString()}</span>
        </div>
      </div>
      <Link href={`/${id}`}>
        <button className="bg-gradient-to-r from-orange-400 to-orange-600 text-white py-3 px-5 w-full rounded-b-xl font-semibold transition-colors duration-300 hover:from-orange-500 hover:to-orange-700">
          View Campaign
        </button>
      </Link>
    </div>
  );
};
