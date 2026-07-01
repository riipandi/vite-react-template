import type { Meta, StoryObj } from '@storybook/react-vite'
import x from '@stylexjs/atoms'
import * as stylex from '@stylexjs/stylex'
import * as Lucide from 'lucide-react'
import { radius } from '../../../styles/tokens.stylex'
import { Avatar, AvatarFallback, AvatarImage } from '../../base/avatar'
import { Button } from '../../base/button'
import { Separator } from '../../base/separator'
import { IconBox } from '../icon-box'
import { Stack } from '../stack'
import {
  Item,
  ItemAction,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemMeta,
  ItemTitle
} from './item.component'

const meta = {
  title: 'Extra Components/Item',
  component: Item,
  parameters: { layout: 'centered' },
  argTypes: {},
  tags: [], // ['autodocs']
  args: {},
  decorators: [
    (Story) => (
      <div
        {...stylex.props(
          x.display.flex,
          x.width['100%'],
          x.minWidth['448px'],
          x.alignItems.center,
          x.justifyContent.center
        )}
      >
        <Story />
      </div>
    )
  ]
} satisfies Meta<typeof Item>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {
  args: {},
  render: () => (
    <div
      {...stylex.props(
        x.display.flex,
        x.width['100%'],
        x.minWidth['448px'],
        x.flexDirection.column,
        x.gap['1rem']
      )}
    >
      <Item>
        <ItemMedia>
          <img
            src='https://api.dicebear.com/9.x/avataaars/svg?radius=50&seed=Harry+Potter'
            alt='Avatar'
            {...stylex.props(x.width['2.75rem'], x.height['2.75rem'], x.borderRadius[radius.md])}
          />
        </ItemMedia>
        <ItemContent>
          <ItemTitle>Harry Potter</ItemTitle>
          <ItemDescription>The Boy Who Lived</ItemDescription>
        </ItemContent>
        <ItemAction>
          <Button size='sm'>Add Friend</Button>
        </ItemAction>
      </Item>
      <Item variant='ghost'>
        <ItemMedia>
          <IconBox>
            <Lucide.Book />
          </IconBox>
        </ItemMedia>
        <ItemContent>
          <ItemTitle>The Da Vinci Code</ItemTitle>
          <ItemDescription>Dan Brown's bestseller novel</ItemDescription>
        </ItemContent>
        <ItemAction>
          <Button size='sm' variant='outline'>
            Read
          </Button>
        </ItemAction>
      </Item>
    </div>
  )
}

export const VariantShowcase: Story = {
  args: {},
  render: () => (
    <div {...stylex.props(x.display.flex, x.width['100%'], x.flexDirection.column, x.gap['1rem'])}>
      <Item>
        <ItemMedia>
          <IconBox>
            <Lucide.Code />
          </IconBox>
        </ItemMedia>
        <ItemContent>
          <ItemTitle>Regular</ItemTitle>
          <ItemDescription>Just a simple item with an icon.</ItemDescription>
        </ItemContent>
      </Item>
      <Item variant='primary'>
        <ItemMedia>
          <IconBox variant='primary'>
            <Lucide.Settings />
          </IconBox>
        </ItemMedia>
        <ItemContent>
          <ItemTitle>Setting</ItemTitle>
          <ItemDescription>You can change the settings of the app.</ItemDescription>
        </ItemContent>
      </Item>
      <Item variant='info'>
        <ItemMedia>
          <IconBox variant='info'>
            <Lucide.Info />
          </IconBox>
        </ItemMedia>
        <ItemContent>
          <ItemTitle>Information</ItemTitle>
          <ItemDescription>This item is good.</ItemDescription>
        </ItemContent>
      </Item>
      <Item variant='success'>
        <ItemMedia>
          <IconBox variant='success'>
            <Lucide.CheckCircle />
          </IconBox>
        </ItemMedia>
        <ItemContent>
          <ItemTitle>Success</ItemTitle>
          <ItemDescription>This item is working as expected.</ItemDescription>
        </ItemContent>
      </Item>
      <Item variant='warning'>
        <ItemMedia>
          <IconBox variant='warning'>
            <Lucide.TriangleAlert />
          </IconBox>
        </ItemMedia>
        <ItemContent>
          <ItemTitle>Warning</ItemTitle>
          <ItemDescription>This item is not working as expected.</ItemDescription>
        </ItemContent>
      </Item>
      <Item variant='danger'>
        <ItemMedia>
          <IconBox variant='danger'>
            <Lucide.Trash />
          </IconBox>
        </ItemMedia>
        <ItemContent>
          <ItemTitle>Danger</ItemTitle>
          <ItemDescription>This item is dangerous.</ItemDescription>
        </ItemContent>
      </Item>
    </div>
  )
}

