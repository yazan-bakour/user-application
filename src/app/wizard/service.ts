import { FormData } from "./types";
import { formData } from "./constants";

export const fetchFormData = async (): Promise<FormData> => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  return new Promise((resolve) => {
    resolve(formData);
  });
};

export const submitFormData = async (data: FormData): Promise<{ success: boolean; message: string }> => {
  await new Promise(resolve => setTimeout(resolve, 800));
  
  console.log("Submitting form data:", data);
  
  return new Promise((resolve) => {
    resolve({
      success: true,
      message: "Form submitted successfully!"
    });
  });
};