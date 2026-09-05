import * as stylex from '@stylexjs/stylex'
import type { StyleXStyles } from '@stylexjs/stylex'
import { ChevronDownIcon, ChevronLeftIcon, ChevronRightIcon } from 'lucide-react'
import * as React from 'react'
import { DayPicker, getDefaultClassNames } from 'react-day-picker'
import type { DayButton, DropdownOption, Locale } from 'react-day-picker'
import type { ButtonVariant } from '#/components/base/button/button.component'
import { buttonStyles, buttonVariants } from '#/components/base/button/button.stylex'
import { Select, SelectItem, SelectValue } from '#/components/base/select/select.component'
import { SelectContent, SelectTrigger } from '#/components/base/select/select.component'
import { customClassName } from '#/styles/core/utils.stylex'
import { calendarStyles } from './calendar.stylex'

type CalendarDayButtonProps = Omit<React.ComponentProps<typeof DayButton>, 'style'> & {
  locale?: Partial<Locale>
  className?: string
  style?: StyleXStyles
}

const CalendarDayButton = ({
  className,
  style,
  day,
  modifiers,
  locale,
  ...props
}: CalendarDayButtonProps) => {
  const defaultClassNames = getDefaultClassNames()
  const ref = React.useRef<HTMLButtonElement>(null)

  React.useEffect(() => {
    if (modifiers.focused) {
      ref.current?.focus()
    }
  }, [modifiers.focused])

  const isSelectedSingle =
    modifiers.selected && !modifiers.range_start && !modifiers.range_end && !modifiers.range_middle

  const dayBtnStyleProps = stylex.props(
    calendarStyles.dayBtnBase,
    modifiers.focused && calendarStyles.dayBtnFocused,
    isSelectedSingle && calendarStyles.dayBtnSelected,
    modifiers.range_start && calendarStyles.dayBtnRangeStart,
    modifiers.range_end && calendarStyles.dayBtnRangeEnd,
    modifiers.range_middle && calendarStyles.dayBtnRangeMiddle,
    customClassName(className),
    style
  )

  return (
    <button
      ref={ref}
      type='button'
      data-slot='button'
      data-day={day.date.toLocaleDateString(locale?.code)}
      data-selected-single={isSelectedSingle}
      data-range-start={modifiers.range_start}
      data-range-end={modifiers.range_end}
      data-range-middle={modifiers.range_middle}
      className={[dayBtnStyleProps.className, defaultClassNames.day].filter(Boolean).join(' ')}
      style={dayBtnStyleProps.style}
      {...props}
    />
  )
}

const CalendarChevron = ({
  className: iconCn,
  orientation,
  ...chevronProps
}: { className?: string; orientation?: string } & React.ComponentProps<'svg'>) => {
  const chevronStyleProps = stylex.props(calendarStyles.chevron, customClassName(iconCn))
  if (orientation === 'left') {
    return <ChevronLeftIcon {...chevronStyleProps} {...chevronProps} />
  }
  if (orientation === 'right') {
    return <ChevronRightIcon {...chevronStyleProps} {...chevronProps} />
  }
  return <ChevronDownIcon {...chevronStyleProps} {...chevronProps} />
}

const CalendarRoot = ({
  className: rootCn,
  rootRef,
  ...rootProps
}: { className?: string; rootRef?: React.Ref<HTMLDivElement> } & React.ComponentProps<'div'>) => (
  <div data-slot='calendar' ref={rootRef} className={rootCn} {...rootProps} />
)

const CalendarWeekNumber = ({ children, ...weekNumProps }: React.ComponentProps<'td'>) => (
  <td {...weekNumProps}>
    <div {...stylex.props(calendarStyles.weekNumberCell)}>{children}</div>
  </td>
)

interface CalendarDropdownProps {
  options?: DropdownOption[]
  value?: number | string | readonly string[]
  'aria-label'?: string
  disabled?: boolean
  onChange?: React.ChangeEventHandler<HTMLSelectElement>
}

/**
 * Month/year caption dropdown built on the Base UI Select (scrollable popup
 * with keyboard navigation) instead of a native `<select>` overlay.
 */
