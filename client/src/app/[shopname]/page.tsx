"use client";
import CustomerTable from "@/components/customertable/customerTable";
import CustOrdComponent from "@/components/custordcomp/custordComp";
import OrderTable from "@/components/ordertable/orderTable";
import { Button } from "@/components/ui/button";
import useFetchShopData from "@/hooks/fetchData";
import { useParams } from "next/navigation";
const IndividualShop = () => {
  const params = useParams<{ shopname: string }>();
  const decodedItem = decodeURIComponent(params.shopname);
  console.log(params);
  const { data, loading, error } = useFetchShopData();
  const email = data?.shopDetails[0].email;
  if (!data) {
    return <div>Loading...</div>;
  }

  if (email != localStorage.getItem("email")) {
    return (
      <div className="flex justify-center items-center">Page Not Found!</div>
    );
  }
  return (
    <div className="container md:pt-10 pt-5">
      <div className="flex justify-between">
        <div className="md:text-3xl text-xl">{decodedItem}</div>
        <CustOrdComponent />
      </div>
      <CustomerTable />
      <OrderTable />
    </div>
  );
};

export default IndividualShop;
