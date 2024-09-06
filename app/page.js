"use client";
import axios from "axios";
import Typed from "typed.js";
import { useEffect, useState } from "react";
import CampaignCard from "./components/campaign-card";
import CreateCampaign from "./components/create-campaign";

const Home = () => {
  const [showPopup, setShowPopup] = useState(false);
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

    // Typed.js initialization
    const typed = new Typed("#element", {
      strings: ["Welcome to InvestEdge"],
      typeSpeed: 100,
      showCursor: true,
    });

    // Cleanup typed instance
    return () => {
      typed.destroy();
    };
  }, []);

  return (
    <div>
      <div className="flex flex-wrap h-screen py-10 bg-[url('https://images.unsplash.com/photo-1519995451813-39e29e054914?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')] bg-cover bg-center">
        <div className="w-1/2 p-10">
          <h1 className="text-2xl text-gray-700 font-semibold">
            <span id="element"></span> <br />
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
              <CreateCampaign setCampaigns={setCampaigns} />
            </div>
          )}
        </div>
      </div>
      <div className="bg-orange-50 h-max">
        <h1 className="text-center pt-5 text-2xl font-semibold">
          All Campaigns ({campaigns.length})
        </h1>
        <div className="grid grid-cols-4 gap-4 p-10">
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
    </div>
  );
};

export default Home;
