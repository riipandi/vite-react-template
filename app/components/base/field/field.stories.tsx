import type { Meta, StoryObj } from '@storybook/tanstack-react'
import atoms from '@stylexjs/atoms'
import * as stylex from '@stylexjs/stylex'
import { Input } from '#/components/base/input'
import { container } from '#/styles/core/tokens.stylex'
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet
} from './field.component'

const meta = {
  title: 'Base Components/Field',
  component: Field,
  parameters: { layout: 'fullscreen' },
  tags: [], // ['autodocs']
  decorators: [
    (Story) => (
      <div {...stylex.props(atoms.padding['20px'], atoms.minWidth['448px'], atoms.width['100%'])}>
        <Story />
      </div>
    )
  ]
} satisfies Meta<typeof Field>

type Story = StoryObj<typeof meta>

const styles = stylex.create({
  root: {
    width: container.sm
  }
})

export default meta

export const Playground: Story = {
  render: () => (
    <FieldSet style={styles.root}>
      <FieldLegend>Profile</FieldLegend>
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor='field-name'>Name</FieldLabel>
          <Input id='field-name' placeholder='Evil Rabbit' />
          <FieldDescription>Shown on your public profile.</FieldDescription>
        </Field>
        <FieldSeparator>Contact</FieldSeparator>
        <Field>
          <FieldLabel htmlFor='field-email'>Email</FieldLabel>
          <Input id='field-email' type='email' placeholder='you@example.com' />
        </Field>
      </FieldGroup>
    </FieldSet>
  )
}
