/**
 * StoryBlock helper components for Storybook stories.
 *
 * Based on Reshaped's storybook utilities.
 *
 * Usage:
 *   <Example title="Button sizes">
 *     <Example.Item title={['Small', 'Default state']}>
 *       <Button size="small">Small</Button>
 *     </Example.Item>
 *     <Example.Item title="Medium">
 *       <Button size="medium">Medium</Button>
 *     </Example.Item>
 *   </Example>
 *
 *   <Placeholder w={200} h={100} />
 *   <Placeholder w={200} h={100} inverted />
 */

import * as stylex from '@stylexjs/stylex'
import { storyblockStyles as s } from './storyblock.stylex'

// ---------------------------------------------------------------------------
// Example
// ---------------------------------------------------------------------------

interface ExampleProps {
  /** Title displayed at the top of the example block */
  title?: React.ReactNode
  /** Content to render */
  children?: React.ReactNode
}

interface ExampleItemProps {
  /** Title for the item, can be a string or array of strings */
  title?: string | string[]
  /** Content to render */
  children?: React.ReactNode
}

function ExampleRoot({ title, children }: ExampleProps) {
  const sx = stylex.props(s.example.root)

  return (
    <div data-slot='example' className={sx.className} style={sx.style}>
      {title && (
        <p data-slot='example-title' {...stylex.props(s.example.title)}>
          {title}
        </p>
      )}
      {children}
    </div>
  )
}

function ExampleItem({ title, children }: ExampleItemProps) {
  const titleLines = typeof title === 'string' ? [title] : title

  return (
    <div data-slot='example-item' {...stylex.props(s.exampleItem.root)}>
      {titleLines && titleLines.length > 0 && (
        <p data-slot='example-item-title' {...stylex.props(s.exampleItem.title)}>
          {titleLines.map((line, index) => (
            <span
              key={line}
              data-slot='example-item-title-line'
              {...stylex.props(index > 0 ? s.exampleItem.titleFaded : s.exampleItem.titleNeutral)}
            >
              {line}
              {index < titleLines.length - 1 && <br />}
            </span>
          ))}
        </p>
      )}
      {children}
    </div>
  )
}

type ExampleComponent = typeof ExampleRoot & {
  Item: typeof ExampleItem
}

const Example = ExampleRoot as ExampleComponent
Example.Item = ExampleItem

export { Example }

// ---------------------------------------------------------------------------
// Placeholder
// ---------------------------------------------------------------------------

interface PlaceholderProps {
  /** Width of the placeholder */
  w?: string | number
  /** Height of the placeholder */
  h?: string | number
  /** Minimum width of the placeholder */
  minW?: string | number
  /** Use inverted colors */
  inverted?: boolean
  /** Content to render inside */
  children?: React.ReactNode
}

export function Placeholder({
  w = 'auto',
  h = 50,
  minW,
  inverted = false,
  children
}: PlaceholderProps) {
  const sx = stylex.props(s.placeholder.root, inverted && s.placeholder.inverted)

  const width = typeof w === 'number' ? `${w}px` : w
  const height = typeof h === 'number' ? `${h}px` : h
  const minWidth = minW !== undefined ? (typeof minW === 'number' ? `${minW}px` : minW) : height

  return (
    <div
      data-slot='placeholder'
      className={sx.className}
      style={{
        ...sx.style,
        width,
        height,
        minWidth
      }}
    >
      {children}
    </div>
  )
}
