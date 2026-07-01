import type { Meta, StoryObj } from '@storybook/react-vite'
import x from '@stylexjs/atoms'
import * as stylex from '@stylexjs/stylex'
import * as Lucide from 'lucide-react'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger
} from '.'
import { color } from '../../../styles/tokens.stylex'
import { Heading, Text } from '../../extra/typography'

const meta = {
  title: 'Base Components/NavigationMenu',
  component: NavigationMenu,
  parameters: { layout: 'fullscreen' },
  argTypes: {},
  tags: [],
  args: {},
  decorators: [
    (Story) => (
      <div
        {...stylex.props(
          x.display.flex,
          x.width['100%'],
          x.alignItems.center,
          x.justifyContent.center,
          x.padding['1rem']
        )}
      >
        <Story />
      </div>
    )
  ]
} satisfies Meta<typeof NavigationMenu>

export default meta
type Story = StoryObj<typeof meta>

const components: {
  title: string
  href: string
  description: string
}[] = [
  {
    title: 'The Da Vinci Code',
    href: '/books/da-vinci-code',
    description: 'Robert Langdon must solve a murder in the Louvre.'
  },
  {
    title: "Harry Potter and the Sorcerer's Stone",
    href: '/books/sorcerers-stone',
    description: 'A young wizard discovers his magical heritage.'
  },
  {
    title: 'Angels & Demons',
    href: '/books/angels-demons',
    description: 'Langdon battles an ancient secret brotherhood.'
  },
  {
    title: 'The Chamber of Secrets',
    href: '/books/chamber-secrets',
    description: 'Harry uncovers a deadly mystery at Hogwarts.'
  },
  {
    title: 'Inferno',
    href: '/books/inferno',
    description: 'A race across Europe inspired by Dante.'
  },
  {
    title: 'The Prisoner of Azkaban',
    href: '/books/prisoner-azkaban',
    description: 'Harry faces escaped prisoner Sirius Black.'
  }
]

const gettingStartedItems = [
  {
    title: 'About the Collection',
    href: '/collection/about',
    description: 'Discover the world of mystery and magic.'
  },
  {
    title: 'Dan Brown Series',
    href: '/collection/dan-brown',
    description: 'Follow Robert Langdon thrilling adventures.'
  },
  {
    title: 'Harry Potter Series',
    href: '/collection/harry-potter',
    description: 'Journey through the wizarding world.'
  },
  {
    title: 'Reading Guide',
    href: '/collection/reading-guide',
    description: 'Recommended order for new readers.'
  }
]

export const Playground: Story = {
  args: {},
  render: () => (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Collection</NavigationMenuTrigger>
          <NavigationMenuContent
            render={
              <ul
                {...stylex.props(x.display.grid, x.width['31.25rem'])}
                {...stylex.props(x.width['25rem'], x.gap['0.125rem'])}
              />
            }
          >
            {gettingStartedItems.map((item) => (
              <ListItem key={item.title} title={item.title} href={item.href}>
                {item.description}
              </ListItem>
            ))}
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Books</NavigationMenuTrigger>
          <NavigationMenuContent
            render={<ul {...stylex.props(x.width['100%'], x.maxWidth['32rem'])} />}
          >
            {components.map((component) => (
              <ListItem key={component.title} title={component.title} href={component.href}>
                {component.description}
              </ListItem>
            ))}
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink
            href='https://github.com/riipandi/blueprint-nitrojs'
            render={(props) => (
              <a {...props}>
                <Lucide.GitBranch strokeWidth={2.5} />
                GitHub
              </a>
            )}
          />
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}

export const Compact: Story = {
  args: {},
  render: () => (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger size='compact'>Collection</NavigationMenuTrigger>
          <NavigationMenuContent
            render={
              <ul
                {...stylex.props(x.display.grid, x.width['31.25rem'])}
                {...stylex.props(x.width['25rem'], x.gap['0.125rem'])}
              />
            }
          >
            {gettingStartedItems.map((item) => (
              <ListItem key={item.title} title={item.title} href={item.href} size='compact'>
                {item.description}
              </ListItem>
            ))}
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger size='compact'>Books</NavigationMenuTrigger>
          <NavigationMenuContent
            render={<ul {...stylex.props(x.width['100%'], x.maxWidth['32rem'])} />}
          >
            {components.map((component) => (
              <ListItem
                key={component.title}
                title={component.title}
                href={component.href}
                size='compact'
              >
                {component.description}
              </ListItem>
            ))}
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink
            href='https://github.com/riipandi/blueprint-nitrojs'
            render={(props) => (
              <a {...props}>
                <Lucide.GitBranch strokeWidth={2.0} />
                GitHub
              </a>
            )}
          />
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}

interface ListItemProps {
  title: string
  children: React.ReactNode
  href: string
  size?: 'default' | 'compact'
}

function ListItem({ title, children, href, size = 'default' }: ListItemProps) {
  return (
    <li>
      <NavigationMenuLink
        href={href}
        size={size}
        render={(props) => (
          <a {...props}>
            <Heading level={5} size='xs'>
              {title}
            </Heading>
            <Text
              {...stylex.props(x.color[color.fgNeutralFaded], x.opacity['0.8'])}
              {...stylex.props(x.lineHeight.normal)}
            >
              {children}
            </Text>
          </a>
        )}
      />
    </li>
  )
}
