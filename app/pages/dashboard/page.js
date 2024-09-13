"use client";
import "dotenv/config";
import { ethers } from "ethers";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import CampaignFactory from "../../../artifacts/contracts/Campaign.sol/CampaignFactory.json";
import Campaign from "../../../artifacts/contracts/Campaign.sol/Campaign.json";
import Link from "next/link";

function Dashboard() {
  const [startedCampaigns, setStartedCampaigns] = useState([]);
  const [contributedCampaigns, setContributedCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // MetaMask connection
        if (!window.ethereum) {
          toast.error("Please install MetaMask!");
          return;
        }
        await window.ethereum.request({ method: "eth_requestAccounts" });
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const address = await signer.getAddress();

        // Contract connection
        const factoryContract = new ethers.Contract(
          process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
          CampaignFactory.abi,
          provider
        );

        // Fetch all campaigns
        const AllCampaigns = factoryContract.filters.CampaignCreated();
        const allEvents = await factoryContract.queryFilter(AllCampaigns);
        const allCampaigns = allEvents.map((event) => ({
          id: event.args.campaignAddress,
          title: event.args.title,
          owner: event.args.owner,
          amount: ethers.formatEther(event.args.requiredAmount),
          date: parseInt(event.args.timestamp) * 1000, // Convert to milliseconds
        }));

        // Fetch started campaigns (campaigns where the user is the owner)
        const started = allCampaigns.filter(
          (campaign) => campaign.owner.toLowerCase() === address.toLowerCase()
        );
        setStartedCampaigns(started);

        // Fetch contributed campaigns (campaigns where the user donated)
        const contributed = [];
        for (let campaign of allCampaigns) {
          const campaignContract = new ethers.Contract(
            campaign.id,
            Campaign.abi,
            signer
          );

          // Fetch donations for this campaign
          const donationEvents = await campaignContract.queryFilter(
            campaignContract.filters.Donated(address)
          );

          if (donationEvents.length > 0) {
            contributed.push({
              ...campaign,
              donations: donationEvents.map((event) => ({
                amount: ethers.formatEther(event.args.amount),
                date: new Date(parseInt(event.args.timestamp) * 1000),
              })),
            });
          }
        }

        setContributedCampaigns(contributed);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
        toast.error("Failed to fetch dashboard data");
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-orange-600"></div>
      </div>
    );
  }

  return (
    <div className="p-8 bg-orange-50 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-8">My Dashboard</h1>

      {/* Section for Started Campaigns */}
      <div className="mb-16">
        <h2 className="text-2xl font-semibold mb-4 text-center">
          My Campaigns
        </h2>
        {startedCampaigns.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {startedCampaigns.map((campaign, index) => (
              <CampaignCard key={index} campaign={campaign} />
            ))}
          </div>
        ) : (
          <p>No campaigns started yet.</p>
        )}
      </div>

      {/* Section for Contributed Campaigns */}
      <div>
        <h2 className="text-2xl font-semibold mb-4 text-center">
          My Contributions
        </h2>
        {contributedCampaigns.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {contributedCampaigns.map((campaign, index) => (
              <ContributedCampaignCard key={index} campaign={campaign} />
            ))}
          </div>
        ) : (
          <p>No contributions made yet.</p>
        )}
      </div>
    </div>
  );
}

export default Dashboard;

const CampaignCard = ({ campaign }) => {
  const { id, title, owner, amount, date } = campaign;

  return (
    <div className="bg-white shadow-md rounded-lg p-6 text-center">
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-gray-600 mb-2">
        Owner: {owner.substring(0, 8)}...{owner.substring(owner.length - 4)}
      </p>
      <p className="text-gray-600 mb-2">Amount: {amount} ETH</p>
      <p className="text-gray-600 mb-2">
        Date: {new Date(date).toLocaleDateString()}
      </p>
      <Link href={`/${id}`}>
        <button className="bg-orange-500 text-white w-full py-2 rounded-lg mt-4">
          View Campaign
        </button>
      </Link>
    </div>
  );
};

const ContributedCampaignCard = ({ campaign }) => {
  const { id, title, amount, donations } = campaign;

  return (
    <div className="bg-white shadow-md rounded-lg p-6 flex flex-col justify-between h-full text-center">
      <div>
        <h3 className="text-xl font-bold mb-4">{title}</h3>
        <p className="text-gray-600 mb-4">Amount: {amount} ETH</p>
        <h4 className="font-semibold mb-4">Transactions:</h4>

        {/* Table for Donations */}
        <table className="w-full table-auto mb-4 text-center">
          <thead>
            <tr className="text-gray-700 border-b">
              <th className="pb-2">Amount</th>
              <th className="pb-2">Date</th>
            </tr>
          </thead>
          <tbody>
            {donations.map((donation, index) => (
              <tr key={index} className="border-b">
                <td className="py-2">{donation.amount} ETH</td>
                <td className="py-2">{donation.date.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* View Campaign Button fixed at the bottom */}
      <Link href={`/${id}`}>
        <button className="bg-orange-500 text-white w-full py-2 rounded-lg mt-4 self-end">
          View Campaign
        </button>
      </Link>
    </div>
  );
};
