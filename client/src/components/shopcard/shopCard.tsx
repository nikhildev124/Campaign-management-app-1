import Link from "next/link";

type Tcampaign = {
  name: string;
  details: string;
};

const ShopCard = (props: Tcampaign) => {
  return (
    <div className="mt-4 bg-zinc-800 p-4 border-gray-600 rounded-md border-[0.5px] bg-opacity-40">
      <div className="text-xl">{props.name}</div>
      <div className="text-xs text-gray-500">{props.details}</div>
      <div className="flex gap-2 mt-1">
        <Link
          href={`/${props.name}`}
          className="text-sm hover:underline ml-auto text-blue-400"
        >
          Show details
        </Link>
        {/* <div className="text-sm hover:underline cursor-pointer text-red-400">
          Close
        </div> */}
      </div>
    </div>
  );
};
export default ShopCard;
