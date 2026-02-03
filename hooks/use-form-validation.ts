'use client';

import { useState, useCallback } from "react"

export interface ValidationError {
  field: string
  message: string
}

export interface ValidationRule {
  required?: boolean
  minLength?: number
  maxLength?: number
  pattern?: RegExp
  validate?: (value: any) => boolean | string
  message?: string
}

export interface ValidationSchema {
  [field: string]: ValidationRule | ValidationRule[]
}

export interface UseFormValidationReturn {
  errors: { [field: string]: string }
  validate: (data: any, schema: ValidationSchema) => boolean
  validateField: (field: string, value: any, schema: ValidationSchema) => string | null
  clearErrors: () => void
  clearFieldError: (field: string) => void
}

export function useFormValidation(): UseFormValidationReturn {
  const [errors, setErrors] = useState<{ [field: string]: string }>({})

  const validateField = useCallback(
    (field: string, value: any, schema: ValidationSchema): string | null => {
      const rules = schema[field]
      if (!rules) return null

      const ruleArray = Array.isArray(rules) ? rules : [rules]

      for (const rule of ruleArray) {
        // Required validation
        if (rule.required && (!value || (typeof value === "string" && !value.trim()))) {
          return rule.message || `${field} is required`
        }

        // Skip other validations if value is empty and not required
        if (!value && !rule.required) continue

        // Min length validation
        if (rule.minLength && value && value.length < rule.minLength) {
          return rule.message || `${field} must be at least ${rule.minLength} characters`
        }

        // Max length validation
        if (rule.maxLength && value && value.length > rule.maxLength) {
          return rule.message || `${field} must not exceed ${rule.maxLength} characters`
        }

        // Pattern validation
        if (rule.pattern && value && !rule.pattern.test(value)) {
          return rule.message || `${field} format is invalid`
        }

        // Custom validation
        if (rule.validate) {
          const result = rule.validate(value)
          if (result !== true) {
            return typeof result === "string" ? result : rule.message || `${field} validation failed`
          }
        }
      }

      return null
    },
    [],
  )

  const validate = useCallback(
    (data: any, schema: ValidationSchema): boolean => {
      const newErrors: { [field: string]: string } = {}

      for (const field in schema) {
        const error = validateField(field, data[field], schema)
        if (error) {
          newErrors[field] = error
        }
      }

      setErrors(newErrors)
      return Object.keys(newErrors).length === 0
    },
    [validateField],
  )

  const clearErrors = useCallback(() => {
    setErrors({})
  }, [])

  const clearFieldError = useCallback((field: string) => {
    setErrors((prev) => {
      const updated = { ...prev }
      delete updated[field]
      return updated
    })
  }, [])

  return {
    errors,
    validate,
    validateField,
    clearErrors,
    clearFieldError,
  }
}
