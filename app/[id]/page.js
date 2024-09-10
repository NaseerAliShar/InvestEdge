"use client";
import { ethers } from "ethers";
import { toast } from "react-toastify";
import { useParams } from "next/navigation";
import { FaCircleNotch } from "react-icons/fa";
import React, { useEffect, useState } from "react";
import Campaign from "../../artifacts/contracts/Campaign.sol/Campaign.json";

function CampaignDetails() {
  const [campaign, setCampaign] = useState(null);
  const [loading, setLoading] = useState(true);
  const [amount, setAmount] = useState(""); // State to handle donation input
  const { id } = useParams();

  // Fetch campaign details
  useEffect(() => {
    const fetchCampaignDetails = async () => {
      if (!window.ethereum) {
        toast.error("Please install MetaMask!");
        return;
      }

      try {
        await window.ethereum.request({ method: "eth_requestAccounts" });
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();

        // Fetch campaign details from the smart contract
        const contract = new ethers.Contract(id, Campaign.abi, signer);
        const title = await contract.title();
        const description = await contract.description();
        const requiredAmount = await contract.requiredAmount();
        const receivedAmount = await contract.receivedAmount();
        const owner = await contract.owner();

        // Set campaign data
        setCampaign({
          title,
          description,
          requiredAmount: ethers.formatEther(requiredAmount),
          receivedAmount: ethers.formatEther(receivedAmount),
          owner,
        });

        // Fetch donations and log them
        const Donations = contract.filters.Donated();
        const AllDonations = await contract.queryFilter(Donations);
        const ListDonations = AllDonations.map((donation) => ({
          amount: ethers.formatEther(donation.args.amount),
          donor: donation.args.donor,
          date: new Date(donation.args.date.toNumber() * 1000).toLocaleString(),
        }));
        console.log("List of Donations:", ListDonations);

        setLoading(false);
      } catch (error) {
        toast.error("Failed to fetch campaign details");
        console.error("Error fetching campaign details:", error);
        setLoading(false);
      }
    };
    fetchCampaignDetails();
  }, [id]);

  // Handle donation transaction
  const Donate = async () => {
    if (!amount || isNaN(amount)) {
      toast.error("Please enter a valid donation amount");
      return;
    }
    try {
      await window.ethereum.request({ method: "eth_requestAccounts" });
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();

      const contract = new ethers.Contract(id, Campaign.abi, signer);
      const transaction = await contract.donate({
        value: ethers.parseEther(amount),
      });
      await transaction.wait();
      toast.success("Donation successful!");
      setAmount(""); // Clear the input after donation
    } catch (error) {
      toast.error("Failed to donate to campaign");
      console.error("Error donating to campaign:", error);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <FaCircleNotch size={80} className="animate-spin text-orange-500" />
      </div>
    );
  }

  if (!campaign) {
    return (
      <div className="text-orange-800 h-screen text-center p-10">
        Campaign not found
      </div>
    );
  }

  return (
    <div className="bg-orange-100 p-10 min-h-screen">
      <h1 className="text-3xl text-center font-bold mb-8 text-gray-800">
        Campaign Details
      </h1>
      <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-xl overflow-hidden">
        <div className="p-8">
          <h2 className="text-2xl font-semibold text-center mb-4 text-gray-800">
            {campaign.title}
          </h2>
          <p className="mb-6 text-gray-600 text-center">
            {campaign.description}
          </p>
          <div className="flex flex-col items-center mb-6">
            <span className="text-gray-700 font-semibold">
              Funding Goal:{" "}
              <span className="font-bold">{campaign.requiredAmount} ETH</span>
            </span>
            <span className="text-gray-700 font-semibold mt-2">
              Current Funding:{" "}
              <span className="font-bold">{campaign.receivedAmount} ETH</span>
            </span>
          </div>
          <div className="flex flex-col items-center mb-6">
            <h3 className="text-gray-700 font-semibold">Campaign Deadline</h3>
            <span className="text-gray-500">
              {new Date().toLocaleDateString()}
            </span>
          </div>
          <div className="mb-6">
            <h3 className="font-semibold text-gray-800 mb-2 text-center">
              Campaign Progress
            </h3>
            <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
              <div
                className="bg-orange-500 h-3 rounded-full"
                style={{
                  width: `${
                    (campaign.receivedAmount / campaign.requiredAmount) * 100
                  }%`,
                }}
              ></div>
            </div>
            <p className="text-center text-gray-700 font-semibold">
              {(
                (campaign.receivedAmount / campaign.requiredAmount) *
                100
              ).toFixed(2)}
              % funded
            </p>
          </div>
          <div className="mb-6">
            <h3 className="font-semibold text-gray-800 mb-4 text-center">
              Donate to this campaign
            </h3>
            <div className="flex justify-center">
              <input
                type="text"
                className="border border-gray-300 rounded-l-lg py-2 px-4 focus:outline-none focus:ring focus:ring-orange-500"
                placeholder="Enter amount in ETH"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
              <button
                className="bg-orange-500 text-white py-2 px-4 rounded-r-lg hover:bg-orange-600"
                onClick={Donate}
              >
                Donate
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CampaignDetails;
