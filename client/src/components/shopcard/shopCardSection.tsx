"use client";
import React from "react";
import useFetchShopData from "@/hooks/fetchData";
import ShopCard from "./shopCard";
import useFetchCustomerData from "@/hooks/fetchCustomerData";

const ShopCardSection = () => {
  const { data, error, loading } = useFetchShopData();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Nothing to show now...</div>;
  }

  if (!data || !Array.isArray(data.shopDetails)) {
    return <div>No shop data available.</div>;
  }

  return (
    <div>
      {data.shopDetails.map((item) => (
        <ShopCard key={item.id} name={item.name} details={item.description} />
      ))}
    </div>
  );
};

export default ShopCardSection;
