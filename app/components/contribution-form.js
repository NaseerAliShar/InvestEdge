import React, { useState, useEffect } from "react";

const ContributionForm = ({ campaignId, updateFunding }) => {
  const [contributionAmount, setContributionAmount] = useState(0);
  const [campaign, setCampaign] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCampaign = async () => {
      try {
        const response = await fetch(
          `https://66912b2926c2a69f6e8ebc93.mockapi.io/InvestEdge/campaigns/${campaignId}`
        );
        const data = await response.json();
        setCampaign(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCampaign();
  }, [campaignId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedFunding =
      campaign.currentFunding + parseFloat(contributionAmount);

    try {
      const response = await fetch(
        `https://66912b2926c2a69f6e8ebc93.mockapi.io/InvestEdge/campaigns/${campaignId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ...campaign, currentFunding: updatedFunding }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update current funding");
      }

      console.log(
        `Successfully contributed ${contributionAmount} ETH to campaign ${campaignId}`
      );
      setContributionAmount(0); // Reset contribution amount after successful contribution
      setCampaign({ ...campaign, currentFunding: updatedFunding });
      updateFunding(updatedFunding); // Update funding in parent component
    } catch (error) {
      console.error("Error updating current funding:", error);
      setError(error.message);
    }
  };

  if (loading) {
    return <div className="text-center p-10">Loading...</div>;
  }

  if (error) {
    return <div className="text-center p-10 text-red-500">Error: {error}</div>;
  }

  return (
    <div className="max-w-md mx-auto mt-10 bg-white shadow-md rounded p-6">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800 text-center">
        Contribute to {campaign.title}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="number"
          placeholder="Contribution Amount (in ETH)"
          value={contributionAmount}
          onChange={(e) => setContributionAmount(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          min="0"
          step="0.01"
        />
        <button
          type="submit"
          className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded w-full focus:outline-none focus:shadow-outline"
        >
          Contribute
        </button>
      </form>
    </div>
  );
};

export default ContributionForm;
