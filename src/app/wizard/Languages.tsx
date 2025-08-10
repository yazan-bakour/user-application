"use client";

import FormInput from "../../components/FormInput";
import FormSelect from "../../components/FormSelect";
import { SelectItem, Button } from "@heroui/react";
import { useFormContext, useFieldArray } from "react-hook-form";
import { memo } from "react";
import { FormData, ProficiencyLevel, Language } from "../types";

interface LanguagesProps {
  isEdit: boolean;
}

const Languages = memo(({ isEdit }: LanguagesProps) => {
  const {
    register,
    formState: { errors, isLoading, isValid },
    watch,
    setValue,
    control,
    trigger,
  } = useFormContext<FormData>();

  const {
    fields: languageFields,
    append: appendLanguage,
    remove: removeLanguage,
  } = useFieldArray({
    control,
    name: "languages",
  });

  const watchedValues = watch();

  const addNewLanguage = () => {
    const newLanguage: Language = {
      id: Date.now().toString(),
      name: "",
      proficiency: "",
    };
    appendLanguage(newLanguage);
  };

  const removeLanguageEntry = (index: number) => {
    if (languageFields.length > 1) {
      removeLanguage(index);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center">
        <h4 className="text-md font-medium">Languages</h4>
        {isEdit && (
          <Button
            color="primary"
            variant="light"
            size="sm"
            onPress={addNewLanguage}
            className="rounded-none"
          >
            Add Language
          </Button>
        )}
      </div>
      <div className="flex flex-col">
        {languageFields.map((field, index) => (
          <div key={field.id} className="border-none">
            <div className="flex flex-col gap-4">
              <div className="flex justify-between items-center">
                {languageFields.length > 1 && (
                  <h5 className="text-sm font-medium">Language #{index + 1}</h5>
                )}
                {isEdit && languageFields.length > 1 && (
                  <Button
                    color="danger"
                    variant="light"
                    size="sm"
                    onPress={() => removeLanguageEntry(index)}
                    className="rounded-none"
                  >
                    Remove
                  </Button>
                )}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 md:gap-4">
                <FormInput
                  type="text"
                  label="Language"
                  placeholder="e.g., English, Spanish"
                  value={watchedValues.languages?.[index]?.name || ""}
                  isReadOnly={!isEdit}
                  isLoading={isLoading}
                  error={errors.languages?.[index]?.name}
                  isInvalid={!isValid && !!errors.languages?.[index]?.name}
                  {...register(`languages.${index}.name`, {
                    required: "Language is required",
                    onChange: () => trigger(`languages.${index}.name`),
                  })}
                />
                <FormSelect
                  label="Proficiency Level"
                  placeholder="Select proficiency"
                  isReadOnly={!isEdit}
                  isLoading={isLoading}
                  selectedKeys={
                    watchedValues.languages?.[index]?.proficiency
                      ? [watchedValues.languages[index].proficiency]
                      : []
                  }
                  error={errors.languages?.[index]?.proficiency}
                  defaultErrorMessage="Proficiency is required"
                  {...register(`languages.${index}.proficiency`, {
                    required: "Proficiency is required",
                  })}
                  onSelectionChange={(keys) => {
                    const selectedKey = Array.from(keys)[0] as ProficiencyLevel;
                    if (selectedKey) {
                      setValue(`languages.${index}.proficiency`, selectedKey, {
                        shouldValidate: true,
                      });
                    }
                  }}
                >
                  {Object.values(ProficiencyLevel).map((level) => (
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

Languages.displayName = "Languages";

export default Languages;