export const OutlineVariants: Story = {
  args: {},
  render: () => (
    <div {...stylex.props(x.display.flex, x.width['100%'], x.flexDirection.column, x.gap['1rem'])}>
      <Item variant='primary'>
        <ItemMedia>
          <IconBox>
            <Lucide.Settings />
          </IconBox>
        </ItemMedia>
        <ItemContent>
          <ItemTitle>Regular</ItemTitle>
          <ItemDescription>Just a simple item with an icon.</ItemDescription>
        </ItemContent>
      </Item>
      <Item variant='primary-outline'>
        <ItemMedia>
          <IconBox variant='primary'>
            <Lucide.Settings />
          </IconBox>
        </ItemMedia>
        <ItemContent>
          <ItemTitle>Setting</ItemTitle>
          <ItemDescription>You can change the settings of the app.</ItemDescription>
        </ItemContent>
      </Item>
      <Item variant='info-outline'>
        <ItemMedia>
          <IconBox variant='info'>
            <Lucide.Info />
          </IconBox>
        </ItemMedia>
        <ItemContent>
          <ItemTitle>Information</ItemTitle>
          <ItemDescription>This item is good.</ItemDescription>
        </ItemContent>
      </Item>
      <Item variant='success-outline'>
        <ItemMedia>
          <IconBox variant='success'>
            <Lucide.CheckCircle />
          </IconBox>
        </ItemMedia>
        <ItemContent>
          <ItemTitle>Success</ItemTitle>
          <ItemDescription>This item is working as expected.</ItemDescription>
        </ItemContent>
      </Item>
      <Item variant='warning-outline'>
        <ItemMedia>
          <IconBox variant='warning'>
            <Lucide.TriangleAlert />
          </IconBox>
        </ItemMedia>
        <ItemContent>
          <ItemTitle>Warning</ItemTitle>
          <ItemDescription>This item is not working as expected.</ItemDescription>
        </ItemContent>
      </Item>
      <Item variant='danger-outline'>
        <ItemMedia>
          <IconBox variant='danger'>
            <Lucide.Trash />
          </IconBox>
        </ItemMedia>
        <ItemContent>
          <ItemTitle>Danger</ItemTitle>
          <ItemDescription>This item is dangerous.</ItemDescription>
        </ItemContent>
      </Item>
    </div>
  )
}

export const WithItemMeta: Story = {
  args: {},
  render: () => (
    <div {...stylex.props(x.display.flex, x.width['100%'], x.flexDirection.column, x.gap['1rem'])}>
      <Item>
        <ItemMedia>
          <Avatar>
            <AvatarImage
              src='https://api.dicebear.com/9.x/avataaars/svg?radius=50&seed=Robert+Langdon'
              alt='Avatar'
            />
            <AvatarFallback>RL</AvatarFallback>
          </Avatar>
        </ItemMedia>
        <ItemContent>
          <ItemTitle>Robert Langdon</ItemTitle>
          <ItemMeta {...stylex.props(x.marginBottom['0.625rem'])}>5 minutes ago</ItemMeta>
          <ItemDescription>The ancient symbol has been deciphered!</ItemDescription>
          <div
            {...stylex.props(
              x.marginLeft['-0.5rem'],
              x.marginRight['-0.5rem'],
              x.marginTop['0.625rem']
            )}
          >
            <Button size='xs' variant='ghost' pill>
              Reply
            </Button>
          </div>
        </ItemContent>
        <ItemAction>
          <Button size='xs' variant='ghost' pill>
            <Lucide.Heart />
          </Button>
        </ItemAction>
      </Item>
    </div>
  )
}

