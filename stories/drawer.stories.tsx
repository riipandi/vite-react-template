import type { Meta, StoryObj } from '@storybook/react-vite'
import * as stylex from '@stylexjs/stylex'
import * as Lucide from 'lucide-react'
import { Button } from '#/components/base/button'
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerFooter,
  DrawerTitle,
  DrawerDescription,
  DrawerClose,
  DrawerHandle
} from '#/components/base/drawer'
import { space } from '#/styles/tokens.stylex'

const meta = {
  title: 'Component/Drawer',
  component: Drawer,
  parameters: { layout: 'centered' },
  argTypes: {},
  tags: []
} satisfies Meta<typeof Drawer>

export default meta
type Story = StoryObj<typeof meta>

const layoutStyles = stylex.create({
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: space[4],
    alignItems: 'center'
  },
  drawerBody: {
    padding: space[4],
    display: 'flex',
    flexDirection: 'column',
    gap: space[3]
  },
  navItem: {
    display: 'flex',
    alignItems: 'center',
    gap: space[2],
    padding: space[2],
    borderRadius: '0.4rem'
  }
})

export const Playground: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div {...stylex.props(layoutStyles.wrapper)}>
      <Drawer>
        <DrawerTrigger>
          <Button>Open drawer</Button>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHandle />
          <DrawerHeader>
            <DrawerTitle>Navigation</DrawerTitle>
            <DrawerDescription>Select a section to navigate</DrawerDescription>
          </DrawerHeader>
          <div {...stylex.props(layoutStyles.drawerBody)}>
            <div {...stylex.props(layoutStyles.navItem)}>
              <Lucide.Inbox size={18} />
              <span>Inbox</span>
            </div>
            <div {...stylex.props(layoutStyles.navItem)}>
              <Lucide.Send size={18} />
              <span>Sent</span>
            </div>
            <div {...stylex.props(layoutStyles.navItem)}>
              <Lucide.FileText size={18} />
              <span>Drafts</span>
            </div>
            <div {...stylex.props(layoutStyles.navItem)}>
              <Lucide.Trash2 size={18} />
              <span>Trash</span>
            </div>
          </div>
          <DrawerFooter>
            <DrawerClose />
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  )
}
