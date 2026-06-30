import type { Meta, StoryObj } from '@storybook/react-vite'
import { ScrollArea } from '#/components/base/scroll-area'
import { Text } from '#/components/extra/typography'

const meta = {
  title: 'Base Components/ScrollArea',
  component: ScrollArea,
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
} satisfies Meta<typeof ScrollArea>

export default meta
type Story = StoryObj<typeof meta>

export const Both: Story = {
  name: 'Both Scrollbars',
  args: {},
  render: () => (
    <ScrollArea
      scrollbar='both'
      className='border-border-neutral h-80 w-full max-w-xl rounded border shadow'
    >
      <div className='space-y-6 p-4'>
        <Text>
          The Da Vinci Code begins with the murder of Jacques Saunière, the curator of the Louvre
          Museum in Paris. Robert Langdon, a Harvard professor of symbology, is summoned to the
          crime scene to help decipher the cryptic messages left by the dying man.
        </Text>
        <Text>
          As Langdon investigates, he discovers that Saunière was the Grand Master of the Priory of
          Sion, a secret society dedicated to protecting the bloodline of Jesus Christ. Along with
          Sophie Neveu, a French cryptologist, Langdon embarks on a quest to uncover the truth
          behind the murder.
        </Text>
        <Text>
          The duo follows a trail of clues hidden in the works of Leonardo da Vinci, leading them
          through various locations in Paris and London. They are pursued by Bishop Aringarosa, a
          servant of Opus Dei, and Silas, an albino monk who will stop at nothing to prevent the
          secret from being revealed.
        </Text>
        <Text>
          Throughout their journey, Langdon and Sophie encounter references to the Holy Grail, the
          Knights Templar, and the sacred feminine. They must solve complex puzzles and riddles to
          stay ahead of their pursuers and uncover the ancient secret that has been protected for
          centuries.
        </Text>
        <Text>
          In the end, they discover that the Holy Grail is not a physical object but Mary Magdalene
          herself, who was the wife of Jesus and carried his child. The realization that Jesus's
          bloodline still exists challenges the foundations of Christianity.
        </Text>
        <Text>
          The novel culminates with Langdon and Sophie visiting Rosslyn Chapel in Scotland, where
          they find Sophie's grandmother and brother, discovering that Sophie is a descendant of
          Jesus and Mary. The secret remains protected, and Langdon gains a new understanding of
          faith and history.
        </Text>
      </div>
    </ScrollArea>
  )
}

export const VerticalOnly: Story = {
  name: 'Vertical Only',
  args: {},
  render: () => (
    <ScrollArea
      scrollbar='vertical'
      className='border-border-neutral h-80 w-full max-w-xl rounded border shadow'
    >
      <div className='space-y-6 p-4'>
        <Text>
          Harry Potter and the Sorcerer's Stone begins with Harry living in a cupboard under the
          stairs at 4 Privet Drive, treated poorly by his aunt, uncle, and cousin Dudley.
        </Text>
        <Text>
          On his eleventh birthday, Harry discovers that he is a wizard when Hagrid, the gamekeeper
          of Hogwarts School of Witchcraft and Wizardry, arrives to deliver his acceptance letter.
        </Text>
        <Text>
          Harry learns about his parents' death at the hands of the dark wizard Lord Voldemort, who
          tried to kill Harry when he was a baby but was somehow defeated, leaving Harry with a
          lightning bolt scar on his forehead.
        </Text>
        <Text>
          At Hogwarts, Harry befriends Ron Weasley and Hermione Granger, and they discover that the
          Sorcerer's Stone, a magical object that grants immortality, is hidden in the school.
        </Text>
        <Text>
          The trio suspects that someone is trying to steal the stone and sets out to protect it.
          They face various challenges and obstacles, ultimately confronting Professor Quirrell, who
          is hosting Voldemort's weakened spirit.
        </Text>
        <Text>
          In the end, Harry prevents Voldemort from obtaining the stone and returns to the Dursleys
          for the summer holidays, having found his true home in the magical world.
        </Text>
      </div>
    </ScrollArea>
  )
}

export const HorizontalOnly: Story = {
  name: 'Horizontal Only',
  args: {},
  render: () => (
    <ScrollArea
      scrollbar='horizontal'
      className='border-border-neutral h-32 w-full max-w-xl rounded border shadow'
    >
      <div className='flex gap-4 p-4'>
        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
          <div
            key={num}
            className='bg-background-neutral-faded/20 flex size-20 shrink-0 items-center justify-center rounded font-semibold'
          >
            {num}
          </div>
        ))}
      </div>
    </ScrollArea>
  )
}
