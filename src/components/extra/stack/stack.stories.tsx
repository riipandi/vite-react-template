import type { Meta, StoryObj } from '@storybook/react-vite'
import { Avatar, AvatarFallback, AvatarImage } from '../../base/avatar'
import { Separator } from '../../base/separator'
import { Item, ItemContent, ItemDescription, ItemMedia, ItemTitle } from '../item'
import { Stack } from './stack.component'

const meta = {
  title: 'Extra Components/Stack',
  component: Stack,
  parameters: { layout: 'centered' },
  argTypes: {},
  tags: [], // ['autodocs']
  args: {},
  decorators: [
    (Story) => (
      <div className='flex w-full min-w-md items-center justify-center'>
        <Story />
      </div>
    )
  ]
} satisfies Meta<typeof Stack>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {
  args: {},
  render: () => (
    <Stack className='w-full min-w-md xl:w-6/12'>
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
      </Item>
    </Stack>
  )
}

export const DirectionRow: Story = {
  args: {},
  render: () => (
    <Stack direction='row' className='w-full min-w-md items-center justify-center xl:w-6/12'>
      <Item direction='column'>
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
      </Item>
      <Item direction='column'>
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
      </Item>
    </Stack>
  )
}
