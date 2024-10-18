import type { Meta } from '@storybook/react'

import { RangeCalendar } from '#/components/ui-react-aria/RangeCalendar'

const meta: Meta<typeof RangeCalendar> = {
  component: RangeCalendar,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
}

export default meta

export const Example = (args: any) => <RangeCalendar aria-label="Trip dates" {...args} />
