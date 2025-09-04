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

  const educations = watchedValues.educations || [];
  const job_experiences = watchedValues.job_experiences || [];

  const addNewEducation = () => {
    const newEducation: Education = {
      id: Date.now().toString(),
      university_name: "",
      degree_type: "",
      course_name: "",
    };
    const updatedEducations = [...educations, newEducation];
    setValue("educations", updatedEducations, { shouldValidate: true });
  };

  const removeEducationEntry = (index: number) => {
    if (educations.length > 1) {
      const updatedEducations = educations.filter((_, i) => i !== index);
      setValue("educations", updatedEducations, { shouldValidate: true });
    }
  };

  const addNewExperience = () => {
    const newExperience: JobExperience = {
      id: Date.now().toString(),
      job_title: "",
      company_name: "",
      start_date: "",
      end_date: "",
      is_present_job: false,
      description: "",
    };
    const updatedExperiences = [...job_experiences, newExperience];
    setValue("job_experiences", updatedExperiences, { shouldValidate: true });
  };

  const removeExperienceEntry = (index: number) => {
    if (job_experiences.length > 1) {
      const updatedExperiences = job_experiences.filter((_, i) => i !== index);
      setValue("job_experiences", updatedExperiences, { shouldValidate: true });
    }
  };

  console.log("educations from watchedValues:", educations);
  console.log("job_experiences from watchedValues:", job_experiences);
  return (
    <div className="gap-8 md:gap-12 w-full grid grid-cols-1 md:grid-cols-2">
      <div>
        <div className="flex justify-between items-center mb-1">
          <h4 className="text-md font-medium">Education</h4>
          <Button
            color="primary"
            variant="light"
            size="sm"
            onPress={addNewEducation}
            className="rounded-none"
          >
            Add Education
          </Button>
        </div>
        <div className="flex flex-col gap-6">
          {educations.map((education: Education, index: number) => (
            <div key={education.id || index} className="border-none">
              <div className="flex justify-between items-center mb-4">
                {educations.length > 1 && (
                  <h4 className="text-md font-medium">
                    Education #{index + 1}
                  </h4>
                )}
                {isEdit && educations.length > 1 && (
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
                    watchedValues.educations?.[index]?.university_name || ""
                  }
                  isReadOnly={!isEdit}
                  isLoading={isLoading}
                  error={errors.educations?.[index]?.university_name}
                  isInvalid={
                    !isValid && !!errors.educations?.[index]?.university_name
                  }
                  {...register(`educations.${index}.university_name`, {
                    required: "University name is required",
                    onChange: () => {
                      trigger(`educations.${index}.university_name`);
                    },
                  })}
                />

                <FormSelect
                  label="Degree Type"
                  placeholder="Select your degree type"
                  isLoading={isLoading}
                  selectedKeys={
                    watchedValues.educations?.[index]?.degree_type
                      ? [watchedValues.educations[index].degree_type]
                      : []
                  }
                  error={errors.educations?.[index]?.degree_type}
                  {...register(`educations.${index}.degree_type`, {
                    required: "Degree type is required",
                  })}
                  onSelectionChange={(keys) => {
                    const selectedKey = Array.from(keys)[0] as DegreeType;
                    if (selectedKey) {
                      setValue(`educations.${index}.degree_type`, selectedKey, {
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
                  value={watchedValues.educations?.[index]?.course_name || ""}
                  isReadOnly={!isEdit}
                  isLoading={isLoading}
                  error={errors.educations?.[index]?.course_name}
                  isInvalid={
                    !isValid && !!errors.educations?.[index]?.course_name
                  }
                  {...register(`educations.${index}.course_name`, {
                    required: "Course name is required",
                    onChange: () => {
                      trigger(`educations.${index}.course_name`);
                    },
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
          <Button
            color="primary"
            variant="light"
            size="sm"
            onPress={addNewExperience}
            className="rounded-none"
          >
            Add Experience
          </Button>
        </div>
        <div className="flex flex-col gap-4">
          {job_experiences.map((experience: JobExperience, index: number) => (
            <div key={experience.id || index} className="border-none">
              <div className="flex justify-between items-center mb-4">
                {job_experiences.length > 1 && (
                  <h4 className="text-md font-medium">
                    Experience #{index + 1}
                  </h4>
                )}
                {isEdit && job_experiences.length > 1 && (
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
                  value={
                    watchedValues.job_experiences?.[index]?.job_title || ""
                  }
                  isReadOnly={!isEdit}
                  isLoading={isLoading}
                  error={errors.job_experiences?.[index]?.job_title}
                  isInvalid={
                    !isValid && !!errors.job_experiences?.[index]?.job_title
                  }
                  {...register(`job_experiences.${index}.job_title`, {
                    required: "Job title is required",
                    onChange: () => {
                      trigger(`job_experiences.${index}.job_title`);
                    },
                  })}
                />

                <FormInput
                  type="text"
                  label="Company Name"
                  placeholder="Enter company name"
                  value={
                    watchedValues.job_experiences?.[index]?.company_name || ""
                  }
                  isReadOnly={!isEdit}
                  isLoading={isLoading}
                  error={errors.job_experiences?.[index]?.company_name}
                  isInvalid={
                    !isValid && !!errors.job_experiences?.[index]?.company_name
                  }
                  {...register(`job_experiences.${index}.company_name`, {
                    required: "Company name is required",
                    onChange: () => {
                      trigger(`job_experiences.${index}.company_name`);
                    },
                  })}
                />

                <div className="flex gap-x-4">
                  <FormInput
                    type="date"
                    label="Start Date"
                    value={
                      watchedValues.job_experiences?.[index]?.start_date || ""
                    }
                    isReadOnly={!isEdit}
                    isLoading={isLoading}
                    error={errors.job_experiences?.[index]?.start_date}
                    isInvalid={
                      !isValid && !!errors.job_experiences?.[index]?.start_date
                    }
                    {...register(`job_experiences.${index}.start_date`, {
                      required: "Start date is required",
                      onChange: () => {
                        trigger(`job_experiences.${index}.start_date`);
                      },
                    })}
                  />

                  <FormInput
                    type="date"
                    label="End Date"
                    value={
                      watchedValues.job_experiences?.[index]?.end_date || ""
                    }
                    isDisabled={
                      watchedValues.job_experiences?.[index]?.is_present_job ||
                      !isEdit
                    }
                    isLoading={isLoading}
                    isInvalid={
                      !isValid &&
                      !!errors.job_experiences?.[index]?.end_date &&
                      !watchedValues.job_experiences?.[index]?.is_present_job
                    }
                    error={
                      !watchedValues.job_experiences?.[index]?.is_present_job
                        ? errors.job_experiences?.[index]?.end_date
                        : undefined
                    }
                    {...register(`job_experiences.${index}.end_date`, {
                      required: !watchedValues.job_experiences?.[index]
                        ?.is_present_job
                        ? "End date is required"
                        : false,
                      onChange: () => {
                        trigger(`job_experiences.${index}.end_date`);
                      },
                    })}
                  />
                </div>

                <Checkbox
                  className="mb-3"
                  size="sm"
                  isSelected={
                    watchedValues.job_experiences?.[index]?.is_present_job ||
                    false
                  }
                  isDisabled={!isEdit}
                  onValueChange={(checked) => {
                    setValue(
                      `job_experiences.${index}.is_present_job`,
                      checked,
                      {
                        shouldValidate: true,
                      }
                    );
                    if (checked) {
                      setValue(`job_experiences.${index}.end_date`, "", {
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
                    watchedValues.job_experiences?.[index]?.description || ""
                  }
                  isDisabled={!isEdit}
                  minRows={3}
                  radius="none"
                  isInvalid={
                    !isValid &&
                    !!errors.job_experiences?.[index]?.description?.message
                  }
                  errorMessage={
                    errors.job_experiences?.[index]?.description?.message
                  }
                  {...register(`job_experiences.${index}.description`, {
                    required: "Job description is required",
                    minLength: {
                      value: 10,
                      message: "Description must be at least 10 characters",
                    },
                    onChange: () => {
                      trigger(`job_experiences.${index}.description`);
                    },
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
