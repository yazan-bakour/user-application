"use client";

import { Button, Form } from "@heroui/react";
import { useForm, FormProvider } from "react-hook-form";
import { useState } from "react";
import { FormData, fetchFormData, submitFormData } from "./service";
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
    "Career & Education",
    "Skills & Languages",
    "Portfolio & Goals",
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
      // Form is invalid, errors will be displayed automatically
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
      <div className="font-sans grid grid-rows-[20px_1fr_20px] justify-items-center min-h-screen p-8 pb-20 gap-0">
        <pre className="absolute left-10 top-10 text-xs">
          {JSON.stringify(
            {
              // touchedFields,
              // currentStep,
              isEdit,
              // isDirty,
              isValid,
              errors: Object.keys(errors),
              // values: watchedValues,
            },
            null,
            2
          )}
        </pre>

        <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start max-w-3xl w-full">
          <div className="w-full">
            <h1 className="text-2xl font-bold mb-2">User Information Wizard</h1>
            <p className="text-gray-600">
              Step {currentStep + 1} of {totalSteps}
            </p>
            <p className="text-lg font-medium mt-2">{stepNames[currentStep]}</p>
          </div>

          <Form onSubmit={handleSubmit(onSubmit)} className="w-full">
            <div className="flex justify-between gap-4 w-full mb-6 border-b-[0.5] border-[#ffffff38] pb-3">
              <div className="flex gap-2">
                {!isEdit ? (
                  <Button
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
                        onPress={() => onSave(watchedValues)}
                        variant="bordered"
                        disabled={isSubmitting}
                        isLoading={isSubmitting}
                      >
                        Save
                      </Button>
                    ) : (
                      <Button
                        type="submit"
                        color="primary"
                        disabled={isSubmitting}
                        isLoading={isSubmitting}
                      >
                        Submit
                      </Button>
                    )}
                    <Button onPress={handleCancel} variant="light">
                      Cancel
                    </Button>
                  </>
                )}
              </div>
              {!isEdit && (
                <div className="flex gap-2">
                  {currentStep > 0 && (
                    <Button onPress={handleBack} variant="bordered">
                      Back
                    </Button>
                  )}

                  {currentStep < totalSteps - 1 ? (
                    <Button
                      onPress={handleNext}
                      color="primary"
                      disabled={isLoading}
                    >
                      Next
                    </Button>
                  ) : null}
                </div>
              )}
            </div>

            {renderCurrentStep()}
          </Form>
        </main>
      </div>
    </FormProvider>
  );
}
