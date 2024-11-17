"use client";

import { useEffect, useState } from "react";
import { useNotificationCenter } from "react-toastify/addons/use-notification-center";

interface ShopDetail {
  id: string;
  name: string;
  email: string;
  description: string;
}

interface ShopData {
  shopDetails: ShopDetail[];
}

interface FetchDataResponse {
  data: ShopData | null;
  error: string | null;
  loading: boolean;
}

const useFetchShopData = (): FetchDataResponse => {
  const [data, setData] = useState<ShopData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const notify = useNotificationCenter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const email = localStorage.getItem("email");
        if (!email) {
          throw new Error("Email not found in local storage");
        }

        const response = await fetch("http://localhost:8000/getshopdata", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        });

        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const responseData: ShopData = await response.json();
        setData(responseData);
      } catch (error: unknown) {
        if (error instanceof Error) {
          setError(error.message);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, error, loading };
};

export default useFetchShopData;
