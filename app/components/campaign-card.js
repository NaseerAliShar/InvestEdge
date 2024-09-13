import Link from "next/link";

const CampaignCard = ({ campaign }) => {
  const { id, title, owner, amount, date } = campaign;

  return (
    <div className="flex flex-col justify-between bg-white shadow-lg rounded-xl overflow-hidden transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl">
      <div className="p-6 flex-grow">
        <h2 className="text-xl md:text-2xl text-center font-bold text-gray-900 mb-4 leading-snug tracking-tight">
          {title}
        </h2>
        <div className="mb-6 flex items-center justify-between">
          <span className="inline-block bg-orange-500 text-white text-md px-4 py-1 rounded-full">
            {owner.substring(0, 9)}...{owner.substring(owner.length - 4)}
          </span>
          <span className="ml-4 text-md text-gray-500">Owner</span>
        </div>
        <div className="mb-6 flex justify-between">
          <span className="text-gray-700 font-semibold block">
            Required Amount:
          </span>
          <span className="text-xl font-semibold text-gray-900">
            {amount} ETH
          </span>
        </div>
        <div className="text-gray-600 text-sm flex justify-between">
          <span className="block text-gray-700 font-semibold">Date:</span>
          <span>{new Date(date).toLocaleString()}</span>
        </div>
      </div>
      <Link href={`/${id}`}>
        <button className="bg-gradient-to-r from-orange-400 to-orange-600 text-white py-3 px-5 w-full rounded-b-xl font-semibold transition-colors duration-300 hover:from-orange-500 hover:to-orange-700">
          View Campaign
        </button>
      </Link>
    </div>
  );
};

export default CampaignCard;
