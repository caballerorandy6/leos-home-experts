import Link from 'next/link'
import clsx from 'clsx'

type ButtonProps = {
  invert?: boolean
  variant?: 'primary' | 'secondary'
} & (
  | React.ComponentPropsWithoutRef<typeof Link>
  | (React.ComponentPropsWithoutRef<'button'> & { href?: undefined })
)

export function Button({
  invert = false,
  variant = 'primary',
  className,
  children,
  ...props
}: ButtonProps) {
  className = clsx(
    className,
    'inline-flex rounded-full px-4 py-1.5 text-sm font-semibold transition',
    variant === 'secondary'
      ? 'bg-secondary text-primary hover:bg-secondary/90'
      : invert
        ? 'bg-white text-primary hover:bg-neutral-200'
        : 'bg-primary text-white hover:bg-primary-light',
  )

  let inner = <span className="relative top-px">{children}</span>

  if (typeof props.href === 'undefined') {
    return (
      <button className={className} {...props}>
        {inner}
      </button>
    )
  }

  return (
    <Link className={className} {...props}>
      {inner}
    </Link>
  )
}
