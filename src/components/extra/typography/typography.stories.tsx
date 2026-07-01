import type { Meta, StoryObj } from '@storybook/react-vite'
import { Blockquote, BlockquoteAuthor } from '../blockquote'
import { Link, LinkIcon } from '../link'
import { Code, Heading, Lead, Strong, Text } from './typography.component'

const meta = {
  title: 'Extra Components/Typography',
  component: undefined,
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
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

export const PageHeading: Story = {
  args: {},
  render: () => (
    <div className='flex flex-col gap-4'>
      <Heading level={1} size='xl'>
        The Da Vinci Code
      </Heading>
      <Heading level={2} size='lg'>
        Harry Potter and the Sorcerer's Stone
      </Heading>
      <Heading level={3} size='md'>
        Angels & Demons
      </Heading>
      <Heading level={4} size='sm'>
        The Chamber of Secrets
      </Heading>
      <Heading level={5} size='xs'>
        Inferno
      </Heading>
    </div>
  )
}

export const Paragraph: Story = {
  args: {},
  render: () => (
    <div className='flex max-w-xl flex-col gap-2'>
      <Text>
        Professor Robert Langdon awakens in a hospital bed in Florence, Italy, with no recollection
        of how he got there.
      </Text>

      <Text>
        Harry Potter discovers he is a wizard on his eleventh birthday when{' '}
        <Link variant='primary' href='https://www.wizardingworld.com' target='_blank'>
          Hagrid
          <LinkIcon />
        </Link>{' '}
        arrives to take him to Hogwarts School of Witchcraft and Wizardry.
      </Text>

      <Text>
        The <Strong>Philosopher's Stone</Strong> grants immortality and unlimited wealth.
      </Text>

      <Text>
        You can also add <Code>Expelliarmus!</Code> to your spells.
      </Text>
    </div>
  )
}

export const LeadParagraph: Story = {
  args: {},
  render: () => (
    <div className='flex max-w-xl flex-col gap-4'>
      <Lead>
        A Harvard professor must decipher codes hidden in works of art to stop an ancient secret
        society from destroying the Vatican.
      </Lead>

      <Lead>
        The boy who lived discovers his destiny at Hogwarts School of Witchcraft and Wizardry, where
        he learns magic and confronts the dark wizard who killed his parents.
      </Lead>
    </div>
  )
}

export const ExampleArticle: Story = {
  args: {},
  render: () => (
    <div className='flex max-w-5xl flex-col gap-6'>
      <Heading level={1} size='xl'>
        Literary Giants: Dan Brown & J.K. Rowling
      </Heading>

      <Lead>
        Explore the worlds of <Strong>Robert Langdon</Strong>'s symbology adventures and{' '}
        <Strong>Harry Potter</Strong>'s magical journey through Hogwarts.
      </Lead>

      <Heading level={2} size='lg'>
        The Robert Langdon Series
      </Heading>

      <Text>
        Professor <Strong>Robert Langdon</Strong>, Harvard symbologist, unravels ancient mysteries
        across Europe. His adventures begin with{' '}
        <Link
          variant='primary'
          href='https://en.wikipedia.org/wiki/Angels_%26_Demons'
          target='_blank'
        >
          Angels & Demons
          <LinkIcon />
        </Link>{' '}
        and continue through <Code>The Da Vinci Code</Code>, <Code>The Lost Symbol</Code>,{' '}
        <Code>Inferno</Code>, and <Code>Origin</Code>.
      </Text>

      <Blockquote>
        "Science and religion are not enemies. They are simply two different languages attempting to
        tell the same story."
        <BlockquoteAuthor>Robert Langdon</BlockquoteAuthor>
      </Blockquote>

      <Heading level={3} size='md'>
        The Da Vinci Code Phenomenon
      </Heading>

      <Text>
        Published in <Code>2003</Code>, this thriller became a global sensation, selling over{' '}
        <Strong>80 million copies</Strong> worldwide. The novel follows Langdon as he deciphers
        clues hidden in <Code>Leonardo da Vinci</Code>'s masterpieces.
      </Text>

      <Lead>
        A gripping blend of art, history, religion, and conspiracy that kept readers on the edge of
        their seats.
      </Lead>

      <Heading level={2} size='lg'>
        The Wizarding World of Harry Potter
      </Heading>

      <Text>
        <Strong>Harry James Potter</Strong>, the Boy Who Lived, discovers his magical heritage on
        his eleventh birthday. Through{' '}
        <Link variant='primary' href='https://www.wizardingworld.com' target='_blank'>
          Hogwarts School of Witchcraft and Wizardry
        </Link>
        , he learns about friendship, love, and courage.
      </Text>

      <Heading level={3} size='md'>
        The Seven Books
      </Heading>

      <Text>
        The series spans seven magical books: <Code>The Sorcerer's Stone</Code>,{' '}
        <Code>The Chamber of Secrets</Code>, <Code>The Prisoner of Azkaban</Code>,{' '}
        <Code>The Goblet of Fire</Code>, <Code>The Order of Phoenix</Code>,{' '}
        <Code>The Half-Blood Prince</Code>, and <Code>The Deathly Hallows</Code>.
      </Text>

      <Blockquote>
        "It is our choices, Harry, that show what we truly are, far more than our abilities."
        <BlockquoteAuthor>Albus Dumbledore</BlockquoteAuthor>
      </Blockquote>

      <Heading level={4} size='sm'>
        Iconic Characters
      </Heading>

      <Text>
        From the brave <Strong>Harry Potter</Strong> and loyal <Strong>Hermione Granger</Strong> to
        the witty <Strong>Ron Weasley</Strong>, these characters have become beloved across
        generations. Not to mention <Strong>Severus Snape</Strong>, the complex potions master with
        a <Code>Always</Code> kind of love.
      </Text>

      <Heading level={5} size='xs'>
        Memorable Spells & Codes
      </Heading>

      <Text>
        While Langdon deciphers ancient codes like <Code>ORY</Code> and <Code>Earth</Code>, young
        wizards master spells like <Code>Expelliarmus</Code>, <Code>Lumos</Code>,{' '}
        <Code>Expecto Patronum</Code>, and the <Code>Avada Kedavra</Code> curse.
      </Text>

      <Lead>
        Both universes remind us that <Strong>knowledge is power</Strong>,{' '}
        <Strong>love conquers all</Strong>, and <Strong>courage faces fear</Strong>.
      </Lead>

      <Heading level={6} size='xs'>
        Legacy & Impact
      </Heading>

      <Text>
        Dan Brown's novels have sparked renewed interest in <Strong>art history</Strong>,{' '}
        <Strong>symbology</Strong>, and <Strong>religious studies</Strong>. Meanwhile, Harry Potter
        has inspired a generation to value <Strong>friendship</Strong>, <Strong>bravery</Strong>,
        and the fight against <Strong>prejudice</Strong>.
      </Text>

      <Blockquote>
        "After all, to the well-organized mind, death is but the next great adventure."
        <BlockquoteAuthor>Albus Dumbledore</BlockquoteAuthor>
      </Blockquote>

      <Text>
        Visit{' '}
        <Link variant='primary' href='https://www.wizardingworld.com' target='_blank'>
          Wizarding World <LinkIcon />
        </Link>{' '}
        or explore{' '}
        <Link variant='primary' href='https://danbrown.com' target='_blank'>
          Dan Brown's official website <LinkIcon />
        </Link>{' '}
        to learn more about these extraordinary literary universes.
      </Text>
    </div>
  )
}
