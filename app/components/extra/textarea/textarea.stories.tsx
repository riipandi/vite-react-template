import type { Meta, StoryObj } from '@storybook/tanstack-react'
import atoms from '@stylexjs/atoms'
import * as stylex from '@stylexjs/stylex'
import * as React from 'react'
import { expect, userEvent } from 'storybook/test'
import { Field, FieldDescription, FieldError, FieldLabel } from '#/components/base/field'
import { colors } from '#/styles/core/colors.stylex'
import { container, unit } from '#/styles/core/tokens.stylex'
import { fontFamily, fontSize, fontLineHeight, fontWeight } from '#/styles/core/tokens.stylex'
import { Textarea } from './textarea.component'

const meta = {
  title: 'Extra Components/Textarea',
  component: Textarea,
  parameters: { layout: 'fullscreen' },
  argTypes: {
    disabled: { control: 'boolean' }
  },
  tags: [], // ['autodocs']
  decorators: [
    (Story) => (
      <div {...stylex.props(atoms.padding['20px'], atoms.minWidth['448px'], atoms.width['100%'])}>
        <Story />
      </div>
    )
  ]
} satisfies Meta<typeof Textarea>

type Story = StoryObj<typeof meta>

const styles = stylex.create({
  wrap: {
    width: container.large
  },
  fill: {
    width: '100%'
  },
  counterRow: {
    alignItems: 'center',
    display: 'flex',
    gap: unit.x2,
    justifyContent: 'space-between'
  },
  counter: {
    color: colors.foregroundNeutralFaded,
    fontFamily: fontFamily.body,
    fontSize: fontSize.caption1,
    fontVariantNumeric: 'tabular-nums',
    lineHeight: fontLineHeight.caption1
  },
  counterNearLimit: {
    color: colors.foregroundWarning
  },
  counterAtLimit: {
    color: colors.foregroundCritical,
    fontWeight: fontWeight.semibold
  }
})

export default meta

export const Playground: Story = {
  render: () => (
    <div {...stylex.props(styles.wrap)}>
      <Textarea placeholder='Draft your letter to the Daily Prophet…' />
    </div>
  ),
  play: async ({ canvas }) => {
    const el = canvas.getByPlaceholderText('Draft your letter to the Daily Prophet…')
    await userEvent.type(el, 'Dear Editor,')
    expect(el).toHaveValue('Dear Editor,')
  }
}

export const WithField: Story = {
  name: 'With field',
  render: () => (
    <Field style={styles.wrap}>
      <FieldLabel htmlFor='textarea-with-field-bio'>Symbologist bio</FieldLabel>
      <Textarea
        id='textarea-with-field-bio'
        placeholder='Tell us about your strangest symbol discovery'
      />
      <FieldDescription>
        You can @mention other wizards and wizarding organizations.
      </FieldDescription>
    </Field>
  )
}

export const Disabled: Story = {
  render: () => (
    <div {...stylex.props(styles.wrap)}>
      <Textarea placeholder='Locked by Ministry decree' disabled />
    </div>
  ),
  play: async ({ canvas }) => {
    const el = canvas.getByPlaceholderText('Locked by Ministry decree')
    expect(el).toBeDisabled()
    await userEvent.type(el, 'alohomora')
    expect(el).toHaveValue('')
  }
}

export const Invalid: Story = {
  render: () => (
    <Field invalid style={styles.wrap}>
      <FieldLabel htmlFor='textarea-invalid-bio'>Symbologist bio</FieldLabel>
      <Textarea id='textarea-invalid-bio' defaultValue='Dear Editor,' />
      <FieldError>Your letter must be at least 10 characters.</FieldError>
    </Field>
  )
}

const MAX_CHARS = 280

export const AutoResize: Story = {
  name: 'Auto Resize',
  render: () => {
    const [value, setValue] = React.useState('')

    const remaining = MAX_CHARS - value.length
    const isNearLimit = remaining <= 20
    const isAtLimit = remaining === 0

    return (
      <div {...stylex.props(styles.wrap)}>
        <Field style={styles.fill}>
          <div {...stylex.props(styles.counterRow)}>
            <FieldLabel htmlFor='textarea-auto-resize'>Bio</FieldLabel>
            <span
              {...stylex.props(
                styles.counter,
                isAtLimit && styles.counterAtLimit,
                isNearLimit && styles.counterNearLimit
              )}
            >
              {value.length}/{MAX_CHARS}
            </span>
          </div>
          <Textarea
            id='textarea-auto-resize'
            autoResize
            value={value}
            onChange={(event) => setValue(event.target.value.slice(0, MAX_CHARS))}
            placeholder='Tell us about yourself...'
            rows={2}
          />
        </Field>
      </div>
    )
  },
  play: async ({ canvas }) => {
    const el = canvas.getByPlaceholderText('Tell us about yourself...')

    // Typing grows the textarea and updates the counter.
    await userEvent.type(el, 'Marauder')
    expect(canvas.getByText('8/280')).toBeInTheDocument()

    // The counter flips to the warning tone near the limit.
    await userEvent.type(el, 'a'.repeat(20))
    expect(canvas.getByText('28/280')).toBeInTheDocument()
  }
}
