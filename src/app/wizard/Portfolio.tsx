"use client";

import FormInput from "../../components/FormInput";
import FormSelect from "../../components/FormSelect";
import { SelectItem, Textarea } from "@heroui/react";
import { useFormContext } from "react-hook-form";
import { memo } from "react";
import { FormData, WorkType } from "../types";
import Projects from "./Projects";
import References from "./References";

interface PortfolioProps {
  isEdit: boolean;
}

const Portfolio = memo(({ isEdit }: PortfolioProps) => {
  const {
    register,
    formState: { isLoading, errors },
    watch,
    setValue,
    trigger,
  } = useFormContext<FormData>();

  const watchedValues = watch();
  const defaultClassNames = {
    inputWrapper: "border-b-1 border-primary",
  };

  return (
    <div className="flex flex-col gap-2 w-full">
      {/* Portfolio & Projects Section */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h4 className="text-md font-medium">Portfolio</h4>
        </div>

        {/* Portfolio Links */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-4">
          <FormInput
            type="url"
            label="Portfolio Website"
            placeholder="https://yourportfolio.com"
            value={watchedValues.portfolio_website || ""}
            isReadOnly={!isEdit}
            isLoading={isLoading}
            {...register("portfolio_website")}
          />
          <FormInput
            type="url"
            label="GitHub URL"
            placeholder="https://github.com/username"
            value={watchedValues.github_url || ""}
            isReadOnly={!isEdit}
            isLoading={isLoading}
            {...register("github_url")}
          />
          <FormInput
            type="url"
            label="LinkedIn URL"
            placeholder="https://linkedin.com/in/username"
            value={watchedValues.linkedin_url || ""}
            isReadOnly={!isEdit}
            isLoading={isLoading}
            {...register("linkedin_url")}
          />
        </div>
      </div>
      <div className="gap-8 md:gap-12 w-full grid grid-cols-1 md:grid-cols-2">
        {/* Projects */}
        <Projects isEdit={isEdit} />
        {/* References */}
        <References isEdit={isEdit} />
      </div>

      {/* Preferences & Goals Section */}
      <div>
        <h4 className="text-md font-medium mb-4 mt-4">Preferences</h4>
        <div className="flex flex-col gap-4">
          <div className="grid grid-cols-1 md:grid-cols-2 md:gap-4">
            <FormSelect
              label="Preferred Work Type"
              placeholder="Select work preference"
              isReadOnly={!isEdit}
              isLoading={isLoading}
              isRequired
              selectedKeys={
                watchedValues.preferred_work_type
                  ? [watchedValues.preferred_work_type]
                  : []
              }
              error={errors.preferred_work_type}
              {...register("preferred_work_type", {
                required: "Preferred work type is required",
              })}
              onSelectionChange={(keys) => {
                const selectedKey = Array.from(keys)[0] as WorkType;
                if (selectedKey) {
                  setValue("preferred_work_type", selectedKey, {
                    shouldValidate: true,
                  });
                  trigger("preferred_work_type");
                }
              }}
            >
              {Object.values(WorkType).map((type) => (
                <SelectItem key={type}>{type}</SelectItem>
              ))}
            </FormSelect>
            <FormInput
              type="text"
              label="Expected Salary"
              placeholder="e.g., $50,000 - $70,000"
              value={watchedValues.expected_salary || ""}
              isReadOnly={!isEdit}
              isLoading={isLoading}
              isRequired
              {...register("expected_salary", {
                required: "Expected salary is required",
                minLength: {
                  value: 1,
                  message: "Expected salary cannot be empty",
                },
              })}
            />
            <FormInput
              type="text"
              label="Preferred Location"
              placeholder="e.g., New York, Remote"
              value={watchedValues.preferred_location || ""}
              isReadOnly={!isEdit}
              isLoading={isLoading}
              isRequired
              {...register("preferred_location", {
                required: "Preferred location is required",
                minLength: {
                  value: 1,
                  message: "Preferred location cannot be empty",
                },
              })}
            />
            <FormInput
              type="date"
              label="Availability Date"
              value={watchedValues.availability_date || ""}
              isReadOnly={!isEdit}
              isLoading={isLoading}
              isRequired
              {...register("availability_date", {
                required: "Availability date is required",
              })}
            />
          </div>
          <Textarea
            label="Career Goals"
            placeholder="Describe your short-term and long-term career objectives"
            value={watchedValues.career_goals || ""}
            isDisabled={!isEdit}
            minRows={3}
            radius="none"
            classNames={defaultClassNames}
            labelPlacement="outside"
            {...register("career_goals")}
          />
        </div>
      </div>

      {/* Additional Information Section */}
      <div>
        <h3 className="text-md font-medium mb-4 mt-4">
          Additional Information
        </h3>
        <div className="flex flex-col gap-4">
          <Textarea
            label="Professional Summary"
            placeholder="Write a brief professional summary about yourself"
            value={watchedValues.professional_summary || ""}
            isDisabled={!isEdit}
            minRows={4}
            radius="none"
            classNames={defaultClassNames}
            labelPlacement="outside"
            {...register("professional_summary")}
          />
          <Textarea
            label="Hobbies & Interests"
            placeholder="List your hobbies and personal interests"
            value={watchedValues.hobbies || ""}
            isDisabled={!isEdit}
            minRows={2}
            radius="none"
            classNames={defaultClassNames}
            labelPlacement="outside"
            {...register("hobbies")}
          />
          <Textarea
            label="Volunteer Work"
            placeholder="Describe any volunteer work or community service"
            value={watchedValues.volunteer_work || ""}
            isDisabled={!isEdit}
            minRows={2}
            radius="none"
            classNames={defaultClassNames}
            labelPlacement="outside"
            {...register("volunteer_work")}
          />
          <Textarea
            label="Additional Notes"
            placeholder="Any additional information you'd like to include"
            value={watchedValues.additional_notes || ""}
            isDisabled={!isEdit}
            minRows={2}
            radius="none"
            classNames={defaultClassNames}
            labelPlacement="outside"
            {...register("additional_notes")}
          />
        </div>
      </div>
    </div>
  );
});

Portfolio.displayName = "Portfolio";

export default Portfolio;
