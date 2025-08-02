"use client";

import FormInput from "../../components/FormInput";
import FormSelect from "../../components/FormSelect";
import { SelectItem, Textarea } from "@heroui/react";
import { useFormContext } from "react-hook-form";
import { memo } from "react";
import { FormData, WorkType } from "./types";
import Projects from "./Projects";
import References from "./References";

interface PortfolioProps {
  isEdit: boolean;
}

const Portfolio = memo(({ isEdit }: PortfolioProps) => {
  const {
    register,
    formState: { isLoading },
    watch,
    setValue,
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
            value={watchedValues.portfolioWebsite || ""}
            isReadOnly={!isEdit}
            isLoading={isLoading}
            {...register("portfolioWebsite")}
          />
          <FormInput
            type="url"
            label="GitHub URL"
            placeholder="https://github.com/username"
            value={watchedValues.githubUrl || ""}
            isReadOnly={!isEdit}
            isLoading={isLoading}
            {...register("githubUrl")}
          />
          <FormInput
            type="url"
            label="LinkedIn URL"
            placeholder="https://linkedin.com/in/username"
            value={watchedValues.linkedinUrl || ""}
            isReadOnly={!isEdit}
            isLoading={isLoading}
            {...register("linkedinUrl")}
          />
        </div>
      </div>
      <div className="gap-x-8 w-full grid grid-cols-1 md:grid-cols-2">
        {/* Projects */}
        <Projects isEdit={isEdit} />
        {/* References */}
        <References isEdit={isEdit} />
      </div>

      {/* Preferences & Goals Section */}
      <div>
        <h4 className="text-md font-medium mb-4 mt-4">Preferences</h4>
        <div className="flex flex-col gap-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormSelect
              label="Preferred Work Type"
              placeholder="Select work preference"
              isReadOnly={!isEdit}
              isLoading={isLoading}
              selectedKeys={
                watchedValues.preferredWorkType
                  ? [watchedValues.preferredWorkType]
                  : []
              }
              {...register("preferredWorkType")}
              onSelectionChange={(keys) => {
                const selectedKey = Array.from(keys)[0] as WorkType;
                if (selectedKey) {
                  setValue("preferredWorkType", selectedKey, {
                    shouldValidate: true,
                  });
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
              value={watchedValues.expectedSalary || ""}
              isReadOnly={!isEdit}
              isLoading={isLoading}
              {...register("expectedSalary")}
            />
            <FormInput
              type="text"
              label="Preferred Location"
              placeholder="e.g., New York, Remote"
              value={watchedValues.preferredLocation || ""}
              isReadOnly={!isEdit}
              isLoading={isLoading}
              {...register("preferredLocation")}
            />
            <FormInput
              type="date"
              label="Availability Date"
              value={watchedValues.availabilityDate || ""}
              isReadOnly={!isEdit}
              isLoading={isLoading}
              {...register("availabilityDate")}
            />
          </div>
          <Textarea
            label="Career Goals"
            placeholder="Describe your short-term and long-term career objectives"
            value={watchedValues.careerGoals || ""}
            isDisabled={!isEdit}
            minRows={3}
            radius="none"
            classNames={defaultClassNames}
            labelPlacement="outside"
            {...register("careerGoals")}
          />
        </div>
      </div>

      {/* Additional Information Section */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Additional Information</h3>
        <div className="flex flex-col gap-4">
          <Textarea
            label="Professional Summary"
            placeholder="Write a brief professional summary about yourself"
            value={watchedValues.professionalSummary || ""}
            isDisabled={!isEdit}
            minRows={4}
            radius="none"
            classNames={defaultClassNames}
            labelPlacement="outside"
            {...register("professionalSummary")}
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
            value={watchedValues.volunteerWork || ""}
            isDisabled={!isEdit}
            minRows={2}
            radius="none"
            classNames={defaultClassNames}
            labelPlacement="outside"
            {...register("volunteerWork")}
          />
          <Textarea
            label="Additional Notes"
            placeholder="Any additional information you'd like to include"
            value={watchedValues.additionalNotes || ""}
            isDisabled={!isEdit}
            minRows={2}
            radius="none"
            classNames={defaultClassNames}
            labelPlacement="outside"
            {...register("additionalNotes")}
          />
        </div>
      </div>
    </div>
  );
});

Portfolio.displayName = "Portfolio";

export default Portfolio;
