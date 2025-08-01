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
  Skeleton,
} from "@heroui/react";
import { useFormContext, useFieldArray } from "react-hook-form";
import { memo } from "react";
import { 
  FormData, 
  WorkType,
  Project,
  Reference
} from "./service";

interface PortfolioProps {
  isEdit: boolean;
}

const Portfolio = memo(({ isEdit }: PortfolioProps) => {
  const {
    register,
    formState: { errors, isLoading },
    watch,
    setValue,
    control,
  } = useFormContext<FormData>();

  // Field arrays for dynamic sections
  const { fields: projectFields, append: appendProject, remove: removeProject } = useFieldArray({
    control,
    name: "projects",
  });

  const { fields: referenceFields, append: appendReference, remove: removeReference } = useFieldArray({
    control,
    name: "references",
  });

  const watchedValues = watch();

  // Show skeleton while data is loading
  if (isLoading) {
    return (
      <div className="flex flex-col gap-6 w-full">
        {[...Array(4)].map((_, i) => (
          <Card key={i}>
            <CardHeader>
              <Skeleton className="rounded-lg">
                <div className="h-6 w-40 bg-default-200"></div>
              </Skeleton>
            </CardHeader>
            <CardBody className="flex flex-col gap-4">
              {[...Array(3)].map((_, j) => (
                <Skeleton key={j} className="rounded-lg">
                  <div className="h-14 w-full bg-default-200"></div>
                </Skeleton>
              ))}
            </CardBody>
          </Card>
        ))}
      </div>
    );
  }

  // Add functions
  const addNewProject = () => {
    const newProject: Project = {
      id: Date.now().toString(),
      title: "",
      description: "",
      technologies: "",
      link: "",
      startDate: "",
      endDate: "",
      isOngoing: false,
    };
    appendProject(newProject);
  };

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

  // Remove functions (protect first item)
  const removeProjectEntry = (index: number) => {
    if (projectFields.length > 1 && index > 0) {
      removeProject(index);
    }
  };

  const removeReferenceEntry = (index: number) => {
    if (referenceFields.length > 1 && index > 0) {
      removeReference(index);
    }
  };

  return (
    <div className="flex flex-col gap-6 w-full">
      {/* Portfolio & Projects Section */}
      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold">Portfolio & Projects</h3>
        </CardHeader>
        <CardBody className="flex flex-col gap-6">
          {/* Portfolio Links */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Input
              type="url"
              label="Portfolio Website"
              placeholder="https://yourportfolio.com"
              value={watchedValues.portfolioWebsite || ""}
              isDisabled={!isEdit}
              {...register("portfolioWebsite")}
            />
            <Input
              type="url"
              label="GitHub URL"
              placeholder="https://github.com/username"
              value={watchedValues.githubUrl || ""}
              isDisabled={!isEdit}
              {...register("githubUrl")}
            />
            <Input
              type="url"
              label="LinkedIn URL"
              placeholder="https://linkedin.com/in/username"
              value={watchedValues.linkedinUrl || ""}
              isDisabled={!isEdit}
              {...register("linkedinUrl")}
            />
          </div>

          {/* Projects */}
          <div>
            <div className="flex justify-between items-center mb-4">
              <h4 className="text-md font-medium">Projects</h4>
              {isEdit && (
                <Button
                  color="primary"
                  variant="bordered"
                  size="sm"
                  onPress={addNewProject}
                >
                  Add Project
                </Button>
              )}
            </div>
            <div className="flex flex-col gap-4">
              {projectFields.map((field, index) => (
                <Card key={field.id} className="border">
                  <CardBody className="flex flex-col gap-4">
                    <div className="flex justify-between items-center">
                      <h5 className="text-sm font-medium">Project #{index + 1}</h5>
                      {isEdit && projectFields.length > 1 && index > 0 && (
                        <Button
                          color="danger"
                          variant="light"
                          size="sm"
                          onPress={() => removeProjectEntry(index)}
                        >
                          Remove
                        </Button>
                      )}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Input
                        type="text"
                        label="Project Title"
                        placeholder="e.g., E-commerce Website"
                        value={watchedValues.projects?.[index]?.title || ""}
                        isDisabled={!isEdit}
                        isInvalid={!!errors.projects?.[index]?.title}
                        errorMessage={errors.projects?.[index]?.title?.message || "Project title is required"}
                        {...register(`projects.${index}.title`, {
                          required: "Project title is required",
                        })}
                      />
                      <Input
                        type="text"
                        label="Technologies Used"
                        placeholder="e.g., React, Node.js, MongoDB"
                        value={watchedValues.projects?.[index]?.technologies || ""}
                        isDisabled={!isEdit}
                        {...register(`projects.${index}.technologies`)}
                      />
                      <Input
                        type="url"
                        label="Project Link"
                        placeholder="https://project-demo.com"
                        value={watchedValues.projects?.[index]?.link || ""}
                        isDisabled={!isEdit}
                        {...register(`projects.${index}.link`)}
                      />
                      <div className="flex gap-2">
                        <Input
                          type="date"
                          label="Start Date"
                          value={watchedValues.projects?.[index]?.startDate || ""}
                          isDisabled={!isEdit}
                          {...register(`projects.${index}.startDate`)}
                        />
                        <Input
                          type="date"
                          label="End Date"
                          value={watchedValues.projects?.[index]?.endDate || ""}
                          isDisabled={!isEdit || watchedValues.projects?.[index]?.isOngoing}
                          {...register(`projects.${index}.endDate`)}
                        />
                      </div>
                    </div>
                    <Checkbox
                      isSelected={watchedValues.projects?.[index]?.isOngoing || false}
                      isDisabled={!isEdit}
                      onValueChange={(checked) => {
                        setValue(`projects.${index}.isOngoing`, checked, { shouldValidate: true });
                        if (checked) {
                          setValue(`projects.${index}.endDate`, "", { shouldValidate: true });
                        }
                      }}
                    >
                      This is an ongoing project
                    </Checkbox>
                    <Textarea
                      label="Project Description"
                      placeholder="Describe the project, your role, and key achievements"
                      value={watchedValues.projects?.[index]?.description || ""}
                      isDisabled={!isEdit}
                      isInvalid={!!errors.projects?.[index]?.description}
                      errorMessage={errors.projects?.[index]?.description?.message || "Project description is required"}
                      minRows={3}
                      {...register(`projects.${index}.description`, {
                        required: "Project description is required",
                        minLength: { value: 10, message: "Description must be at least 10 characters" }
                      })}
                    />
                  </CardBody>
                </Card>
              ))}
            </div>
          </div>

          {/* References */}
          <div>
            <div className="flex justify-between items-center mb-4">
              <h4 className="text-md font-medium">References</h4>
              {isEdit && (
                <Button
                  color="primary"
                  variant="bordered"
                  size="sm"
                  onPress={addNewReference}
                >
                  Add Reference
                </Button>
              )}
            </div>
            <div className="flex flex-col gap-4">
              {referenceFields.map((field, index) => (
                <Card key={field.id} className="border">
                  <CardBody className="flex flex-col gap-4">
                    <div className="flex justify-between items-center">
                      <h5 className="text-sm font-medium">Reference #{index + 1}</h5>
                      {isEdit && referenceFields.length > 1 && index > 0 && (
                        <Button
                          color="danger"
                          variant="light"
                          size="sm"
                          onPress={() => removeReferenceEntry(index)}
                        >
                          Remove
                        </Button>
                      )}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Input
                        type="text"
                        label="Full Name"
                        placeholder="Reference full name"
                        value={watchedValues.references?.[index]?.name || ""}
                        isDisabled={!isEdit}
                        isInvalid={!!errors.references?.[index]?.name}
                        errorMessage={errors.references?.[index]?.name?.message || "Name is required"}
                        {...register(`references.${index}.name`, {
                          required: "Name is required",
                        })}
                      />
                      <Input
                        type="text"
                        label="Position"
                        placeholder="Job title"
                        value={watchedValues.references?.[index]?.position || ""}
                        isDisabled={!isEdit}
                        isInvalid={!!errors.references?.[index]?.position}
                        errorMessage={errors.references?.[index]?.position?.message || "Position is required"}
                        {...register(`references.${index}.position`, {
                          required: "Position is required",
                        })}
                      />
                      <Input
                        type="text"
                        label="Company"
                        placeholder="Company name"
                        value={watchedValues.references?.[index]?.company || ""}
                        isDisabled={!isEdit}
                        isInvalid={!!errors.references?.[index]?.company}
                        errorMessage={errors.references?.[index]?.company?.message || "Company is required"}
                        {...register(`references.${index}.company`, {
                          required: "Company is required",
                        })}
                      />
                      <Input
                        type="email"
                        label="Email"
                        placeholder="reference@email.com"
                        value={watchedValues.references?.[index]?.email || ""}
                        isDisabled={!isEdit}
                        isInvalid={!!errors.references?.[index]?.email}
                        errorMessage={errors.references?.[index]?.email?.message || "Valid email is required"}
                        {...register(`references.${index}.email`, {
                          required: "Email is required",
                          pattern: { value: /^\S+@\S+$/i, message: "Please enter a valid email address" }
                        })}
                      />
                      <Input
                        type="tel"
                        label="Phone"
                        placeholder="Phone number"
                        value={watchedValues.references?.[index]?.phone || ""}
                        isDisabled={!isEdit}
                        {...register(`references.${index}.phone`)}
                      />
                    </div>
                  </CardBody>
                </Card>
              ))}
            </div>
          </div>
        </CardBody>
      </Card>

      {/* Preferences & Goals Section */}
      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold">Preferences & Goals</h3>
        </CardHeader>
        <CardBody className="flex flex-col gap-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Select
              label="Preferred Work Type"
              placeholder="Select work preference"
              isDisabled={!isEdit}
              selectedKeys={watchedValues.preferredWorkType ? [watchedValues.preferredWorkType] : []}
              {...register("preferredWorkType")}
              onSelectionChange={(keys) => {
                const selectedKey = Array.from(keys)[0] as WorkType;
                if (selectedKey) {
                  setValue("preferredWorkType", selectedKey, { shouldValidate: true });
                }
              }}
            >
              {Object.values(WorkType).map((type) => (
                <SelectItem key={type}>{type}</SelectItem>
              ))}
            </Select>
            <Input
              type="text"
              label="Expected Salary"
              placeholder="e.g., $50,000 - $70,000"
              value={watchedValues.expectedSalary || ""}
              isDisabled={!isEdit}
              {...register("expectedSalary")}
            />
            <Input
              type="text"
              label="Preferred Location"
              placeholder="e.g., New York, Remote"
              value={watchedValues.preferredLocation || ""}
              isDisabled={!isEdit}
              {...register("preferredLocation")}
            />
            <Input
              type="date"
              label="Availability Date"
              value={watchedValues.availabilityDate || ""}
              isDisabled={!isEdit}
              {...register("availabilityDate")}
            />
          </div>
          <Textarea
            label="Career Goals"
            placeholder="Describe your short-term and long-term career objectives"
            value={watchedValues.careerGoals || ""}
            isDisabled={!isEdit}
            minRows={3}
            {...register("careerGoals")}
          />
        </CardBody>
      </Card>

      {/* Additional Information Section */}
      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold">Additional Information</h3>
        </CardHeader>
        <CardBody className="flex flex-col gap-4">
          <Textarea
            label="Professional Summary"
            placeholder="Write a brief professional summary about yourself"
            value={watchedValues.professionalSummary || ""}
            isDisabled={!isEdit}
            minRows={4}
            {...register("professionalSummary")}
          />
          <Textarea
            label="Hobbies & Interests"
            placeholder="List your hobbies and personal interests"
            value={watchedValues.hobbies || ""}
            isDisabled={!isEdit}
            minRows={2}
            {...register("hobbies")}
          />
          <Textarea
            label="Volunteer Work"
            placeholder="Describe any volunteer work or community service"
            value={watchedValues.volunteerWork || ""}
            isDisabled={!isEdit}
            minRows={2}
            {...register("volunteerWork")}
          />
          <Textarea
            label="Additional Notes"
            placeholder="Any additional information you'd like to include"
            value={watchedValues.additionalNotes || ""}
            isDisabled={!isEdit}
            minRows={2}
            {...register("additionalNotes")}
          />
        </CardBody>
      </Card>
    </div>
  );
});

Portfolio.displayName = "Portfolio";

export default Portfolio;
