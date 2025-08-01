"use client";

import { Input } from "@heroui/input";
import {
  Select,
  SelectItem,
  Button,
  Textarea,
  Checkbox,
  Card,
  CardBody,
  CardHeader,
  Skeleton
} from "@heroui/react";
import { useFormContext, useFieldArray } from "react-hook-form";
import { memo } from "react";
import { FormData, DegreeType, JobExperience, Education } from "./service";

interface CareerProps {
  isEdit: boolean;
}

const Career = memo(({ isEdit }: CareerProps) => {
  const {
    register,
    formState: { errors, isLoading },
    watch,
    setValue,
    control,
  } = useFormContext<FormData>();

  const { fields: educationFields, append: appendEducation, remove: removeEducation } = useFieldArray({
    control,
    name: "educations",
  });

  const { fields: experienceFields, append: appendExperience, remove: removeExperience } = useFieldArray({
    control,
    name: "jobExperiences",
  });

  const watchedValues = watch();

  if (isLoading) {
    return (
      <div className="flex flex-col gap-6 w-full">
        <Card>
          <CardHeader>
            <Skeleton className="rounded-lg">
              <div className="h-6 w-32 bg-default-200"></div>
            </Skeleton>
          </CardHeader>
          <CardBody className="flex flex-col gap-6">
            <Card className="border">
              <CardHeader>
                <Skeleton className="rounded-lg">
                  <div className="h-5 w-28 bg-default-200"></div>
                </Skeleton>
              </CardHeader>
              <CardBody className="flex flex-col gap-4">
                <Skeleton className="rounded-lg">
                  <div className="h-14 w-full bg-default-200"></div>
                </Skeleton>
                <Skeleton className="rounded-lg">
                  <div className="h-14 w-full bg-default-200"></div>
                </Skeleton>
                <Skeleton className="rounded-lg">
                  <div className="h-14 w-full bg-default-200"></div>
                </Skeleton>
              </CardBody>
            </Card>
          </CardBody>
        </Card>

        <Card>
          <CardHeader>
            <Skeleton className="rounded-lg">
              <div className="h-6 w-40 bg-default-200"></div>
            </Skeleton>
          </CardHeader>
          <CardBody className="flex flex-col gap-6">
            <Card className="border">
              <CardHeader>
                <Skeleton className="rounded-lg">
                  <div className="h-5 w-32 bg-default-200"></div>
                </Skeleton>
              </CardHeader>
              <CardBody className="flex flex-col gap-4">
                <Skeleton className="rounded-lg">
                  <div className="h-14 w-full bg-default-200"></div>
                </Skeleton>
                <Skeleton className="rounded-lg">
                  <div className="h-14 w-full bg-default-200"></div>
                </Skeleton>
                <div className="flex gap-4">
                  <Skeleton className="rounded-lg flex-1">
                    <div className="h-14 w-full bg-default-200"></div>
                  </Skeleton>
                  <Skeleton className="rounded-lg flex-1">
                    <div className="h-14 w-full bg-default-200"></div>
                  </Skeleton>
                </div>
                <Skeleton className="rounded-lg">
                  <div className="h-5 w-40 bg-default-200"></div>
                </Skeleton>
                <Skeleton className="rounded-lg">
                  <div className="h-20 w-full bg-default-200"></div>
                </Skeleton>
              </CardBody>
            </Card>
          </CardBody>
        </Card>
      </div>
    );
  }

  const addNewEducation = () => {
    const newEducation: Education = {
      id: Date.now().toString(),
      universityName: "",
      degreeType: "",
      courseName: "",
    };
    appendEducation(newEducation);
  };

  const removeEducationEntry = (index: number) => {
    if (educationFields.length > 1 && index > 0) {
      removeEducation(index);
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
    appendExperience(newExperience);
  };

  const removeExperienceEntry = (index: number) => {
    if (experienceFields.length > 1 && index > 0) {
      removeExperience(index);
    }
  };

  return (
    <div className="flex flex-col gap-6 w-full">
      <Card>
        <CardHeader className="flex justify-between items-center">
          <h3 className="text-lg font-semibold">Education</h3>
          {isEdit && (
            <Button
              color="primary"
              variant="bordered"
              size="sm"
              onPress={addNewEducation}
            >
              Add Education
            </Button>
          )}
        </CardHeader>
        <CardBody className="flex flex-col gap-6">
          {educationFields.map((field, index) => (
            <Card key={field.id} className="border">
              <CardHeader className="flex justify-between items-center">
                <h4 className="text-md font-medium">Education #{index + 1}</h4>
                {isEdit && educationFields.length > 1 && index > 0 && (
                  <Button
                    color="danger"
                    variant="light"
                    size="sm"
                    onPress={() => removeEducationEntry(index)}
                  >
                    Remove
                  </Button>
                )}
              </CardHeader>
              <CardBody className="flex flex-col gap-4">
                <Input
                  type="text"
                  label="University Name"
                  placeholder="Enter your university name"
                  value={watchedValues.educations?.[index]?.universityName || ""}
                  isDisabled={!isEdit}
                  isInvalid={!!errors.educations?.[index]?.universityName}
                  errorMessage={errors.educations?.[index]?.universityName?.message || "University name is required"}
                  {...register(`educations.${index}.universityName`, {
                  required: "University name is required",
                  })}
                />

                <Select
                  label="Degree Type"
                  placeholder="Select your degree type"
                  isDisabled={!isEdit}
                  selectedKeys={watchedValues.educations?.[index]?.degreeType ? [watchedValues.educations[index].degreeType] : []}
                  isInvalid={!!errors.educations?.[index]?.degreeType}
                  errorMessage={errors.educations?.[index]?.degreeType?.message || "Degree type is required"}
                  {...register(`educations.${index}.degreeType`, { required: "Degree type is required" })}
                  onSelectionChange={(keys) => {
                    const selectedKey = Array.from(keys)[0] as DegreeType;
                    if (selectedKey) {
                      setValue(`educations.${index}.degreeType`, selectedKey, { shouldValidate: true });
                    }
                  }}
                >
                  {Object.values(DegreeType).map((degree) => (
                    <SelectItem key={degree}>
                      {degree}
                    </SelectItem>
                  ))}
                </Select>

                <Input
                  type="text"
                  label="Course Name"
                  placeholder="Enter your course/major name"
                  value={watchedValues.educations?.[index]?.courseName || ""}
                  isDisabled={!isEdit}
                  isInvalid={!!errors.educations?.[index]?.courseName}
                  errorMessage={errors.educations?.[index]?.courseName?.message || "Course name is required"}
                  {...register(`educations.${index}.courseName`, {
                    required: "Course name is required",
                  })}
                />
              </CardBody>
            </Card>
          ))}
        </CardBody>
      </Card>

      <Card>
        <CardHeader className="flex justify-between items-center">
          <h3 className="text-lg font-semibold">Job Experience</h3>
          {isEdit && (
            <Button
              color="primary"
              variant="bordered"
              size="sm"
              onPress={addNewExperience}
            >
              Add Experience
            </Button>
          )}
        </CardHeader>
        <CardBody className="flex flex-col gap-6">
          {experienceFields.map((field, index) => (
            <Card key={field.id} className="border">
              <CardHeader className="flex justify-between items-center">
                <h4 className="text-md font-medium">Experience #{index + 1}</h4>
                {isEdit && experienceFields.length > 1 && index > 0 && (
                  <Button
                    color="danger"
                    variant="light"
                    size="sm"
                    onPress={() => removeExperienceEntry(index)}
                  >
                    Remove
                  </Button>
                )}
              </CardHeader>
              <CardBody className="flex flex-col gap-4">
                <Input
                  type="text"
                  label="Job Title"
                  placeholder="Enter job title"
                  value={watchedValues.jobExperiences?.[index]?.jobTitle || ""}
                  isDisabled={!isEdit}
                  isInvalid={!!errors.jobExperiences?.[index]?.jobTitle}
                  errorMessage={errors.jobExperiences?.[index]?.jobTitle?.message || "Job title is required"}
                  {...register(`jobExperiences.${index}.jobTitle`, {
                    required: "Job title is required",
                  })}
                />

                <Input
                  type="text"
                  label="Company Name"
                  placeholder="Enter company name"
                  value={watchedValues.jobExperiences?.[index]?.companyName || ""}
                  isDisabled={!isEdit}
                  isInvalid={!!errors.jobExperiences?.[index]?.companyName}
                  errorMessage={errors.jobExperiences?.[index]?.companyName?.message || "Company name is required"}
                  {...register(`jobExperiences.${index}.companyName`, {
                    required: "Company name is required",
                  })}
                />

                <div className="flex gap-4">
                  <Input
                    type="date"
                    label="Start Date"
                    value={watchedValues.jobExperiences?.[index]?.startDate || ""}
                    isDisabled={!isEdit}
                    isInvalid={!!errors.jobExperiences?.[index]?.startDate}
                    errorMessage={errors.jobExperiences?.[index]?.startDate?.message || "Start date is required"}
                    {...register(`jobExperiences.${index}.startDate`, {
                      required: "Start date is required",
                    })}
                  />

                  <Input
                    type="date"
                    label="End Date"
                    value={watchedValues.jobExperiences?.[index]?.endDate || ""}
                    isDisabled={!isEdit || watchedValues.jobExperiences?.[index]?.isPresentJob}
                    isInvalid={!watchedValues.jobExperiences?.[index]?.isPresentJob && !!errors.jobExperiences?.[index]?.endDate}
                    errorMessage={!watchedValues.jobExperiences?.[index]?.isPresentJob ? errors.jobExperiences?.[index]?.endDate?.message : ""}
                    {...register(`jobExperiences.${index}.endDate`, {
                      required: !watchedValues.jobExperiences?.[index]?.isPresentJob ? "End date is required" : false,
                    })}
                  />
                </div>

                <Checkbox
                  isSelected={watchedValues.jobExperiences?.[index]?.isPresentJob || false}
                  isDisabled={!isEdit}
                  onValueChange={(checked) => {
                    setValue(`jobExperiences.${index}.isPresentJob`, checked, { shouldValidate: true });
                    if (checked) {
                      setValue(`jobExperiences.${index}.endDate`, "", { shouldValidate: true });
                    }
                  }}
                >
                  This is my current job
                </Checkbox>

                <Textarea
                  label="Job Description"
                  placeholder="Describe your responsibilities and achievements"
                  value={watchedValues.jobExperiences?.[index]?.description || ""}
                  isDisabled={!isEdit}
                  isInvalid={!!errors.jobExperiences?.[index]?.description}
                  errorMessage={errors.jobExperiences?.[index]?.description?.message || "Job description is required"}
                  minRows={3}
                  {...register(`jobExperiences.${index}.description`, {
                    required: "Job description is required",
                    minLength: { value: 10, message: "Description must be at least 10 characters" }
                  })}
                />
              </CardBody>
            </Card>
          ))}
        </CardBody>
      </Card>
    </div>
  );
});

Career.displayName = "Career";

export default Career;