const CalendarDropdown = ({
  options,
  value,
  'aria-label': ariaLabel,
  disabled,
  onChange
}: CalendarDropdownProps) => {
  const selected = options?.find((option) => String(option.value) === String(value))

  return (
    <Select
      items={options?.map((option) => ({ label: option.label, value: String(option.value) }))}
      value={selected ? String(selected.value) : null}
      onValueChange={(newValue) => {
        if (newValue == null) return
        const syntheticEvent = {
          target: { value: String(newValue) }
        } as unknown as React.ChangeEvent<HTMLSelectElement>
        onChange?.(syntheticEvent)
      }}
    >
      <SelectTrigger
        aria-label={ariaLabel}
        disabled={disabled}
        style={calendarStyles.dropdownTrigger}
      >
        <SelectValue />
      </SelectTrigger>
      <SelectContent style={calendarStyles.dropdownContent}>
        {options?.map((option) => (
          <SelectItem key={option.value} value={String(option.value)} disabled={option.disabled}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

const CalendarDayButtonWrapper = (
  props: React.ComponentProps<typeof DayButton> & { locale?: Partial<Locale> }
) => {
  const { locale, ...dayButtonProps } = props
  return (
    <CalendarDayButton
      locale={locale}
      {...(dayButtonProps as Omit<React.ComponentProps<typeof DayButton>, 'style'>)}
    />
  )
}

type CalendarProps = React.ComponentProps<typeof DayPicker> & {
  buttonVariant?: ButtonVariant
  className?: string
  style?: StyleXStyles
}

export function Calendar({
  className,
  style,
  classNames,
  showOutsideDays = true,
  captionLayout = 'label',
  buttonVariant = 'ghost',
  locale,
  formatters,
  components,
  startMonth = new Date(1900, 0),
  endMonth = new Date(2100, 11),
  ...props
}: CalendarProps) {
  const defaultClassNames = getDefaultClassNames()

  const rootStyleProps = stylex.props(
    calendarStyles.root,
    customClassName(className),
    style as StyleXStyles
  )

  const prevBtnProps = stylex.props(
    buttonStyles.root,
    buttonVariants[buttonVariant],
    calendarStyles.buttonNav
  )

  const nextBtnProps = stylex.props(
    buttonStyles.root,
    buttonVariants[buttonVariant],
    calendarStyles.buttonNav
  )

  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={rootStyleProps.className}
      style={rootStyleProps.style}
      captionLayout={captionLayout}
      locale={locale}
      startMonth={startMonth}
      endMonth={endMonth}
      formatters={{
        formatMonthDropdown: (date) => date.toLocaleString(locale?.code, { month: 'short' }),
        ...formatters
      }}
      classNames={{
        button_next: [nextBtnProps.className, defaultClassNames.button_next]
          .filter(Boolean)
          .join(' '),
        button_previous: [prevBtnProps.className, defaultClassNames.button_previous]
          .filter(Boolean)
          .join(' '),
        caption_label: [
          stylex.props(
            captionLayout === 'label'
              ? calendarStyles.captionLabel
              : calendarStyles.captionLabelDropdown
          ).className,
          defaultClassNames.caption_label
        ]
          .filter(Boolean)
          .join(' '),
        day: [stylex.props(calendarStyles.day).className, defaultClassNames.day]
          .filter(Boolean)
          .join(' '),
        disabled: [stylex.props(calendarStyles.disabled).className, defaultClassNames.disabled]
          .filter(Boolean)
          .join(' '),
        dropdowns: [stylex.props(calendarStyles.dropdowns).className, defaultClassNames.dropdowns]
          .filter(Boolean)
          .join(' '),
        hidden: [stylex.props(calendarStyles.hidden).className, defaultClassNames.hidden]
          .filter(Boolean)
          .join(' '),
        month: [stylex.props(calendarStyles.month).className, defaultClassNames.month]
          .filter(Boolean)
          .join(' '),
        month_caption: [
          stylex.props(calendarStyles.monthCaption).className,
          defaultClassNames.month_caption
        ]
          .filter(Boolean)
          .join(' '),
        month_grid: [stylex.props(calendarStyles.monthGrid).className, defaultClassNames.month_grid]
          .filter(Boolean)
          .join(' '),
        months: [stylex.props(calendarStyles.months).className, defaultClassNames.months]
          .filter(Boolean)
          .join(' '),
        nav: [stylex.props(calendarStyles.nav).className, defaultClassNames.nav]
          .filter(Boolean)
          .join(' '),
        outside: [stylex.props(calendarStyles.outside).className, defaultClassNames.outside]
          .filter(Boolean)
          .join(' '),
        range_end: [stylex.props(calendarStyles.rangeEnd).className, defaultClassNames.range_end]
          .filter(Boolean)
          .join(' '),
        range_middle: [
          stylex.props(calendarStyles.rangeMiddle).className,
          defaultClassNames.range_middle
        ]
          .filter(Boolean)
          .join(' '),
        range_start: [
          stylex.props(calendarStyles.rangeStart).className,
          defaultClassNames.range_start
        ]
          .filter(Boolean)
          .join(' '),
        root: [stylex.props(calendarStyles.root).className, defaultClassNames.root]
          .filter(Boolean)
          .join(' '),
        today: [stylex.props(calendarStyles.today).className, defaultClassNames.today]
          .filter(Boolean)
          .join(' '),
        week: [stylex.props(calendarStyles.week).className, defaultClassNames.week]
          .filter(Boolean)
          .join(' '),
        week_number: [
          stylex.props(calendarStyles.weekNumber).className,
          defaultClassNames.week_number
        ]
          .filter(Boolean)
          .join(' '),
        week_number_header: [
          stylex.props(calendarStyles.weekNumberHeader).className,
          defaultClassNames.week_number_header
        ]
          .filter(Boolean)
          .join(' '),
        weekday: [stylex.props(calendarStyles.weekday).className, defaultClassNames.weekday]
          .filter(Boolean)
          .join(' '),
        weekdays: [stylex.props(calendarStyles.weekdays).className, defaultClassNames.weekdays]
          .filter(Boolean)
          .join(' '),
        ...classNames
      }}
      components={{
        Root: CalendarRoot,
        Chevron: CalendarChevron,
        DayButton: CalendarDayButtonWrapper,
        Dropdown: CalendarDropdown,
        WeekNumber: CalendarWeekNumber,
        ...components
      }}
      {...props}
    />
  )
}
