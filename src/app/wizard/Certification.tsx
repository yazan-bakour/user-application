"use client";

import FormInput from "../../components/FormInput";
import { Button, Checkbox } from "@heroui/react";
import { useFormContext, useFieldArray } from "react-hook-form";
import { memo } from "react";
import { FormData, Certification as CertificationType } from "../types";

interface CertificationProps {
  isEdit: boolean;
}

const Certification = memo(({ isEdit }: CertificationProps) => {
  const {
    register,
    formState: { errors, isLoading, isValid },
    watch,
    setValue,
    control,
    trigger,
  } = useFormContext<FormData>();

  const {
    fields: certificationFields,
    append: appendCertification,
    remove: removeCertification,
  } = useFieldArray({
    control,
    name: "certifications",
  });

  const watchedValues = watch();

  const addNewCertification = () => {
    const newCertification: CertificationType = {
      id: Date.now().toString(),
      name: "",
      issuer: "",
      dateObtained: "",
      expiryDate: "",
      hasExpiry: false,
    };
    appendCertification(newCertification);
  };

  const removeCertificationEntry = (index: number) => {
    if (certificationFields.length > 1 && index > 0) {
      removeCertification(index);
    }
  };

  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-1">
      <div className="flex justify-between items-center">
        <h4 className="text-md font-medium">Certifications</h4>
        {isEdit && (
          <Button
            color="primary"
            variant="light"
            size="sm"
            onPress={addNewCertification}
            className="rounded-none"
          >
            Add Certification
          </Button>
        )}
      </div>
      <div className="flex flex-col gap-4">
        {certificationFields.map((field, index) => (
          <div key={field.id} className="border-none">
            <div className="flex flex-col mb-4">
              <div className="flex justify-between items-center mb-4">
                {index > 0 && (
                  <h5 className="text-sm font-medium">
                    Certification #{index + 1}
                  </h5>
                )}
                {isEdit && certificationFields.length > 1 && index > 0 && (
                  <Button
                    color="danger"
                    variant="light"
                    size="sm"
                    onPress={() => removeCertificationEntry(index)}
                    className="rounded-none"
                  >
                    Remove
                  </Button>
                )}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4">
                <FormInput
                  type="text"
                  label="Certification Name"
                  placeholder="e.g., AWS Solutions Architect"
                  value={watchedValues.certifications?.[index]?.name || ""}
                  isReadOnly={!isEdit}
                  isLoading={isLoading}
                  error={errors.certifications?.[index]?.name}
                  isInvalid={!isValid && !!errors.certifications?.[index]?.name}
                  {...register(`certifications.${index}.name`, {
                    required: "Certification name is required",
                    onChange: () => trigger(`certifications.${index}.name`),
                  })}
                />
                <FormInput
                  type="text"
                  label="Issuing Organization"
                  placeholder="e.g., Amazon Web Services"
                  value={watchedValues.certifications?.[index]?.issuer || ""}
                  isReadOnly={!isEdit}
                  isLoading={isLoading}
                  error={errors.certifications?.[index]?.issuer}
                  isInvalid={
                    !isValid && !!errors.certifications?.[index]?.issuer
                  }
                  {...register(`certifications.${index}.issuer`, {
                    required: "Issuer is required",
                    onChange: () => trigger(`certifications.${index}.issuer`),
                  })}
                />
                <FormInput
                  type="date"
                  label="Date Obtained"
                  value={
                    watchedValues.certifications?.[index]?.dateObtained || ""
                  }
                  isReadOnly={!isEdit}
                  isLoading={isLoading}
                  error={errors.certifications?.[index]?.dateObtained}
                  isInvalid={
                    !isValid && !!errors.certifications?.[index]?.dateObtained
                  }
                  {...register(`certifications.${index}.dateObtained`, {
                    required: "Date obtained is required",
                    onChange: () =>
                      trigger(`certifications.${index}.dateObtained`),
                  })}
                />
                <FormInput
                  type="date"
                  label="Expiry Date"
                  value={
                    watchedValues.certifications?.[index]?.expiryDate || ""
                  }
                  isReadOnly={!isEdit}
                  isDisabled={!watchedValues.certifications?.[index]?.hasExpiry}
                  isLoading={isLoading}
                  error={errors.certifications?.[index]?.expiryDate}
                  isInvalid={
                    !isValid && !!errors.certifications?.[index]?.expiryDate
                  }
                  {...register(`certifications.${index}.expiryDate`, {
                    onChange: () =>
                      trigger(`certifications.${index}.expiryDate`),
                  })}
                />
              </div>
              <Checkbox
                radius="none"
                size="sm"
                isSelected={
                  watchedValues.certifications?.[index]?.hasExpiry || false
                }
                isDisabled={!isEdit}
                onValueChange={(checked) => {
                  setValue(`certifications.${index}.hasExpiry`, checked, {
                    shouldValidate: true,
                  });
                  if (!checked) {
                    setValue(`certifications.${index}.expiryDate`, "", {
                      shouldValidate: true,
                    });
                  }
                }}
              >
                This certification has an expiry date
              </Checkbox>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
});

Certification.displayName = "Certification";

export default Certification;
