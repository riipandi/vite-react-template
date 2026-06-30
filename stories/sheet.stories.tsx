import type { Meta, StoryObj } from '@storybook/react-vite'
import * as stylex from '@stylexjs/stylex'
import * as React from 'react'
import { fn } from 'storybook/test'
import { Button } from '#/components/base/button'
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
  SheetClose,
  SheetPanel
} from '#/components/base/sheet'
import { space } from '#/styles/tokens.stylex'

const meta = {
  title: 'Component/Sheet',
  component: Sheet,
  parameters: { layout: 'centered' },
  argTypes: {},
  tags: [],
  args: { onOpenChange: fn() }
} satisfies Meta<typeof Sheet>

export default meta
type Story = StoryObj<typeof meta>

const sides = ['right', 'left', 'top', 'bottom'] as const

const layoutStyles = stylex.create({
  grid: { display: 'flex', flexDirection: 'column', gap: space[4] }
})

const Grid = ({ children }: React.PropsWithChildren) => (
  <div {...stylex.props(layoutStyles.grid)} id='sheet-grid'>
    {children}
  </div>
)

const sheetContent = (
  <>
    <SheetHeader>
      <SheetTitle>Confirm Action</SheetTitle>
      <SheetDescription>Are you sure you want to proceed with this action?</SheetDescription>
    </SheetHeader>
    <SheetPanel>
      <div id='sheet-panel-content'>
        This is the sheet panel body content. You can put any content here.
      </div>
    </SheetPanel>
    <SheetFooter>
      <SheetClose>
        <Button variant='neutral' mode='ghost'>
          Cancel
        </Button>
      </SheetClose>
      <Button variant='primary'>Confirm</Button>
    </SheetFooter>
  </>
)

const renderSheet = (side: 'right' | 'left' | 'top' | 'bottom', wrapperId: string) => (
  <div id={`${wrapperId}-root`}>
    <Sheet>
      <SheetTrigger>
        <Button variant='primary'>Open {side}</Button>
      </SheetTrigger>
      <SheetContent side={side}>{sheetContent}</SheetContent>
    </Sheet>
  </div>
)

export const Playground: Story = {
  render: () => renderSheet('right', 'sheet-playground')
}

export const SideShowcase: Story = {
  name: 'Sides',
  parameters: { controls: { disable: true } },
  render: () => (
    <Grid>
      {sides.map((s) => (
        <div key={s} id={`sheet-side-${s}`}>
          {renderSheet(s, `sheet-side-${s}`)}
        </div>
      ))}
    </Grid>
  )
}
