/**
 * A phone number input with a country selector, composed from the design
 * system's Combobox (Base UI) and `react-phone-number-input`.
 *
 * @see: https://www.npmjs.com/package/react-phone-number-input
 * @see: https://base-ui.com/react/components/combobox
 * @see: https://github.com/keenthemes/reui — phone-input recipe
 *
 * The library's "with country select" entry drives all state (value, country,
 * formatting). We override `countrySelectComponent` with a custom component
 * that renders the design system's Combobox over the library-provided
 * `options` (`{ label, value: Country | undefined }`), and `inputComponent`
 * with the bare `Input` so the digits inherit standard field styling inside
 * the InputGroup (passed via `containerComponent`).
 */

import * as stylex from '@stylexjs/stylex'
import * as React from 'react'
import * as BasePhoneInput from 'react-phone-number-input'
import type { Country, Value } from 'react-phone-number-input'
import flags from 'react-phone-number-input/flags'
import { Combobox, ComboboxContent, ComboboxEmpty } from '#/components/base/combobox'
import { ComboboxItem, ComboboxList, ComboboxTrigger } from '#/components/base/combobox'
import { Input } from '#/components/base/input'
import { InputGroup, inputGroupStyles } from '#/components/extra/input-group'
import { inputPhoneStyles as s } from './input-phone.stylex'

type LibraryPhoneInputProps = React.ComponentPropsWithoutRef<typeof BasePhoneInput.default>

export interface InputPhoneProps extends Omit<
  LibraryPhoneInputProps,
  'onChange' | 'value' | 'defaultValue' | 'style' | 'className'
> {
  style?: stylex.StyleXStyles
  /** E.164 phone value, e.g. `+12135551234`. */
  value?: Value
  /** Called with the E.164 value (or `undefined` when cleared). */
  onChange?: (value: Value | undefined) => void
  /** Country shown initially. Defaults to `US`. */
  defaultCountry?: Country
  /** Restrict the country dropdown to these countries. */
  countries?: Country[]
  /** Called when the selected country changes. */
  onCountryChange?: (country: Country | undefined) => void
  /** Show the "International" entry in the dropdown. Defaults to `true`. */
  addInternationalOption?: boolean
  /** Marks the field visually as invalid. */
  invalid?: boolean
}

interface CountryEntry {
  label: string
  value: Country | undefined
}

interface CountrySelectProps {
  disabled?: boolean
  value: Country
  options: CountryEntry[]
  onChange: (country: Country) => void
}

/** Flag SVG from the library's bundled flags (no external requests). */
function FlagComponent({ country, countryName }: BasePhoneInput.FlagProps) {
  const Flag = country ? flags[country] : undefined
  if (Flag) {
    return (
      <span {...stylex.props(s.flag)}>
        <Flag title={countryName} />
      </span>
    )
  }
  return (
    <span {...stylex.props(s.flag)} title={countryName} aria-hidden>
      🌐
    </span>
  )
}

/** Library-provided country select, rendered as the design system's Combobox. */
function CountrySelect({
  disabled,
  value: selectedCountry,
  options: countryList,
  onChange
}: CountrySelectProps) {
  return (
    <Combobox
      items={countryList}
      value={selectedCountry}
      onValueChange={(next) => {
        if (next) onChange(next)
      }}
    >
      <ComboboxTrigger disabled={disabled} aria-label='Select country' style={s.countryTrigger}>
        <FlagComponent country={selectedCountry} countryName={selectedCountry} />
      </ComboboxTrigger>
      <ComboboxContent>
        <ComboboxEmpty>No country found.</ComboboxEmpty>
        <ComboboxList>
          {(item: CountryEntry) =>
            item.value ? (
              <ComboboxItem key={item.value} value={item.value}>
                <FlagComponent country={item.value} countryName={item.label} />
                <span>{item.label}</span>
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

export function InputPhone({
  style,
  defaultCountry = 'US',
  countries,
  onCountryChange,
  addInternationalOption = true,
  invalid = false,
  onChange = () => {},
  ...props
}: InputPhoneProps) {
  return (
    <BasePhoneInput.default
      {...props}
      className={undefined}
      containerComponent={InputGroup}
      containerComponentProps={{ ...stylex.props(inputGroupStyles.root, style) }}
      inputComponent={Input}
      numberInputProps={{
        ...stylex.props(inputGroupStyles.control, s.control, invalid && s.invalid)
      }}
      countrySelectComponent={CountrySelect}
      flagComponent={FlagComponent}
      smartCaret={false}
      defaultCountry={defaultCountry}
      countries={countries}
      onCountryChange={onCountryChange}
      addInternationalOption={addInternationalOption}
      value={props.value || undefined}
      onChange={(next) => onChange(next || undefined)}
    />
  )
}

// Re-exported for type consumers.
export type { Country, Value }
