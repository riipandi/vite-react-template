import * as stylex from '@stylexjs/stylex'
import { createFileRoute } from '@tanstack/react-router'
import { styles } from '#/styles/pages/settings.stylex'

export const Route = createFileRoute('/(app)/settings')({
  component: RouteComponent,
  staticData: {
    pageTitle: 'Settings'
  }
})

function RouteComponent() {
  return (
    <div {...stylex.props(styles.container)}>
      <div {...stylex.props(styles.pageHeader)}>
        <div {...stylex.props(styles.headerLeft)}>
          <p {...stylex.props(styles.pageLabel)}>Settings</p>
          <p {...stylex.props(styles.pageSubtitle)}>Adjust your settings here.</p>
        </div>
      </div>
    </div>
  )
}
