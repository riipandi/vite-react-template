import type { Meta, StoryObj } from '@storybook/tanstack-react'
import atoms from '@stylexjs/atoms'
import * as stylex from '@stylexjs/stylex'
import { expect, fn, userEvent } from 'storybook/test'
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldLabel,
  FieldTitle
} from '#/components/base/field'
import { colors } from '#/styles/core/colors.stylex'
import { fontFamily, fontSize, radius, stroke } from '#/styles/core/tokens.stylex'
import { RadioGroup, RadioGroupItem } from './radio.component'

const meta = {
  title: 'Base Components/Radio',
  component: RadioGroup,
  parameters: { layout: 'centered' },
  argTypes: {
    disabled: { control: 'boolean' }
  },
  tags: [], // ['autodocs']
  decorators: [
    (Story) => (
      <div
        {...stylex.props(
          atoms.display.flex,
          atoms.justifyContent.center,
          atoms.padding['20px'],
          atoms.minWidth['448px'],
          atoms.width['100%']
        )}
      >
        <Story />
      </div>
    )
  ]
} satisfies Meta<typeof RadioGroup>

type Story = StoryObj<typeof meta>

const options = ['Gryffindor', 'Slytherin', 'Ravenclaw']

const plans = [
  {
    value: 'starter',
    label: 'Owl post plan',
    description: 'Five vault visits a month and standard owl support.'
  },
  {
    value: 'pro',
    label: 'Galleon plan',
    description: 'Unlimited vault visits and priority House-elf support.'
  }
]

const styles = stylex.create({
  label: {
    alignItems: 'center',
    color: colors.foregroundNeutral,
    display: 'flex',
    fontFamily: fontFamily.body,
    fontSize: fontSize.body2,
    gap: 8
  },
  disabled: {
    opacity: 0.5
  },
  groupGap4: {
    gap: 16
  },
  groupGap3: {
    gap: 12
  },
  card: {
    alignItems: 'flex-start',
    borderColor: {
      default: colors.borderNeutral,
      ':has([data-checked])': colors.borderPrimary
    },
    borderRadius: radius.large,
    borderStyle: 'solid',
    borderWidth: stroke.ring1,
    cursor: 'pointer',
    display: 'flex',
    gap: 12,
    padding: 16
  },
  cardItem: {
    marginTop: 4
  }
})

export default meta

export const Playground: Story = {
  args: { defaultValue: 'Slytherin' },
  render: (args) => (
    <RadioGroup {...args}>
      {options.map((option) => (
        <label key={option} {...stylex.props(styles.label)}>
          <RadioGroupItem value={option} /> {option}
        </label>
      ))}
    </RadioGroup>
  ),
  play: async ({ canvas }) => {
    const slytherin = canvas.getByRole('radio', { name: 'Slytherin' })
    const ravenclaw = canvas.getByRole('radio', { name: 'Ravenclaw' })

    expect(slytherin).toHaveAttribute('aria-checked', 'true')

    // Selection is exclusive.
    await userEvent.click(ravenclaw)
    expect(ravenclaw).toHaveAttribute('aria-checked', 'true')
    expect(slytherin).toHaveAttribute('aria-checked', 'false')
  }
}

export const Description: Story = {
  args: { defaultValue: 'starter' },
  render: (args) => (
    <RadioGroup {...args} style={styles.groupGap4}>
      {plans.map((plan) => (
        <Field key={plan.value} orientation='horizontal'>
          <RadioGroupItem value={plan.value} id={`radio-group-description-${plan.value}`} />
          <FieldContent>
            <FieldLabel htmlFor={`radio-group-description-${plan.value}`}>{plan.label}</FieldLabel>
            <FieldDescription>{plan.description}</FieldDescription>
          </FieldContent>
        </Field>
      ))}
    </RadioGroup>
  )
}

export const ChoiceCard: Story = {
  name: 'Choice card',
  args: { defaultValue: 'pro' },
  render: (args) => (
    <RadioGroup {...args} style={styles.groupGap3}>
      {plans.map((plan) => (
        <Field key={plan.value} orientation='horizontal'>
          {/* The label is the card, so the whole surface toggles the radio. */}
          <FieldLabel style={styles.card}>
            <RadioGroupItem value={plan.value} style={styles.cardItem} />
            <FieldContent>
              <FieldTitle>{plan.label}</FieldTitle>
              <FieldDescription>{plan.description}</FieldDescription>
            </FieldContent>
          </FieldLabel>
        </Field>
      ))}
    </RadioGroup>
  )
}

export const Disabled: Story = {
  args: { defaultValue: 'a', disabled: true },
  render: (args) => (
    <RadioGroup {...args}>
      <label {...stylex.props(styles.label, styles.disabled)}>
        <RadioGroupItem value='a' /> Illuminati dossier
      </label>
      <label {...stylex.props(styles.label, styles.disabled)}>
        <RadioGroupItem value='b' /> Priory of Sion dossier
      </label>
    </RadioGroup>
  ),
  play: async ({ canvas }) => {
    const items = canvas.getAllByRole('radio')
    for (const item of items) expect(item).toHaveAttribute('data-disabled')

    const second = items[1]
    if (!second) throw new Error('Second radio not found')
    await userEvent.click(second)
    expect(second).toHaveAttribute('aria-checked', 'false')
    expect(items[0]).toHaveAttribute('aria-checked', 'true')
  }
}

export const OnValueChange: StoryObj<{ handleChange: ReturnType<typeof fn> }> = {
  name: 'onValueChange',
  args: { handleChange: fn() },
  render: (args) => (
    <RadioGroup onValueChange={args.handleChange}>
      {options.map((option) => (
        <label key={option} {...stylex.props(styles.label)}>
          <RadioGroupItem value={option} /> {option}
        </label>
      ))}
    </RadioGroup>
  ),
  play: async ({ canvas, args }) => {
    await userEvent.click(canvas.getByRole('radio', { name: 'Gryffindor' }))
    // onValueChange carries (value, eventDetails) — check the value arg.
    expect(args.handleChange.mock.calls[0]?.[0]).toBe('Gryffindor')
  }
}
