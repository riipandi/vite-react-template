import { Form } from 'react-aria-components'
import type { Meta } from '@storybook/react'

import { Button } from '@/components/ui-common/Button'
import { DatePicker } from '@/components/ui-common/DatePicker'

const meta: Meta<typeof DatePicker> = {
  component: DatePicker,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    label: 'Event date',
  },
}

export default meta

export const Example = (args: any) => <DatePicker {...args} />

export const Validation = (args: any) => (
  <Form className='flex flex-col items-start gap-2'>
    <DatePicker {...args} />
    <Button type='submit' variant='secondary'>
      Submit
    </Button>
  </Form>
)

Validation.args = {
  isRequired: true,
}
