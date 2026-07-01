import type { Meta, StoryObj } from '@storybook/react-vite'
import x from '@stylexjs/atoms'
import * as stylex from '@stylexjs/stylex'
import { fn } from 'storybook/test'
import { Switch } from '.'
import { Label } from '../../extra/label'
import { Text } from '../../extra/typography'

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
} satisfies Meta<typeof Switch>

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
      <Row label='Unchecked' {...stylex.props(x.minWidth['8rem'])}>
        <Label>
          <Switch />
          <Text>Turn on notifications</Text>
        </Label>
      </Row>
      <Row label='Checked' {...stylex.props(x.minWidth['8rem'])}>
        <Label>
          <Switch defaultChecked />
          <Text>Turn off notifications</Text>
        </Label>
      </Row>
      <Row label='Disabled' {...stylex.props(x.minWidth['8rem'])}>
        <Label>
          <Switch disabled />
          <Text>Default value is off</Text>
        </Label>
      </Row>
      <Row label='Disabled On' {...stylex.props(x.minWidth['8rem'])}>
        <Label>
          <Switch defaultChecked disabled />
          <Text>Default value is on</Text>
        </Label>
      </Row>
    </Grid>
  )
}
