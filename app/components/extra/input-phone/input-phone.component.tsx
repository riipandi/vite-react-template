/**
 * A phone number input with a searchable country selector.
 *
 * @see: https://www.npmjs.com/package/react-phone-number-input
 * @see: https://base-ui.com/react/components/combobox
 */

import { Input as BaseInput } from '@base-ui/react/input'
import * as stylex from '@stylexjs/stylex'
import { SearchIcon } from 'lucide-react'
import * as React from 'react'
import * as BasePhoneInput from 'react-phone-number-input'
import type { Country, Value } from 'react-phone-number-input'
import flags from 'react-phone-number-input/flags'
import { comboboxCreateItems } from '#/components/base/combobox'
import { Combobox, ComboboxContent, ComboboxEmpty, ComboboxInput } from '#/components/base/combobox'
import { ComboboxItem, ComboboxList, ComboboxTrigger } from '#/components/base/combobox'
import { inputPhoneStyles as s } from './input-phone.stylex'

type LibraryPhoneInputProps = React.ComponentPropsWithoutRef<typeof BasePhoneInput.default>

export interface InputPhoneProps extends Omit<
  LibraryPhoneInputProps,
  'onChange' | 'value' | 'style' | 'className'
> {
  style?: stylex.StyleXStyles
  /** E.164 phone value, e.g. `+12135551234`. Use for a controlled field. */
  value?: Value
  /** Called with the E.164 value (or `''` when cleared). */
  onChange?: (value: Value) => void
  /** Country shown initially. Defaults to `US`. */
  defaultCountry?: Country
  /** Restrict the country dropdown to these countries. */
  countries?: Country[]
  /** Called when the selected country changes. */
  onCountryChange?: (country: Country | undefined) => void
  /** Show the "International" entry in the dropdown. Defaults to `true`. */
  addInternationalOption?: boolean
  /** Render the country selector. Set `false` for a digits-only field.
   * Defaults to `true`. */
  withCountrySelect?: boolean
  /** Marks the field visually as invalid. */
  invalid?: boolean
  /** Disables the entire component (input and country selector). */
  disabled?: boolean
  /** Sets the field into read-only mode. */
  readOnly?: boolean
}

interface CountryEntry {
  label: string
  value: Country | undefined
}

interface CountrySelectProps {
  disabled?: boolean
  readOnly?: boolean
  value: Country
  options: CountryEntry[]
  onChange: (country: Country) => void
}

const PhoneContainerRefContext = React.createContext<React.RefObject<HTMLDivElement | null> | null>(
  null
)

/** Flag SVG from the library's bundled flags (no external requests). */
function FlagComponent({ country, countryName }: BasePhoneInput.FlagProps) {
  const Flag = country ? flags[country] : undefined
  return (
    <span {...stylex.props(s.flag)}>
      {Flag ? <Flag title={countryName} /> : <GlobeIcon {...stylex.props(s.flagFallback)} />}
    </span>
  )
}

/** Library-provided country select, rendered as the design system's Combobox. */
function CountrySelect({
  disabled,
  readOnly,
  value: selectedCountry,
  options: countryList,
  onChange
}: CountrySelectProps) {
  const containerRef = React.useContext(PhoneContainerRefContext)
  const collection = React.useMemo(
    () =>
      comboboxCreateItems(countryList as CountryEntry[], {
        getValue: (entry) => entry.value ?? '',
        getLabel: (entry) => entry.label
      }),
    [countryList]
  )

  return (
    <Combobox
      items={collection}
      value={selectedCountry ?? null}
      onValueChange={(next) => {
        if (next) onChange(next)
      }}
    >
      <ComboboxTrigger
        disabled={disabled || readOnly}
        aria-label='Select country'
        showChevron={false}
        style={s.countryTrigger}
      >
        <FlagComponent country={selectedCountry} countryName={selectedCountry} />
      </ComboboxTrigger>
      <ComboboxContent
        anchor={containerRef ?? undefined}
        collisionAvoidance={{ side: 'none', align: 'shift' }}
        style={s.popup}
      >
        <div {...stylex.props(s.searchWrap)}>
          <SearchIcon {...stylex.props(s.searchIcon)} />
          <ComboboxInput
            placeholder='Search country…'
            showTrigger={false}
            showClear={false}
            style={s.countrySearchWrap}
            inputStyle={s.countrySearchInput}
          />
        </div>
        <ComboboxEmpty>No country found.</ComboboxEmpty>
        <ComboboxList>
          {(item: CountryEntry) =>
            item.value ? (
              <ComboboxItem key={item.value} value={item.value}>
                <FlagComponent country={item.value} countryName={item.label} />
                <span {...stylex.props(s.countryLabel)}>{item.label}</span>
                <span {...stylex.props(s.countryCode)}>
                  +{BasePhoneInput.getCountryCallingCode(item.value)}
                </span>
              </ComboboxItem>
            ) : null
          }
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  )
}

/** Hidden select stub for `withCountrySelect={false}` — the library always
 * renders its `countrySelectComponent`, so we give it a null placeholder and
 * let the digits span the whole group. */
function NoCountrySelect() {
  return null
}

function PhoneInputContainer({
  style,
  ...props
}: Omit<React.ComponentPropsWithoutRef<'div'>, 'className' | 'style'> & {
  style?: stylex.StyleXStyles
}) {
  const containerRef = React.useContext(PhoneContainerRefContext)
  return <div ref={containerRef} role='group' {...props} {...stylex.props(s.root, style)} />
}

function PhoneInput({
  style,
  ...props
}: Omit<React.ComponentPropsWithRef<typeof BaseInput>, 'className' | 'style'> & {
  style?: stylex.StyleXStyles
}) {
  return <BaseInput {...props} {...stylex.props(s.control, style)} />
}

export function InputPhone({
  style,
  defaultCountry = 'US',
  countries,
  onCountryChange,
  addInternationalOption = true,
  withCountrySelect = true,
  invalid = false,
  disabled,
  readOnly,
  onChange = () => {},
  ...props
}: InputPhoneProps) {
  const containerRef = React.useRef<HTMLDivElement | null>(null)

  return (
    <PhoneContainerRefContext.Provider value={containerRef}>
      <BasePhoneInput.default
        {...props}
        disabled={disabled}
        readOnly={readOnly}
        className={undefined}
        containerComponent={PhoneInputContainer}
        containerComponentProps={{ style, 'data-invalid': invalid || undefined }}
        inputComponent={PhoneInput}
        countrySelectComponent={withCountrySelect ? CountrySelect : NoCountrySelect}
        flagComponent={FlagComponent}
        smartCaret={false}
        defaultCountry={defaultCountry}
        countries={countries}
        onCountryChange={onCountryChange}
        addInternationalOption={addInternationalOption}
        value={props.value || undefined}
        onChange={(next) => onChange(next || ('' as Value))}
      />
    </PhoneContainerRefContext.Provider>
  )
}

function GlobeIcon(props: React.ComponentProps<'svg'>) {
  return (
    <svg
      width='16'
      height='16'
      viewBox='0 0 16 16'
      fill='none'
      stroke='currentColor'
      strokeWidth='1.5'
      strokeLinecap='round'
      strokeLinejoin='round'
      aria-hidden
      {...props}
    >
      <circle cx='8' cy='8' r='6.5' />
      <path d='M1.5 8h13M8 1.5c2 2 2.5 4 2.5 6.5s-.5 4.5-2.5 6.5M8 1.5C6 3.5 5.5 6 5.5 8s.5 4.5 2.5 6.5' />
    </svg>
  )
}

// Re-exported for type consumers.
export type { Country, Value }
