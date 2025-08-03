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
  Card,
  CardBody,
  Pagination,
  Skeleton,
} from "@heroui/react";
import { useState, useEffect, useMemo } from "react";
import Link from "next/link";

interface APIFormData {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  mobile_number: string;
  date_of_birth: string;
  city: string;
  country: string;
  title: string;
  marital_status: string;
  preferred_work_type: string | null;
  expected_salary: string;
  created_at: string;
  updated_at: string;
  educations: Array<{
    id: string;
    university_name: string;
    degree_type: string;
    course_name: string;
  }>;
  job_experiences: Array<{
    id: string;
    job_title: string;
    company_name: string;
    start_date: string;
    end_date: string;
    is_present_job: boolean;
  }>;
  skills: Array<{
    id: string;
    name: string;
    level: string;
    category: string;
  }>;
}

interface FormDataItem {
  id: string;
  form_data: APIFormData;
}

interface FormsResponse {
  success: boolean;
  data: FormDataItem[];
  count: number;
  timestamp: string;
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

if (!API_BASE_URL) {
  throw new Error("NEXT_PUBLIC_API_BASE_URL environment variable is not set");
}

export default function FormsListPage() {
  const [forms, setForms] = useState<FormDataItem[]>([]);
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
  const rowsPerPage = 10;

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
      const response = await fetch(`${API_BASE_URL}/api/v1/form-data/`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result: FormsResponse = await response.json();

      if (result.success) {
        setForms(result.data);
        setError(null);
      } else {
        setError("Failed to fetch forms");
      }
    } catch (err) {
      console.error("Error fetching forms:", err);
      setError(err instanceof Error ? err.message : "An error occurred");
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
    { key: "name", label: "NAME", width: 140, sortable: true },
    { key: "email", label: "EMAIL", width: 195, sortable: true },
    { key: "work_type", label: "WORK TYPE", width: 120, sortable: true },
    { key: "experience", label: "EXPERIENCE", width: 150, sortable: false },
    { key: "created", label: "CREATED", width: 163, sortable: true },
    { key: "actions", label: "ACTIONS", width: 172, sortable: false },
  ];

  const pages = Math.ceil(forms.length / rowsPerPage);

  const sortedItems = useMemo(() => {
    const sortedForms = [...forms];

    if (sortDescriptor.column) {
      return sortedForms.sort((a, b) => {
        let first, second;

        switch (sortDescriptor.column) {
          case "name":
            first =
              `${a.form_data.first_name} ${a.form_data.last_name}`.toLowerCase();
            second =
              `${b.form_data.first_name} ${b.form_data.last_name}`.toLowerCase();
            break;
          case "email":
            first = a.form_data.email.toLowerCase();
            second = b.form_data.email.toLowerCase();
            break;
          case "work_type":
            first = a.form_data.preferred_work_type || "";
            second = b.form_data.preferred_work_type || "";
            break;
          case "created":
            first = new Date(a.form_data.created_at).getTime();
            second = new Date(b.form_data.created_at).getTime();
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
    return (
      <div className="container mx-auto px-4">
        <div className="mb-6">
          <div>
            <h1 className="text-3xl font-bold text-primary-800">
              Applications
            </h1>
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
              table: "w-full",
              tbody: "h-[500px]",
              tr: "h-12",
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
              {Array.from({ length: 10 }).map((_, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <div className="flex flex-col gap-1">
                      <Skeleton className="h-3 w-32 rounded" />
                      <Skeleton className="h-3 w-24 rounded" />
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col gap-1">
                      <Skeleton className="h-3 w-40 rounded" />
                      <Skeleton className="h-3 w-28 rounded" />
                    </div>
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-6 w-20 rounded" />
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col gap-1">
                      <Skeleton className="h-3 w-36 rounded" />
                      <Skeleton className="h-3 w-28 rounded" />
                    </div>
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-3 w-24 rounded" />
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Skeleton className="h-6 w-12 rounded" />
                      <Skeleton className="h-6 w-12 rounded" />
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Fixed bottom navigation buttons */}
        <div className="fixed bottom-0 left-0 right-0 bg-background border-gray-200 border-t p-4 z-50">
          <div className="max-w-5xl mx-auto flex justify-between">
            <Button
              color="primary"
              variant="flat"
              onPress={fetchForms}
              radius="none"
              className="px-8 py-3"
              isDisabled
            >
              Refresh
            </Button>
            <Link href="/wizard">
              <Button color="primary" radius="none" className="px-8 py-3">
                Create New Form
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-screen flex flex-col">
        <div className="flex-1 flex justify-center items-center">
          <Card className="max-w-md">
            <CardBody className="text-center">
              <p className="text-danger mb-4">Error: {error}</p>
            </CardBody>
          </Card>
        </div>

        {/* Fixed bottom navigation buttons */}
        <div className="fixed bottom-0 left-0 right-0 bg-background border-gray-200 p-4 shadow-lg z-50">
          <div className="max-w-4xl mx-auto flex justify-between">
            <Button
              color="primary"
              variant="flat"
              onPress={fetchForms}
              radius="none"
              className="px-8 py-3"
            >
              Retry
            </Button>
            <Link href="/wizard">
              <Button color="primary" radius="none" className="px-8 py-3">
                Create New Form
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
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
            table: "w-full",
            tbody: "h-[500px]",
            tr: "h-12",
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
                <TableCell>
                  <div className="flex flex-col">
                    <p className="font-medium text-xs">
                      {item.form_data.title} {item.form_data.first_name}{" "}
                      {item.form_data.last_name}
                    </p>
                    <p className="text-xs text-default-500">
                      {item.form_data.date_of_birth}
                    </p>
                  </div>
                </TableCell>

                <TableCell>
                  <div className="flex flex-col">
                    <p className="font-medium text-xs">
                      {item.form_data.email}
                    </p>
                    <p className="text-xs text-default-500">
                      {item.form_data.mobile_number}
                    </p>
                  </div>
                </TableCell>

                <TableCell>
                  <Chip
                    color={getWorkTypeColor(item.form_data.preferred_work_type)}
                    variant="flat"
                    size="sm"
                    radius="none"
                    classNames={{
                      base: "text-xs",
                      content: "text-xs",
                    }}
                  >
                    {item.form_data.preferred_work_type || "Not specified"}
                  </Chip>
                </TableCell>

                <TableCell>
                  <div className="flex flex-col">
                    {item.form_data.job_experiences.length > 0 ? (
                      <>
                        <p className="font-medium text-xs">
                          {item.form_data.job_experiences[0].job_title}
                        </p>
                        <p className="text-xs text-default-500">
                          {item.form_data.job_experiences[0].company_name}
                        </p>
                        {item.form_data.job_experiences.length > 1 && (
                          <p className="text-xs text-primary-500">
                            +{item.form_data.job_experiences.length - 1} more
                          </p>
                        )}
                      </>
                    ) : (
                      <p className="text-xs text-default-400">No experience</p>
                    )}
                  </div>
                </TableCell>

                <TableCell>
                  <p className="text-xs">
                    {formatDate(item.form_data.created_at)}
                  </p>
                </TableCell>

                <TableCell>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="light"
                      color="primary"
                      radius="none"
                      className="text-xs"
                      onPress={() => {
                        // TODO: Implement view details
                        console.log("View form:", item.id);
                      }}
                    >
                      View
                    </Button>
                    <Button
                      size="sm"
                      variant="light"
                      color="warning"
                      radius="none"
                      className="text-xs"
                      onPress={() => {
                        // TODO: Implement edit
                        console.log("Edit form:", item.id);
                      }}
                    >
                      Edit
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Fixed bottom navigation buttons */}
      <div className="fixed bottom-0 left-0 right-0 bg-background border-gray-200 border-t p-4 z-50">
        <div className="max-w-5xl mx-auto flex justify-between">
          <Button
            color="primary"
            variant="flat"
            onPress={fetchForms}
            radius="none"
            className="px-8 py-3"
          >
            Refresh
          </Button>
          <Link href="/wizard">
            <Button color="primary" radius="none" className="px-8 py-3">
              Create New Form
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
