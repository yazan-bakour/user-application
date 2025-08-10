import BottomNavigation from "@/components/BottomNavigation";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Skeleton,
} from "@heroui/react";

interface Column {
  key: string;
  label: string;
  width: number;
  sortable: boolean;
}

interface TableSkeletonProps {
  columns: Column[];
}

const TableSkeleton = ({ columns }: TableSkeletonProps) => {
  return (
    <div className="container mx-auto px-4">
      <div className="mb-6">
        <div>
          <h1 className="text-3xl font-bold text-primary-800">Applications</h1>
          <p className="text-primary-500 mt-2">Loading...</p>
        </div>
      </div>

      <div className="w-full">
        <Table
          radius="none"
          shadow="none"
          aria-label="Forms table"
          isStriped
          classNames={{
            wrapper: "p-0",
            table: "w-full table-fixed",
            tbody: "h-[500px]",
            tr: "h-14",
            td: "py-2",
          }}
        >
          <TableHeader columns={columns}>
            {(column) => (
              <TableColumn
                key={column.key}
                className="bg-primary-50 text-xs"
                width={column.width}
                allowsSorting={column.sortable}
              >
                {column.label}
              </TableColumn>
            )}
          </TableHeader>
          <TableBody emptyContent="Loading...">
            {Array.from({ length: 8 }).map((_, index) => (
              <TableRow key={index}>
                <TableCell>
                  <div className="flex flex-col gap-1 justify-center">
                    <Skeleton className="h-3 w-20 rounded" />
                    <Skeleton className="h-3 w-22 rounded" />
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex flex-col gap-1 justify-center">
                    <Skeleton className="h-3 w-30 rounded" />
                    <Skeleton className="h-3 w-28 rounded" />
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center">
                    <Skeleton className="h-6 w-16 rounded" />
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex flex-col gap-1 justify-center">
                    <Skeleton className="h-3 w-30 rounded" />
                    <Skeleton className="h-3 w-28 rounded" />
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center">
                    <Skeleton className="h-3 w-24 rounded" />
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center">
                    <Skeleton className="h-3 w-24 rounded" />
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex gap-2 items-center">
                    <Skeleton className="h-6 w-12 rounded" />
                    <Skeleton className="h-6 w-12 rounded" />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <BottomNavigation isLoading={true} />
    </div>
  );
};

export default TableSkeleton;
