import { FormData } from "../types";
import { formData } from "../../constants";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

if (!API_BASE_URL) {
  throw new Error("NEXT_PUBLIC_API_BASE_URL environment variable is not set");
}

export const fetchFormData = async (): Promise<FormData> => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/v1/form-data/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    console.log("Backend response:", result);

    return formData;
  } catch (error) {
    console.error("Error fetching form data:", error);

    return formData;
  }
};

export const submitFormData = async (data: FormData): Promise<{ 
  success: boolean; 
  message: string; 
  data?: { id: string }; 
  errors?: Record<string, string | string[]> | { detail: Array<{ type: string; loc: (string | number)[]; msg: string; input: unknown; ctx?: Record<string, unknown> }> }
}> => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/v1/form-data/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();
    console.log("Save response:", result);

    if (!response.ok) {
      console.error("Backend validation errors:", result);
      
      if (response.status === 422 && result.detail) {
        return {
          success: false,
          message: result.message || "Validation failed",
          errors: { detail: result.detail }
        };
      }
      
      if (response.status === 400 && result.errors) {
        return {
          success: false,
          message: result.message || "Validation failed",
          errors: result.errors
        };
      }
      
      if (result.success === false) {
        return {
          success: result.success,
          message: result.message || "An error occurred",
          errors: result.errors || (result.detail ? { detail: result.detail } : undefined)
        };
      }
      
      throw new Error(`HTTP error! status: ${response.status} - ${JSON.stringify(result)}`);
    }
    
    return {
      success: result.success,
      message: result.message || "Form data saved successfully!",
      data: result.data ? { id: result.data.id } : undefined
    };
  } catch (error) {
    console.error("Error submitting form data:", error);
    return {
      success: false,
      message: error instanceof Error ? error.message : "An error occurred while saving the form"
    };
  }
};