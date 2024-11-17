import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import useFetchOrderData from "@/hooks/fetchOrderData";

const OrderTable = () => {
  const { data, error, loading } = useFetchOrderData();
  console.log(data);
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading shop data.</div>;
  }
  return (
    <div className="mb-10">
      <div className="text-xl mt-4">Order Table</div>
      <Table>
        <TableCaption>A list of your recent Orders.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Customer Name</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data!.map((items, id) => (
            <TableRow key={id}>
              <TableCell className="font-medium">{items.orderName}</TableCell>
              <TableCell>{items.amount}</TableCell>
              <TableCell>{items.orderDate}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default OrderTable;
