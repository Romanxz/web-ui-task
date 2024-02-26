import { Table, Thead, Tbody, Tr, Th, Td, chakra, Text, CircularProgress, Flex } from "@chakra-ui/react";
import { TriangleDownIcon, TriangleUpIcon } from "@chakra-ui/icons";
import {
  useReactTable,
  flexRender,
  getCoreRowModel,
  ColumnDef,
  SortingState,
  getSortedRowModel
} from "@tanstack/react-table";
import { useState } from "react";
import { createColumnHelper } from "@tanstack/react-table";
import { ICompanyMarketCap } from "@/pages";

const columnHelper = createColumnHelper<ICompanyMarketCap>();

const columns = [
  columnHelper.accessor("id", {
    cell: (info) => info.getValue(),
    header: "ID"
  }),
  columnHelper.accessor("name", {
    cell: (info) => info.getValue(),
    header: "Company name"
  }),
  columnHelper.accessor("capitalization", {
    cell: (info) => info.getValue(),
    header: "Market capitalization",
    meta: {
      isNumeric: true
    }
  })
];

export type DataTableProps<Data extends object> = {
  data: Data[];
  columns: ColumnDef<Data, any>[];
};

export function DataTable<Data extends object>({
  data,
  columns
}: DataTableProps<Data>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting
    }
  });

  return (
    <Table>
      <Thead>
        {table.getHeaderGroups().map((headerGroup) => (
          <Tr key={headerGroup.id} color="white">
            {headerGroup.headers.map((header) => {
              // see https://tanstack.com/table/v8/docs/api/core/column-def#meta to type this correctly
              const meta: any = header.column.columnDef.meta;
              return (
                <Th
                  key={header.id}
                  onClick={header.column.getToggleSortingHandler()}
                  isNumeric={meta?.isNumeric}
                  color="white"
                >
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}

                  <chakra.span color="white" pl="4">
                    {header.column.getIsSorted() ? (
                      header.column.getIsSorted() === "desc" ? (
                        <TriangleDownIcon aria-label="sorted descending" />
                      ) : (
                        <TriangleUpIcon aria-label="sorted ascending" />
                      )
                    ) : null}
                  </chakra.span>
                </Th>
              );
            })}
          </Tr>
        ))}
      </Thead>
      <Tbody>
        {table.getRowModel().rows.map((row) => (
          <Tr color="white" key={row.id}>
            {row.getVisibleCells().map((cell) => {
              // see https://tanstack.com/table/v8/docs/api/core/column-def#meta to type this correctly
              const meta: any = cell.column.columnDef.meta;
              return (
                <Td key={cell.id} isNumeric={meta?.isNumeric}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </Td>
              );
            })}
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
}

export default function CustomDataTable({ rawData, isLoading }: { rawData: ICompanyMarketCap[]; isLoading: boolean }) {
  return (<>
    {rawData?.length > 0 ? (
      <DataTable data={rawData} columns={columns} />
    ) : isLoading ? <Flex w="100&" h="100%" justify="center" align="center" ><CircularProgress isIndeterminate color='green.300' /></Flex> : (
      <Flex w="100&" h="100%" justify="center" align="center" ><Text align="center" color="red">No Data Avaliable</Text></Flex>
    )}
  </>
  );
}