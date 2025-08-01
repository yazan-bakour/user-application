"use client";

import { Input } from "@heroui/input";
import { forwardRef } from "react";
import { FieldError, UseFormRegisterReturn } from "react-hook-form";

interface FormInputProps {
  type?: string;
  size?: "sm" | "md" | "lg";
  labelPlacement?: "inside" | "outside" | "outside-left";
  className?: string;
  radius?: "none" | "sm" | "md" | "lg" | "full";
  label: string;
  placeholder?: string;
  value?: string;
  isReadOnly?: boolean;
  isInvalid?: boolean;
  errorMessage?: string;
  registration?: UseFormRegisterReturn;
  error?: FieldError;
  defaultErrorMessage?: string;
  classNames?: {
    base?: string;
    label?: string;
    inputWrapper?: string;
    innerWrapper?: string;
    mainWrapper?: string;
    input?: string;
    clearButton?: string;
    helperWrapper?: string;
    description?: string;
    errorMessage?: string;
  };
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
      isInvalid,
      errorMessage,
      registration,
      error,
      defaultErrorMessage,
      classNames,
      ...props
    },
    ref
  ) => {
    const finalErrorMessage =
      errorMessage || error?.message || defaultErrorMessage;

    const finalIsInvalid = isInvalid !== undefined ? isInvalid : !!error;

    // Default classNames with border-b-1 applied to mainWrapper
    const defaultClassNames = {
      inputWrapper: "border-b-1",
      mainWrapper: "h-[64px]",
      ...classNames,
    };

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
        isInvalid={finalIsInvalid}
        errorMessage={finalErrorMessage}
        classNames={defaultClassNames}
        {...registration}
        {...props}
      />
    );
  }
);

FormInput.displayName = "FormInput";

export default FormInput;
