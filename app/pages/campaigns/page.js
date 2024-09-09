"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import CampaignCard from "../../components/campaign-card";

const Campaigns = () => {
  const [campaigns, setCampaigns] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get(
          "https://66912b2926c2a69f6e8ebc93.mockapi.io/InvestEdge/campaigns"
        );
        setCampaigns(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    })();
  }, []);

  return (
    <div className="h-max">
      <h1 className="text-center pt-5 text-xl sm:text-2xl font-semibold">
        All Campaigns ({campaigns.length})
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 px-4 py-5 sm:px-10">
        {campaigns.map((campaign) => (
          <CampaignCard
            id={campaign.id}
            key={campaign.id}
            title={campaign.title}
            description={campaign.description}
            fundingGoal={campaign.fundingGoal}
            currentFunding={campaign.currentFunding}
            deadline={campaign.deadline}
          />
        ))}
      </div>
    </div>
  );
};

export default Campaigns;
