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
import { cx } from 'css-variants'
import * as React from 'react'

const TabsContext = React.createContext<{ orientation?: 'horizontal' | 'vertical' }>({})

export const tabsStyles = tv({
  slots: {
    root: 'flex gap-4',
    list: [
      'bg-background-neutral-faded relative z-0 flex rounded-lg text-sm',
      'inset-shadow-xs inset-shadow-black/10 dark:inset-shadow-none'
    ],
    indicator: [
      'absolute z-[-1] rounded ring transition-all duration-100',
      'bg-background-page shadow inset-shadow-2xs inset-shadow-white/15 dark:inset-shadow-black/15',
      'ring-border-neutral-faded'
    ],
    tab: [
      'flex cursor-pointer items-center rounded',
      'text-on-background-neutral hover:not-data-disabled:text-foreground-neutral font-medium',
      'data-active:text-foreground-neutral transition-colors',
      'focus-visible:outline-border-neutral focus-visible:outline-2 focus-visible:outline-offset-2',
      '[&_svg:not([class*=size-])]:size-3.5',
      'data-disabled:cursor-not-allowed data-disabled:opacity-50'
    ],
    panel: 'px-1 outline-none'
  },
  variants: {
    orientation: {
      horizontal: {
        root: 'flex-col',
        list: 'flex-row items-center gap-1 px-1 py-1.5',
        indicator: [
          'top-1/2 left-0 h-8 w-(--active-tab-width)',
          'translate-x-(--active-tab-left) -translate-y-1/2'
        ],
        tab: 'h-7 flex-1 justify-center gap-2 px-2.5 py-1'
      },
      vertical: {
        root: 'flex-row',
        list: 'flex-col items-stretch gap-1 py-1',
        indicator: ['inset-x-1 top-0 h-(--active-tab-height)', 'translate-y-(--active-tab-top)'],
        tab: 'w-full justify-start gap-2 px-4 py-2'
      }
    }
  },
  defaultVariants: {
    orientation: 'horizontal'
  }
})

export type TabsProps = React.ComponentProps<typeof BaseTabs.Root> & VariantProps<typeof tabsStyles>
export type TabsListProps = React.ComponentProps<typeof BaseTabs.List>
export type TabsItemProps = React.ComponentProps<typeof BaseTabs.Tab>
export type TabsPanelProps = React.ComponentProps<typeof BaseTabs.Panel>

export function Tabs({ className, orientation, children, ...props }: TabsProps) {
  const styles = tabsStyles({ orientation })
  return (
    <TabsContext.Provider value={{ orientation }}>
      <BaseTabs.Root
        data-slot='tabs'
        orientation={orientation}
        className={cx(styles.root(), className)}
        {...props}
      >
        {children}
      </BaseTabs.Root>
    </TabsContext.Provider>
  )
}

export function TabsList({ className, children, ...props }: TabsListProps) {
  const { orientation } = React.useContext(TabsContext)
  const styles = tabsStyles({ orientation })
  return (
    <BaseTabs.List data-slot='tabs-list' className={cx(styles.list(), className)} {...props}>
      {children}
      <BaseTabs.Indicator data-slot='tabs-indicator' className={styles.indicator()} />
    </BaseTabs.List>
  )
}

export function TabsItem({ className, ...props }: TabsItemProps) {
  const { orientation } = React.useContext(TabsContext)
  const styles = tabsStyles({ orientation })
  return <BaseTabs.Tab data-slot='tabs-item' className={cx(styles.tab(), className)} {...props} />
}

export function TabsPanel({ className, ...props }: TabsPanelProps) {
  const styles = tabsStyles()
  return (
    <BaseTabs.Panel data-slot='tabs-panel' className={cx(styles.panel(), className)} {...props} />
  )
}
