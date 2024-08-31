import { useState } from "react";

const CreateCampaign = ({ setCampaigns }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    fundingGoal: 0,
    deadline: "",
  });

  const handleInputChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newCampaignData = {
        ...formData,
        currentFunding: 0, // Add currentFunding here
      };

      const response = await fetch(
        "https://66912b2926c2a69f6e8ebc93.mockapi.io/InvestEdge/campaigns",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newCampaignData),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to create campaign");
      }

      const data = await response.json();
      setCampaigns((prevCampaigns) => [...prevCampaigns, data]);
      console.log("Campaign created:", data);
      // updateCampaigns(data);

      // Clear form data after successful submission
      setFormData({
        title: "",
        description: "",
        fundingGoal: 0,
        deadline: "",
      });
    } catch (error) {
      console.error("Error creating campaign:", error);
    }
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="max-w-md mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="title"
          >
            Campaign Title
          </label>
          <input
            type="text"
            placeholder="Campaign Title"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="description"
          >
            Campaign Description
          </label>
          <textarea
            placeholder="Campaign Description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          ></textarea>
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="fundingGoal"
          >
            Funding Goal (in ETH)
          </label>
          <input
            type="number"
            placeholder="Funding Goal"
            name="fundingGoal"
            value={formData.fundingGoal}
            onChange={handleInputChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="deadline"
          >
            Deadline
          </label>
          <input
            type="date"
            placeholder="Deadline"
            name="deadline"
            value={formData.deadline}
            onChange={handleInputChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Create Campaign
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateCampaign;
