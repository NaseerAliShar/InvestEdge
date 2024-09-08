"use client";
import "dotenv/config";
import Link from "next/link";
import Typed from "typed.js";
import { ethers } from "ethers";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import CreateCampaign from "./components/create-campaign";
import CampaignFactory from "../artifacts/contracts/Campaign.sol/CampaignFactory.json";

export default Home = () => {
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

    // Cleanup to destroy the instance on unmount
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
        const campaignCreatedFilter = contract.filters.CampaignCreated();
        const campaignEvents = await contract.queryFilter(
          campaignCreatedFilter
        );

        const fetchedCampaigns = campaignEvents.map((event) => ({
          title: event.args.title,
          description: event.args.description,
          category: event.args.category,
          owner: event.args.owner,
          requiredAmount: ethers.formatEther(event.args.requiredAmount), // Format amount
          date: event.args.timestamp, // Ensure this is a BigNumber or valid timestamp
        }));
        console.log(fetchedCampaigns);
        setCampaigns(fetchedCampaigns);
        toast.success("Campaigns fetched successfully!");
      } catch (error) {
        console.error("Error fetching campaigns:", error);
        toast.error("Failed to fetch campaigns");
      }
    };
    fetchCampaigns();
  }, []);

  return (
    <div>
      <div className="flex flex-wrap h-screen py-10 bg-[url('https://images.unsplash.com/photo-1519995451813-39e29e054914?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')] bg-cover bg-center">
        <div className="w-1/2 p-10">
          <span className="typed text-2xl text-gray-700 font-semibold"></span>
          <h1 className="text-2xl text-gray-700 font-semibold">
            Empower Your Future with
            <span className="text-orange-600 font-bold"> InvestEdge</span>
          </h1>
          <button
            className="bg-orange-500 p-2 text-white my-5 rounded text-xl"
            onClick={() => setShowPopup(!showPopup)}
          >
            Start a Project
          </button>
        </div>
        <div className="w-1/2">
          {showPopup && (
            <div className="popup">
              <CreateCampaign />
            </div>
          )}
        </div>
      </div>

      <div className="bg-orange-50 h-max">
        <h1 className="text-center pt-5 text-2xl font-semibold">
          All Campaigns ({campaigns.length})
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-10">
          {campaigns.map((campaign, index) => (
            <CampaignCard key={index} campaign={campaign} id={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

const CampaignCard = ({ campaign, id }) => {
  return (
    <div className="flex flex-col justify-between bg-white shadow-lg rounded-lg overflow-hidden transform transition-transform duration-300 hover:scale-105">
      <div className="p-6 flex-grow">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          {campaign.title}
        </h2>
        <p className="text-gray-600 mb-4">{campaign.description}</p>
        <div className="mb-4">
          <span className="inline-block bg-orange-500 text-white text-xs px-3 py-1 rounded-full">
            {campaign.category}
          </span>
        </div>
        <div className="mb-4">
          <span className="text-gray-700 font-medium">Required Amount: </span>
          <span className="text-gray-900">${campaign.requiredAmount}</span>
        </div>
        <div className="text-gray-600 text-sm">
          <span>Date: </span>
          {campaign.date}
        </div>
      </div>
      <Link href={`/${id}`}>
        <button className="bg-orange-500 text-white py-2 px-4 w-full rounded-b-lg hover:bg-orange-600">
          Go to Campaign
        </button>
      </Link>
    </div>
  );
};
