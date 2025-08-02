"use client";

import { SelectItem, RadioGroup, Radio } from "@heroui/react";
import { useFormContext } from "react-hook-form";
import { memo } from "react";
import { FormData, Title, MaritalStatus } from "./service";
import FormInput from "../../components/FormInput";
import FormSelect from "../../components/FormSelect";

interface InfoProps {
  isEdit: boolean;
}

const Info = memo(({ isEdit }: InfoProps) => {
  const {
    register,
    formState: { errors, isLoading, isValid },
    watch,
    setValue,
    trigger,
  } = useFormContext<FormData>();

  const watchedValues = watch();

  return (
    <div className="flex flex-col gap-1 w-full">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-x-4">
        <FormSelect
          label="Title"
          placeholder="Select title"
          isLoading={isLoading}
          error={errors.title}
          registration={register("title", { required: "Title is required" })}
          onSelectionChange={(keys) => {
            const selectedKey = Array.from(keys)[0] as Title;
            if (selectedKey) {
              setValue("title", selectedKey, { shouldValidate: true });
              trigger("title");
            }
          }}
        >
          {Object.values(Title).map((title) => (
            <SelectItem key={title} isReadOnly={!isEdit} isDisabled={!isEdit}>
              {title}
            </SelectItem>
          ))}
        </FormSelect>
        <FormSelect
          label="Marital Status"
          placeholder="Select status"
          isLoading={isLoading}
          error={errors.maritalStatus}
          registration={register("maritalStatus", {
            required: "Status is required",
          })}
          onSelectionChange={(keys) => {
            const selectedKey = Array.from(keys)[0] as MaritalStatus;
            if (selectedKey) {
              setValue("maritalStatus", selectedKey, {
                shouldValidate: true,
              });
              trigger("maritalStatus");
            }
          }}
        >
          {Object.values(MaritalStatus).map((status) => (
            <SelectItem key={status} isReadOnly={!isEdit} isDisabled={!isEdit}>
              {status}
            </SelectItem>
          ))}
        </FormSelect>
      </div>

      {/* Second Row: First Name, Last Name */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-x-4">
        <FormInput
          isRequired
          label="First Name"
          placeholder="Enter first name"
          value={watchedValues.firstName || ""}
          isReadOnly={!isEdit}
          isLoading={isLoading}
          error={errors.firstName}
          isInvalid={!isValid && !!errors.firstName}
          {...register("firstName", {
            required: "First name is required",
            maxLength: {
              value: 80,
              message: "First name must be less than 80 characters",
            },
            onChange: () => trigger("firstName"),
          })}
        />

        <FormInput
          isRequired
          label="Last Name"
          placeholder="Enter last name"
          value={watchedValues.lastName || ""}
          isReadOnly={!isEdit}
          isLoading={isLoading}
          error={errors.lastName}
          isInvalid={!isValid && !!errors.lastName}
          {...register("lastName", {
            required: "Last name is required",
            maxLength: {
              value: 100,
              message: "Last name must be less than 100 characters",
            },
            onChange: () => trigger("lastName"),
          })}
        />
      </div>

      {/* Third Row: Date of Birth, Email, Phone Number */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4">
        <FormInput
          isRequired
          type="email"
          label="Email"
          placeholder="Enter email"
          value={watchedValues.email || ""}
          isReadOnly={!isEdit}
          isLoading={isLoading}
          error={errors.email}
          isInvalid={!isValid && !!errors.email}
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^\S+@\S+$/i,
              message: "Please enter a valid email address",
            },
            onChange: () => trigger("email"),
          })}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-6 gap-x-4">
        <div className="col-span-2">
          <FormInput
            isRequired
            type="date"
            label="Date of Birth"
            placeholder="Select date of birth"
            value={watchedValues.dateOfBirth || ""}
            isReadOnly={!isEdit}
            isLoading={isLoading}
            error={errors.dateOfBirth}
            isInvalid={!isValid && !!errors.dateOfBirth}
            {...register("dateOfBirth", {
              required: "Date of birth is required",
              onChange: () => trigger("dateOfBirth"),
            })}
          />
        </div>
        <div>
          <FormInput
            isRequired
            type="tel"
            label="Mobile Number"
            placeholder="Enter mobile"
            value={watchedValues.mobileNumber || ""}
            isLoading={isLoading}
            isReadOnly={!isEdit}
            error={errors.mobileNumber}
            isInvalid={!isValid && !!errors.mobileNumber}
            {...register("mobileNumber", {
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
              onChange: () => trigger("mobileNumber"),
            })}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormInput
          isRequired
          label="Street Address"
          placeholder="Enter street address"
          value={watchedValues.streetAddress || ""}
          isReadOnly={!isEdit}
          isLoading={isLoading}
          error={errors.streetAddress}
          isInvalid={!isValid && !!errors.streetAddress}
          {...register("streetAddress", {
            required: "Address is required",
            onChange: () => trigger("streetAddress"),
          })}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
        <FormInput
          isRequired
          label="City"
          placeholder="Enter city"
          value={watchedValues.city || ""}
          isReadOnly={!isEdit}
          isLoading={isLoading}
          error={errors.city}
          isInvalid={!isValid && !!errors.city}
          {...register("city", {
            required: "City is required",
            onChange: () => trigger("city"),
          })}
        />
        <div className="col-span-2">
          <FormInput
            isRequired
            required
            label="State/Province"
            placeholder="Enter state or province"
            value={watchedValues.state || ""}
            isReadOnly={!isEdit}
            isLoading={isLoading}
            error={errors.state}
            isInvalid={!isValid && !!errors.state}
            {...register("state", {
              required: "State/Province is required",
              onChange: () => trigger("state"),
            })}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <FormInput
          isRequired
          label="Postal Code"
          placeholder="Enter postal code"
          value={watchedValues.postalCode || ""}
          isReadOnly={!isEdit}
          isLoading={isLoading}
          error={errors.postalCode}
          isInvalid={!isValid && !!errors.postalCode}
          {...register("postalCode", {
            required: "Postal code is required",
            onChange: () => trigger("postalCode"),
          })}
        />
        <FormInput
          isRequired
          label="Country"
          placeholder="Enter country"
          value={watchedValues.country || ""}
          isReadOnly={!isEdit}
          isLoading={isLoading}
          error={errors.country}
          isInvalid={!isValid && !!errors.country}
          {...register("country", {
            required: "Country is required",
            onChange: () => trigger("country"),
          })}
        />
      </div>

      <RadioGroup
        className="mb-4"
        size="md"
        label="Are you a Software developer?"
        isReadOnly={!isEdit}
        orientation="horizontal"
        value={watchedValues.developer || ""}
        errorMessage={errors.developer?.message}
        isInvalid={!isValid && !!errors.developer}
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

      {/* Register the developer field separately */}
      <input
        type="hidden"
        {...register("developer", {
          required: "Please select if you are a developer",
          onChange: () => trigger("developer"),
        })}
      />

      {watchedValues.developer === "no" && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <FormInput
            isRequired
            label="Job Title"
            placeholder="Enter job title"
            value={watchedValues.job || ""}
            isReadOnly={!isEdit}
            isLoading={isLoading}
            error={errors.job}
            isInvalid={!isValid && !!errors.job}
            {...register("job", {
              required:
                watchedValues.developer === "no"
                  ? "Job title is required"
                  : false,
              onChange: () => trigger("job"),
            })}
          />
        </div>
      )}
    </div>
  );
});

Info.displayName = "Info";

export default Info;
