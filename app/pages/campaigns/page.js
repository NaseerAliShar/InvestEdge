"use client";
import { ethers } from "ethers";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import CampaignCard from "../../components/campaign-card";
import CampaignFactory from "../../../artifacts/contracts/Campaign.sol/CampaignFactory.json";
import { Formik, Field } from "formik";

function Campaigns() {
  const [campaigns, setCampaigns] = useState([]);

  // Fetch campaigns based on selected category
  const fetchCampaigns = async (category) => {
    try {
      const provider = new ethers.JsonRpcProvider(
        process.env.NEXT_PUBLIC_RPC_URL
      );
      const contract = new ethers.Contract(
        process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
        CampaignFactory.abi,
        provider
      );

      let filter;
      if (category === "all") {
        filter = contract.filters.CampaignCreated();
      } else {
        filter = contract.filters.CampaignCreated(
          null,
          null,
          null,
          null,
          null,
          category
        );
      }

      const events = await contract.queryFilter(filter);
      const fetchedCampaigns = events.map((event) => ({
        title: event.args.title,
        owner: event.args.owner,
        amount: ethers.formatEther(event.args.requiredAmount),
        date: parseInt(event.args.timestamp) * 1000,
        id: event.args.campaignAddress,
      }));

      setCampaigns(fetchedCampaigns);

      if (fetchedCampaigns.length === 0) {
        toast.info("No campaigns found");
      } else {
        toast.success(
          `${
            category === "all" ? "All" : category
          } campaigns fetched successfully!`
        );
      }
    } catch (error) {
      console.error("Error fetching campaigns:", error);
      toast.error("Failed to fetch campaigns");
    }
  };

  useEffect(() => {
    // Fetch all campaigns initially
    fetchCampaigns("all");
  }, []);

  return (
    <div className="bg-orange-100 min-h-screen flex flex-col items-center py-10">
      <Formik initialValues={{ category: "all" }} onSubmit={() => {}}>
        {({ setFieldValue }) => (
          <div className="mb-6">
            <Field
              as="select"
              name="category"
              className="p-2 border border-gray-300 rounded-md"
              onChange={(e) => {
                const selectedCategory = e.target.value;
                setFieldValue("category", selectedCategory);
                fetchCampaigns(selectedCategory); // Fetch campaigns based on selected category
              }}
            >
              <option value="all">All</option>
              <option value="arts">Arts</option>
              <option value="music">Music</option>
              <option value="health">Health</option>
              <option value="finance">Finance</option>
              <option value="education">Education</option>
            </Field>
          </div>
        )}
      </Formik>

      {/* Campaigns Section */}
      <div className="w-full">
        <h1 className="text-center text-2xl md:text-3xl font-bold text-black mb-8">
          Campaigns ({campaigns.length})
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-8 px-6 md:px-10">
          {campaigns.length > 0 ? (
            campaigns.map((campaign, index) => (
              <CampaignCard key={index} campaign={campaign} />
            ))
          ) : (
            <p className="text-center text-gray-500 col-span-full">
              No campaigns found.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Campaigns;
