import { FormData } from "../types";
import { formData } from "./constants";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

if (!API_BASE_URL) {
  throw new Error("NEXT_PUBLIC_API_BASE_URL environment variable is not set");
}

const toSnakeCase = (str: string): string => {
  return str.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`);
};

const transformToBackendFormat = (data: unknown): unknown => {
  if (Array.isArray(data)) {
    return data.map(item => transformToBackendFormat(item));
  }
  
  if (data && typeof data === 'object' && data !== null) {
    const transformed: Record<string, unknown> = {};
    for (const [key, value] of Object.entries(data)) {
      const snakeKey = toSnakeCase(key);
      transformed[snakeKey] = transformToBackendFormat(value);
    }
    return transformed;
  }
  
  return data;
};

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

export const submitFormData = async (data: FormData): Promise<{ success: boolean; message: string }> => {
  try {
    console.log("Original form data:", data);
    
    const backendData = transformToBackendFormat(data);
    console.log("Transformed data for backend:", backendData);
    
    const response = await fetch(`${API_BASE_URL}/api/v1/form-data/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(backendData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Backend validation errors:", errorData);
      throw new Error(`HTTP error! status: ${response.status} - ${JSON.stringify(errorData)}`);
    }

    const result = await response.json();
    console.log("Save response:", result);
    
    return {
      success: true,
      message: result.message || "Form data saved successfully!"
    };
  } catch (error) {
    console.error("Error submitting form data:", error);
    return {
      success: false,
      message: error instanceof Error ? error.message : "An error occurred while saving the form"
    };
  }
};