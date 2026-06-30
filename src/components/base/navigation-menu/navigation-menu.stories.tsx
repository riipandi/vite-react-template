import * as Icon from '@phosphor-icons/react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger
} from '#/components/base/navigation-menu'
import { Heading, Text } from '#/components/extra/typography'
import { clx } from '~/app/utils/variant'

const meta = {
  title: 'Base Components/NavigationMenu',
  component: NavigationMenu,
  parameters: { layout: 'fullscreen' },
  argTypes: {},
  tags: [],
  args: {},
  decorators: [
    (Story) => (
      <div className='flex w-full min-w-md items-center justify-center p-4'>
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
            render={<ul className='grid w-100 gap-0.5 md:w-125 md:grid-cols-2' />}
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
          <NavigationMenuContent render={<ul className='w-full max-w-128' />}>
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
              <a
                {...props}
                className={clx(
                  'text-foreground hover:bg-background-neutral-faded active:bg-background-neutral-faded focus-visible:ring-primary inline-flex h-9 shrink-0',
                  'items-center justify-center gap-1.5 rounded-md px-3 leading-none font-medium no-underline',
                  'transition-colors select-none focus-visible:ring-2 focus-visible:outline-none [&_svg:not([class*=size-])]:size-4'
                )}
              >
                <Icon.GithubLogoIcon strokeWidth={2.5} />
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
            render={<ul className='grid w-100 gap-0.5 md:w-125 md:grid-cols-2' />}
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
          <NavigationMenuContent render={<ul className='w-full max-w-128' />}>
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
              <a
                {...props}
                className={clx(
                  'text-foreground hover:bg-background-neutral-faded active:bg-background-neutral-faded focus-visible:ring-primary inline-flex h-9 shrink-0',
                  'items-center justify-center gap-1.5 rounded-md px-3 text-sm leading-none font-medium no-underline',
                  'transition-colors select-none focus-visible:ring-2 focus-visible:outline-none [&_svg:not([class*=size-])]:size-3.5'
                )}
              >
                <Icon.GithubLogoIcon strokeWidth={2.0} />
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
            <Text className='text-foreground-neutral-faded/80 line-clamp-2 leading-normal'>
              {children}
            </Text>
          </a>
        )}
      />
    </li>
  )
}
