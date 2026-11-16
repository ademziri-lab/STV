import {
  useId,
  type InputHTMLAttributes,
  type TextareaHTMLAttributes,
} from 'react'
import { cn } from '@/lib/utils'

const fieldStyles =
  'w-full rounded-lg border bg-white px-4 py-2.5 text-base text-ink placeholder:text-slate-400 ' +
  'transition-colors focus:border-brand-600 disabled:bg-slate-50 disabled:opacity-60'

type FieldExtras = {
  label: string
  hint?: string
  error?: string
}

function Wrapper({
  id,
  label,
  hint,
  error,
  required,
  children,
}: FieldExtras & { id: string; required?: boolean; children: React.ReactNode }) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-ink">
        {label}
        {required && <span className="text-red-600"> *</span>}
      </label>
      {children}
      {hint && !error && (
        <p id={`${id}-hint`} className="mt-1.5 text-sm text-slate-500">
          {hint}
        </p>
      )}
      {error && (
        <p id={`${id}-error`} className="mt-1.5 text-sm text-red-700">
          {error}
        </p>
      )}
    </div>
  )
}

type InputProps = InputHTMLAttributes<HTMLInputElement> & FieldExtras

export function Input({ label, hint, error, className, id, ...props }: InputProps) {
  const generatedId = useId()
  const fieldId = id ?? generatedId
  const describedBy = error
    ? `${fieldId}-error`
    : hint
      ? `${fieldId}-hint`
      : undefined

  return (
    <Wrapper id={fieldId} label={label} hint={hint} error={error} required={props.required}>
      <input
        id={fieldId}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy}
        className={cn(
          fieldStyles,
          error ? 'border-red-600' : 'border-slate-300',
          className,
        )}
        {...props}
      />
    </Wrapper>
  )
}

type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & FieldExtras

export function Textarea({ label, hint, error, className, id, ...props }: TextareaProps) {
  const generatedId = useId()
  const fieldId = id ?? generatedId
  const describedBy = error
    ? `${fieldId}-error`
    : hint
      ? `${fieldId}-hint`
      : undefined

  return (
    <Wrapper id={fieldId} label={label} hint={hint} error={error} required={props.required}>
      <textarea
        id={fieldId}
        rows={5}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy}
        className={cn(
          fieldStyles,
          error ? 'border-red-600' : 'border-slate-300',
          className,
        )}
        {...props}
      />
    </Wrapper>
  )
}