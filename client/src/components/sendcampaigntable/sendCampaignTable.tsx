"use client";
import * as React from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import useFetchCustomerData from "@/hooks/fetchCustomerData";

export type Customer = {
  custName: string;
  custEmail: string;
};

const columns: ColumnDef<Customer>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="bg-gray-800"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="bg-gray-800"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "custName",
    header: "Name",
    cell: ({ row }) => <div>{row.getValue("custName")}</div>,
  },
  {
    accessorKey: "custEmail",
    header: "Email",
    cell: ({ row }) => (
      <div className="lowercase">{row.getValue("custEmail")}</div>
    ),
  },
];

const SendCampaignTable = () => {
  const { data, loading, error } = useFetchCustomerData();
  const table = useReactTable({
    data: data || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const handleSendCampaign = async () => {
    const selectedRows = table
      .getSelectedRowModel()
      .rows.map((row) => row.original);
    try {
      const response = await fetch("http://localhost:8000/sendCampaign", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ customers: selectedRows }),
      });
      if (response.ok) {
        alert("Campaign sent successfully");
        window.location.reload();
      } else {
        alert("Failed to send campaign");
      }
    } catch (error) {
      console.error("Error sending campaign", error);
    }
  };

  return (
    <div className="w-full pb-8">
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>Error: {error}</div>
      ) : (
        <>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <TableHead key={header.id}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext(),
                            )}
                      </TableHead>
                    ))}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody>
                {table.getRowModel().rows?.length ? (
                  table.getRowModel().rows.map((row) => (
                    <TableRow
                      key={row.id}
                      data-state={row.getIsSelected() && "selected"}
                      className={
                        row.getIsSelected()
                          ? "bg-gray-800 text-black bg-opacity-55"
                          : ""
                      }
                    >
                      {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id}>
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext(),
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={columns.length}
                      className="h-24 text-center"
                    >
                      No results.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
          <button
            onClick={handleSendCampaign}
            className="mt-4 p-2 bg-white hover:bg-opacity-70 text-black rounded"
          >
            Send Campaign
          </button>
        </>
      )}
    </div>
  );
};

export default SendCampaignTable;
