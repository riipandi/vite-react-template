import * as stylex from '@stylexjs/stylex'
import type { StyleXStyles } from '@stylexjs/stylex'
import { ChevronDownIcon, ChevronLeftIcon, ChevronRightIcon, ChevronUpIcon } from 'lucide-react'
import * as React from 'react'
import { DayPicker, getDefaultClassNames } from 'react-day-picker'
import type { DayButtonProps, DayPickerProps } from 'react-day-picker'
import { buttonSizes, buttonStyles, buttonVariants } from '#/components/base/button'
import { calendarDayButtonStyles, calendarStyles } from './calendar.stylex'

type CalendarDayButtonProps = DayButtonProps

export function CalendarDayButton({ modifiers, ...props }: CalendarDayButtonProps) {
  const ref = React.useRef<HTMLButtonElement>(null)

  React.useEffect(() => {
    if (modifiers.focused) ref.current?.focus()
  }, [modifiers.focused])

  const isRangeEdge = modifiers.range_start || modifiers.range_end
  const { className: buttonClassName, ...restProps } = props as typeof props & {
    className?: string
  }
  const buttonStyleProps = stylex.props(
    calendarDayButtonStyles.base,
    modifiers.today && calendarDayButtonStyles.today,
    modifiers.focused && calendarDayButtonStyles.focused,
    (modifiers.selected || isRangeEdge) && calendarDayButtonStyles.selected,
    modifiers.outside && calendarDayButtonStyles.outside
  )

  return (
    <button
      type='button'
      ref={ref}
      {...restProps}
      className={[buttonClassName, buttonStyleProps.className].filter(Boolean).join(' ')}
      style={buttonStyleProps.style}
    />
  )
}

function CalendarChevron({
  orientation,
  ...chevronProps
}: { orientation?: 'up' | 'down' | 'left' | 'right' } & Pick<
  React.SVGProps<SVGSVGElement>,
  'className' | 'style'
>) {
  const Icon =
    orientation === 'left'
      ? ChevronLeftIcon
      : orientation === 'right'
        ? ChevronRightIcon
        : orientation === 'up'
          ? ChevronUpIcon
          : ChevronDownIcon

  return <Icon {...chevronProps} {...stylex.props(calendarStyles.chevron)} />
}

function cls(...parts: Array<string | undefined>) {
  return parts.filter(Boolean).join(' ')
}

type DistributiveOmit<T, K extends PropertyKey> = T extends unknown ? Omit<T, K> : never

export type CalendarProps = DistributiveOmit<
  DayPickerProps,
  'className' | 'classNames' | 'styles' | 'style'
> & {
  style?: StyleXStyles
}
export function Calendar({
  captionLayout = 'label',
  showOutsideDays = true,
  style,
  components,
  ...props
}: CalendarProps) {
  const defaults = getDefaultClassNames()

  const rootClass = stylex.props(calendarStyles.root, style).className

  const navButtonClass = stylex.props(
    buttonStyles.root,
    buttonVariants.ghost,
    buttonSizes.iconSm
  ).className

  return (
    <DayPicker
      captionLayout={captionLayout}
      showOutsideDays={showOutsideDays}
      {...props}
      classNames={{
        root: cls(rootClass, defaults.root),
        months: cls(stylex.props(calendarStyles.months).className, defaults.months),
        month: cls(stylex.props(calendarStyles.month).className, defaults.month),
        month_caption: cls(
          stylex.props(calendarStyles.monthCaption).className,
          defaults.month_caption
        ),
        caption_label:
          captionLayout === 'dropdown'
            ? cls(
                stylex.props(calendarStyles.captionLabelDropdown).className,
                defaults.caption_label
              )
            : cls(stylex.props(calendarStyles.captionLabel).className, defaults.caption_label),
        nav: cls(stylex.props(calendarStyles.nav).className, defaults.nav),
        button_previous: cls(navButtonClass, defaults.button_previous),
        button_next: cls(navButtonClass, defaults.button_next),
        month_grid: cls(stylex.props(calendarStyles.monthGrid).className, defaults.month_grid),
        weekday: cls(stylex.props(calendarStyles.weekday).className, defaults.weekday),
        day: cls(stylex.props(calendarStyles.day).className, defaults.day),
        hidden: cls(stylex.props(calendarStyles.hidden).className, defaults.hidden),
        week_number: cls(stylex.props(calendarStyles.weekNumber).className, defaults.week_number),
        week_number_header: cls(
          stylex.props(calendarStyles.weekNumberHeader).className,
          defaults.week_number_header
        ),
        dropdowns: cls(stylex.props(calendarStyles.dropdowns).className, defaults.dropdowns),
        dropdown_root: cls(
          stylex.props(calendarStyles.dropdownRoot).className,
          defaults.dropdown_root
        ),
        dropdown: cls(stylex.props(calendarStyles.dropdown).className, defaults.dropdown)
      }}
      components={{
        Chevron: CalendarChevron,
        DayButton: CalendarDayButton,
        ...components
      }}
    />
  )
}
