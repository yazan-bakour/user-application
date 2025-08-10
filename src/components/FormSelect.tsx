"use client";

import { Select, Skeleton } from "@heroui/react";
import { forwardRef } from "react";
import { FieldError } from "react-hook-form";
import { SelectProps } from "@heroui/react";
import { CollectionChildren } from "@react-types/shared";

interface FormSelectProps extends Omit<SelectProps, "children" | "label"> {
  label: string;
  error?: FieldError;
  defaultErrorMessage?: string;
  children: CollectionChildren<object>;
  isReadOnly?: boolean;
  isLoading?: boolean;
  id?: string;
}

const FormSelect = forwardRef<HTMLSelectElement, FormSelectProps>(
  (
    {
      label,
      placeholder = "Select an option",
      isDisabled = false,
      isReadOnly = false,
      isInvalid,
      errorMessage,
      error,
      defaultErrorMessage,
      onSelectionChange,
      children,
      size = "md",
      radius = "none",
      className,
      classNames,
      isLoading = false,
      id,
      ...props
    },
    ref
  ) => {
    const finalErrorMessage =
      errorMessage || error?.message || defaultErrorMessage;

    const finalIsInvalid = isInvalid !== undefined ? isInvalid : !!error;

    const ariaLabel = id ? `${id}-select` : label;

    const defaultClassNames = {
      trigger: "border-b-1 border-primary",
      mainWrapper: "h-[64px]",
      selectorIcon: "text-primary",

      ...classNames,
    };

    if (isLoading) {
      return (
        <Skeleton className="rounded-none mb-6">
          <div className="h-10 py-4 w-full bg-default-200"></div>
        </Skeleton>
      );
    }

    return (
      <div className="flex flex-col gap-2">
        <label
          htmlFor={id}
          className={`text-xs text-foreground ${
            finalIsInvalid ? "!text-danger" : ""
          }`}
        >
          {label}
        </label>
        <Select
          ref={ref}
          classNames={defaultClassNames}
          radius={radius}
          size={size}
          placeholder={placeholder}
          isDisabled={isDisabled}
          isInvalid={finalIsInvalid}
          errorMessage={finalErrorMessage}
          onSelectionChange={onSelectionChange}
          className={className}
          id={id}
          aria-label={ariaLabel}
          {...props}
        >
          {children}
        </Select>
      </div>
    );
  }
);

FormSelect.displayName = "FormSelect";

export default FormSelect;
