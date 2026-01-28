import { Border } from '@/components/studio/Border'
import { FadeIn, FadeInStagger } from '@/components/studio/FadeIn'

export function StatList({
  children,
  ...props
}: Omit<React.ComponentPropsWithoutRef<typeof FadeInStagger>, 'children'> & {
  children: React.ReactNode
}) {
  return (
    <FadeInStagger {...props}>
      <dl className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:auto-cols-fr lg:grid-flow-col lg:grid-cols-none">
        {children}
      </dl>
    </FadeInStagger>
  )
}

export function StatListItem({
  label,
  value,
  invert = false,
}: {
  label: string
  value: string
  invert?: boolean
}) {
  return (
    <Border as={FadeIn} position="left" className="flex flex-col-reverse pl-8" invert={invert}>
      <dt className={`mt-2 text-base ${invert ? 'text-neutral-300' : 'text-neutral-600'}`}>{label}</dt>
      <dd className={`font-display text-3xl font-semibold sm:text-4xl ${invert ? 'text-white' : 'text-primary'}`}>
        {value}
      </dd>
    </Border>
  )
}
