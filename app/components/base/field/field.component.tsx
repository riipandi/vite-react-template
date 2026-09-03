import { Field as BaseField } from '@base-ui/react/field'
import { Fieldset as BaseFieldset } from '@base-ui/react/fieldset'
import * as stylex from '@stylexjs/stylex'
import * as React from 'react'
import { Separator } from '#/components/base/separator'
import { space, fontSize, lineHeight, fontWeight } from '#/lib/constants.stylex'
import { colors, font } from '#/lib/tokens.stylex'

interface StyleProp {
  style?: stylex.StyleXStyles
}

type DivProps = Omit<React.ComponentPropsWithoutRef<'div'>, 'className' | 'style'> & StyleProp

export function FieldSet({
  style,
  ...props
}: Omit<React.ComponentPropsWithoutRef<typeof BaseFieldset.Root>, 'className' | 'style'> &
  StyleProp) {
  return <BaseFieldset.Root {...props} {...stylex.props(styles.set, style)} />
}

export type FieldLegendVariant = 'legend' | 'label'

export function FieldLegend({
  variant = 'legend',
  style,
  ...props
}: Omit<React.ComponentPropsWithoutRef<typeof BaseFieldset.Legend>, 'className' | 'style'> &
  StyleProp & { variant?: FieldLegendVariant }) {
  return (
    <BaseFieldset.Legend
      {...props}
      {...stylex.props(styles.legend, legendVariants[variant], style)}
    />
  )
}

export function FieldGroup({ style, ...props }: DivProps) {
  return <div {...props} {...stylex.props(styles.group, style)} />
}

export type FieldOrientation = 'vertical' | 'horizontal'

/**
 * Built on Base UI Field: wires label/description/error accessibility
 * automatically and adds validation (`name`, `validate`, `validationMode`,
 * `invalid`, …). Base UI form controls placed inside (Input, Checkbox,
 * Select, …) join the field automatically.
 */
export function Field({
  orientation = 'vertical',
  style,
  ...props
}: Omit<React.ComponentPropsWithoutRef<typeof BaseField.Root>, 'className' | 'style'> &
  StyleProp & { orientation?: FieldOrientation }) {
  return (
    <BaseField.Root {...props} {...stylex.props(styles.field, orientations[orientation], style)} />
  )
}

export function FieldContent({ style, ...props }: DivProps) {
  return <div {...props} {...stylex.props(styles.content, style)} />
}

export function FieldLabel({
  style,
  ...props
}: Omit<React.ComponentPropsWithoutRef<typeof BaseField.Label>, 'className' | 'style'> &
  StyleProp) {
  return <BaseField.Label {...props} {...stylex.props(styles.labelBase, styles.label, style)} />
}

export function FieldTitle({ style, ...props }: DivProps) {
  return <div {...props} {...stylex.props(styles.title, style)} />
}

export function FieldDescription({
  style,
  ...props
}: Omit<React.ComponentPropsWithoutRef<typeof BaseField.Description>, 'className' | 'style'> &
  StyleProp) {
  return <BaseField.Description {...props} {...stylex.props(styles.description, style)} />
}

export function FieldSeparator({ children, style, ...props }: DivProps) {
  return (
    <div {...props} {...stylex.props(styles.separator, style)}>
      <Separator style={styles.separatorLine} />
      {children && <span {...stylex.props(styles.separatorContent)}>{children}</span>}
    </div>
  )
}

export interface FieldErrorProps
  extends
    Omit<React.ComponentPropsWithoutRef<typeof BaseField.Error>, 'className' | 'style'>,
    StyleProp {
  /**
   * External errors to render directly (e.g. from react-hook-form or TanStack
   * Form). When set, the message renders unconditionally; otherwise the error
   * comes from the surrounding Field's own validation.
   */
  errors?: Array<{ message?: string } | undefined>
}

export function FieldError({ children, errors, style, ...props }: FieldErrorProps) {
  const external = React.useMemo(() => {
    if (!errors?.length) return null
    const unique = [...new Map(errors.map((error) => [error?.message, error])).values()].filter(
      (error): error is { message: string } => !!error?.message
    )
    if (unique.length === 0) return null
    if (unique.length === 1) return unique[0]?.message
    return (
      <ul {...stylex.props(styles.errorList)}>
        {unique.map((error, index) => (
          <li key={index}>{error.message}</li>
        ))}
      </ul>
    )
  }, [errors])

  if (errors) {
    if (!external) return null
    return (
      <div role='alert' {...props} {...stylex.props(styles.error, style)}>
        {external}
      </div>
    )
  }

  // No external errors: Base UI renders the field's own validation message
  // (or `children` when `match` allows it). Only pass children when actually
  // given — an explicit `children: undefined` would override Base UI's
  // auto-filled message.
  return (
    <BaseField.Error
      {...(children !== undefined && { children })}
      {...props}
      {...stylex.props(styles.error, style)}
    />
  )
}

const styles = stylex.create({
  set: {
    borderStyle: 'none',
    display: 'flex',
    flexDirection: 'column',
    fontFamily: font.sans,
    gap: space.s4,
    margin: 0,
    minWidth: 0,
    padding: 0
  },
  legend: {
    fontWeight: fontWeight.medium,
    marginBottom: space.s15,
    padding: 0
  },
  group: {
    display: 'flex',
    flexDirection: 'column',
    fontFamily: font.sans,
    gap: space.s5,
    width: '100%'
  },
  field: {
    display: 'flex',
    fontFamily: font.sans,
    gap: space.s2,
    width: '100%'
  },
  content: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    gap: space.s05,
    lineHeight: lineHeight.snug
  },
  labelBase: {
    alignItems: 'center',
    display: 'flex',
    fontFamily: font.sans,
    fontSize: fontSize.sm,
    fontWeight: fontWeight.medium,
    gap: space.s2,
    userSelect: 'none'
  },
  label: {
    color: { default: null, '[data-invalid]': colors.destructive },
    lineHeight: lineHeight.snug,
    width: 'fit-content'
  },
  title: {
    alignItems: 'center',
    display: 'flex',
    fontSize: fontSize.sm,
    fontWeight: fontWeight.medium,
    gap: space.s2,
    lineHeight: lineHeight.snug,
    width: 'fit-content'
  },
  description: {
    color: colors.mutedForeground,
    fontSize: fontSize.sm,
    lineHeight: lineHeight.normal,
    margin: 0,
    textAlign: 'left'
  },
  separator: {
    fontSize: fontSize.sm,
    height: space.s5,
    marginBlock: `calc(-1 * ${space.s2})`,
    position: 'relative'
  },
  separatorLine: {
    inset: 0,
    position: 'absolute',
    top: '50%'
  },
  separatorContent: {
    backgroundColor: colors.background,
    color: colors.mutedForeground,
    display: 'block',
    marginInline: 'auto',
    paddingInline: space.s2,
    position: 'relative',
    width: 'fit-content'
  },
  error: {
    color: colors.destructive,
    fontSize: fontSize.sm
  },
  errorList: {
    display: 'flex',
    flexDirection: 'column',
    gap: space.s1,
    listStyle: 'disc',
    margin: 0,
    paddingLeft: space.s4
  }
})

const legendVariants = stylex.create({
  legend: {
    fontSize: fontSize.base
  },
  label: {
    fontSize: fontSize.sm
  }
})

const orientations = stylex.create({
  vertical: {
    flexDirection: 'column'
  },
  horizontal: {
    alignItems: 'center',
    flexDirection: 'row'
  }
})
