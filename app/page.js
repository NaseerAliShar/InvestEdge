"use client";
import "dotenv/config";
import Typed from "typed.js";
import { useEffect, useState } from "react";
import Campaigns from "./pages/campaigns/page";
import CreateCampaign from "./components/create-campaign";

const Home = () => {
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const typed = new Typed("#element", {
      strings: ["Welcome to InvestEdge"],
      typeSpeed: 100,
      showCursor: true,
    });
    return () => {
      typed.destroy();
    };
  }, []);

  return (
    <>
      <div className="flex flex-wrap h-screen py-10 bg-[url('https://images.unsplash.com/photo-1519995451813-39e29e054914?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')]">
        <div className="w-1/2 p-10">
          <h1 className="text-2xl text-gray-700 font-semibold">
            <span id="element"></span> <br />
            Empower Your Future with
            <span className="text-orange-500 font-semibold"> InvestEdge</span>
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
        <Campaigns />
      </div>
    </>
  );
};

export default Home;
