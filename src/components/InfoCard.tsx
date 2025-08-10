import { Card, CardBody, CardHeader, Chip } from "@heroui/react";

interface FieldData {
  label: string;
  value: string | number | null;
  type?: "text" | "chip" | "link" | "email" | "phone" | "date";
  chipColor?:
    | "primary"
    | "secondary"
    | "success"
    | "warning"
    | "danger"
    | "default";
  href?: string;
}

interface InfoCardProps {
  heading: string;
  className?: string;
  fields?: FieldData[];
  children?: React.ReactNode;
  emptyMessage?: string;
}

export default function InfoCard({
  heading,
  className = "bg-content2",
  fields = [],
  children,
  emptyMessage = "No data available",
}: InfoCardProps) {
  const formatValue = (
    value: string | number | null,
    type: string = "text"
  ) => {
    if (!value) return "Not specified";

    switch (type) {
      case "date":
        return new Date(value as string).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        });
      default:
        return value;
    }
  };

  const renderField = (field: FieldData, index?: number) => {
    const { label, value, type = "text", chipColor = "primary", href } = field;

    if (type === "chip") {
      return (
        <Chip
          key={index}
          color={chipColor}
          variant="flat"
          radius="none"
          className="text-xs"
        >
          {value}
        </Chip>
      );
    }

    if (type === "link" || type === "email" || type === "phone") {
      const linkHref =
        type === "email"
          ? `mailto:${value}`
          : type === "phone"
          ? `tel:${value}`
          : href || value;

      return (
        <div key={index}>
          <p className="text-sm text-default-500">{label}</p>
          <a
            href={linkHref as string}
            target={type === "link" ? "_blank" : undefined}
            rel={type === "link" ? "noopener noreferrer" : undefined}
            className="text-primary-500 hover:text-primary-700 underline font-medium"
          >
            {value}
          </a>
        </div>
      );
    }

    return (
      <div key={index}>
        <p className="text-sm text-default-500">{label}</p>
        <p className="font-medium">{formatValue(value, type)}</p>
      </div>
    );
  };

  const hasContent = fields.length > 0 || children;

  return (
    <Card radius="none" shadow="none" className={className}>
      <CardHeader className="bg-primary-50">
        <h2 className="text-lg font-semibold">{heading}</h2>
      </CardHeader>
      <CardBody>
        {/* Simple fields layout */}
        {fields.length > 0 && (
          <div className="space-y-4">
            {fields.some((f) => f.type === "chip") ? (
              <div className="flex flex-wrap gap-2">
                {fields.map((field, index) => renderField(field, index))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {fields.map((field, index) => renderField(field, index))}
              </div>
            )}
          </div>
        )}

        {/* Custom children content */}
        {children}

        {/* No data state */}
        {!hasContent && <p className="text-default-400">{emptyMessage}</p>}
      </CardBody>
    </Card>
  );
}
