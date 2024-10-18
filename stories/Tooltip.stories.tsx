import type { Meta } from '@storybook/react'
import * as Lucide from 'lucide-react'
import { TooltipTrigger } from 'react-aria-components'

import { Button } from '#/components/ui-react-aria/Button'
import { Tooltip } from '#/components/ui-react-aria/Tooltip'

const meta: Meta<typeof Tooltip> = {
  component: Tooltip,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
}

export default meta

export const Example = (args: any) => (
  <div className="flex gap-2">
    <TooltipTrigger>
      <Button variant="secondary" className="px-2">
        <Lucide.SaveIcon className="h-5 w-5" />
      </Button>
      <Tooltip {...args}>Save</Tooltip>
    </TooltipTrigger>
    <TooltipTrigger>
      <Button variant="secondary" className="px-2">
        <Lucide.PrinterIcon className="h-5 w-5" />
      </Button>
      <Tooltip {...args}>Print</Tooltip>
    </TooltipTrigger>
  </div>
)
