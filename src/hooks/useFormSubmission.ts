import { addToast } from "@heroui/react";
import { UseFormSetError } from "react-hook-form";
import { useRouter } from "next/navigation";
import { FormData } from "../app/types";
import { submitFormData } from "../app/wizard/service";
import { useFormErrors, APIErrorResponse } from "./useFormErrors";

interface UseFormSubmissionProps {
  setFormError: UseFormSetError<FormData>;
}

export const useFormSubmission = ({ setFormError }: UseFormSubmissionProps) => {
  const router = useRouter();
  const { displayFormErrors } = useFormErrors();

  const handleCreateForm = async (data: FormData) => {
    const result = await submitFormData(data);

    if (result.success) {
      const redirectPath = result.data?.id ? `/forms/${result.data.id}` : "/forms";
      router.push(redirectPath);
      addToast({
        title: result.message || "Form submitted successfully!",
        color: "success",
      });
      return;
    }

    if (result.errors) {
      if ("detail" in result.errors && Array.isArray(result.errors.detail)) {
        result.errors.detail.forEach((error) => {
          if (
            typeof error === "object" &&
            error !== null &&
            "loc" in error &&
            "msg" in error &&
            error.loc &&
            error.loc.length > 1
          ) {
            const fieldPath = error.loc.slice(1).join(".");
            setFormError(fieldPath as keyof FormData, {
              type: "server",
              message: error.msg,
            });
          }
        });
        displayFormErrors(result.errors as APIErrorResponse);
      } else {
        Object.entries(result.errors).forEach(([field, message]) => {
          setFormError(field as keyof FormData, {
            type: "server",
            message: Array.isArray(message) ? message[0] : (message as string),
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
  };

  return { handleCreateForm };
};
