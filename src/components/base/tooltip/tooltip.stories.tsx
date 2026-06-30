import type { Meta, StoryObj } from '@storybook/react-vite'
import { Button } from '#/components/base/button'
import { Tooltip, TooltipPopup, TooltipTrigger } from '#/components/base/tooltip'

const meta = {
  title: 'Base Components/Tooltip',
  component: Tooltip,
  parameters: { layout: 'centered' },
  argTypes: {},
  tags: [], // ['autodocs']
  args: {},
  decorators: [
    (Story) => (
      <div className='flex w-full min-w-md items-center justify-center'>
        <Story />
      </div>
    )
  ]
} satisfies Meta<typeof Tooltip>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {
  args: {},
  render: () => (
    <div className='inline-flex items-center space-x-4'>
      <Tooltip>
        <TooltipTrigger
          render={
            <Button color='neutral' variant='outline'>
              Hover me
            </Button>
          }
        />
        <TooltipPopup>You can place your tooltip content here.</TooltipPopup>
      </Tooltip>
    </div>
  )
}

export const Position: Story = {
  args: {},
  render: () => (
    <div className='inline-flex items-center space-x-4'>
      <Tooltip>
        <TooltipTrigger
          render={
            <Button color='neutral' variant='outline'>
              Top
            </Button>
          }
        />
        <TooltipPopup>I am on the top</TooltipPopup>
      </Tooltip>
      <Tooltip>
        <TooltipTrigger
          render={
            <Button color='neutral' variant='outline'>
              Bottom
            </Button>
          }
        />
        <TooltipPopup side='bottom' align='start'>
          I am on the bottom
        </TooltipPopup>
      </Tooltip>
      <Tooltip>
        <TooltipTrigger
          render={
            <Button color='neutral' variant='outline'>
              Left
            </Button>
          }
        />
        <TooltipPopup side='left' align='center'>
          I am on the left
        </TooltipPopup>
      </Tooltip>
      <Tooltip>
        <TooltipTrigger
          render={
            <Button color='neutral' variant='outline'>
              Right
            </Button>
          }
        />
        <TooltipPopup side='right' align='start'>
          I am on the right
        </TooltipPopup>
      </Tooltip>
    </div>
  )
}
