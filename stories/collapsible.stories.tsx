import type { Meta, StoryObj } from '@storybook/react-vite'
import * as stylex from '@stylexjs/stylex'
import { Collapsible, CollapsibleTrigger, CollapsiblePanel } from '#/components/base/collapsible'
import { space } from '#/styles/tokens.stylex'

const meta = {
  title: 'Component/Collapsible',
  component: Collapsible,
  parameters: { layout: 'centered' },
  argTypes: {
    defaultOpen: { control: 'boolean' },
    disabled: { control: 'boolean' }
  },
  tags: []
} satisfies Meta<typeof Collapsible>

export default meta
type Story = StoryObj<typeof meta>

const layoutStyles = stylex.create({
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: space[2],
    width: '24rem'
  },
  panel: {
    display: 'flex',
    flexDirection: 'column',
    gap: space[2]
  },
  contentBox: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'oklch(0.965 0.003 265.75)',
    borderRadius: '0.5rem',
    padding: space[8]
  }
})

export const Playground: Story = {
  args: { defaultOpen: false },
  render: (args) => (
    <div id='collapsible-playground'>
      <Collapsible {...args}>
        <CollapsibleTrigger>Toggle section</CollapsibleTrigger>
        <CollapsiblePanel>
          <div {...stylex.props(layoutStyles.panel)}>
            <div {...stylex.props(layoutStyles.contentBox)}>
              This content can be shown or hidden using the collapsible trigger above.
            </div>
          </div>
        </CollapsiblePanel>
      </Collapsible>
    </div>
  )
}

export const Default: Story = {
  name: 'Default open',
  parameters: { controls: { disable: true } },
  render: () => (
    <div {...stylex.props(layoutStyles.wrapper)}>
      <Collapsible defaultOpen>
        <CollapsibleTrigger>Expandable section</CollapsibleTrigger>
        <CollapsiblePanel>
          <div {...stylex.props(layoutStyles.contentBox)}>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua.
            </p>
          </div>
        </CollapsiblePanel>
      </Collapsible>
    </div>
  )
}

export const Disabled: Story = {
  name: 'Disabled',
  parameters: { controls: { disable: true } },
  render: () => (
    <div {...stylex.props(layoutStyles.wrapper)}>
      <Collapsible disabled>
        <CollapsibleTrigger>Cannot toggle (disabled)</CollapsibleTrigger>
        <CollapsiblePanel>
          <div {...stylex.props(layoutStyles.contentBox)}>This panel is disabled.</div>
        </CollapsiblePanel>
      </Collapsible>
    </div>
  )
}
