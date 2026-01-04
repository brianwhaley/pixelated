// Shared TypeScript interfaces and types for form components
import React from 'react';
import { InferProps } from 'prop-types';

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

export interface FormFieldProps {
  id: string;
  type?: string;
  required?: boolean;
  validate?: string;
  label?: string;
  value?: any;
  placeholder?: string;
  disabled?: boolean;
  readonly?: boolean;
  [key: string]: any;
}

export interface FormData {
  fields: FormFieldConfig[];
  [key: string]: any;
}

export interface FormFieldConfig {
  component: string;
  props: FormFieldProps;
}

export interface FormValidationState {
  fieldValidity: Record<string, boolean>;
  fieldErrors: Record<string, string[]>;
  isFormValid: boolean;
}

export interface FormValidationContextType extends FormValidationState {
  validateField: (fieldId: string, isValid: boolean, errors: string[]) => void;
  validateAllFields: () => boolean;
  resetValidation: () => void;
}

export interface FormEngineProps {
  name?: string | null;
  id?: string | null;
  method?: string | null;
  onSubmitHandler?: (event: React.FormEvent) => void;
  formData: FormData;
}

export interface FormBuilderProps {
  setFormData?: (data: any) => void;
}

export interface FormExtractorProps {
  url?: string;
  htmlPaste?: string;
}

export interface FormExtractEngineProps {
  url?: string;
  htmlPaste?: string;
  setFormData: (data: any) => void;
}

export interface FormExtractUIProps {
  setParentState: (state: { url: string; htmlPaste: string }) => void;
}

// Re-export common types from existing files for backward compatibility
export type FormEngineType = InferProps<any>;
export type FormExtractorType = InferProps<any>;
export type FormExtractEngineType = InferProps<any>;
export type FormExtractUIType = InferProps<any>;