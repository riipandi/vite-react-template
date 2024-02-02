import type { Meta } from '@storybook/react'

import { Calendar } from '@/components/ui-common/Calendar'

const meta: Meta<typeof Calendar> = {
  component: Calendar,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
}

export default meta

export const Example = (args: any) => <Calendar aria-label='Event date' {...args} />
