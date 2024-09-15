"use client";
import { ethers } from "ethers";
import { toast } from "react-toastify";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { FaCircleNotch } from "react-icons/fa";
import Campaign from "../../artifacts/contracts/Campaign.sol/Campaign.json";

function CampaignDetails() {
  const [allDonations, setAllDonations] = useState([]);
  const [myDonations, setMyDonations] = useState([]);
  const [campaign, setCampaign] = useState(null);
  const [loading, setLoading] = useState(true);
  const [amount, setAmount] = useState("");
  const { id } = useParams();

  const fetchCampaignDetails = async () => {
    if (!window.ethereum) {
      toast.error("Please install MetaMask!");
      return;
    }
    try {
      await window.ethereum.request({ method: "eth_requestAccounts" });
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const address = await signer.getAddress();
      const contract = new ethers.Contract(id, Campaign.abi, signer);

      const title = await contract.title();
      const description = await contract.description();
      const requiredAmount = await contract.requiredAmount();
      const receivedAmount = await contract.receivedAmount();
      const owner = await contract.owner();

      setCampaign({
        title,
        description,
        requiredAmount: ethers.formatEther(requiredAmount),
        receivedAmount: ethers.formatEther(receivedAmount),
        owner,
      });

      const Donations = contract.filters.Donated();
      const allDonationEvents = await contract.queryFilter(Donations);
      const allDonationsList = allDonationEvents.map((donation) => ({
        amount: ethers.formatEther(donation.args.amount),
        donor: donation.args.donor,
        date: new Date(
          parseInt(donation.args.timestamp) * 1000
        ).toLocaleString(),
      }));

      const myDonationsList = allDonationsList.filter(
        (donation) => donation.donor.toLowerCase() === address.toLowerCase()
      );

      setAllDonations(allDonationsList);
      setMyDonations(myDonationsList);
      setLoading(false);
    } catch (error) {
      toast.error("Failed to fetch campaign details");
      console.error(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCampaignDetails();
  }, [id]);

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
      setAmount("");
      fetchCampaignDetails(); // Re-fetch details after donation
    } catch (error) {
      toast.error("Failed to donate to campaign");
      console.error(error);
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

  const progress = (campaign.receivedAmount / campaign.requiredAmount) * 100;

  return (
    <div className="bg-orange-100 p-4 md:p-10 min-h-screen">
      <h1 className="text-2xl md:text-3xl text-center font-bold mb-6 md:mb-8 text-gray-800">
        Campaign Details
      </h1>
      <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-xl overflow-hidden">
        <div className="p-6 md:p-8">
          <h2 className="text-lg md:text-2xl font-semibold text-center mb-4 text-gray-800">
            {campaign.title}
          </h2>
          <p className="mb-4 md:mb-6 text-gray-600 text-sm md:text-lg text-center">
            {campaign.description}
          </p>

          <div className="mb-4">
            <div className="flex flex-col items-center">
              <span className="text-gray-700 font-semibold">
                Funding Goal:{" "}
                <span className="font-bold">{campaign.requiredAmount} ETH</span>
              </span>
              <span className="text-gray-700 font-semibold mt-2">
                Current Funding:{" "}
                <span className="font-bold">{campaign.receivedAmount} ETH</span>
              </span>
              <div className="w-full bg-gray-200 rounded-full h-4 mt-4">
                <div
                  className="bg-orange-500 h-4 rounded-full transition-all duration-500"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
              <span className="text-gray-600 text-sm mt-2">
                {progress.toFixed(2)}% of goal reached
              </span>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="font-semibold text-gray-800 mb-4 text-center">
              Donate to this campaign
            </h3>
            <div className="flex flex-col md:flex-row justify-center items-center">
              <input
                type="text"
                className="border border-gray-300 rounded-l-lg py-2 px-4 w-full md:w-auto mb-4 md:mb-0 md:mr-2 focus:outline-none focus:ring focus:ring-orange-500"
                placeholder="Enter amount in ETH"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
              <button
                className="bg-orange-500 text-white py-2 px-4 w-full md:w-auto rounded-r-lg hover:bg-orange-600"
                onClick={Donate}
              >
                Donate
              </button>
            </div>
          </div>

          {/* My Donations Table */}
          <div className="mt-10 overflow-x-auto">
            <h3 className="md:text-lg font-semibold text-center mb-4">
              My Donations
            </h3>
            <table className="min-w-full bg-white border border-gray-200">
              <thead>
                <tr>
                  <th className="py-1 px-4 border-b">Amount (ETH)</th>
                  <th className="py-1 px-4 border-b">Date</th>
                </tr>
              </thead>
              <tbody>
                {myDonations.length > 0 ? (
                  myDonations.map((donation, index) => (
                    <tr key={index}>
                      <td className="py-2 px-4 border-b text-center">
                        {donation.amount}
                      </td>
                      <td className="py-2 px-4 border-b text-center">
                        {donation.date}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="2" className="py-4 text-center">
                      No donations yet
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* All Donations Table */}
          <div className="mt-10 overflow-x-auto">
            <h3 className="text-lg font-semibold text-center mb-4">
              All Donations
            </h3>
            <table className="min-w-full bg-white border border-gray-200">
              <thead>
                <tr>
                  <th className="py-1 px-2 border-b">Donor</th>
                  <th className="py-1 px-2 border-b">Amount (ETH)</th>
                  <th className="py-1 px-2 border-b">Date</th>
                </tr>
              </thead>
              <tbody>
                {allDonations.length > 0 ? (
                  allDonations.map((donation, index) => (
                    <tr key={index}>
                      <td className="py-2 px-4 border-b">{donation.donor}</td>
                      <td className="py-2 px-4 border-b text-center">
                        {donation.amount}
                      </td>
                      <td className="py-2 px-4 border-b">{donation.date}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3" className="py-4 text-center">
                      No donations yet
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CampaignDetails;
