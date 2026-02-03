'use client';

import { useState, useCallback } from "react"

export interface UseFormSubmissionOptions {
  onSuccess?: (data: any) => void | Promise<void>
  onError?: (error: Error) => void
  onSubmit: (data: any) => Promise<any>
}

export interface UseFormSubmissionReturn {
  isSubmitting: boolean
  isSaved: boolean
  error: Error | null
  saveSuccess: boolean
  handleSubmit: (data: any) => Promise<void>
  resetSaveState: () => void
  clearError: () => void
}

export function useFormSubmission({
  onSuccess,
  onError,
  onSubmit,
}: UseFormSubmissionOptions): UseFormSubmissionReturn {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSaved, setIsSaved] = useState(false)
  const [saveSuccess, setSaveSuccess] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  const handleSubmit = useCallback(
    async (data: any) => {
      setIsSubmitting(true)
      setError(null)
      setSaveSuccess(false)

      try {
        await onSubmit(data)
        setSaveSuccess(true)
        setIsSaved(true)

        // Auto-reset save success message after 3 seconds
        setTimeout(() => {
          setSaveSuccess(false)
        }, 3000)

        if (onSuccess) {
          await onSuccess(data)
        }
      } catch (err) {
        const error = err instanceof Error ? err : new Error(String(err))
        setError(error)
        if (onError) {
          onError(error)
        }
      } finally {
        setIsSubmitting(false)
      }
    },
    [onSubmit, onSuccess, onError],
  )

  const resetSaveState = useCallback(() => {
    setIsSaved(false)
    setSaveSuccess(false)
    setError(null)
  }, [])

  const clearError = useCallback(() => {
    setError(null)
  }, [])

  return {
    isSubmitting,
    isSaved,
    error,
    saveSuccess,
    handleSubmit,
    resetSaveState,
    clearError,
  }
}
