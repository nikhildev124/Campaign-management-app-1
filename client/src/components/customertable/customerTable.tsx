import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import useFetchCustomerData from "@/hooks/fetchCustomerData";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useParams } from "next/navigation";

interface Item {
  id: string;
  label: string;
  state: number;
  filterFn: (customer: any) => boolean;
}

const CustomerTable = () => {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [cost, setCost] = useState(0);
  const [visits, setVisits] = useState(0);
  const [months, setMonths] = useState(0);
  const [filteredData, setFilteredData] = useState<any[]>([]);
  const { data, error, loading } = useFetchCustomerData();
  const params = useParams<{ shopname: string }>();
  const decodedItem = decodeURIComponent(params.shopname);

  const items: Item[] = [
    {
      id: "10000",
      label: `spends > INR `,
      state: cost,
      filterFn: (customer) => customer.spends > cost,
    },
    {
      id: "3visits",
      label: `visits <= `,
      state: visits,
      filterFn: (customer) => customer.visits <= visits,
    },
    {
      id: "3months",
      label: `last visit >  months`,
      state: months,
      filterFn: (customer) => {
        const threeMonthsAgo = new Date();
        threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - months);
        return new Date(customer.lastVisits) < threeMonthsAgo;
      },
    },
  ];

  useEffect(() => {
    if (data) {
      setFilteredData(data);
    }
  }, [data]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading shop data.</div>;
  }

  const handleCheckboxChange = (itemId: string, checked: boolean) => {
    if (checked) {
      setSelectedItems([...selectedItems, itemId]);
    } else {
      setSelectedItems(selectedItems.filter((id) => id !== itemId));
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let filtered = data;
    selectedItems.forEach((itemId) => {
      const filterItem = items.find((item) => item.id === itemId);
      if (filterItem) {
        filtered = filtered!.filter(filterItem.filterFn);
      }
    });

    setFilteredData(filtered!);
  };

  return (
    <>
      <div className="text-xl mt-4">Customer Table</div>
      <form
        onSubmit={handleSubmit}
        className="flex flex-wrap items-center md:gap-4 gap-2 mt-2 pb-2"
      >
        <div className="">
          <label className="text-sm">Filters: </label>
        </div>
        {items.map((item) => (
          <div
            key={item.id}
            className="flex flex-row text-sm items-center space-x-3 space-y-0"
          >
            <Checkbox
              checked={selectedItems.includes(item.id)}
              onCheckedChange={(checked: boolean) =>
                handleCheckboxChange(item.id, checked)
              }
              className="bg-gray-800"
            />
            <label className="font-normal">
              <div className="flex gap-2 items-center">
                <div>{item.label}</div>
                <input
                  className="w-[80px] h-[40px] text-black"
                  type="number"
                  value={item.state}
                  onChange={(e) => {
                    const value = parseInt(e.target.value);
                    switch (item.id) {
                      case "10000":
                        setCost(value);
                        break;
                      case "3visits":
                        setVisits(value);
                        break;
                      case "3months":
                        setMonths(value);
                        break;
                      default:
                        break;
                    }
                  }}
                />
              </div>
            </label>
          </div>
        ))}
        <Button
          type="submit"
          className="p-3 h-8 border-[0.5px] border-gray-700 hover:opacity-75"
        >
          Show
        </Button>
      </form>
      <div className="text-sm pb-4">
        No. of customers: {filteredData?.length}
      </div>
      <Table>
        <TableCaption>A list of your recent Customers.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Customer Name</TableHead>
            <TableHead>Spends</TableHead>
            <TableHead>Visits</TableHead>
            <TableHead className="text-right">Last Visit</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredData.map((customer, id) => (
            <TableRow key={id}>
              <TableCell className="font-medium">{customer.custName}</TableCell>
              <TableCell>{customer.spends}</TableCell>
              <TableCell>{customer.visits}</TableCell>
              <TableCell className="text-right">
                {customer.lastVisits}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};

export default CustomerTable;
