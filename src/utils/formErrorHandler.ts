import { addToast } from '@heroui/react';
import { UseFormSetError, FieldErrors } from 'react-hook-form';
import { FormData } from '../app/types';

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

export class FormErrorHandler {
  constructor(
    private setFormError: UseFormSetError<FormData>,
    private formErrors: FieldErrors<FormData>
  ) {}

  private formatErrorMessages(apiErrors?: APIErrorResponse): string[] {
    if (apiErrors?.detail && Array.isArray(apiErrors.detail)) {
      return apiErrors.detail.map((error: APIValidationError) => {
        const fieldPath = error.loc ? error.loc.slice(1).join('.') : 'unknown field';
        const fieldName = fieldPath
          .split('.')
          .map((part: string) => part.charAt(0).toUpperCase() + part.slice(1))
          .join(' ');
        return `${fieldName}: ${error.msg || 'Invalid input'}`;
      });
    }

    return Object.entries(this.formErrors).map(([field, error]) => {
      const fieldName = field.charAt(0).toUpperCase() + field.slice(1).replace(/([A-Z])/g, ' $1');
      return `${fieldName}: ${error?.message || 'Invalid input'}`;
    });
  }

  displayFormErrors(apiErrors?: APIErrorResponse): void {
    const errorMessages = this.formatErrorMessages(apiErrors);

    if (errorMessages.length > 0) {
      addToast({
        title: 'Please fix the following errors:',
        description:
          errorMessages.slice(0, 3).join('; ') +
          (errorMessages.length > 3 ? '...' : ''),
        color: 'danger',
      });
    }
  }

  handleValidationErrors(errors: APIErrorResponse | Record<string, unknown>): void {
    if ('detail' in errors && Array.isArray(errors.detail)) {
      errors.detail.forEach((error) => {
        if (
          typeof error === 'object' &&
          error !== null &&
          'loc' in error &&
          'msg' in error
        ) {
          if (error.loc && error.loc.length > 1) {
            const fieldPath = error.loc.slice(1).join('.');
            this.setFormError(fieldPath as keyof FormData, {
              type: 'server',
              message: error.msg,
            });
          }
        }
      });
      this.displayFormErrors(errors as APIErrorResponse);
    } else {
      Object.entries(errors).forEach(([field, message]) => {
        this.setFormError(field as keyof FormData, {
          type: 'server',
          message: Array.isArray(message) ? message[0] : (message as string),
        });
      });
      addToast({
        title: 'Please fix the validation errors and try again.',
        color: 'danger',
      });
    }
  }

  showSuccessMessage(message: string): void {
    addToast({
      title: message,
      color: 'success',
    });
  }

  showErrorMessage(message: string): void {
    addToast({
      title: message,
      color: 'danger',
    });
  }
}
