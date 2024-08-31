import Link from "next/link";
import { useMemo } from "react";

const CampaignCard = ({
  id,
  title,
  description,
  fundingGoal,
  currentFunding,
  deadline,
}) => {
  const progress = useMemo(() => {
    const progress = Math.floor((currentFunding / fundingGoal) * 100);
    return progress > 100 ? 100 : progress;
  }, [currentFunding, fundingGoal]);

  const duration = useMemo(() => {
    const start = new Date();
    const end = new Date(deadline);
    const diff = end - start;
    const days = Math.ceil(diff / (1000 * 60 * 60 * 24)); // Using ceil to avoid showing 0 days when there's a fraction of a day
    return days < 0 ? 0 : days;
  }, [deadline]);

  return (
    <div className="bg-white shadow-md rounded-md p-4 h-min">
      <h2 className="text-xl font-semibold mb-2">{title}</h2>
      <p className="text-gray-600 mb-4">{description}</p>
      <p className="text-gray-700 mb-2">Funding Goal: ${fundingGoal}</p>
      <p className="text-gray-700 mb-2">Current Funding: ${currentFunding}</p>
      <div className="bg-orange-200 h-2 rounded-full mb-2">
        <div
          className="bg-orange-500 h-full rounded-full"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      <div className="flex justify-between">
        <p className="text-gray-700">{progress}% funded</p>
        <p className="text-gray-700">{`${
          duration ? duration + " days left" : "Expired"
        }`}</p>
      </div>
      <Link href={`/${id}`}>
        <button className="bg-orange-500 text-white py-1 my-2 hover:bg-orange-600 rounded w-full">
          Go to Campaign
        </button>
      </Link>
    </div>
  );
};

export default CampaignCard;
