import type { Meta, StoryObj } from '@storybook/react-vite'
import { fn } from 'storybook/test'
import { Switch } from '#/components/base/switch'
import { Label } from '#/components/extra/label'
import { Text } from '#/components/extra/typography'

const meta = {
  title: 'Base Components/Switch',
  component: Switch,
  parameters: { layout: 'centered' },
  tags: [], // ['autodocs']
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg']
    },
    defaultChecked: { control: 'boolean' },
    checked: { control: 'boolean' },
    disabled: { control: 'boolean' }
  },
  args: { onCheckedChange: fn() },
  decorators: [
    (Story) => (
      <div className='flex w-full min-w-md items-center justify-center'>
        <Story />
      </div>
    )
  ]
} satisfies Meta<typeof Switch>

export default meta
type Story = StoryObj<typeof meta>

const sizes = ['sm', 'md', 'lg'] as const

const Row = ({
  label,
  children,
  className
}: React.PropsWithChildren<{ label: string; className?: string }>) => (
  <div className='flex items-center gap-2'>
    <span className={className}>{label}</span>
    {children}
  </div>
)

const Grid = ({ children }: React.PropsWithChildren) => (
  <div className='flex flex-col gap-4'>{children}</div>
)

export const Playground: Story = {
  render: ({ size, defaultChecked, disabled }) => (
    <Label>
      <Switch size={size} defaultChecked={defaultChecked} disabled={disabled} />
      <Text>Turn on notifications</Text>
    </Label>
  )
}

export const SizeShowcase: Story = {
  name: 'Sizes',
  parameters: { controls: { disable: true } },
  render: () => (
    <Grid>
      {sizes.map((s) => (
        <Row key={s} label={s}>
          <Label>
            <Switch size={s} defaultChecked />
            <Text>Turn on notifications</Text>
          </Label>
        </Row>
      ))}
    </Grid>
  )
}

export const StatesShowcase: Story = {
  name: 'States',
  parameters: { controls: { disable: true } },
  render: () => (
    <Grid>
      <Row label='Unchecked' className='min-w-32'>
        <Label>
          <Switch />
          <Text>Turn on notifications</Text>
        </Label>
      </Row>
      <Row label='Checked' className='min-w-32'>
        <Label>
          <Switch defaultChecked />
          <Text>Turn off notifications</Text>
        </Label>
      </Row>
      <Row label='Disabled' className='min-w-32'>
        <Label>
          <Switch disabled />
          <Text>Default value is off</Text>
        </Label>
      </Row>
      <Row label='Disabled On' className='min-w-32'>
        <Label>
          <Switch defaultChecked disabled />
          <Text>Default value is on</Text>
        </Label>
      </Row>
    </Grid>
  )
}
