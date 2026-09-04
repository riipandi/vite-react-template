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
  parameters: { layout: 'centered' },
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
      <FieldLegend>Ministry of Magic security pass</FieldLegend>
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor='field-name'>Wizard name</FieldLabel>
          <Input id='field-name' placeholder='Hermione Granger' />
          <FieldDescription>Embossed on your Daily Prophet press badge.</FieldDescription>
        </Field>
        <FieldSeparator>Owl contact</FieldSeparator>
        <Field>
          <FieldLabel htmlFor='field-email'>Owl post address</FieldLabel>
          <Input id='field-email' type='email' placeholder='hermione.granger@hogwarts.edu' />
        </Field>
      </FieldGroup>
    </FieldSet>
  )
}
