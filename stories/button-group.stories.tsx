import type { Meta, StoryObj } from '@storybook/react-vite'
import x from '@stylexjs/atoms'
import * as stylex from '@stylexjs/stylex'
import * as Lucide from 'lucide-react'
import * as React from 'react'
import { Button } from '#/components/base/button'
import { ButtonGroup, ButtonGroupSeparator } from '#/components/extra/button-group'
import { space } from '#/styles/tokens.stylex'

const meta = {
  title: 'Extended/ButtonGroup',
  component: ButtonGroup,
  parameters: { layout: 'centered' },
  argTypes: {
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical']
    }
  },
  tags: [],
  args: {},
  decorators: [
    (Story) => (
      <div
        {...stylex.props(
          x.display.flex,
          x.width['100%'],
          x.minWidth['28rem'],
          x.alignItems.center,
          x.justifyContent.center
        )}
      >
        <Story />
      </div>
    )
  ]
} satisfies Meta<typeof ButtonGroup>

export default meta
type Story = StoryObj<typeof meta>

const layoutStyles = stylex.create({
  grid: {
    display: 'flex',
    flexDirection: 'column',
    gap: space[6]
  },
  row: {
    display: 'flex',
    alignItems: 'center',
    gap: space[2]
  },
  rowLabel: {
    minWidth: '6rem'
  }
})

const Row = ({ label, children }: React.PropsWithChildren<{ label: string }>) => (
  <div {...stylex.props(layoutStyles.row)}>
    <span {...stylex.props(layoutStyles.rowLabel)}>{label}</span>
    {children}
  </div>
)

const Grid = ({ children }: React.PropsWithChildren) => (
  <div {...stylex.props(layoutStyles.grid)}>{children}</div>
)

export const Playground: Story = {
  args: { orientation: 'horizontal' },
  render: (args) => (
    <ButtonGroup id='button-group-playground' orientation={args.orientation}>
      <Button id='button-group-playground-1'>First</Button>
      <Button id='button-group-playground-2'>Second</Button>
      <Button id='button-group-playground-3'>Third</Button>
    </ButtonGroup>
  )
}

export const OrientationShowcase: Story = {
  name: 'Orientations',
  args: { orientation: 'horizontal' },
  parameters: { controls: { disable: true } },
  render: () => (
    <Grid>
      <Row label='Horizontal'>
        <ButtonGroup id='button-group-horizontal' orientation='horizontal'>
          <Button id='button-group-horiz-1'>Left</Button>
          <Button id='button-group-horiz-2'>Center</Button>
          <Button id='button-group-horiz-3'>Right</Button>
        </ButtonGroup>
      </Row>
      <Row label='Vertical'>
        <ButtonGroup id='button-group-vertical' orientation='vertical'>
          <Button id='button-group-vert-1'>Top</Button>
          <Button id='button-group-vert-2'>Middle</Button>
          <Button id='button-group-vert-3'>Bottom</Button>
        </ButtonGroup>
      </Row>
    </Grid>
  )
}

export const WithSeparator: Story = {
  name: 'With Separator',
  args: { orientation: 'horizontal' },
  parameters: { controls: { disable: true } },
  render: () => (
    <Grid>
      <Row label='Horizontal'>
        <ButtonGroup id='button-group-sep-horiz' orientation='horizontal'>
          <Button id='button-group-sep-horiz-1'>Edit</Button>
          <ButtonGroupSeparator id='button-group-sep-horiz-sep-1' />
          <Button id='button-group-sep-horiz-2'>
            <Lucide.Copy size={16} />
          </Button>
          <ButtonGroupSeparator id='button-group-sep-horiz-sep-2' />
          <Button id='button-group-sep-horiz-3'>
            <Lucide.Trash2 size={16} />
          </Button>
        </ButtonGroup>
      </Row>
      <Row label='Vertical'>
        <ButtonGroup id='button-group-sep-vert' orientation='vertical'>
          <Button id='button-group-sep-vert-1'>Save</Button>
          <ButtonGroupSeparator id='button-group-sep-vert-sep-1' orientation='horizontal' />
          <Button id='button-group-sep-vert-2'>Cancel</Button>
        </ButtonGroup>
      </Row>
    </Grid>
  )
}
