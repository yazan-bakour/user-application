"use client";

import { Button, Form } from "@heroui/react";
import { useForm, FormProvider } from "react-hook-form";
import { useState } from "react";
import { FormData } from "./types";
import { fetchFormData, submitFormData } from "./service";
import Info from "./Info";
import Career from "./Career";
import Profile from "./Profile";
import Portfolio from "./Portfolio";

export default function WizardPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isEdit, setIsEdit] = useState(false);

  const methods = useForm<FormData>({
    defaultValues: async () => {
      const initialData = await fetchFormData();
      return initialData;
    },
  });

  const {
    handleSubmit,
    formState: {
      errors,
      isLoading,
      isValid,
      isDirty,
      isSubmitting,
      touchedFields,
    },
    watch,
    reset,
    trigger,
  } = methods;

  const watchedValues = watch();
  const totalSteps = 4;
  const stepNames = [
    "Personal Information",
    "Education & Experience",
    "Skills & Certifications",
    "Portfolio & Projects",
  ];

  const onSubmit = async (data: FormData) => {
    try {
      const result = await submitFormData(data);
      console.log("Submission result:", result);
      if (result.success) {
        alert(result.message);
        setIsEdit(false);
        setCurrentStep(0);
      }
    } catch (error) {
      console.error("Form submission failed:", error);
    }
  };

  const triggerValidation = async () => {
    const isFormValid = await trigger();

    if (!isFormValid) {
      console.log("Form validation failed:", errors);
      return false;
    }
    return true;
  };

  const onSave = async (data: FormData) => {
    const isFormValid = await trigger();
    if (!isFormValid) {
      console.log("Form validation failed on save:", errors);
      return;
    }

    try {
      const result = await submitFormData(data);
      console.log("Save result:", result);
      if (result.success) {
        alert("Data saved successfully!");
        setIsEdit(false);
      }
    } catch (error) {
      console.error("Save failed:", error);
    }
  };

  const handleNext = async () => {
    if (isEdit) {
      triggerValidation();
    } else {
      if (currentStep < totalSteps - 1) {
        setCurrentStep(currentStep + 1);
      }
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleEdit = () => {
    setIsEdit(true);
  };

  const handleCancel = () => {
    setIsEdit(false);
    reset();
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 0:
        return <Info isEdit={isEdit} />;
      case 1:
        return <Career isEdit={isEdit} />;
      case 2:
        return <Profile isEdit={isEdit} />;
      case 3:
        return <Portfolio isEdit={isEdit} />;
      default:
        return <Info isEdit={isEdit} />;
    }
  };
  const hasTouchedFields = Object.keys(touchedFields).length > 0;
  return (
    <FormProvider {...methods}>
      <div className="flex flex-col gap-8 w-full mx-auto">
        {/* <pre className="fixed left-10 top-20 text-xs">
          {JSON.stringify(
            {
              touchedFields,
              currentStep,
              isEdit,
              isDirty,
              isValid,
              errors: Object.keys(errors),
              errorMessages: Object.values(errors).map(
                (error) => error.message || "Invalid input"
              ),
              values: watchedValues,
            },
            null,
            2
          )}
        </pre> */}

        <main>
          <div className="flex justify-between w-full mb-6">
            <div className="w-full">
              <h1 className="text-4xl font-bold mb-2 text-primary-800">
                User Information Wizard
              </h1>
              <p className="text-primary-900 mb-10">
                Step {currentStep + 1} of {totalSteps}
              </p>
              <p className="text-xl font-bold">{stepNames[currentStep]}</p>
            </div>
          </div>

          <Form
            onSubmit={handleSubmit(onSubmit)}
            className="w-full"
            id="wizard-form"
          >
            {renderCurrentStep()}
          </Form>

          <div className="fixed bottom-0 left-0 right-0 bg-background border-t border-gray-200 p-4 shadow-lg z-50">
            <div className="max-w-5xl mx-auto flex justify-between item-center gap-6 pl-6">
              <h4 className="text-sm text-gray-500 mb-2 flex">Press on Edit</h4>
              <div className="flex flex-row gap-4">
                {!isEdit && (
                  <div className="flex gap-2">
                    {currentStep > 0 && (
                      <Button
                        radius="none"
                        onPress={handleBack}
                        variant="bordered"
                      >
                        Back
                      </Button>
                    )}

                    {currentStep < totalSteps - 1 ? (
                      <Button
                        variant="flat"
                        radius="none"
                        onPress={handleNext}
                        color="primary"
                        disabled={isLoading}
                      >
                        Next
                      </Button>
                    ) : null}
                  </div>
                )}
                <div className="flex gap-2">
                  {!isEdit ? (
                    <Button
                      variant="flat"
                      radius="none"
                      color="warning"
                      onPress={handleEdit}
                      disabled={isLoading}
                      className={
                        hasTouchedFields ? "touched-fields-animate-simple" : ""
                      }
                    >
                      Edit
                    </Button>
                  ) : (
                    <>
                      {currentStep < totalSteps - 1 ? (
                        <Button
                          radius="none"
                          onPress={() => onSave(watchedValues)}
                          variant="flat"
                          disabled={isSubmitting}
                          isLoading={isSubmitting}
                          color="primary"
                        >
                          Save
                        </Button>
                      ) : (
                        <Button
                          variant="flat"
                          radius="none"
                          type="submit"
                          form="wizard-form"
                          color="primary"
                          disabled={isSubmitting}
                          isLoading={isSubmitting}
                        >
                          Submit
                        </Button>
                      )}
                      <Button
                        radius="none"
                        onPress={handleCancel}
                        variant="light"
                      >
                        Cancel
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </FormProvider>
  );
}
