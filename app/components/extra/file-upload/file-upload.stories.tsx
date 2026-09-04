import type { Meta, StoryObj } from '@storybook/tanstack-react'
import * as stylex from '@stylexjs/stylex'
import { MicIcon } from 'lucide-react'
import * as React from 'react'
import { expect, fn, userEvent } from 'storybook/test'
import { Button } from '#/components/base/button'
import { colors } from '#/styles/core/colors.stylex'
import { FileUpload, FileUploadTrigger } from './file-upload.component'

const meta = {
  title: 'Extra Components/FileUpload',
  component: FileUpload,
  parameters: { layout: 'centered' },
  argTypes: {
    variant: { control: 'select', options: ['outline', 'headless'] },
    inline: { control: 'boolean' },
    disabled: { control: 'boolean' },
    name: { control: 'text' }
  }
} satisfies Meta<typeof FileUpload>

export default meta
type Story = StoryObj<typeof meta>

const styles = stylex.create({
  width: {
    width: 480
  },
  col: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    gap: 8
  },
  icon: {
    height: 20,
    width: 20
  },
  previews: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: 8
  },
  thumb: {
    borderRadius: 8,
    height: 60,
    objectFit: 'cover',
    width: 60
  },
  stack: {
    display: 'flex',
    flexDirection: 'column',
    gap: 16
  },
  browse: {
    color: colors.foregroundPrimary,
    textDecoration: 'underline'
  },
  row: {
    alignItems: 'center',
    display: 'flex',
    gap: 8
  },
  padded: {
    padding: 12
  }
})

export const Playground: Story = {
  args: { name: 'file' },
  render: function PlaygroundRender() {
    const [files, setFiles] = React.useState<File[]>([])

    return (
      <div {...stylex.props(styles.stack, styles.width)}>
        <FileUpload name='file' onChange={(args) => setFiles((prev) => [...prev, ...args.value])}>
          <div {...stylex.props(styles.col)}>
            <MicIcon {...stylex.props(styles.icon)} strokeWidth={1.8} />
            Drop files to attach
          </div>
        </FileUpload>
        {files.length > 0 ? (
          <div {...stylex.props(styles.previews)}>
            {files.map((file) => (
              <img
                key={file.name}
                src={URL.createObjectURL(file)}
                alt={file.name}
                {...stylex.props(styles.thumb)}
              />
            ))}
          </div>
        ) : null}
      </div>
    )
  }
}

export const Trigger: Story = {
  args: { name: 'file' },
  render: () => (
    <div {...stylex.props(styles.width)}>
      <FileUpload name='file'>
        <div>
          Drop files to attach, or{' '}
          <FileUploadTrigger>
            <span {...stylex.props(styles.browse)}>browse</span>
          </FileUploadTrigger>
        </div>
      </FileUpload>
    </div>
  )
}

export const Variants: Story = {
  args: { name: 'file' },
  render: () => (
    <div {...stylex.props(styles.stack)}>
      <FileUpload name='file' inline onChange={console.log}>
        <div {...stylex.props(styles.padded)}>Upload</div>
      </FileUpload>
      <FileUpload name='file-2' variant='headless' onChange={console.log}>
        <Button variant='outline'>Upload</Button>
      </FileUpload>
      <FileUpload name='file-3' variant='headless' inline onChange={console.log}>
        <Button>Upload</Button>
      </FileUpload>
      <FileUpload name='file-4' variant='headless' inline onChange={console.log}>
        {(props) => <Button variant={props.highlighted ? 'primary' : 'secondary'}>Upload</Button>}
      </FileUpload>
    </div>
  )
}

export const Height: Story = {
  args: { name: 'file', height: 300 },
  render: (args) => (
    <div {...stylex.props(styles.width)}>
      <FileUpload {...args}>
        <div {...stylex.props(styles.col)}>
          <MicIcon {...stylex.props(styles.icon)} strokeWidth={1.8} />
          Drop files to attach
        </div>
      </FileUpload>
    </div>
  )
}

export const OnChange: StoryObj<{
  name: string
  handleChange: ReturnType<typeof fn>
}> = {
  name: 'name, onChange',
  args: { name: 'test-name', handleChange: fn() },
  render: ({ name, handleChange }) => (
    <div data-testid='root' {...stylex.props(styles.width)}>
      <FileUpload name={name} onChange={handleChange}>
        Content
      </FileUpload>
    </div>
  ),
  play: async ({ canvas, args }) => {
    const file = new File(['hello'], 'hello.png', { type: 'image/png' })
    const input = canvas.getByTestId('root').querySelector('input') as HTMLInputElement

    await userEvent.upload(input, file)

    expect(input).toHaveAttribute('name', 'test-name')
    expect(input.files?.[0]).toBe(file)
    expect(input.files).toHaveLength(1)

    expect(args.handleChange).toHaveBeenCalledTimes(1)
    expect(args.handleChange).toHaveBeenCalledWith({
      name: 'test-name',
      value: [file],
      event: expect.objectContaining({ target: input })
    })
  }
}

export const Disabled: Story = {
  args: { name: 'test-name', disabled: true },
  render: (args) => (
    <div data-testid='root' {...stylex.props(styles.width)}>
      <FileUpload {...args}>
        <div {...stylex.props(styles.row)}>
          <MicIcon {...stylex.props(styles.icon)} strokeWidth={1.8} />
          Content
        </div>
      </FileUpload>
    </div>
  ),
  play: async ({ canvas }) => {
    const input = canvas.getByTestId('root').querySelector('input')
    expect(input).toBeDisabled()
  }
}
