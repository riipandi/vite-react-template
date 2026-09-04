import type { Meta, StoryObj } from '@storybook/tanstack-react'
import atoms from '@stylexjs/atoms'
import * as stylex from '@stylexjs/stylex'
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
    borderWidth: stroke.border,
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
  )
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
  )
}
