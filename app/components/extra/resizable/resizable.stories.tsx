import type { Meta, StoryObj } from '@storybook/tanstack-react'
import atoms from '@stylexjs/atoms'
import * as stylex from '@stylexjs/stylex'
import * as React from 'react'
import { expect, userEvent } from 'storybook/test'
import { colors } from '#/styles/core/colors.stylex'
import { fontSize, fontWeight, radius, stroke, unit } from '#/styles/core/tokens.stylex'
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from './resizable.component'

const meta = {
  title: 'Extra Components/Resizable',
  component: ResizablePanelGroup,
  parameters: { layout: 'fullscreen' },
  tags: [], // ['autodocs']
  decorators: [
    (Story) => (
      <div {...stylex.props(atoms.width['100%'], styles.canvas)}>
        <Story />
      </div>
    )
  ]
} satisfies Meta<typeof ResizablePanelGroup>

export default meta

type Story = StoryObj<typeof meta>

const styles = stylex.create({
  canvas: {
    height: '320px',
    padding: unit.x6
  },
  frame: {
    backgroundColor: colors.backgroundPage,
    borderColor: colors.borderNeutralFaded,
    borderRadius: radius.xlarge,
    borderStyle: 'solid',
    borderWidth: stroke.ring1,
    overflow: 'hidden'
  },
  content: {
    alignItems: 'center',
    backgroundColor: colors.backgroundNeutralFaded,
    display: 'flex',
    fontSize: fontSize.body2,
    fontWeight: fontWeight.semibold,
    height: '100%',
    justifyContent: 'center',
    overflow: 'auto',
    padding: unit.x6
  },
  contentAlt: {
    backgroundColor: colors.backgroundNeutralFaded
  },
  nested: {
    height: '100%'
  }
})

export const Horizontal: Story = {
  render: () => (
    <ResizablePanelGroup style={styles.frame}>
      <ResizablePanel id='sidebar' defaultSize={25} minSize={15} style={styles.content}>
        Sidebar
      </ResizablePanel>
      <ResizableHandle aria-label='Resize sidebar' />
      <ResizablePanel defaultSize={75} style={[styles.content, styles.contentAlt]}>
        Content
      </ResizablePanel>
    </ResizablePanelGroup>
  ),
  play: async ({ canvas }) => {
    const handle = canvas.getByRole('separator', { name: 'Resize sidebar' })
    const panel = document.body.querySelector<HTMLElement>('[data-testid="sidebar"]')
    expect(panel).not.toBeNull()

    // Keyboard focus shows the glow hugging the bar and resizes the panel.
    // (Hover styles rely on CSS :hover, which synthetic test events cannot
    // trigger — verified separately against a real browser session.)
    const before = panel?.getBoundingClientRect().width ?? 0
    handle.focus()
    await userEvent.keyboard('{ArrowRight}')
    expect(getComputedStyle(handle).boxShadow).not.toBe('none')
    expect(panel?.getBoundingClientRect().width ?? 0).toBeGreaterThan(before)
  }
}

export const Vertical: Story = {
  render: () => (
    <ResizablePanelGroup orientation='vertical' style={styles.frame}>
      <ResizablePanel defaultSize={25} style={styles.content}>
        Header
      </ResizablePanel>
      <ResizableHandle aria-label='Resize header' />
      <ResizablePanel defaultSize={75} style={[styles.content, styles.contentAlt]}>
        Content
      </ResizablePanel>
    </ResizablePanelGroup>
  )
}

export const NestedMixed: Story = {
  render: () => (
    <ResizablePanelGroup style={styles.frame}>
      <ResizablePanel defaultSize={40} style={styles.content}>
        Side
      </ResizablePanel>
      <ResizableHandle aria-label='Resize side panel' />
      <ResizablePanel defaultSize={60}>
        <ResizablePanelGroup orientation='vertical' style={styles.nested}>
          <ResizablePanel defaultSize={30} style={[styles.content, styles.contentAlt]}>
            Top
          </ResizablePanel>
          <ResizableHandle aria-label='Resize top panel' />
          <ResizablePanel defaultSize={70} style={styles.content}>
            Bottom
          </ResizablePanel>
        </ResizablePanelGroup>
      </ResizablePanel>
    </ResizablePanelGroup>
  )
}