export const ItemStack: Story = {
  args: {},
  render: () => (
    <Stack {...stylex.props(x.width['100%'])}>
      <Item variant='ghost'>
        <ItemMedia>
          <Avatar>
            <AvatarImage
              src='https://api.dicebear.com/9.x/avataaars/svg?radius=50&seed=Harry+Potter'
              alt='Avatar'
            />
            <AvatarFallback>HP</AvatarFallback>
          </Avatar>
        </ItemMedia>
        <ItemContent>
          <ItemTitle>Harry Potter</ItemTitle>
          <ItemDescription>harry@hogwarts.edu</ItemDescription>
        </ItemContent>
        <ItemAction>
          <Button variant='outline' size='xs'>
            Follow
          </Button>
        </ItemAction>
      </Item>
      <Separator />
      <Item variant='ghost'>
        <ItemMedia>
          <Avatar>
            <AvatarImage
              src='https://api.dicebear.com/9.x/avataaars/svg?radius=50&seed=Robert+Langdon'
              alt='Avatar'
            />
            <AvatarFallback>RL</AvatarFallback>
          </Avatar>
        </ItemMedia>
        <ItemContent>
          <ItemTitle>Robert Langdon</ItemTitle>
          <ItemDescription>langdon@example.edu</ItemDescription>
        </ItemContent>
        <ItemAction>
          <Button variant='outline' size='xs'>
            Follow
          </Button>
        </ItemAction>
      </Item>
      <Separator />
      <Item variant='ghost'>
        <ItemMedia>
          <Avatar>
            <AvatarImage
              src='https://api.dicebear.com/9.x/avataaars/svg?radius=50&seed=Hermione+Granger'
              alt='Avatar'
            />
            <AvatarFallback>HG</AvatarFallback>
          </Avatar>
        </ItemMedia>
        <ItemContent>
          <ItemTitle>Hermione Granger</ItemTitle>
          <ItemDescription>hermione@hogwarts.edu</ItemDescription>
        </ItemContent>
        <ItemAction>
          <Button variant='outline' size='xs'>
            Follow
          </Button>
        </ItemAction>
      </Item>
      <Separator />
      <Item variant='ghost'>
        <ItemMedia>
          <Avatar>
            <AvatarImage
              src='https://api.dicebear.com/9.x/avataaars/svg?radius=50&seed=Sophie+Neveu'
              alt='Avatar'
            />
            <AvatarFallback>SN</AvatarFallback>
          </Avatar>
        </ItemMedia>
        <ItemContent>
          <ItemTitle>Sophie Neveu</ItemTitle>
          <ItemDescription>sophie@dgpj.fr</ItemDescription>
        </ItemContent>
        <ItemAction>
          <Button variant='outline' size='xs'>
            Follow
          </Button>
        </ItemAction>
      </Item>
      <Separator />
      <Item variant='ghost'>
        <ItemMedia>
          <Avatar>
            <AvatarImage
              src='https://api.dicebear.com/9.x/avataaars/svg?radius=50&seed=Ron+Weasley'
              alt='Avatar'
            />
            <AvatarFallback>RW</AvatarFallback>
          </Avatar>
        </ItemMedia>
        <ItemContent>
          <ItemTitle>Ron Weasley</ItemTitle>
          <ItemDescription>ron@hogwarts.edu</ItemDescription>
        </ItemContent>
        <ItemAction>
          <Button variant='outline' size='xs'>
            Follow
          </Button>
        </ItemAction>
      </Item>
    </Stack>
  )
}
