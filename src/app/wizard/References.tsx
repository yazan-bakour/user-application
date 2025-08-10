"use client";

import FormInput from "../../components/FormInput";
import { Button } from "@heroui/react";
import { useFormContext, useFieldArray } from "react-hook-form";
import { memo } from "react";
import { FormData, Reference } from "../types";

interface ReferencesProps {
  isEdit: boolean;
}

const References = memo(({ isEdit }: ReferencesProps) => {
  const {
    register,
    formState: { errors, isLoading, isValid },
    watch,
    control,
    trigger,
  } = useFormContext<FormData>();

  const {
    fields: referenceFields,
    append: appendReference,
    remove: removeReference,
  } = useFieldArray({
    control,
    name: "references",
  });

  const watchedValues = watch();

  const addNewReference = () => {
    const newReference: Reference = {
      id: Date.now().toString(),
      name: "",
      position: "",
      company: "",
      email: "",
      phone: "",
    };
    appendReference(newReference);
  };

  const removeReferenceEntry = (index: number) => {
    if (referenceFields.length > 1 && index > 0) {
      removeReference(index);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h4 className="text-md font-medium">References</h4>
        {isEdit && (
          <Button
            color="primary"
            variant="light"
            size="sm"
            onPress={addNewReference}
            className="rounded-none"
          >
            Add Reference
          </Button>
        )}
      </div>
      <div className="flex flex-col gap-1">
        {referenceFields.map((field, index) => (
          <div key={field.id} className="border-none">
            <div className="flex justify-between items-center">
              {index > 0 && (
                <h5 className="text-sm font-medium">Reference #{index + 1}</h5>
              )}
              {isEdit && referenceFields.length > 1 && index > 0 && (
                <Button
                  color="danger"
                  variant="light"
                  size="sm"
                  onPress={() => removeReferenceEntry(index)}
                  className="rounded-none"
                >
                  Remove
                </Button>
              )}
            </div>
            <div className="flex flex-col md:gab-4">
              <div className="grid grid-cols-1 md:grid-cols-2 md:gap-4">
                <FormInput
                  type="text"
                  label="Full Name"
                  placeholder="Reference full name"
                  value={watchedValues.references?.[index]?.name || ""}
                  isReadOnly={!isEdit}
                  isLoading={isLoading}
                  error={errors.references?.[index]?.name}
                  isInvalid={!isValid && !!errors.references?.[index]?.name}
                  {...register(`references.${index}.name`, {
                    required: "Name is required",
                    onChange: () => trigger(`references.${index}.name`),
                  })}
                />
                <FormInput
                  type="text"
                  label="Position"
                  placeholder="Job title"
                  value={watchedValues.references?.[index]?.position || ""}
                  isReadOnly={!isEdit}
                  isLoading={isLoading}
                  error={errors.references?.[index]?.position}
                  isInvalid={!isValid && !!errors.references?.[index]?.position}
                  {...register(`references.${index}.position`, {
                    required: "Position is required",
                    onChange: () => trigger(`references.${index}.position`),
                  })}
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 mad:gab-4">
                <FormInput
                  type="text"
                  label="Company"
                  placeholder="Company name"
                  value={watchedValues.references?.[index]?.company || ""}
                  isReadOnly={!isEdit}
                  isLoading={isLoading}
                  error={errors.references?.[index]?.company}
                  isInvalid={!isValid && !!errors.references?.[index]?.company}
                  {...register(`references.${index}.company`, {
                    required: "Company is required",
                    onChange: () => trigger(`references.${index}.company`),
                  })}
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 md:gap-4">
                <FormInput
                  type="email"
                  label="Email"
                  placeholder="reference@email.com"
                  value={watchedValues.references?.[index]?.email || ""}
                  isReadOnly={!isEdit}
                  isLoading={isLoading}
                  error={errors.references?.[index]?.email}
                  isInvalid={!isValid && !!errors.references?.[index]?.email}
                  {...register(`references.${index}.email`, {
                    required: "Email is required",
                    pattern: {
                      value: /^\S+@\S+$/i,
                      message: "Please enter a valid email address",
                    },
                    onChange: () => trigger(`references.${index}.email`),
                  })}
                />
                <FormInput
                  type="tel"
                  label="Phone"
                  placeholder="Phone number"
                  value={watchedValues.references?.[index]?.phone || ""}
                  isReadOnly={!isEdit}
                  isLoading={isLoading}
                  error={errors.references?.[index]?.phone}
                  isInvalid={!isValid && !!errors.references?.[index]?.phone}
                  {...register(`references.${index}.phone`, {
                    onChange: () => trigger(`references.${index}.phone`),
                  })}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
});

References.displayName = "References";

export default References;
