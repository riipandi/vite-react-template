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
import * as stylex from '@stylexjs/stylex'
import * as React from 'react'
import { tabsStyles as s } from './tabs.stylex'

interface StyleProp {
  style?: stylex.StyleXStyles
}

export type TabsVariant = 'default' | 'line'

const TabsVariantContext = React.createContext<TabsVariant>('default')

export function Tabs({
  style,
  orientation = 'horizontal',
  ...props
}: Omit<React.ComponentPropsWithoutRef<typeof BaseTabs.Root>, 'className' | 'style'> & StyleProp) {
  return (
    <BaseTabs.Root
      orientation={orientation}
      {...props}
      {...stylex.props(s.root, orientation === 'vertical' && s.rootVertical, style)}
    />
  )
}

export function TabsList({
  style,
  variant = 'default',
  ...props
}: Omit<React.ComponentPropsWithoutRef<typeof BaseTabs.List>, 'className' | 'style'> &
  StyleProp & { variant?: TabsVariant }) {
  return (
    <TabsVariantContext.Provider value={variant}>
      <BaseTabs.List
        {...props}
        {...stylex.props(s.list, variant === 'line' && s.listLine, style)}
      />
    </TabsVariantContext.Provider>
  )
}

export function TabsTrigger({
  style,
  ...props
}: Omit<React.ComponentPropsWithoutRef<typeof BaseTabs.Tab>, 'className' | 'style'> & StyleProp) {
  const variant = React.useContext(TabsVariantContext)
  return (
    <BaseTabs.Tab
      {...props}
      {...stylex.props(s.trigger, variant === 'line' && s.triggerLine, style)}
    />
  )
}

export function TabsContent({
  style,
  ...props
}: Omit<React.ComponentPropsWithoutRef<typeof BaseTabs.Panel>, 'className' | 'style'> & StyleProp) {
  return <BaseTabs.Panel {...props} {...stylex.props(s.content, style)} />
}
