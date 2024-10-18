import type { Meta } from '@storybook/react'
import * as Lucide from 'lucide-react'
import { DialogTrigger, Heading } from 'react-aria-components'

import { Button } from '#/components/ui-react-aria/Button'
import { Dialog } from '#/components/ui-react-aria/Dialog'
import { Popover } from '#/components/ui-react-aria/Popover'

const meta: Meta<typeof Popover> = {
  component: Popover,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    showArrow: true,
  },
}

export default meta

export const Example = (args: any) => (
  <DialogTrigger>
    <Button variant="icon" aria-label="Help">
      <Lucide.HelpCircle className="h-4 w-4" />
    </Button>
    <Popover {...args} className="max-w-[250px]">
      <Dialog>
        <Heading slot="title" className="mb-2 font-semibold text-lg">
          Help
        </Heading>
        <p className="text-sm">For help accessing your account, please contact support.</p>
      </Dialog>
    </Popover>
  </DialogTrigger>
)
