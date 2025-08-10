"use client";

import { Button, Form, addToast } from "@heroui/react";
import { useForm, FormProvider } from "react-hook-form";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { FormData } from "../../types";
import { formData as defaultFormData } from "../../../constants";
import LoadingSkeleton from "../../../components/LoadingSkeleton";
import BottomNavigation from "../../../components/BottomNavigation";
import { useFormErrors } from "../../../hooks/useFormErrors";
import { useFormSubmission } from "../../../hooks/useFormSubmission";
import { useFormUpdate } from "../../../hooks/useFormUpdate";
import { useFormData } from "../../../hooks/useFormData";
import Info from "../Info";
import Career from "../Career";
import Profile from "../Profile";
import Portfolio from "../Portfolio";
import ErrorPage from "@/components/ErrorPage";

interface WizardLayoutProps {
  mode: "create" | "edit";
  formId?: string;
  initialData?: FormData;
  onDataLoaded?: (data: FormData) => void;
}

export default function WizardLayout({
  mode,
  formId,
  initialData,
  onDataLoaded,
}: WizardLayoutProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const { displayFormErrors } = useFormErrors();

  const methods = useForm<FormData>({
    defaultValues: mode === "create" ? defaultFormData : undefined,
  });

  const {
    handleSubmit,
    formState: { isSubmitting, errors },
    trigger,
    setError: setFormError,
    reset,
    watch,
  } = methods;

  const { handleCreateForm } = useFormSubmission({ setFormError });
  const { handleUpdateForm } = useFormUpdate({ formId });
  const {
    fetchFormData,
    isLoading: isDataLoading,
    error: dataError,
  } = useFormData();

  const watchedData = watch();
  const totalSteps = 4;
  const stepNames = [
    "Personal Information",
    "Education & Experience",
    "Skills & Certifications",
    "Portfolio & Projects",
  ];

  useEffect(() => {
    if (mode === "edit" && formId) {
      const loadFormData = async () => {
        const data = await fetchFormData(formId);
        if (data) {
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const { id, created_at, updated_at, ...formData } = data;
          reset(formData);
          onDataLoaded?.(formData);
          setError(null);
        }
      };

      loadFormData();
    } else if (mode === "create" && initialData) {
      reset(initialData);
      onDataLoaded?.(initialData);
    }
  }, [mode, formId, initialData, reset, onDataLoaded, fetchFormData]);

  useEffect(() => {
    if (dataError) {
      setError(dataError);
    }
  }, [dataError]);

  const onSubmit = async (data: FormData) => {
    try {
      if (mode === "create") {
        await handleCreateForm(data);
      } else {
        await handleUpdateForm(data);
      }
    } catch (error) {
      console.error("Form submission failed:", error);
      const errorMessage =
        error instanceof Error ? error.message : "Form submission failed!";
      addToast({
        title: "Submission Error",
        description: errorMessage,
        color: "danger",
      });
    }
  };

  const handleNext = async () => {
    const isStepValid = await trigger();
    if (isStepValid && currentStep < totalSteps - 1) {
      // delay to prevent accidental clicks on the submit button
      setTimeout(() => {
        setCurrentStep(currentStep + 1);
      }, 150);
    } else if (!isStepValid) {
      displayFormErrors(undefined, errors);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleCancel = () => {
    router.push(mode === "edit" ? `/forms/${formId}` : "/forms");
  };

  const renderCurrentStep = () => {
    const isEdit = true;
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

  if (isDataLoading) {
    return <LoadingSkeleton variant="wizard" rows={5} />;
  }

  if (error) {
    return <ErrorPage error={error} reset={handleCancel} />;
  }

  return (
    <div className="min-h-screen bg-background w-full">
      {/* Progress Header */}
      <div className="border-b border-divider px-4 pb-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold text-foreground">
              {mode === "create"
                ? "User Information Wizard"
                : `${watchedData.title || ""} ${watchedData.first_name || ""} ${
                    watchedData.last_name || ""
                  }`.trim()}
            </h1>
            <Button
              variant="flat"
              color="default"
              onPress={handleCancel}
              radius="none"
            >
              Cancel
            </Button>
          </div>

          {/* Progress Steps */}
          <div className="flex justify-between w-full overflow-x-auto">
            {stepNames.map((stepName, index) => (
              <div
                key={index}
                className="flex flex-col items-center min-w-0 flex-shrink-0 px-1"
              >
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium ${
                    index <= currentStep
                      ? "bg-primary-500 text-white"
                      : "bg-default-200 text-default-500"
                  }`}
                >
                  {index + 1}
                </div>
                <span
                  className={`mt-1 text-xs text-center hidden md:block ${
                    index <= currentStep
                      ? "text-primary-600"
                      : "text-default-400"
                  }`}
                >
                  {stepName}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Form Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <FormProvider {...methods}>
          <Form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-6 w-full"
            validationBehavior="native"
            id="wizard-form"
          >
            {renderCurrentStep()}
          </Form>
        </FormProvider>
      </div>

      <BottomNavigation className="bg-content1 border-divider">
        <Button
          variant="flat"
          color="default"
          onPress={handleBack}
          isDisabled={currentStep === 0}
          radius="none"
          className="px-8"
        >
          Back
        </Button>

        <div className="flex gap-3">
          {currentStep === totalSteps - 1 ? (
            <Button
              type="submit"
              color="success"
              isLoading={isSubmitting}
              radius="none"
              className="px-8 font-semibold"
              form="wizard-form"
            >
              {mode === "create" ? "Submit Form" : "Update Form"}
            </Button>
          ) : (
            <Button
              color="primary"
              onPress={handleNext}
              radius="none"
              className="px-8"
            >
              Next
            </Button>
          )}
        </div>
      </BottomNavigation>
    </div>
  );
}
