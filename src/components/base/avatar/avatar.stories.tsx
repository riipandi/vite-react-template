import type { Meta, StoryObj } from '@storybook/react-vite'
import x from '@stylexjs/atoms'
import * as stylex from '@stylexjs/stylex'
import * as Lucide from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage, AvatarIndicator } from '#/components/base/avatar'

const meta = {
  title: 'Base Components/Avatar',
  component: Avatar,
  parameters: { layout: 'centered' },
  argTypes: {},
  tags: [], // ['autodocs']
  args: {},
  decorators: [
    (Story) => (
      <div
        {...stylex.props(
          x.display.flex,
          x.width['100%'],
          x.alignItems.center,
          x.justifyContent.center
        )}
      >
        <Story />
      </div>
    )
  ]
} satisfies Meta<typeof Avatar>

export default meta
type Story = StoryObj<typeof meta>

const sizes = ['sm', 'md', 'lg'] as const

const Row = ({
  label,
  children,
  className
}: React.PropsWithChildren<{ label: string; className?: string }>) => (
  <div {...stylex.props(x.display.flex, x.alignItems.center, x.gap['0.5rem'])}>
    <span className={className}>{label}</span>
    {children}
  </div>
)

const Grid = ({ children }: React.PropsWithChildren) => (
  <div {...stylex.props(x.display.flex, x.flexDirection.column, x.gap['1rem'])}>{children}</div>
)

export const Playground: Story = {
  args: {},
  render: () => (
    <div className='inline-flex space-x-2'>
      <Avatar>
        <AvatarImage
          src='https://api.dicebear.com/9.x/avataaars/svg?radius=50&seed=Robert+Langdon'
          alt='Robert Langdon'
        />
        <AvatarFallback>RL</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarImage
          src='https://api.dicebear.com/9.x/avataaars/svg?radius=50&seed=Harry+Potter'
          alt='Harry Potter'
        />
        <AvatarFallback asInitial>Harry Potter</AvatarFallback>
      </Avatar>
      <Avatar className='bg-blue-500 text-white'>
        <AvatarFallback asInitial>Hermione Granger</AvatarFallback>
      </Avatar>
      <Avatar className='bg-orange-500 text-white'>
        <AvatarFallback asInitial>Sophie Neveu</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarFallback />
      </Avatar>
      <Avatar>NA</Avatar>
    </div>
  )
}

export const Indicator: Story = {
  args: {},
  render: () => (
    <div className='inline-flex space-x-2'>
      <Avatar size='md'>
        <AvatarImage
          src='https://api.dicebear.com/9.x/avataaars/svg?radius=50&seed=Albus+Dumbledore'
          alt='Albus Dumbledore'
        />
        <AvatarFallback>AD</AvatarFallback>
        <AvatarIndicator
          position='bottom'
          className='outline-background bg-green-500 outline'
          size='sm'
        />
      </Avatar>
      <Avatar size='md'>
        <AvatarImage
          src='https://api.dicebear.com/9.x/avataaars/svg?radius=50&seed=Ron+Weasley'
          alt='Ron Weasley'
        />
        <AvatarFallback>RW</AvatarFallback>
        <AvatarIndicator position='top' className='bg-red-500 text-white' size='lg'>
          3
        </AvatarIndicator>
      </Avatar>
      <Avatar size='md' className='bg-blue-500 text-white'>
        <AvatarFallback>LV</AvatarFallback>
        <AvatarIndicator position='bottom' className='bg-green-500 text-white' size='lg'>
          <Lucide.CheckCircle />
        </AvatarIndicator>
      </Avatar>
    </div>
  )
}

export const SizeShowcase: Story = {
  name: 'Sizes',
  parameters: { controls: { disable: true } },
  render: () => (
    <Grid>
      {sizes.map((s) => (
        <Row key={s} label={s}>
          <Avatar size={s}>
            <AvatarImage
              src={`https://api.dicebear.com/9.x/avataaars/svg?radius=50&seed=Ron+Weasley+${s}`}
              alt='User avatar'
            />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
        </Row>
      ))}
    </Grid>
  )
}

export const FallbackShowcase: Story = {
  name: 'Fallback',
  parameters: { controls: { disable: true } },
  render: () => (
    <Grid>
      {sizes.map((s) => (
        <Row key={s} label={s}>
          <Avatar size={s}>
            <AvatarImage src='https://broken-image.jpg' alt='User avatar' />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
        </Row>
      ))}
    </Grid>
  )
}
