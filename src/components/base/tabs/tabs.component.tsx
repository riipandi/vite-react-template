/**
 * Organizes content into separate panels.
 *
 * @see: https://base-ui.com/react/components/tabs
 *
 * BaseUI Anatomy:
 * <Tabs.Root>
 *   <Tabs.List>
 *     <Tabs.Tab />
 *     <Tabs.Indicator />
 *   </Tabs.List>
 *   <Tabs.Panel />
 * </Tabs.Root>
 */

import { Tabs as BaseTabs } from '@base-ui/react/tabs'
import type { StyleXStyles } from '@stylexjs/stylex'
import * as stylex from '@stylexjs/stylex'
import * as React from 'react'
import { tabsOrientations, tabsStyles } from './tabs.stylex'

const TabsContext = React.createContext<{ orientation?: 'horizontal' | 'vertical' }>({})

export type TabsOrientation = keyof typeof tabsOrientations

export type TabsProps = React.ComponentProps<typeof BaseTabs.Root> & {
  orientation?: TabsOrientation
  xstyle?: StyleXStyles
}
export type TabsListProps = React.ComponentProps<typeof BaseTabs.List> & {
  xstyle?: StyleXStyles
}
export type TabsItemProps = React.ComponentProps<typeof BaseTabs.Tab> & {
  xstyle?: StyleXStyles
}
export type TabsPanelProps = React.ComponentProps<typeof BaseTabs.Panel> & {
  xstyle?: StyleXStyles
}

export function Tabs({ orientation = 'horizontal', children, xstyle, ...props }: TabsProps) {
  return (
    <TabsContext.Provider value={{ orientation }}>
      <BaseTabs.Root
        data-slot='tabs'
        orientation={orientation}
        {...stylex.props(tabsStyles.root, tabsOrientations[orientation], xstyle)}
        {...props}
      >
        {children}
      </BaseTabs.Root>
    </TabsContext.Provider>
  )
}

export function TabsList({ children, xstyle, ...props }: TabsListProps) {
  const { orientation } = React.useContext(TabsContext)
  return (
    <BaseTabs.List
      data-slot='tabs-list'
      {...stylex.props(tabsStyles.list, orientation && tabsOrientations[orientation], xstyle)}
      {...props}
    >
      {children}
      <BaseTabs.Indicator data-slot='tabs-indicator' {...stylex.props(tabsStyles.indicator)} />
    </BaseTabs.List>
  )
}

export function TabsItem({ xstyle, ...props }: TabsItemProps) {
  const { orientation } = React.useContext(TabsContext)
  return (
    <BaseTabs.Tab
      data-slot='tabs-item'
      {...stylex.props(tabsStyles.tab, orientation && tabsOrientations[orientation], xstyle)}
      {...props}
    />
  )
}

export function TabsPanel({ xstyle, ...props }: TabsPanelProps) {
  return (
    <BaseTabs.Panel data-slot='tabs-panel' {...stylex.props(tabsStyles.panel, xstyle)} {...props} />
  )
}
