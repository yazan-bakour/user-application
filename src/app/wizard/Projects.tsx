"use client";

import FormInput from "../../components/FormInput";
import { Button, Textarea, Checkbox } from "@heroui/react";
import { useFormContext, useFieldArray } from "react-hook-form";
import { memo } from "react";
import { FormData, Project } from "../types";

interface ProjectsProps {
  isEdit: boolean;
}

const Projects = memo(({ isEdit }: ProjectsProps) => {
  const {
    register,
    formState: { errors, isLoading, isValid },
    watch,
    setValue,
    control,
    trigger,
  } = useFormContext<FormData>();

  const {
    fields: projectFields,
    append: appendProject,
    remove: removeProject,
  } = useFieldArray({
    control,
    name: "projects",
  });

  const watchedValues = watch();

  const addNewProject = () => {
    const newProject: Project = {
      id: Date.now().toString(),
      title: "",
      description: "",
      technologies: "",
      link: "",
      start_date: "",
      end_date: "",
      is_ongoing: false,
    };
    appendProject(newProject);
  };

  const removeProjectEntry = (index: number) => {
    if (projectFields.length > 1 && index > 0) {
      removeProject(index);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center">
        <h4 className="text-md font-medium">Projects</h4>
        {isEdit && (
          <Button
            color="primary"
            variant="light"
            size="sm"
            onPress={addNewProject}
            className="rounded-none"
          >
            Add Project
          </Button>
        )}
      </div>
      <div className="flex flex-col gap-x-6">
        {projectFields.map((field, index) => (
          <div
            key={field.id}
            className={`border-none ${projectFields.length > 1 ? "mb-4" : ""}`}
          >
            <div className="flex justify-between items-center mb-4">
              {index > 0 && (
                <h5 className="text-sm font-medium">Project #{index + 1}</h5>
              )}
              {isEdit && projectFields.length > 1 && index > 0 && (
                <Button
                  color="danger"
                  variant="light"
                  size="sm"
                  onPress={() => removeProjectEntry(index)}
                  className="rounded-none"
                >
                  Remove
                </Button>
              )}
            </div>
            <div className="flex flex-col gap-1">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4">
                <FormInput
                  label="Project Title"
                  placeholder="e.g., E-commerce Website"
                  value={watchedValues.projects?.[index]?.title || ""}
                  isLoading={isLoading}
                  error={errors.projects?.[index]?.title}
                  isInvalid={!isValid && !!errors.projects?.[index]?.title}
                  {...register(`projects.${index}.title`, {
                    required: "Project title is required",
                    onChange: () => trigger(`projects.${index}.title`),
                  })}
                />
                <FormInput
                  type="text"
                  label="Technologies Used"
                  placeholder="e.g., React, Node.js, MongoDB"
                  value={watchedValues.projects?.[index]?.technologies || ""}
                  isReadOnly={!isEdit}
                  isLoading={isLoading}
                  error={errors.projects?.[index]?.technologies}
                  isInvalid={
                    !isValid && !!errors.projects?.[index]?.technologies
                  }
                  {...register(`projects.${index}.technologies`, {
                    onChange: () => trigger(`projects.${index}.technologies`),
                  })}
                />
              </div>
              <FormInput
                type="url"
                label="Project Link"
                placeholder="https://project-demo.com"
                value={watchedValues.projects?.[index]?.link || ""}
                isReadOnly={!isEdit}
                isLoading={isLoading}
                error={errors.projects?.[index]?.link}
                isInvalid={!isValid && !!errors.projects?.[index]?.link}
                {...register(`projects.${index}.link`, {
                  onChange: () => trigger(`projects.${index}.link`),
                })}
              />
              <div className="flex gap-4">
                <FormInput
                  type="date"
                  label="Start Date"
                  value={watchedValues.projects?.[index]?.start_date || ""}
                  isReadOnly={!isEdit}
                  isLoading={isLoading}
                  error={errors.projects?.[index]?.start_date}
                  isInvalid={!isValid && !!errors.projects?.[index]?.start_date}
                  {...register(`projects.${index}.start_date`, {
                    onChange: () => trigger(`projects.${index}.start_date`),
                  })}
                />
                <FormInput
                  type="date"
                  label="End Date"
                  value={watchedValues.projects?.[index]?.end_date || ""}
                  isDisabled={
                    !isEdit || watchedValues.projects?.[index]?.is_ongoing
                  }
                  isLoading={isLoading}
                  error={errors.projects?.[index]?.end_date}
                  isInvalid={!isValid && !!errors.projects?.[index]?.end_date}
                  {...register(`projects.${index}.end_date`, {
                    onChange: () => trigger(`projects.${index}.end_date`),
                  })}
                />
              </div>
              <Checkbox
                size="sm"
                isSelected={
                  watchedValues.projects?.[index]?.is_ongoing || false
                }
                isDisabled={!isEdit}
                radius="none"
                onValueChange={(checked) => {
                  setValue(`projects.${index}.is_ongoing`, checked, {
                    shouldValidate: true,
                  });
                  if (checked) {
                    setValue(`projects.${index}.end_date`, "", {
                      shouldValidate: true,
                    });
                  }
                }}
              >
                This is an ongoing project
              </Checkbox>
              <Textarea
                label="Project Description"
                labelPlacement="outside"
                placeholder="Describe the project, your role, and key achievements"
                value={watchedValues.projects?.[index]?.description || ""}
                isDisabled={!isEdit}
                isInvalid={!isValid && !!errors.projects?.[index]?.description}
                errorMessage={errors.projects?.[index]?.description?.message}
                minRows={3}
                radius="none"
                {...register(`projects.${index}.description`, {
                  required: "Project description is required",
                  minLength: {
                    value: 10,
                    message: "Description must be at least 10 characters",
                  },
                  onChange: () => trigger(`projects.${index}.description`),
                })}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
});

Projects.displayName = "Projects";

export default Projects;
