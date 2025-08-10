import { addToast } from "@heroui/react";
import { FieldErrors } from "react-hook-form";

interface APIValidationError {
  type: string;
  loc: (string | number)[];
  msg: string;
  input: unknown;
  ctx?: Record<string, unknown>;
}

interface APIErrorResponse {
  detail: APIValidationError[];
}

export const useFormErrors = () => {
  const displayFormErrors = (apiErrors?: APIErrorResponse, formErrors?: FieldErrors) => {
    let errorMessages: string[] = [];

    if (apiErrors && apiErrors.detail && Array.isArray(apiErrors.detail)) {
      errorMessages = apiErrors.detail.map((error: APIValidationError) => {
        const fieldPath = error.loc
          ? error.loc.slice(1).join(".")
          : "unknown field";
        const fieldName = fieldPath
          .split(".")
          .map((part: string) => part.charAt(0).toUpperCase() + part.slice(1))
          .join(" ");
        return `${fieldName}: ${error.msg || "Invalid input"}`;
      });
    } else if (formErrors) {
      errorMessages = Object.entries(formErrors).map(([field, error]) => {
        const fieldName =
          field.charAt(0).toUpperCase() +
          field.slice(1).replace(/([A-Z])/g, " $1");
        return `${fieldName}: ${error?.message || "Invalid input"}`;
      });
    }

    if (errorMessages.length > 0) {
      addToast({
        title: "Please fix the following errors:",
        description:
          errorMessages.slice(0, 3).join("; ") +
          (errorMessages.length > 3 ? "..." : ""),
        color: "danger",
      });
    }
  };

  return { displayFormErrors };
};

export type { APIValidationError, APIErrorResponse };
