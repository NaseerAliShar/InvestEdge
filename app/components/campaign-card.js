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
    const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
    return days < 0 ? 0 : days;
  }, [deadline]);

  return (
    <div className="bg-white shadow-md rounded-md p-4 sm:p-4 h-[320px] w-full max-w-lg mx-auto flex flex-col justify-between">
      <h2 className="text-lg sm:text-xl font-semibold">{title}</h2>

      {/* Truncated description with substring */}
      <p className="text-gray-600 text-sm sm:text-base">
        {description.length > 100
          ? description.substring(0, 140) + "..."
          : description}
      </p>

      <div className="text-gray-700 text-sm sm:text-base">
        <p>Funding Goal: ${fundingGoal}</p>
        <p>Current Funding: ${currentFunding}</p>
      </div>

      <div className="bg-orange-200 h-2 rounded-full">
        <div
          className="bg-orange-500 h-full rounded-full"
          style={{ width: `${progress}%` }}
        ></div>
      </div>

      <div className="flex justify-between text-xs sm:text-sm text-gray-700">
        <p>{progress}% funded</p>
        <p>{duration ? `${duration} days left` : "Expired"}</p>
      </div>

      <Link href={`/${id}`}>
        <button className="bg-orange-500 text-white py-2 sm:py-2 hover:bg-orange-600 rounded w-full text-sm sm:text-base transition-colors duration-300">
          Go to Campaign
        </button>
      </Link>
    </div>
  );
};

export default CampaignCard;
