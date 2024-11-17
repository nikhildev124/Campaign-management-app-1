import shopCard from "@/components/shopcard/shopCard";
import ShopCardSection from "@/components/shopcard/shopCardSection";
import Startshop from "@/components/startshop/startshop";
import Image from "next/image";

export default function Home() {
  return (
    <main className="container pt-10">
      <div>
        <Startshop />
        <div className="mt-10 text-xl font-medium">Latest Campaigns</div>
        <ShopCardSection />
      </div>
    </main>
  );
}
