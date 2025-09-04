"use client";

import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Button,
  Chip,
  Pagination,
  addToast,
} from "@heroui/react";
import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import BottomNavigation from "../../components/BottomNavigation";
import TableSkeleton from "./TableSkelaton";
import ErrorPage from "../../components/ErrorPage";
import { APIFormData } from "../types";
import { demoFormsData } from "../../constants/demoData";

interface FormsResponse {
  success: boolean;
  data: APIFormData[];
  count: number;
  timestamp: string;
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export default function FormsListPage() {
  const [forms, setForms] = useState<APIFormData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [sortDescriptor, setSortDescriptor] = useState<{
    column: string;
    direction: "ascending" | "descending";
  }>({
    column: "created",
    direction: "descending",
  });
  const rowsPerPage = 8;

  const handleSortChange = (descriptor: {
    column: string | number;
    direction: "ascending" | "descending";
  }) => {
    setSortDescriptor({
      column: String(descriptor.column),
      direction: descriptor.direction,
    });
  };

  const fetchForms = async () => {
    try {
      setIsLoading(true);

      if (!API_BASE_URL) {
        addToast({
          title: "Submission Error",
          description: "API not configured, using demo forms localstorage data",
          color: "warning",
        });
        setForms(demoFormsData);
        setError(null);
        setIsLoading(false);
        return;
      }

      const response = await fetch(`${API_BASE_URL}/api/v1/form-data/`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        addToast({
          title: `HTTP error! status: ${response.status}`,
          description: response.statusText,
          color: "danger",
        });
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result: FormsResponse = await response.json();

      if (result.success) {
        setForms(result.data);
        setError(null);
      } else {
        addToast({
          title: `Failed to fetch forms: ${result.success}`,
          description: `Data count: ${result.count}`,
          color: "danger",
        });
        throw new Error("Failed to fetch forms");
      }
    } catch (err) {
      addToast({
        title: `${err}`,
        description:
          "Api is not working, you will see now localstorage demo data",
        color: "danger",
      });
      console.error("Error fetching forms:", err);

      setForms(demoFormsData);
      setError(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchForms();
  }, []);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getWorkTypeColor = (workType: string | null) => {
    switch (workType) {
      case "Remote":
        return "success";
      case "Onsite":
        return "warning";
      case "Hybrid":
        return "primary";
      default:
        return "default";
    }
  };

  const columns = [
    { key: "name", label: "NAME", width: 106, sortable: true },
    { key: "email", label: "EMAIL", width: 197, sortable: true },
    { key: "work_type", label: "WORK TYPE", width: 116, sortable: true },
    { key: "experience", label: "EXPERIENCE", width: 127, sortable: false },
    { key: "created", label: "CREATED", width: 116, sortable: true },
    { key: "updated", label: "UPDATED", width: 116, sortable: true },
    { key: "actions", label: "ACTIONS", width: 165, sortable: false },
  ];

  const pages = Math.ceil(forms.length / rowsPerPage);

  const sortedItems = useMemo(() => {
    const sortedForms = [...forms];

    if (sortDescriptor.column) {
      return sortedForms.sort((a, b) => {
        let first, second;

        switch (sortDescriptor.column) {
          case "name":
            first = `${a.first_name} ${a.last_name}`.toLowerCase();
            second = `${b.first_name} ${b.last_name}`.toLowerCase();
            break;
          case "email":
            first = a.email.toLowerCase();
            second = b.email.toLowerCase();
            break;
          case "work_type":
            first = a.preferred_work_type || "";
            second = b.preferred_work_type || "";
            break;
          case "created":
            first = new Date(a.created_at).getTime();
            second = new Date(b.created_at).getTime();
            break;
          case "updated":
            first = new Date(a.updated_at).getTime();
            second = new Date(b.updated_at).getTime();
            break;
          default:
            first = "";
            second = "";
        }

        let cmp =
          (parseInt(String(first)) || first) <
          (parseInt(String(second)) || second)
            ? -1
            : 1;

        if (sortDescriptor.direction === "descending") {
          cmp *= -1;
        }

        return cmp;
      });
    }

    return sortedForms;
  }, [forms, sortDescriptor]);

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return sortedItems.slice(start, end);
  }, [page, sortedItems]);

  if (isLoading) {
    return <TableSkeleton columns={columns} />;
  }

  if (error) {
    return <ErrorPage error={error} reset={fetchForms} />;
  }

  return (
    <div className="container mx-auto px-4">
      <div className="mb-6">
        <div>
          <h1 className="text-3xl font-bold text-primary-800">Applications</h1>
          <p className="text-primary-500 mt-2">
            Total: {forms.length} form{forms.length !== 1 ? "s" : ""}
          </p>
        </div>
      </div>

      <div className="w-full">
        <Table
          radius="none"
          shadow="none"
          aria-label="Forms table"
          isStriped
          sortDescriptor={sortDescriptor}
          onSortChange={handleSortChange}
          classNames={{
            wrapper: "p-0",
            table: "w-full table-fixed h-[510px]",
            tbody: "h-[400px]",
            tr: "h-14",
            td: "py-0",
          }}
          bottomContent={
            pages > 0 ? (
              <div className="flex w-full justify-center">
                <Pagination
                  showControls
                  showShadow
                  color="primary"
                  page={page}
                  total={pages}
                  onChange={(page) => setPage(page)}
                  radius="none"
                  className="m-0"
                />
              </div>
            ) : null
          }
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
          <TableBody items={items} emptyContent="No forms found">
            {(item) => (
              <TableRow key={item.id}>
                <TableCell width={106}>
                  <div className="flex flex-col h-12 justify-center">
                    <p className="font-medium text-xs truncate">
                      {item.title} {item.first_name} {item.last_name}
                    </p>
                    <p className="text-xs text-default-500 truncate">
                      {item.date_of_birth}
                    </p>
                  </div>
                </TableCell>

                <TableCell width={197}>
                  <div className="flex flex-col h-12 justify-center">
                    <p className="font-medium text-xs truncate">{item.email}</p>
                    <p className="text-xs text-default-500 truncate">
                      {item.mobile_number}
                    </p>
                  </div>
                </TableCell>

                <TableCell width={116}>
                  <div className="flex h-12 items-center">
                    <Chip
                      color={getWorkTypeColor(item.preferred_work_type)}
                      variant="flat"
                      size="sm"
                      radius="none"
                      classNames={{
                        base: "text-[10px]",
                        content: "text-[10px]",
                      }}
                    >
                      {item.preferred_work_type || "Not specified"}
                    </Chip>
                  </div>
                </TableCell>

                <TableCell width={127}>
                  <div className="flex flex-col h-12 justify-center">
                    {item.job_experiences.length > 0 ? (
                      <>
                        <p className="font-medium text-xs truncate">
                          {item.job_experiences[0].job_title}
                        </p>
                        <p className="text-xs text-default-500 truncate">
                          {item.job_experiences[0].company_name}
                          {item.job_experiences.length > 1 && (
                            <span className="text-primary-500">
                              {" "}
                              +{item.job_experiences.length - 1} more
                            </span>
                          )}
                        </p>
                      </>
                    ) : (
                      <p className="text-xs text-default-400">No experience</p>
                    )}
                  </div>
                </TableCell>

                <TableCell width={116}>
                  <div className="flex h-12 items-center">
                    <p className="text-xs">{formatDate(item.created_at)}</p>
                  </div>
                </TableCell>

                <TableCell width={116}>
                  <div className="flex h-12 items-center">
                    <p className="text-xs">{formatDate(item.updated_at)}</p>
                  </div>
                </TableCell>

                <TableCell width={165}>
                  <div className="flex gap-2 h-12 items-center">
                    <Link href={`/forms/${item.id}`}>
                      <Button
                        size="sm"
                        variant="flat"
                        color="primary"
                        radius="none"
                        className="text-xs"
                      >
                        View
                      </Button>
                    </Link>
                    <Link href={`/wizard/edit/${item.id}`}>
                      <Button
                        size="sm"
                        variant="flat"
                        color="warning"
                        radius="none"
                        className="text-xs"
                      >
                        Edit
                      </Button>
                    </Link>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <BottomNavigation
        leftButton={{
          text: "Refresh",
          onClick: () => {
            fetchForms();
          },
          variant: "flat",
          color: "primary",
        }}
        rightButton={{
          text: "Create New Form",
          href: "/wizard",
          variant: "solid",
          color: "primary",
          isLoading: isLoading,
        }}
      />
    </div>
  );
}
