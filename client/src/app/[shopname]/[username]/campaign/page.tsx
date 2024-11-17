import LatestCampaigns from "@/components/latestcampaign/latestCampaign";
import SendCampaignTable from "@/components/sendcampaigntable/sendCampaignTable";

const Campaign = () => {
  return (
    <div className="container mt-4">
      <div className="mb-4 mt-8 md:text-3xl text-xl">Latest Campaigns</div>
      <LatestCampaigns />
      <div className="mb-4 md:text-3xl text-xl">Send Campaign</div>
      <SendCampaignTable />
    </div>
  );
};

export default Campaign;