export const Nested: Story = {
  render: () => (
    <ResizablePanelGroup style={styles.frame}>
      <ResizablePanel defaultSize='50%' style={styles.content}>
        One
      </ResizablePanel>
      <ResizableHandle withHandle aria-label='Resize one' />
      <ResizablePanel defaultSize='50%'>
        <ResizablePanelGroup orientation='vertical' style={styles.nested}>
          <ResizablePanel defaultSize='25%' style={[styles.content, styles.contentAlt]}>
            Two
          </ResizablePanel>
          <ResizableHandle withHandle aria-label='Resize two' />
          <ResizablePanel defaultSize='75%' style={styles.content}>
            Three
          </ResizablePanel>
        </ResizablePanelGroup>
      </ResizablePanel>
    </ResizablePanelGroup>
  )
}

export const PillIndicator: Story = {
  render: () => (
    <ResizablePanelGroup style={styles.frame}>
      <ResizablePanel defaultSize={30} style={styles.content}>
        Sidebar
      </ResizablePanel>
      <ResizableHandle withHandle aria-label='Resize sidebar' />
      <ResizablePanel defaultSize={70} style={[styles.content, styles.contentAlt]}>
        Content
      </ResizablePanel>
    </ResizablePanelGroup>
  )
}

export const PillSpring: Story = {
  render: () => (
    <ResizablePanelGroup style={styles.frame}>
      <ResizablePanel defaultSize={30} style={styles.content}>
        Sidebar
      </ResizablePanel>
      <ResizableHandle withHandle variant='spring' aria-label='Resize sidebar' />
      <ResizablePanel defaultSize={70} style={[styles.content, styles.contentAlt]}>
        Content
      </ResizablePanel>
    </ResizablePanelGroup>
  )
}

export const CapsuleExpansion: Story = {
  render: () => (
    <ResizablePanelGroup style={styles.frame}>
      <ResizablePanel defaultSize={35} style={styles.content}>
        Panel A
      </ResizablePanel>
      <ResizableHandle withHandle variant='capsule' aria-label='Resize panel A' />
      <ResizablePanel defaultSize={65} style={[styles.content, styles.contentAlt]}>
        Panel B
      </ResizablePanel>
    </ResizablePanelGroup>
  )
}

export const NestedPills: Story = {
  render: () => (
    <ResizablePanelGroup style={styles.frame}>
      <ResizablePanel defaultSize={30} minSize={15} style={styles.content}>
        Nav
      </ResizablePanel>
      <ResizableHandle withHandle aria-label='Resize nav panel' />
      <ResizablePanel defaultSize={70}>
        <ResizablePanelGroup orientation='vertical' style={styles.nested}>
          <ResizablePanel defaultSize={25} style={[styles.content, styles.contentAlt]}>
            Toolbar
          </ResizablePanel>
          <ResizableHandle withHandle aria-label='Resize toolbar' />
          <ResizablePanel defaultSize={75} style={styles.content}>
            Editor
          </ResizablePanel>
        </ResizablePanelGroup>
      </ResizablePanel>
    </ResizablePanelGroup>
  )
}

export const ThreePanels: Story = {
  render: () => (
    <ResizablePanelGroup style={styles.frame}>
      <ResizablePanel defaultSize={25} minSize={15} style={styles.content}>
        Files
      </ResizablePanel>
      <ResizableHandle withHandle aria-label='Resize files panel' />
      <ResizablePanel defaultSize={50} minSize={25} style={[styles.content, styles.contentAlt]}>
        Editor
      </ResizablePanel>
      <ResizableHandle withHandle aria-label='Resize editor panel' />
      <ResizablePanel defaultSize={25} minSize={15} style={styles.content}>
        Preview
      </ResizablePanel>
    </ResizablePanelGroup>
  )
}

export const StateTracked: Story = {
  render: () => {
    const [sizes, setSizes] = React.useState<Record<string, number>>({
      left: 30,
      right: 70
    })

    return (
      <ResizablePanelGroup
        style={styles.frame}
        onLayoutChange={(layout) => {
          setSizes(layout)
        }}
      >
        <ResizablePanel id='left' defaultSize={30} minSize={20} style={styles.content}>
          {Math.round(sizes.left ?? 30)}%
        </ResizablePanel>
        <ResizableHandle withHandle aria-label='Resize left panel' />
        <ResizablePanel
          id='right'
          defaultSize={70}
          minSize={30}
          style={[styles.content, styles.contentAlt]}
        >
          {Math.round(sizes.right ?? 70)}%
        </ResizablePanel>
      </ResizablePanelGroup>
    )
  }
}
