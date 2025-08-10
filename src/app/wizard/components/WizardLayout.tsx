"use client";

import { Button, Form, addToast } from "@heroui/react";
import { useForm, FormProvider } from "react-hook-form";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { FormData } from "../../types";
import { submitFormData } from "../service";
import { formData as defaultFormData } from "../../../constants";
import LoadingSkeleton from "../../../components/LoadingSkeleton";
import BottomNavigation from "../../../components/BottomNavigation";
import Info from "../Info";
import Career from "../Career";
import Profile from "../Profile";
import Portfolio from "../Portfolio";
import ErrorPage from "@/components/ErrorPage";

interface APIValidationError {
  type: string;
  loc: (string | number)[];
  msg: string;
  input: unknown;
  ctx?: Record<string, unknown>;
}

interface APIErrorResponse {
  detail: APIValidationError[];
}

interface WizardLayoutProps {
  mode: "create" | "edit";
  formId?: string;
  initialData?: FormData;
  onDataLoaded?: (data: FormData) => void;
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

if (!API_BASE_URL) {
  throw new Error("NEXT_PUBLIC_API_BASE_URL environment variable is not set");
}

export default function WizardLayout({
  mode,
  formId,
  initialData,
  onDataLoaded,
}: WizardLayoutProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isLoading, setIsLoading] = useState(mode === "edit");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

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
      const fetchFormData = async () => {
        try {
          setIsLoading(true);
          const response = await fetch(
            `${API_BASE_URL}/api/v1/form-data/${formId}`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
            }
          );

          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }

          const result = await response.json();

          if (result.success) {
            reset(result.data);
            onDataLoaded?.(result.data);
            setError(null);
          } else {
            setError("Failed to fetch form data");
          }
        } catch (err) {
          console.error("Error fetching form data:", err);
          setError(err instanceof Error ? err.message : "An error occurred");
        } finally {
          setIsLoading(false);
        }
      };

      fetchFormData();
    } else if (mode === "create" && initialData) {
      reset(initialData);
      onDataLoaded?.(initialData);
    }
  }, [mode, formId, initialData, reset, onDataLoaded]);

  const displayFormErrors = (apiErrors?: APIErrorResponse) => {
    let errorMessages: string[] = [];

    if (apiErrors && apiErrors.detail && Array.isArray(apiErrors.detail)) {
      errorMessages = apiErrors.detail.map((error: APIValidationError) => {
        const fieldPath = error.loc
          ? error.loc.slice(1).join(".")
          : "unknown field";
        const fieldName = fieldPath
          .split(".")
          .map((part: string) => part.charAt(0).toUpperCase() + part.slice(1))
          .join(" ");
        return `${fieldName}: ${error.msg || "Invalid input"}`;
      });
    } else {
      errorMessages = Object.entries(errors).map(([field, error]) => {
        const fieldName =
          field.charAt(0).toUpperCase() +
          field.slice(1).replace(/([A-Z])/g, " $1");
        return `${fieldName}: ${error?.message || "Invalid input"}`;
      });
    }

    if (errorMessages.length > 0) {
      addToast({
        title: "Please fix the following errors:",
        description:
          errorMessages.slice(0, 3).join("; ") +
          (errorMessages.length > 3 ? "..." : ""),
        color: "danger",
      });
    }
  };

  const onSubmit = async (data: FormData) => {
    try {
      if (mode === "create") {
        const result = await submitFormData(data);

        if (result.success) {
          if (result.data && result.data.id) {
            router.push(`/forms/${result.data.id}`);
          } else {
            router.push("/forms");
          }
          addToast({
            title: result.message || "Form submitted successfully!",
            color: "success",
          });
        } else {
          if (result.errors) {
            if (
              "detail" in result.errors &&
              Array.isArray(result.errors.detail)
            ) {
              result.errors.detail.forEach((error) => {
                if (
                  typeof error === "object" &&
                  error !== null &&
                  "loc" in error &&
                  "msg" in error
                ) {
                  if (error.loc && error.loc.length > 1) {
                    const fieldPath = error.loc.slice(1).join(".");
                    setFormError(fieldPath as keyof FormData, {
                      type: "server",
                      message: error.msg,
                    });
                  }
                }
              });
              displayFormErrors(result.errors as APIErrorResponse);
            } else {
              Object.entries(result.errors).forEach(([field, message]) => {
                setFormError(field as keyof FormData, {
                  type: "server",
                  message: Array.isArray(message)
                    ? message[0]
                    : (message as string),
                });
              });
              addToast({
                title: "Please fix the validation errors and try again.",
                color: "danger",
              });
            }
          } else {
            addToast({
              title: result.message || "Form submission failed!",
              color: "danger",
            });
          }
        }
      } else {
        const response = await fetch(
          `${API_BASE_URL}/api/v1/form-data/${formId}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          }
        );

        const result = await response.json();

        if (!response.ok) {
          console.error("Backend validation errors:", result);

          if (result.detail && Array.isArray(result.detail)) {
            const errorMessages = result.detail
              .map((error: { msg: string }) => error.msg)
              .join("; ");
            addToast({
              title: "Validation failed",
              description: errorMessages,
              color: "danger",
            });
          } else {
            addToast({
              title: "Update failed",
              description:
                result.message || `HTTP error! status: ${response.status}`,
              color: "danger",
            });
          }
          return;
        }

        addToast({
          title: "Success!",
          description: result.message || "Form updated successfully!",
          color: "success",
        });

        router.push(`/forms/${formId}`);
      }
    } catch (error) {
      console.error("Form submission failed:", error);
      const errorMessage =
        error instanceof Error ? error.message : "Form submission failed!";
      addToast({ title: errorMessage, color: "danger" });
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
      displayFormErrors();
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

  if (isLoading) {
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
