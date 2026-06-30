import './style.css'
import { Tabs as TabsPrimitive } from '@base-ui/react/tabs'

function Tabs(props: TabsPrimitive.Root.Props) {
  return <TabsPrimitive.Root data-ui='tabs' {...props} />
}

function TabsList({ children, ...props }: TabsPrimitive.List.Props) {
  return (
    <TabsPrimitive.List data-ui='tabs-list' {...props}>
      {children}
      <TabsPrimitive.Indicator data-ui='tabs-indicator'>
        <span data-ui='tabs-indicator-thumb' />
      </TabsPrimitive.Indicator>
    </TabsPrimitive.List>
  )
}

function TabsTab(props: TabsPrimitive.Tab.Props) {
  return <TabsPrimitive.Tab data-ui='tabs-tab' {...props} />
}

function TabsPanel(props: TabsPrimitive.Panel.Props) {
  return <TabsPrimitive.Panel data-ui='tabs-panel' {...props} />
}

export { Tabs, TabsList, TabsTab, TabsPanel }
