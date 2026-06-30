import type { Meta, StoryObj } from '@storybook/react-vite'
import * as stylex from '@stylexjs/stylex'
import { Button } from '#/components/base/button'
import { Field, FieldLabel, FieldControl } from '#/components/base/field'
import { Form } from '#/components/base/form'
import { Input } from '#/components/base/input'
import { space } from '#/styles/tokens.stylex'

const meta = {
  title: 'Component/Form',
  component: Form,
  parameters: { layout: 'centered' },
  argTypes: {},
  tags: []
} satisfies Meta<typeof Form>

export default meta
type Story = StoryObj<typeof meta>

const layoutStyles = stylex.create({
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: space[4],
    width: '24rem',
    maxWidth: '100%'
  },
  formField: {
    display: 'flex',
    flexDirection: 'column',
    gap: space[2]
  },
  actions: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: space[2],
    marginTop: space[2]
  }
})

export const Playground: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div {...stylex.props(layoutStyles.wrapper)}>
      <Form
        onSubmit={(event: React.FormEvent<HTMLFormElement>) => {
          event.preventDefault()
          const data = new FormData(event.currentTarget)
          console.log('Form submitted:', Object.fromEntries(data))
        }}
      >
        <div {...stylex.props(layoutStyles.formField)}>
          <Field>
            <FieldLabel>Name</FieldLabel>
            <FieldControl>
              <Input name='name' placeholder='Enter your name' />
            </FieldControl>
          </Field>
        </div>
        <div {...stylex.props(layoutStyles.formField)}>
          <Field>
            <FieldLabel>Email</FieldLabel>
            <FieldControl>
              <Input name='email' type='email' placeholder='Enter your email' />
            </FieldControl>
          </Field>
        </div>
        <div {...stylex.props(layoutStyles.actions)}>
          <Button type='submit'>Submit</Button>
        </div>
      </Form>
    </div>
  )
}

export const Default: Story = {
  name: 'With validation',
  parameters: { controls: { disable: true } },
  render: () => (
    <div {...stylex.props(layoutStyles.wrapper)}>
      <Form
        onSubmit={(event: React.FormEvent<HTMLFormElement>) => {
          event.preventDefault()
          const data = new FormData(event.currentTarget)
          console.log('Form submitted:', Object.fromEntries(data))
        }}
      >
        <div {...stylex.props(layoutStyles.formField)}>
          <Field>
            <FieldLabel>Full name</FieldLabel>
            <FieldControl>
              <Input name='name' placeholder='Jane Smith' required />
            </FieldControl>
          </Field>
        </div>
        <div {...stylex.props(layoutStyles.formField)}>
          <Field>
            <FieldLabel>Email address</FieldLabel>
            <FieldControl>
              <Input name='email' type='email' placeholder='jane@example.com' required />
            </FieldControl>
          </Field>
        </div>
        <div {...stylex.props(layoutStyles.actions)}>
          <Button type='reset' variant='neutral' mode='stroke'>
            Reset
          </Button>
          <Button type='submit'>Submit</Button>
        </div>
      </Form>
    </div>
  )
}
