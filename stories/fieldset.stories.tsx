import type { Meta, StoryObj } from '@storybook/react-vite'
import * as stylex from '@stylexjs/stylex'
import { Field, FieldLabel, FieldControl } from '#/components/base/field'
import { Fieldset, FieldsetLegend, FieldsetDescription } from '#/components/base/fieldset'
import { Input } from '#/components/base/input'
import { space } from '#/styles/tokens.stylex'

const meta = {
  title: 'Component/Fieldset',
  component: Fieldset,
  parameters: { layout: 'centered' },
  argTypes: {},
  tags: []
} satisfies Meta<typeof Fieldset>

export default meta
type Story = StoryObj<typeof meta>

const layoutStyles = stylex.create({
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: space[4],
    width: '28rem',
    maxWidth: '100%'
  },
  fieldGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: space[3],
    marginTop: space[2]
  }
})

export const Playground: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div {...stylex.props(layoutStyles.wrapper)}>
      <Fieldset>
        <FieldsetLegend>Personal information</FieldsetLegend>
        <FieldsetDescription>Provide your personal details below.</FieldsetDescription>
        <div {...stylex.props(layoutStyles.fieldGroup)}>
          <Field>
            <FieldLabel>Full name</FieldLabel>
            <FieldControl>
              <Input placeholder='John Doe' />
            </FieldControl>
          </Field>
          <Field>
            <FieldLabel>Email</FieldLabel>
            <FieldControl>
              <Input type='email' placeholder='john@example.com' />
            </FieldControl>
          </Field>
        </div>
      </Fieldset>
    </div>
  )
}

export const Default: Story = {
  name: 'Nested fields',
  parameters: { controls: { disable: true } },
  render: () => (
    <div {...stylex.props(layoutStyles.wrapper)}>
      <Fieldset>
        <FieldsetLegend>Shipping address</FieldsetLegend>
        <FieldsetDescription>Enter the shipping address for this order.</FieldsetDescription>
        <div {...stylex.props(layoutStyles.fieldGroup)}>
          <Field>
            <FieldLabel>Street address</FieldLabel>
            <FieldControl>
              <Input placeholder='123 Main St' />
            </FieldControl>
          </Field>
          <Field>
            <FieldLabel>City</FieldLabel>
            <FieldControl>
              <Input placeholder='New York' />
            </FieldControl>
          </Field>
          <Field>
            <FieldLabel>ZIP code</FieldLabel>
            <FieldControl>
              <Input placeholder='10001' />
            </FieldControl>
          </Field>
        </div>
      </Fieldset>
    </div>
  )
}
