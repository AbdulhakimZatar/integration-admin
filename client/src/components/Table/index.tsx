import { Thead, Table as ChakraTable, Tr, Th, Text, Tbody, Td, Center } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useTable, usePagination } from 'react-table';

export const Table = ({
  columns,
  data,
  loading,
  pageCount: controlledPageCount,
  paginated = true,
  onPageTurn = (index, size) => {
    return size;
  },
  onPageSizeChange = (size) => {
    return size;
  },
  total = data.length,
  pageSize,
  pageIndex,
}: TableProps) => {
  const { getTableProps, getTableBodyProps, headerGroups, prepareRow, page, pageOptions, gotoPage, setPageSize } =
    useTable(
      {
        columns,
        data,
        manualPagination: true, // Tell the usePagination
        // hook that we'll handle our own data fetching
        // This means we'll also have to provide our own
        // pageCount.
        pageCount: controlledPageCount,
        autoResetPage: false,
      },
      usePagination,
    );

  useEffect(() => {
    onPageTurn(pageIndex, pageSize);
  }, [pageIndex, pageSize]);

  useEffect(() => {
    gotoPage(pageIndex - 1);
  }, [pageIndex]);

  useEffect(() => {
    setPageSize(pageSize);
  }, [pageSize]);

  if (!data.length)
    return (
      <Center py={8}>
        <Text fontSize="lg">No data</Text>
      </Center>
    );

  if (loading)
    return (
      <Center py={8}>
        <Text fontSize="lg">Loading...</Text>
      </Center>
    );
  return (
    <ChakraTable {...getTableProps()}>
      <Thead>
        {headerGroups.map((headerGroup) => (
          <Tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => {
              return (
                <Th {...column.getHeaderProps()} data-accessor={column.id}>
                  <Text>{column.render('Header')}</Text>
                </Th>
              );
            })}
          </Tr>
        ))}
      </Thead>
      <Tbody {...getTableBodyProps()}>
        {page.map((row, i) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map((cell) => {
                return (
                  <Td {...cell.getCellProps()} data-accessor={cell.column.id}>
                    {cell.render('Cell')}
                  </Td>
                );
              })}
            </tr>
          );
        })}
      </Tbody>
    </ChakraTable>
  );
};

export interface IColumn {
  Header?: string;
  accessor: string;
  Cell?: (data: any) => JSX.Element | string;
}

interface IRow {
  [key: string]: any;
  key: string | number;
}

interface TableProps {
  // See example on how to provide data and columns
  columns: IColumn[];
  data: IRow[];
  // Should be set to 'true' when a data fetch action is in progress.
  loading: boolean;
  paginated?: boolean;
  // Need only be specified if server pagination is being used
  pageCount?: number;
  // 5 by default. Specifies the number of items on each page
  // IMPORTANT: Set pageSize = total number of items when pagination isn't being used
  pageSize?: number;
  // total number of items
  total?: number;
  onPageSizeChange?: (pageSize: number) => void;
  // Accepts the current pageIndex (pageNumber - 1) and the pageSize
  // Need only be provided if pagination is being used
  onPageTurn?: (pageIndex: number, pageSize: number) => void;
  // Add 1-based page index if manually controlling pagination with server-side API fetching
  pageIndex?: number;
}
