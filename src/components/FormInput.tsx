"use client";

import { Input, InputProps, Skeleton } from "@heroui/react";
import { forwardRef } from "react";
import { FieldError } from "react-hook-form";

interface FormInputProps extends Omit<InputProps, "children"> {
  error?: FieldError;
  isLoading?: boolean;
  fieldValue?: string | number;
  id?: string;
}

const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
  (
    {
      type = "text",
      size = "md",
      labelPlacement = "outside",
      className,
      radius = "none",
      label,
      placeholder,
      value = "",
      isReadOnly = false,
      errorMessage,
      error,
      classNames,
      isLoading = false,
      id,
      ...props
    },
    ref
  ) => {
    const finalErrorMessage = errorMessage || error?.message;
    let ariaLabel: string | undefined;
    if (id) {
      ariaLabel = `${id}-input`;
    } else if (typeof label === "string") {
      ariaLabel = label;
    } else {
      ariaLabel = undefined;
    }

    const defaultClassNames = {
      inputWrapper: "border-b-1 border-primary",
      mainWrapper: "h-[64px]",
      label: "text-xs",
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
      <Input
        ref={ref}
        type={type}
        size={size}
        labelPlacement={labelPlacement}
        className={className}
        radius={radius}
        label={label}
        placeholder={placeholder}
        value={value}
        isReadOnly={isReadOnly}
        errorMessage={finalErrorMessage}
        classNames={defaultClassNames}
        id={id}
        aria-label={ariaLabel}
        {...props}
      />
    );
  }
);

FormInput.displayName = "FormInput";

export default FormInput;
