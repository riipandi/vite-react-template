import type { Meta, StoryObj } from '@storybook/react-vite'
import * as stylex from '@stylexjs/stylex'
import { Tabs, TabsList, TabsTab, TabsPanel } from '#/components/base/tabs'
import { space } from '#/styles/tokens.stylex'

const meta = {
  title: 'Component/Tabs',
  component: Tabs,
  parameters: { layout: 'centered' },
  argTypes: {
    defaultValue: {
      control: 'text',
      description: 'Default selected tab value'
    }
  },
  tags: []
} satisfies Meta<typeof Tabs>

export default meta
type Story = StoryObj<typeof meta>

const layoutStyles = stylex.create({
  panel: {
    padding: space[4],
    border: '1px solid var(--border-neutral)',
    borderRadius: '0.55rem',
    marginTop: space[2]
  }
})

export const Playground: Story = {
  args: { defaultValue: 'tab1' },
  render: (args) => (
    <Tabs {...args} id='tabs-playground'>
      <TabsList id='tabs-playground-list'>
        <TabsTab value='tab1' id='tabs-playground-tab1'>
          Tab 1
        </TabsTab>
        <TabsTab value='tab2' id='tabs-playground-tab2'>
          Tab 2
        </TabsTab>
        <TabsTab value='tab3' id='tabs-playground-tab3'>
          Tab 3
        </TabsTab>
      </TabsList>
      <TabsPanel value='tab1' id='tabs-playground-panel1'>
        <div {...stylex.props(layoutStyles.panel)} id='tabs-panel1-content'>
          Panel 1 content
        </div>
      </TabsPanel>
      <TabsPanel value='tab2' id='tabs-playground-panel2'>
        <div {...stylex.props(layoutStyles.panel)} id='tabs-panel2-content'>
          Panel 2 content
        </div>
      </TabsPanel>
      <TabsPanel value='tab3' id='tabs-playground-panel3'>
        <div {...stylex.props(layoutStyles.panel)} id='tabs-panel3-content'>
          Panel 3 content
        </div>
      </TabsPanel>
    </Tabs>
  )
}

export const Default: Story = {
  name: 'Default',
  parameters: { controls: { disable: true } },
  render: () => (
    <Tabs defaultValue='news' id='tabs-default'>
      <TabsList id='tabs-default-list'>
        <TabsTab value='news' id='tabs-default-news'>
          News
        </TabsTab>
        <TabsTab value='updates' id='tabs-default-updates'>
          Updates
        </TabsTab>
        <TabsTab value='changelog' id='tabs-default-changelog'>
          Changelog
        </TabsTab>
      </TabsList>
      <TabsPanel value='news' id='tabs-default-panel-news'>
        <div {...stylex.props(layoutStyles.panel)} id='tabs-default-panel1'>
          Latest news and announcements
        </div>
      </TabsPanel>
      <TabsPanel value='updates' id='tabs-default-panel-updates'>
        <div {...stylex.props(layoutStyles.panel)} id='tabs-default-panel2'>
          Recent product updates
        </div>
      </TabsPanel>
      <TabsPanel value='changelog' id='tabs-default-panel-changelog'>
        <div {...stylex.props(layoutStyles.panel)} id='tabs-default-panel3'>
          Version history and changes
        </div>
      </TabsPanel>
    </Tabs>
  )
}
