import Link from 'next/link'
import type { ButtonHTMLAttributes, ComponentProps } from 'react'
import { cn } from '@/lib/utils'

const variants = {
  primary: 'bg-brand-600 text-white hover:bg-brand-700 active:bg-brand-800',
  secondary: 'bg-brand-50 text-brand-800 hover:bg-brand-100',
  outline: 'border border-brand-600 text-brand-700 hover:bg-brand-50',
  ghost: 'text-brand-700 hover:bg-brand-50',
}

const sizes = {
  sm: 'h-9 px-4 text-sm',
  md: 'h-11 px-5 text-base',
  lg: 'h-13 px-7 text-base',
}

type Variant = keyof typeof variants
type Size = keyof typeof sizes

export function buttonStyles(
  variant: Variant = 'primary',
  size: Size = 'md',
  className?: string,
) {
  return cn(
    'inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-colors',
    'disabled:pointer-events-none disabled:opacity-50',
    variants[variant],
    sizes[size],
    className,
  )
}

type BaseProps = { variant?: Variant; size?: Size }

type ButtonProps = BaseProps &
  ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined }

type LinkProps = BaseProps &
  Omit<ComponentProps<typeof Link>, 'href'> & { href: string }

export function Button(props: ButtonProps | LinkProps) {
  if (props.href !== undefined) {
    const { variant, size, className, ...rest } = props
    return <Link className={buttonStyles(variant, size, className)} {...rest} />
  }

  const { variant, size, className, type = 'button', ...rest } = props
  return (
    <button
      type={type}
      className={buttonStyles(variant, size, className)}
      {...rest}
    />
  )
}