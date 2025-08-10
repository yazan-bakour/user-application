"use client";

import FormInput from "../../components/FormInput";
import FormSelect from "../../components/FormSelect";
import { SelectItem, Button } from "@heroui/react";
import { useFormContext, useFieldArray } from "react-hook-form";
import { memo } from "react";
import { FormData, SkillLevel, Skill } from "../types";

interface SkillsProps {
  isEdit: boolean;
}

const Skills = memo(({ isEdit }: SkillsProps) => {
  const {
    register,
    formState: { errors, isLoading, isValid },
    watch,
    setValue,
    control,
    trigger,
  } = useFormContext<FormData>();

  const {
    fields: skillFields,
    append: appendSkill,
    remove: removeSkill,
  } = useFieldArray({
    control,
    name: "skills",
  });

  const watchedValues = watch();

  const addNewSkill = () => {
    const newSkill: Skill = {
      id: Date.now().toString(),
      name: "",
      level: "",
      category: "Technical",
    };
    appendSkill(newSkill);
  };

  const removeSkillEntry = (index: number) => {
    if (skillFields.length > 1) {
      removeSkill(index);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center">
        <h4 className="text-md font-medium">Skills</h4>
        <Button variant="light" color="primary" size="sm" onPress={addNewSkill}>
          Add Skill
        </Button>
      </div>
      <div className="flex flex-col">
        {skillFields.map((field, index) => (
          <div key={field.id} className="border-none">
            <div className="flex flex-col gap-4">
              <div className="flex justify-between items-center">
                {skillFields.length > 1 && (
                  <h5 className="text-sm font-medium">Skill #{index + 1}</h5>
                )}
                {skillFields.length > 1 && (
                  <Button
                    color="danger"
                    variant="light"
                    size="sm"
                    onPress={() => removeSkillEntry(index)}
                    className="rounded-none"
                  >
                    Remove
                  </Button>
                )}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 md:gap-4">
                <FormInput
                  type="text"
                  label="Skill Name"
                  placeholder="e.g., JavaScript"
                  value={watchedValues.skills?.[index]?.name || ""}
                  isReadOnly={!isEdit}
                  isLoading={isLoading}
                  error={errors.skills?.[index]?.name}
                  isInvalid={!isValid && !!errors.skills?.[index]?.name}
                  {...register(`skills.${index}.name`, {
                    required: "Skill name is required",
                    onChange: () => trigger(`skills.${index}.name`),
                  })}
                />
                <FormInput
                  type="text"
                  label="Category"
                  placeholder="e.g., Technical, Soft Skills"
                  value={watchedValues.skills?.[index]?.category || ""}
                  isReadOnly={!isEdit}
                  isLoading={isLoading}
                  error={errors.skills?.[index]?.category}
                  isInvalid={!isValid && !!errors.skills?.[index]?.category}
                  {...register(`skills.${index}.category`, {
                    onChange: () => trigger(`skills.${index}.category`),
                  })}
                />
                <FormSelect
                  label="Proficiency Level"
                  placeholder="Select level"
                  isReadOnly={!isEdit}
                  isLoading={isLoading}
                  selectedKeys={
                    watchedValues.skills?.[index]?.level
                      ? [watchedValues.skills[index].level]
                      : []
                  }
                  error={errors.skills?.[index]?.level}
                  defaultErrorMessage="Level is required"
                  {...register(`skills.${index}.level`, {
                    required: "Level is required",
                  })}
                  onSelectionChange={(keys) => {
                    const selectedKey = Array.from(keys)[0] as SkillLevel;
                    if (selectedKey) {
                      setValue(`skills.${index}.level`, selectedKey, {
                        shouldValidate: true,
                      });
                    }
                  }}
                >
                  {Object.values(SkillLevel).map((level) => (
                    <SelectItem key={level}>{level}</SelectItem>
                  ))}
                </FormSelect>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
});

Skills.displayName = "Skills";

export default Skills;
