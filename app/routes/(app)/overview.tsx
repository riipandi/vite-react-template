import atoms from '@stylexjs/atoms'
import * as stylex from '@stylexjs/stylex'
import { createFileRoute, Link } from '@tanstack/react-router'
import { ChevronRightIcon, ExternalLinkIcon, LogOutIcon, SettingsIcon } from 'lucide-react'
import { Button } from '#/components/base/button'
import { Badge } from '#/components/extra/badge'
import { Card, CardContent } from '#/components/extra/card'
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemMedia,
  ItemTitle
} from '#/components/extra/item'
import { Text } from '#/components/extra/text'
import { useAuthentication } from '#/libraries/guard/auth-provider'
import { pageStyles } from '#/styles/pages/page.stylex'

export const Route = createFileRoute('/(app)/overview')({
  component: RouteComponent,
  staticData: {
    pageTitle: 'Overview'
  }
})

const STATS: Array<[value: string, label: string, description: string]> = [
  ['Type-safe', 'Routing', 'Routes and links stay in sync across every page.'],
  ['34', 'UI components', 'Base UI primitives wrapped with StyleX tokens.'],
  ['72', 'Interaction tests', 'Vitest + Storybook run on every commit.']
]

function RouteComponent() {
  const { user, logout } = useAuthentication()
  const displayName =
    user?.firstName?.trim() || user?.username?.trim() || user?.email?.split('@')[0] || 'Guest'
  const now = new Date()
  const hour = now.getHours()
  const greeting = hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening'

  return (
    <div
      {...stylex.props(
        pageStyles.container,
        pageStyles.containerPadMedium,
        pageStyles.containerPadLarge,
        pageStyles.containerPadXLarge
      )}
    >
      <div {...stylex.props(pageStyles.header)}>
        <div {...stylex.props(pageStyles.headerLeft)}>
          <Text
            render={<p />}
            variant='caption-1'
            weight='semibold'
            color='primary'
            style={pageStyles.kicker}
          >
            Dashboard
          </Text>
          <Text render={<h1 />} variant='featured-4' weight='bold'>
            {greeting}
            {displayName !== 'Guest' ? `, ${displayName}` : ''}!
          </Text>
          <Text variant='body-2' color='neutral-faded'>
            Welcome back to your workspace.
          </Text>
        </div>
      </div>

      <div
        {...stylex.props(
          atoms.display.grid,
          pageStyles.cardsGrid,
          pageStyles.cardsGridMedium,
          pageStyles.cardsGridLarge,
          pageStyles.cardsGridXLarge
        )}
      >
        {STATS.map(([value, label, description]) => (
          <Card key={label}>
            <CardContent>
              <Text render={<p />} variant='featured-4' weight='bold'>
                {value}
              </Text>
              <Text render={<p />} variant='body-1' weight='semibold' style={pageStyles.statLabel}>
                {label}
              </Text>
              <Text variant='body-2' color='neutral-faded'>
                {description}
              </Text>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card style={pageStyles.quickCard}>
        <CardContent>
          <Text render={<p />} variant='body-1' weight='semibold' style={pageStyles.quickTitle}>
            Quick links
          </Text>
          <ItemGroup>
            <Item
              size='sm'
              render={
                <Link to='/settings'>
                  <ItemMedia variant='icon'>
                    <SettingsIcon size={16} />
                  </ItemMedia>
                  <ItemContent>
                    <ItemTitle>Settings</ItemTitle>
                    <ItemDescription>Theme preference and account details.</ItemDescription>
                  </ItemContent>
                  <ItemActions>
                    <ChevronRightIcon size={16} />
                  </ItemActions>
                </Link>
              }
            />
            <Item
              size='sm'
              render={
                <a
                  href='https://github.com/riipandi/vite-react-template'
                  target='_blank'
                  rel='noreferrer'
                >
                  <ItemMedia variant='icon'>
                    <ExternalLinkIcon size={16} />
                  </ItemMedia>
                  <ItemContent>
                    <ItemTitle>Source code</ItemTitle>
                    <ItemDescription>Read the template repository on GitHub.</ItemDescription>
                  </ItemContent>
                  <ItemActions>
                    <Badge variant='secondary'>OSS</Badge>
                  </ItemActions>
                </a>
              }
            />
            <Item size='sm' variant='muted'>
              <ItemMedia variant='icon'>
                <LogOutIcon size={16} />
              </ItemMedia>
              <ItemContent>
                <ItemTitle>Sign out</ItemTitle>
                <ItemDescription>End the current DummyJSON session.</ItemDescription>
              </ItemContent>
              <ItemActions>
                <Button variant='ghost' size='xs' onClick={() => logout()}>
                  Sign out
                </Button>
              </ItemActions>
            </Item>
          </ItemGroup>
        </CardContent>
      </Card>
    </div>
  )
}
