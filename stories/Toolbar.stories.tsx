import { Group } from 'react-aria-components'
import type { Meta } from '@storybook/react'
import { BoldIcon, ItalicIcon, UnderlineIcon } from 'lucide-react'

import { Button } from '@/components/ui-react-aria/Button'
import { Checkbox } from '@/components/ui-react-aria/Checkbox'
import { Separator } from '@/components/ui-react-aria/Separator'
import { ToggleButton } from '@/components/ui-react-aria/ToggleButton'
import { Toolbar } from '@/components/ui-react-aria/Toolbar'

const meta: Meta<typeof Toolbar> = {
  component: Toolbar,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
}

export default meta

export const Example = (args: any) => (
  <Toolbar aria-label='Text formatting' {...args}>
    <Group aria-label='Style' className='contents'>
      <ToggleButton aria-label='Bold' className='p-2.5'>
        <BoldIcon className='h-4 w-4' />
      </ToggleButton>
      <ToggleButton aria-label='Italic' className='p-2.5'>
        <ItalicIcon className='h-4 w-4' />
      </ToggleButton>
      <ToggleButton aria-label='Underline' className='p-2.5'>
        <UnderlineIcon className='h-4 w-4' />
      </ToggleButton>
    </Group>
    <Separator orientation={args.orientation === 'vertical' ? 'horizontal' : 'vertical'} />
    <Group aria-label='Clipboard' className='contents'>
      <Button variant='secondary'>Copy</Button>
      <Button variant='secondary'>Paste</Button>
      <Button variant='secondary'>Cut</Button>
    </Group>
    <Separator orientation={args.orientation === 'vertical' ? 'horizontal' : 'vertical'} />
    <Checkbox>Night Mode</Checkbox>
  </Toolbar>
)
