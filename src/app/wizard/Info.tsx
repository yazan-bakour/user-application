"use client";

import { Select, SelectItem, RadioGroup, Radio, Skeleton } from "@heroui/react";
import { useFormContext } from "react-hook-form";
import { memo } from "react";
import { FormData, Title, MaritalStatus } from "./service";
import FormInput from "../../components/FormInput";

interface InfoProps {
  isEdit: boolean;
}

const Info = memo(({ isEdit }: InfoProps) => {
  const {
    register,
    formState: { errors, isLoading },
    watch,
    setValue,
  } = useFormContext<FormData>();

  const watchedValues = watch();

  register("developer", { required: "Please select if you are a developer" });

  if (isLoading) {
    return (
      <div className="flex flex-col gap-4 w-full">
        <Skeleton className="rounded-lg">
          <div className="h-14 w-full bg-default-200"></div>
        </Skeleton>
        <Skeleton className="rounded-lg">
          <div className="h-14 w-full bg-default-200"></div>
        </Skeleton>
        <Skeleton className="rounded-lg">
          <div className="h-14 w-full bg-default-200"></div>
        </Skeleton>
        <Skeleton className="rounded-lg">
          <div className="h-14 w-full bg-default-200"></div>
        </Skeleton>
        <Skeleton className="rounded-lg">
          <div className="h-14 w-full bg-default-200"></div>
        </Skeleton>
        <Skeleton className="rounded-lg">
          <div className="h-20 w-full bg-default-200"></div>
        </Skeleton>
      </div>
    );
  }
  const defaultSelectClass = {
    trigger: "border-b-1",
    mainWrapper: "h-[64px]",
  };
  return (
    <div className="flex flex-col gap-7 w-full">
      {/* First Row: Title, Marital Status */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="flex flex-col gap-1">
          <label
            aria-labelledby="title-label"
            className={`text-sm text-foreground ${
              !!errors.title ? "!text-danger" : ""
            }`}
          >
            Title
          </label>
          <Select
            classNames={defaultSelectClass}
            radius="none"
            size="md"
            placeholder="Select title"
            selectedKeys={watchedValues.title ? [watchedValues.title] : []}
            isInvalid={!!errors.title}
            errorMessage={errors.title?.message || "Title is required"}
            {...register("title", { required: "Title is required" })}
            onSelectionChange={(keys) => {
              const selectedKey = Array.from(keys)[0] as Title;
              if (selectedKey) {
                setValue("title", selectedKey, { shouldValidate: true });
              }
            }}
          >
            {Object.values(Title).map((title) => (
              <SelectItem key={title} isReadOnly={!isEdit}>
                {title}
              </SelectItem>
            ))}
          </Select>
        </div>
        <div className="flex flex-col gap-1">
          <label
            aria-labelledby="status-label"
            className={`text-sm text-foreground ${
              !!errors.maritalStatus ? "!text-danger" : ""
            }`}
          >
            Marital Status
          </label>
          <Select
            classNames={defaultSelectClass}
            radius="none"
            size="md"
            placeholder="Select status"
            selectedKeys={
              watchedValues.maritalStatus ? [watchedValues.maritalStatus] : []
            }
            isInvalid={!!errors.maritalStatus}
            errorMessage={errors.maritalStatus?.message || "Status is required"}
            {...register("maritalStatus", { required: "Status is required" })}
            onSelectionChange={(keys) => {
              const selectedKey = Array.from(keys)[0] as MaritalStatus;
              if (selectedKey) {
                setValue("maritalStatus", selectedKey, {
                  shouldValidate: true,
                });
              }
            }}
          >
            {Object.values(MaritalStatus).map((status) => (
              <SelectItem key={status} isReadOnly={!isEdit}>
                {status}
              </SelectItem>
            ))}
          </Select>
        </div>
      </div>

      {/* Second Row: First Name, Last Name */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <FormInput
          label="First Name"
          placeholder="Enter first name"
          value={watchedValues.firstName || ""}
          isReadOnly={!isEdit}
          error={errors.firstName}
          defaultErrorMessage="First name is required"
          registration={register("firstName", {
            required: "First name is required",
            maxLength: {
              value: 80,
              message: "First name must be less than 80 characters",
            },
          })}
        />

        <FormInput
          label="Last Name"
          placeholder="Enter last name"
          value={watchedValues.lastName || ""}
          isReadOnly={!isEdit}
          error={errors.lastName}
          defaultErrorMessage="Last name is required"
          registration={register("lastName", {
            required: "Last name is required",
            maxLength: {
              value: 100,
              message: "Last name must be less than 100 characters",
            },
          })}
        />
      </div>

      {/* Third Row: Date of Birth, Email, Phone Number */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormInput
          type="email"
          label="Email"
          placeholder="Enter email"
          value={watchedValues.email || ""}
          isReadOnly={!isEdit}
          error={errors.email}
          defaultErrorMessage="Valid email is required"
          registration={register("email", {
            required: "Email is required",
            pattern: {
              value: /^\S+@\S+$/i,
              message: "Please enter a valid email address",
            },
          })}
        />
      </div>
      <div className="grid grid-cols-6 gap-4">
        <div className="col-span-2">
          <FormInput
            type="date"
            label="Date of Birth"
            placeholder="Select date of birth"
            value={watchedValues.dateOfBirth || ""}
            isReadOnly={!isEdit}
            error={errors.dateOfBirth}
            registration={register("dateOfBirth")}
          />
        </div>
        <div>
          <FormInput
            type="tel"
            label="Mobile Number"
            placeholder="Enter mobile number"
            value={watchedValues.mobileNumber || ""}
            isReadOnly={!isEdit}
            error={errors.mobileNumber}
            defaultErrorMessage="Mobile number is required"
            registration={register("mobileNumber", {
              required: "Mobile number is required",
              minLength: {
                value: 6,
                message: "Mobile number must be at least 6 digits",
              },
              maxLength: {
                value: 12,
                message: "Mobile number must be less than 12 digits",
              },
              pattern: {
                value: /^[0-9]+$/,
                message: "Mobile number must contain only numbers",
              },
            })}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormInput
          label="Street Address"
          placeholder="Enter street address"
          value={watchedValues.streetAddress || ""}
          isReadOnly={!isEdit}
          error={errors.streetAddress}
          registration={register("streetAddress")}
        />
      </div>
      <div className="grid grid-cols-6 gap-4">
        <FormInput
          label="City"
          placeholder="Enter city"
          value={watchedValues.city || ""}
          isReadOnly={!isEdit}
          error={errors.city}
          defaultErrorMessage="City is required"
          registration={register("city", {
            required: "City is required",
          })}
        />
        <div className="col-span-2">
          <FormInput
            label="State/Province"
            placeholder="Enter state or province"
            value={watchedValues.state || ""}
            isReadOnly={!isEdit}
            error={errors.state}
            registration={register("state")}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <FormInput
          label="Postal Code"
          placeholder="Enter postal code"
          value={watchedValues.postalCode || ""}
          isReadOnly={!isEdit}
          error={errors.postalCode}
          registration={register("postalCode")}
        />
        <FormInput
          label="Country"
          placeholder="Enter country"
          value={watchedValues.country || ""}
          isReadOnly={!isEdit}
          error={errors.country}
          defaultErrorMessage="Country is required"
          registration={register("country", {
            required: "Country is required",
          })}
        />
      </div>

      <RadioGroup
        size="md"
        label="Are you a Software developer?"
        isReadOnly={!isEdit}
        orientation="horizontal"
        value={watchedValues.developer || ""}
        isInvalid={!!errors.developer}
        errorMessage={
          errors.developer?.message || "Please select if you are a developer"
        }
        onValueChange={(value) => {
          setValue("developer", value, { shouldValidate: true });

          if (value === "yes") {
            setValue("job", "", { shouldValidate: true });
          }
        }}
      >
        <Radio value="yes">Yes</Radio>
        <Radio value="no">No</Radio>
      </RadioGroup>

      {watchedValues.developer === "no" && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <FormInput
            label="Job Title"
            placeholder="Enter job title"
            value={watchedValues.job || ""}
            isReadOnly={!isEdit}
            error={errors.job}
            defaultErrorMessage="Job title is required"
            registration={register("job", {
              required:
                watchedValues.developer === "no"
                  ? "Job title is required"
                  : false,
            })}
          />
        </div>
      )}
    </div>
  );
});

Info.displayName = "Info";

export default Info;
