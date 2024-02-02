import { Form } from 'react-aria-components'
import type { Meta } from '@storybook/react'

import { Button } from '@/components/ui-common/Button'
import { TextField } from '@/components/ui-common/TextField'

const meta: Meta<typeof TextField> = {
  component: TextField,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    label: 'Name',
  },
}

export default meta

export const Example = (args: any) => <TextField {...args} />

export const Validation = (args: any) => (
  <Form className='flex flex-col items-start gap-2'>
    <TextField {...args} />
    <Button type='submit' variant='secondary'>
      Submit
    </Button>
  </Form>
)

Validation.args = {
  isRequired: true,
}
