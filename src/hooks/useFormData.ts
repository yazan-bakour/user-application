import { useState, useCallback } from "react";
import { APIFormData } from "../app/types";
import { demoFormData } from "../constants/demoData";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const useFormData = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchFormData = useCallback(async (formId: string): Promise<APIFormData | null> => {
    try {
      setIsLoading(true);
      setError(null);

      if (!API_BASE_URL) {
        console.log("API not configured, using demo data");
        return { ...demoFormData, id: formId };
      }

      const response = await fetch(`${API_BASE_URL}/api/v1/form-data/${formId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();

      if (result.success) {
        return result.data;
      } else {
        throw new Error("Failed to fetch form data");
      }
    } catch (err) {
      console.error("Error fetching form data:", err);
      console.log("API failed, falling back to demo data");
      
      setError(null);
      return { ...demoFormData, id: formId };
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { fetchFormData, isLoading, error };
};
