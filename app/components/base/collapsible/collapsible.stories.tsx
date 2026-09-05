import type { Meta, StoryObj } from '@storybook/tanstack-react'
import atoms from '@stylexjs/atoms'
import * as stylex from '@stylexjs/stylex'
import { ChevronRightIcon, FileIcon, FolderIcon } from 'lucide-react'
import * as React from 'react'
import { expect, userEvent } from 'storybook/test'
import { Button } from '#/components/base/button'
import { colors } from '#/styles/core/colors.stylex'
import { fontFamily, fontSize, stroke, unit, container } from '#/styles/core/tokens.stylex'
import { fontWeight, radius } from '#/styles/core/tokens.stylex'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from './collapsible.component'

const meta = {
  title: 'Base Components/Collapsible',
  component: Collapsible,
  parameters: { layout: 'fullscreen' },
  tags: [], // ['autodocs']
  decorators: [
    (Story) => (
      <div {...stylex.props(atoms.padding['20px'], atoms.minWidth['448px'], atoms.width['100%'])}>
        <Story />
      </div>
    )
  ]
} satisfies Meta<typeof Collapsible>

type Story = StoryObj<typeof meta>

const styles = stylex.create({
  root: {
    display: 'flex',
    flexDirection: 'column',
    fontFamily: fontFamily.body,
    gap: unit.x2,
    width: container.md
  },
  header: {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'space-between'
  },
  title: {
    fontSize: fontSize.body2,
    fontWeight: fontWeight.medium
  },
  panel: {
    display: 'flex',
    flexDirection: 'column',
    gap: unit.x2
  },
  repo: {
    borderColor: colors.borderNeutral,
    borderRadius: radius.medium,
    borderStyle: 'solid',
    borderWidth: stroke.border,
    fontFamily: fontFamily.monospace,
    fontSize: fontSize.body2,
    paddingBlock: unit.x2,
    paddingInline: unit.x3
  },
  icon: { height: 16, width: 16 },
  tree: {
    display: 'flex',
    flexDirection: 'column',
    fontFamily: fontFamily.monospace,
    fontSize: fontSize.body2
  },
  row: {
    alignItems: 'center',
    backgroundColor: {
      default: 'transparent',
      ':hover': colors.backgroundNeutralHighlightedFaded
    },
    borderRadius: radius.small,
    borderStyle: 'none',
    color: colors.foregroundNeutral,
    cursor: 'pointer',
    display: 'flex',
    fontFamily: fontFamily.monospace,
    fontSize: fontSize.body2,
    gap: unit.x1,
    outline: {
      default: 'none',
      ':focus-visible': `${stroke.focus} solid ${colors.borderPrimary}`
    },
    // Read by the chevron below — StyleX has no child selectors, so the
    // trigger's [data-panel-open] state travels via a custom property.
    '--file-tree-chevron-rotation': {
      default: null,
      '[data-panel-open]': '90deg'
    },
    paddingBlock: unit.x1,
    paddingInline: unit.x1,
    textAlign: 'left',
    width: '100%'
  },
  file: {
    color: colors.foregroundNeutralFaded,
    cursor: 'default'
  },
  fileSpacer: {
    display: 'inline-block',
    width: 100
  },
  chevron: {
    transform: 'rotate(var(--file-tree-chevron-rotation, 0deg))',
    transitionDuration: '150ms',
    transitionProperty: 'transform'
  }
})

const indents = stylex.create({
  depth: (depth: number) => ({
    paddingLeft: `calc(${unit.x4} * ${depth})`
  })
})

function Folder({
  name,
  defaultOpen,
  depth = 0,
  children
}: {
  name: string
  defaultOpen?: boolean
  depth?: number
  children: React.ReactNode
}) {
  return (
    <Collapsible defaultOpen={defaultOpen}>
      <CollapsibleTrigger {...stylex.props(styles.row, indents.depth(depth))}>
        <ChevronRightIcon {...stylex.props(styles.icon, styles.chevron)} />
        <FolderIcon {...stylex.props(styles.icon)} />
        <span>{name}</span>
      </CollapsibleTrigger>
      <CollapsibleContent>{children}</CollapsibleContent>
    </Collapsible>
  )
}

function File({ name, depth = 1 }: { name: string; depth?: number }) {
  return (
    <div {...stylex.props(styles.row, styles.file, indents.depth(depth))}>
      <span {...stylex.props(styles.fileSpacer)} />
      <FileIcon {...stylex.props(styles.icon)} />
      <span>{name}</span>
    </div>
  )
}

export default meta

export const Playground: Story = {
  render: () => (
    <Collapsible defaultOpen {...stylex.props(styles.root)}>
      <div {...stylex.props(styles.header)}>
        <span {...stylex.props(styles.title)}>@hermione starred 3 repositories</span>
        <CollapsibleTrigger render={<Button variant='ghost' size='sm' />}>
          Alohomora
        </CollapsibleTrigger>
      </div>
      <div {...stylex.props(styles.repo)}>@marauders/map</div>
      <CollapsibleContent style={styles.panel}>
        <div {...stylex.props(styles.repo)}>@gringotts/vaults</div>
        <div {...stylex.props(styles.repo)}>@ministry/memos</div>
      </CollapsibleContent>
    </Collapsible>
  ),
  play: async ({ canvas }) => {
    const trigger = canvas.getByRole('button', { name: 'Alohomora' })
    expect(trigger).toHaveAttribute('aria-expanded', 'true')

    const panel = document.getElementById(trigger.getAttribute('aria-controls') ?? '')
    expect(panel).not.toBeNull()

    await userEvent.click(trigger)
    expect(trigger).toHaveAttribute('aria-expanded', 'false')

    await userEvent.click(trigger)
    expect(trigger).toHaveAttribute('aria-expanded', 'true')
  }
}

export const FileTree: Story = {
  render: () => (
    <div {...stylex.props(styles.tree)}>
      <Folder name='marauders-map' defaultOpen depth={0}>
        <Folder name='spells' defaultOpen depth={1}>
          <File name='lumos.tsx' depth={2} />
          <File name='nox.tsx' depth={2} />
        </Folder>
        <File name='incantations.ts' depth={1} />
      </Folder>
      <Folder name='diagon-alley' depth={0}>
        <File name='golden-snitch.ico' depth={1} />
      </Folder>
      <File name='horcrux.json' depth={0} />
    </div>
  ),
  play: async ({ canvas }) => {
    const closed = canvas.getByRole('button', { name: /diagon-alley/i })
    expect(closed).toHaveAttribute('aria-expanded', 'false')

    // Opening a folder reveals nested files, and nested folders compose.
    await userEvent.click(closed)
    expect(closed).toHaveAttribute('aria-expanded', 'true')
    expect(canvas.getByText('golden-snitch.ico')).toBeInTheDocument()
  }
}
