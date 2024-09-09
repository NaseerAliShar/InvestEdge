"use client";
import { ethers } from "ethers";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import ContributionForm from "../components/contribution-form";
import Campaign from "../../artifacts/contracts/Campaign.sol/Campaign.json";

function CampaignDetails() {
  const [campaign, setCampaign] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchCampaignDetails = async () => {
      if (!window.ethereum) {
        alert("Please install MetaMask!");
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
        setLoading(false);
      } catch (error) {
        console.error("Error fetching campaign details:", error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchCampaignDetails();
  }, [id]);

  const handleUpdateFunding = (updatedFunding) => {
    setCampaign((prevCampaign) => ({
      ...prevCampaign,
      receivedAmount: updatedFunding,
    }));
  };

  if (loading) {
    return <div className="text-center p-10">Loading...</div>;
  }

  if (error) {
    return <div className="text-center p-10 text-red-500">Error: {error}</div>;
  }

  if (!campaign) {
    return (
      <div className="text-orange-800 h-screen text-center p-10">
        Campaign not found
      </div>
    );
  }

  return (
    <>
      <div className="bg-orange-100 p-10 min-h-screen">
        <h1 className="text-3xl text-center font-bold mb-8 text-gray-800">
          Campaign Details
        </h1>
        <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
          <div
            className="bg-cover"
            style={{
              backgroundImage: `url(https://source.unsplash.com/random)`,
            }}
          ></div>
          <div className="p-8">
            <h2 className="text-2xl font-semibold text-center mb-4 text-gray-800">
              {campaign.title}
            </h2>
            <p className="mb-4 text-gray-600">{campaign.description}</p>
            <div className="mb-4">
              <h3 className="font-semibold text-gray-800">Funding Details</h3>
              <p className="text-gray-700">
                Funding Goal:{" "}
                <span className="font-bold">{campaign.requiredAmount} ETH</span>
              </p>
              <p className="text-gray-700">
                Current Funding:{" "}
                <span className="font-bold">
                  ${campaign.receivedAmount} ETH
                </span>
              </p>
            </div>
            <div className="mb-4">
              <h3 className="font-semibold text-gray-800">Campaign Deadline</h3>
              <p className="text-gray-700">{Date()}</p>
            </div>
            <div className="mb-4">
              <h3 className="font-semibold text-gray-800 mb-1">
                Campaign Progress
              </h3>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className="bg-orange-500 h-3 rounded-full"
                  style={{
                    width: `${
                      (campaign.receivedAmount / campaign.requiredAmount) * 100
                    }%`,
                  }}
                ></div>
              </div>
              <p className="text-gray-700 mt-2">
                {(
                  (campaign.receivedAmount / campaign.requiredAmount) *
                  100
                ).toFixed(2)}
                % funded
              </p>
            </div>
            <ContributionForm
              campaignId={id}
              updateFunding={handleUpdateFunding}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default CampaignDetails;
