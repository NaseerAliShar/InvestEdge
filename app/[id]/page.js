"use client";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import ContributionForm from "../components/contribution-form";

function CampaignDetails() {
  const { id } = useParams(); // Get the id param from the URL
  const [campaign, setCampaign] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          `https://66912b2926c2a69f6e8ebc93.mockapi.io/InvestEdge/campaigns/${id}`
        );
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await res.json();
        setCampaign(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleUpdateFunding = (updatedFunding) => {
    setCampaign((prevCampaign) => ({
      ...prevCampaign,
      currentFunding: updatedFunding,
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
                <span className="font-bold">${campaign.fundingGoal}</span>
              </p>
              <p className="text-gray-700">
                Current Funding:{" "}
                <span className="font-bold">${campaign.currentFunding}</span>
              </p>
            </div>
            <div className="mb-4">
              <h3 className="font-semibold text-gray-800">Campaign Deadline</h3>
              <p className="text-gray-700">
                {new Date(campaign.deadline).toLocaleDateString()}
              </p>
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
                      (campaign.currentFunding / campaign.fundingGoal) * 100
                    }%`,
                  }}
                ></div>
              </div>
              <p className="text-gray-700 mt-2">
                {(
                  (campaign.currentFunding / campaign.fundingGoal) *
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
