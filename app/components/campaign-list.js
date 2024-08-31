import CampaignCard from "./campaign-card";

const CampaignList = ({ campaigns }) => {
  return (
    <>
      <h1 className="text-center pt-5 text-2xl font-semibold">
        All Campaigns ({campaigns.length})
      </h1>
      <div className="grid grid-cols-4 gap-2 p-10">
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
    </>
  );
};

export default CampaignList;
