"use client";

import FormInput from "../../components/FormInput";
import FormSelect from "../../components/FormSelect";
import { SelectItem, Button, Textarea, Checkbox } from "@heroui/react";
import { useFormContext } from "react-hook-form";
import { memo } from "react";
import { FormData, DegreeType, JobExperience, Education } from "../types";

interface CareerProps {
  isEdit: boolean;
}

const Career = memo(({ isEdit }: CareerProps) => {
  const {
    register,
    formState: { errors, isLoading, isValid },
    watch,
    setValue,
    trigger,
  } = useFormContext<FormData>();

  const watchedValues = watch();

  // Get educations and jobExperiences directly from watchedValues
  const educations = watchedValues.educations || [];
  const jobExperiences = watchedValues.jobExperiences || [];

  const addNewEducation = () => {
    const newEducation: Education = {
      id: Date.now().toString(),
      universityName: "",
      degreeType: "",
      courseName: "",
    };
    const updatedEducations = [...educations, newEducation];
    setValue("educations", updatedEducations, { shouldValidate: true });
  };

  const removeEducationEntry = (index: number) => {
    if (educations.length > 1 && index > 0) {
      const updatedEducations = educations.filter((_, i) => i !== index);
      setValue("educations", updatedEducations, { shouldValidate: true });
    }
  };

  const addNewExperience = () => {
    const newExperience: JobExperience = {
      id: Date.now().toString(),
      jobTitle: "",
      companyName: "",
      startDate: "",
      endDate: "",
      isPresentJob: false,
      description: "",
    };
    const updatedExperiences = [...jobExperiences, newExperience];
    setValue("jobExperiences", updatedExperiences, { shouldValidate: true });
  };

  const removeExperienceEntry = (index: number) => {
    if (jobExperiences.length > 1 && index > 0) {
      const updatedExperiences = jobExperiences.filter((_, i) => i !== index);
      setValue("jobExperiences", updatedExperiences, { shouldValidate: true });
    }
  };

  console.log("educations from watchedValues:", educations);
  console.log("jobExperiences from watchedValues:", jobExperiences);
  return (
    <div className="gap-8 w-full grid grid-cols-1 md:grid-cols-2">
      <div>
        <div className="flex justify-between items-center mb-1">
          <h4 className="text-md font-medium">Education</h4>
          {isEdit && (
            <Button
              color="primary"
              variant="light"
              size="sm"
              onPress={addNewEducation}
              className="rounded-none"
            >
              Add Education
            </Button>
          )}
        </div>
        <div className="flex flex-col gap-6">
          {educations.map((education: Education, index: number) => (
            <div key={education.id || index} className="border-none">
              <div className="flex justify-between items-center mb-4">
                {index > 0 && (
                  <h4 className="text-md font-medium">
                    Education #{index + 1}
                  </h4>
                )}
                {isEdit && educations.length > 1 && index > 0 && (
                  <Button
                    color="danger"
                    variant="light"
                    size="sm"
                    onPress={() => removeEducationEntry(index)}
                    className="rounded-none"
                  >
                    Remove
                  </Button>
                )}
              </div>
              <div className="flex flex-col">
                <FormInput
                  type="text"
                  label="University Name"
                  placeholder="Enter your university name"
                  value={
                    watchedValues.educations?.[index]?.universityName || ""
                  }
                  isReadOnly={!isEdit}
                  isLoading={isLoading}
                  error={errors.educations?.[index]?.universityName}
                  isInvalid={
                    !isValid && !!errors.educations?.[index]?.universityName
                  }
                  {...register(`educations.${index}.universityName`, {
                    required: "University name is required",
                    onChange: () =>
                      trigger(`educations.${index}.universityName`),
                  })}
                />

                <FormSelect
                  label="Degree Type"
                  placeholder="Select your degree type"
                  isReadOnly={!isEdit}
                  isLoading={isLoading}
                  selectedKeys={
                    watchedValues.educations?.[index]?.degreeType
                      ? [watchedValues.educations[index].degreeType]
                      : []
                  }
                  error={errors.educations?.[index]?.degreeType}
                  {...register(`educations.${index}.degreeType`, {
                    required: "Degree type is required",
                  })}
                  onSelectionChange={(keys) => {
                    const selectedKey = Array.from(keys)[0] as DegreeType;
                    if (selectedKey) {
                      setValue(`educations.${index}.degreeType`, selectedKey, {
                        shouldValidate: true,
                      });
                    }
                  }}
                >
                  {Object.values(DegreeType).map((degree) => (
                    <SelectItem key={degree}>{degree}</SelectItem>
                  ))}
                </FormSelect>

                <FormInput
                  label="Course Name"
                  placeholder="Enter your course/major name"
                  value={watchedValues.educations?.[index]?.courseName || ""}
                  isReadOnly={!isEdit}
                  isLoading={isLoading}
                  error={errors.educations?.[index]?.courseName}
                  isInvalid={
                    !isValid && !!errors.educations?.[index]?.courseName
                  }
                  {...register(`educations.${index}.courseName`, {
                    required: "Course name is required",
                    onChange: () => trigger(`educations.${index}.courseName`),
                  })}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <div className="flex justify-between items-center mb-1">
          <h4 className="text-md font-medium">Job Experience</h4>
          {isEdit && (
            <Button
              color="primary"
              variant="light"
              size="sm"
              onPress={addNewExperience}
              className="rounded-none"
            >
              Add Experience
            </Button>
          )}
        </div>
        <div className="flex flex-col gap-4">
          {jobExperiences.map((experience: JobExperience, index: number) => (
            <div key={experience.id || index} className="border-none">
              <div className="flex justify-between items-center mb-4">
                {index > 0 && (
                  <h4 className="text-md font-medium">
                    Experience #{index + 1}
                  </h4>
                )}
                {isEdit && jobExperiences.length > 1 && index > 0 && (
                  <Button
                    color="danger"
                    variant="light"
                    size="sm"
                    onPress={() => removeExperienceEntry(index)}
                    className="rounded-none"
                  >
                    Remove
                  </Button>
                )}
              </div>
              <div className="flex flex-col">
                <FormInput
                  type="text"
                  label="Job Title"
                  placeholder="Enter job title"
                  value={watchedValues.jobExperiences?.[index]?.jobTitle || ""}
                  isReadOnly={!isEdit}
                  isLoading={isLoading}
                  error={errors.jobExperiences?.[index]?.jobTitle}
                  isInvalid={
                    !isValid && !!errors.jobExperiences?.[index]?.jobTitle
                  }
                  {...register(`jobExperiences.${index}.jobTitle`, {
                    required: "Job title is required",
                    onChange: () => trigger(`jobExperiences.${index}.jobTitle`),
                  })}
                />

                <FormInput
                  type="text"
                  label="Company Name"
                  placeholder="Enter company name"
                  value={
                    watchedValues.jobExperiences?.[index]?.companyName || ""
                  }
                  isReadOnly={!isEdit}
                  isLoading={isLoading}
                  error={errors.jobExperiences?.[index]?.companyName}
                  isInvalid={
                    !isValid && !!errors.jobExperiences?.[index]?.companyName
                  }
                  {...register(`jobExperiences.${index}.companyName`, {
                    required: "Company name is required",
                    onChange: () =>
                      trigger(`jobExperiences.${index}.companyName`),
                  })}
                />

                <div className="flex gap-x-4">
                  <FormInput
                    type="date"
                    label="Start Date"
                    value={
                      watchedValues.jobExperiences?.[index]?.startDate || ""
                    }
                    isReadOnly={!isEdit}
                    isLoading={isLoading}
                    error={errors.jobExperiences?.[index]?.startDate}
                    isInvalid={
                      !isValid && !!errors.jobExperiences?.[index]?.startDate
                    }
                    {...register(`jobExperiences.${index}.startDate`, {
                      required: "Start date is required",
                      onChange: () =>
                        trigger(`jobExperiences.${index}.startDate`),
                    })}
                  />

                  <FormInput
                    type="date"
                    label="End Date"
                    value={watchedValues.jobExperiences?.[index]?.endDate || ""}
                    isDisabled={
                      watchedValues.jobExperiences?.[index]?.isPresentJob ||
                      !isEdit
                    }
                    isLoading={isLoading}
                    isInvalid={
                      !isValid &&
                      !!errors.jobExperiences?.[index]?.endDate &&
                      !watchedValues.jobExperiences?.[index]?.isPresentJob
                    }
                    error={
                      !watchedValues.jobExperiences?.[index]?.isPresentJob
                        ? errors.jobExperiences?.[index]?.endDate
                        : undefined
                    }
                    {...register(`jobExperiences.${index}.endDate`, {
                      required: !watchedValues.jobExperiences?.[index]
                        ?.isPresentJob
                        ? "End date is required"
                        : false,
                      onChange: () =>
                        trigger(`jobExperiences.${index}.endDate`),
                    })}
                  />
                </div>

                <Checkbox
                  className="mb-3"
                  size="sm"
                  isSelected={
                    watchedValues.jobExperiences?.[index]?.isPresentJob || false
                  }
                  isDisabled={!isEdit}
                  onValueChange={(checked) => {
                    setValue(`jobExperiences.${index}.isPresentJob`, checked, {
                      shouldValidate: true,
                    });
                    if (checked) {
                      setValue(`jobExperiences.${index}.endDate`, "", {
                        shouldValidate: true,
                      });
                    }
                  }}
                  radius="none"
                >
                  This is my current job
                </Checkbox>

                <Textarea
                  label="Job Description"
                  labelPlacement="outside"
                  araia-label="Job Description"
                  placeholder="Describe your responsibilities and achievements"
                  value={
                    watchedValues.jobExperiences?.[index]?.description || ""
                  }
                  isDisabled={!isEdit}
                  minRows={3}
                  radius="none"
                  isInvalid={
                    !isValid &&
                    !!errors.jobExperiences?.[index]?.description?.message
                  }
                  errorMessage={
                    errors.jobExperiences?.[index]?.description?.message
                  }
                  {...register(`jobExperiences.${index}.description`, {
                    required: "Job description is required",
                    minLength: {
                      value: 10,
                      message: "Description must be at least 10 characters",
                    },
                    onChange: () =>
                      trigger(`jobExperiences.${index}.description`),
                  })}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
});

Career.displayName = "Career";

export default Career;
