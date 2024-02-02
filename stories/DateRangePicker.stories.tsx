import { Form } from 'react-aria-components'
import type { Meta } from '@storybook/react'

import { Button } from '@/components/ui-common/Button'
import { DateRangePicker } from '@/components/ui-common/DateRangePicker'

const meta: Meta<typeof DateRangePicker> = {
  component: DateRangePicker,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    label: 'Trip dates',
  },
}

export default meta

export const Example = (args: any) => <DateRangePicker {...args} />

export const Validation = (args: any) => (
  <Form className='flex flex-col items-start gap-2'>
    <DateRangePicker {...args} />
    <Button type='submit' variant='secondary'>
      Submit
    </Button>
  </Form>
)

Validation.args = {
  isRequired: true,
}
