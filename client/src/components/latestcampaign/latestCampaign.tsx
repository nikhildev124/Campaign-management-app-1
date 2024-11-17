"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableCaption,
} from "@/components/ui/table";
import useFetchCampaignData from "@/hooks/fetchCampaignData";
import { Badge } from "../ui/badge";
import { BarChart } from "@tremor/react";

const LatestCampaigns = () => {
  const { data, loading, error } = useFetchCampaignData();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading shop data.</div>;
  }

  const sentCount = data!.filter((item) => item.status === "SENT").length;
  const failedCount = data!.filter((item) => item.status === "FAILED").length;
  console.log("Sent Count:", sentCount); // Log sent count
  console.log("Failed Count:", failedCount); // Log failed count

  const chartdata = [
    {
      name: "Sent",
      "Audience size": sentCount,
    },
    {
      name: "Failed",
      "Audience size": failedCount,
    },
  ];

  const dataFormatter = (number: number) =>
    Intl.NumberFormat("us").format(number).toString();

  console.log(data);
  console.log(chartdata);

  return (
    <div className="mb-8">
      <Table>
        <TableCaption>A list of your recent Orders.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data!.length > 0 ? (
            data!.toReversed().map((item, id) => (
              <TableRow key={id}>
                <TableCell className="font-medium">{item.custName}</TableCell>
                <TableCell>{item.custEmail}</TableCell>
                <TableCell>
                  <Badge
                    className={`${item.status == "FAILED" ? "bg-red-400 bg-opacity-40" : "bg-green-400 bg-opacity-40"}`}
                  >
                    {item.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={3}>No campaign data available</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <div className="mb-4 mt-8 md:text-3xl text-xl">Delivery Stats</div>
      <div className="w-full">
        <BarChart
          className="mt-6"
          data={chartdata}
          index="name"
          categories={["Audience size"]}
          colors={["blue"]}
          valueFormatter={dataFormatter}
          yAxisWidth={48}
        />
      </div>
    </div>
  );
};

export default LatestCampaigns;
