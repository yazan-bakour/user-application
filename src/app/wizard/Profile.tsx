"use client";

import { Input } from "@heroui/input";
import {
  Select,
  SelectItem,
  Button,
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
  SkillLevel, 
  ProficiencyLevel,
  Skill,
  Certification,
  Language
} from "./service";

interface ProfileProps {
  isEdit: boolean;
}

const Profile = memo(({ isEdit }: ProfileProps) => {
  const {
    register,
    formState: { errors, isLoading },
    watch,
    setValue,
    control,
  } = useFormContext<FormData>();

  // Field arrays for dynamic sections
  const { fields: skillFields, append: appendSkill, remove: removeSkill } = useFieldArray({
    control,
    name: "skills",
  });

  const { fields: certificationFields, append: appendCertification, remove: removeCertification } = useFieldArray({
    control,
    name: "certifications",
  });

  const { fields: languageFields, append: appendLanguage, remove: removeLanguage } = useFieldArray({
    control,
    name: "languages",
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
  const addNewSkill = () => {
    const newSkill: Skill = {
      id: Date.now().toString(),
      name: "",
      level: "",
      category: "Technical",
    };
    appendSkill(newSkill);
  };

  const addNewCertification = () => {
    const newCertification: Certification = {
      id: Date.now().toString(),
      name: "",
      issuer: "",
      dateObtained: "",
      expiryDate: "",
      hasExpiry: false,
    };
    appendCertification(newCertification);
  };

  const addNewLanguage = () => {
    const newLanguage: Language = {
      id: Date.now().toString(),
      name: "",
      proficiency: "",
    };
    appendLanguage(newLanguage);
  };

  // Remove functions (protect first item)
  const removeSkillEntry = (index: number) => {
    if (skillFields.length > 1 && index > 0) {
      removeSkill(index);
    }
  };

  const removeCertificationEntry = (index: number) => {
    if (certificationFields.length > 1 && index > 0) {
      removeCertification(index);
    }
  };

  const removeLanguageEntry = (index: number) => {
    if (languageFields.length > 1 && index > 0) {
      removeLanguage(index);
    }
  };

  return (
    <div className="flex flex-col gap-6 w-full">
      {/* Skills & Certifications Section */}
      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold">Skills & Certifications</h3>
        </CardHeader>
        <CardBody className="flex flex-col gap-6">
          {/* Skills */}
          <div>
            <div className="flex justify-between items-center mb-4">
              <h4 className="text-md font-medium">Skills</h4>
              {isEdit && (
                <Button
                  color="primary"
                  variant="bordered"
                  size="sm"
                  onPress={addNewSkill}
                >
                  Add Skill
                </Button>
              )}
            </div>
            <div className="flex flex-col gap-4">
              {skillFields.map((field, index) => (
                <Card key={field.id} className="border">
                  <CardBody className="flex flex-col gap-4">
                    <div className="flex justify-between items-center">
                      <h5 className="text-sm font-medium">Skill #{index + 1}</h5>
                      {isEdit && skillFields.length > 1 && index > 0 && (
                        <Button
                          color="danger"
                          variant="light"
                          size="sm"
                          onPress={() => removeSkillEntry(index)}
                        >
                          Remove
                        </Button>
                      )}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <Input
                        type="text"
                        label="Skill Name"
                        placeholder="e.g., JavaScript, Leadership"
                        value={watchedValues.skills?.[index]?.name || ""}
                        isDisabled={!isEdit}
                        isInvalid={!!errors.skills?.[index]?.name}
                        errorMessage={errors.skills?.[index]?.name?.message || "Skill name is required"}
                        {...register(`skills.${index}.name`, {
                          required: "Skill name is required",
                        })}
                      />
                      <Input
                        type="text"
                        label="Category"
                        placeholder="e.g., Technical, Soft Skills"
                        value={watchedValues.skills?.[index]?.category || ""}
                        isDisabled={!isEdit}
                        {...register(`skills.${index}.category`)}
                      />
                      <Select
                        label="Proficiency Level"
                        placeholder="Select level"
                        isDisabled={!isEdit}
                        selectedKeys={watchedValues.skills?.[index]?.level ? [watchedValues.skills[index].level] : []}
                        isInvalid={!!errors.skills?.[index]?.level}
                        errorMessage={errors.skills?.[index]?.level?.message || "Level is required"}
                        {...register(`skills.${index}.level`, { required: "Level is required" })}
                        onSelectionChange={(keys) => {
                          const selectedKey = Array.from(keys)[0] as SkillLevel;
                          if (selectedKey) {
                            setValue(`skills.${index}.level`, selectedKey, { shouldValidate: true });
                          }
                        }}
                      >
                        {Object.values(SkillLevel).map((level) => (
                          <SelectItem key={level}>{level}</SelectItem>
                        ))}
                      </Select>
                    </div>
                  </CardBody>
                </Card>
              ))}
            </div>
          </div>

          {/* Certifications */}
          <div>
            <div className="flex justify-between items-center mb-4">
              <h4 className="text-md font-medium">Certifications</h4>
              {isEdit && (
                <Button
                  color="primary"
                  variant="bordered"
                  size="sm"
                  onPress={addNewCertification}
                >
                  Add Certification
                </Button>
              )}
            </div>
            <div className="flex flex-col gap-4">
              {certificationFields.map((field, index) => (
                <Card key={field.id} className="border">
                  <CardBody className="flex flex-col gap-4">
                    <div className="flex justify-between items-center">
                      <h5 className="text-sm font-medium">Certification #{index + 1}</h5>
                      {isEdit && certificationFields.length > 1 && index > 0 && (
                        <Button
                          color="danger"
                          variant="light"
                          size="sm"
                          onPress={() => removeCertificationEntry(index)}
                        >
                          Remove
                        </Button>
                      )}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Input
                        type="text"
                        label="Certification Name"
                        placeholder="e.g., AWS Solutions Architect"
                        value={watchedValues.certifications?.[index]?.name || ""}
                        isDisabled={!isEdit}
                        isInvalid={!!errors.certifications?.[index]?.name}
                        errorMessage={errors.certifications?.[index]?.name?.message || "Certification name is required"}
                        {...register(`certifications.${index}.name`, {
                          required: "Certification name is required",
                        })}
                      />
                      <Input
                        type="text"
                        label="Issuing Organization"
                        placeholder="e.g., Amazon Web Services"
                        value={watchedValues.certifications?.[index]?.issuer || ""}
                        isDisabled={!isEdit}
                        isInvalid={!!errors.certifications?.[index]?.issuer}
                        errorMessage={errors.certifications?.[index]?.issuer?.message || "Issuer is required"}
                        {...register(`certifications.${index}.issuer`, {
                          required: "Issuer is required",
                        })}
                      />
                      <Input
                        type="date"
                        label="Date Obtained"
                        value={watchedValues.certifications?.[index]?.dateObtained || ""}
                        isDisabled={!isEdit}
                        isInvalid={!!errors.certifications?.[index]?.dateObtained}
                        errorMessage={errors.certifications?.[index]?.dateObtained?.message || "Date obtained is required"}
                        {...register(`certifications.${index}.dateObtained`, {
                          required: "Date obtained is required",
                        })}
                      />
                      <Input
                        type="date"
                        label="Expiry Date"
                        value={watchedValues.certifications?.[index]?.expiryDate || ""}
                        isDisabled={!isEdit || !watchedValues.certifications?.[index]?.hasExpiry}
                        {...register(`certifications.${index}.expiryDate`)}
                      />
                    </div>
                    <Checkbox
                      isSelected={watchedValues.certifications?.[index]?.hasExpiry || false}
                      isDisabled={!isEdit}
                      onValueChange={(checked) => {
                        setValue(`certifications.${index}.hasExpiry`, checked, { shouldValidate: true });
                        if (!checked) {
                          setValue(`certifications.${index}.expiryDate`, "", { shouldValidate: true });
                        }
                      }}
                    >
                      This certification has an expiry date
                    </Checkbox>
                  </CardBody>
                </Card>
              ))}
            </div>
          </div>

          {/* Languages */}
          <div>
            <div className="flex justify-between items-center mb-4">
              <h4 className="text-md font-medium">Languages</h4>
              {isEdit && (
                <Button
                  color="primary"
                  variant="bordered"
                  size="sm"
                  onPress={addNewLanguage}
                >
                  Add Language
                </Button>
              )}
            </div>
            <div className="flex flex-col gap-4">
              {languageFields.map((field, index) => (
                <Card key={field.id} className="border">
                  <CardBody className="flex flex-col gap-4">
                    <div className="flex justify-between items-center">
                      <h5 className="text-sm font-medium">Language #{index + 1}</h5>
                      {isEdit && languageFields.length > 1 && index > 0 && (
                        <Button
                          color="danger"
                          variant="light"
                          size="sm"
                          onPress={() => removeLanguageEntry(index)}
                        >
                          Remove
                        </Button>
                      )}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Input
                        type="text"
                        label="Language"
                        placeholder="e.g., English, Spanish"
                        value={watchedValues.languages?.[index]?.name || ""}
                        isDisabled={!isEdit}
                        isInvalid={!!errors.languages?.[index]?.name}
                        errorMessage={errors.languages?.[index]?.name?.message || "Language is required"}
                        {...register(`languages.${index}.name`, {
                          required: "Language is required",
                        })}
                      />
                      <Select
                        label="Proficiency Level"
                        placeholder="Select proficiency"
                        isDisabled={!isEdit}
                        selectedKeys={watchedValues.languages?.[index]?.proficiency ? [watchedValues.languages[index].proficiency] : []}
                        isInvalid={!!errors.languages?.[index]?.proficiency}
                        errorMessage={errors.languages?.[index]?.proficiency?.message || "Proficiency is required"}
                        {...register(`languages.${index}.proficiency`, { required: "Proficiency is required" })}
                        onSelectionChange={(keys) => {
                          const selectedKey = Array.from(keys)[0] as ProficiencyLevel;
                          if (selectedKey) {
                            setValue(`languages.${index}.proficiency`, selectedKey, { shouldValidate: true });
                          }
                        }}
                      >
                        {Object.values(ProficiencyLevel).map((level) => (
                          <SelectItem key={level}>{level}</SelectItem>
                        ))}
                      </Select>
                    </div>
                  </CardBody>
                </Card>
              ))}
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
});

Profile.displayName = "Profile";

export default Profile;
