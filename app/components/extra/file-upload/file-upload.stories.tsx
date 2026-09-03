import type { Meta, StoryObj } from '@storybook/tanstack-react'
import { UploadIcon } from 'lucide-react'
import * as React from 'react'
import { Button } from '#/components/base/button'
import { Badge } from '#/components/extra/badge'
import { Text } from '#/components/extra/text'
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

export const Default: Story = {
  args: { name: 'file', onChange: () => {} },
  render: (props) => (
    <div style={{ width: 480 }}>
      <FileUpload {...props}>
        <UploadIcon size={20} strokeWidth={1.8} />
        Drop files to attach
      </FileUpload>
    </div>
  )
}

export const WithTrigger: Story = {
  args: { name: 'file', onChange: () => {} },
  render: (props) => (
    <div style={{ width: 480 }}>
      <FileUpload {...props}>
        <UploadIcon size={20} strokeWidth={1.8} />
        Drop files to attach, or <FileUploadTrigger>browse</FileUploadTrigger>
      </FileUpload>
    </div>
  )
}

export const Headless: Story = {
  args: {
    name: 'file',
    variant: 'headless',
    inline: true,
    onChange: () => {}
  },
  render: (props) => (
    <FileUpload {...props}>
      {(state) => (
        <Button variant={state.highlighted ? 'primary' : 'secondary'}>Click to upload</Button>
      )}
    </FileUpload>
  )
}

export const Inline: Story = {
  args: { name: 'file', inline: true, onChange: () => {} },
  render: (props) => (
    <FileUpload {...props}>
      <div style={{ padding: 12 }}>Drop files to attach</div>
    </FileUpload>
  )
}

export const Disabled: Story = {
  args: { name: 'file', disabled: true, onChange: () => {} },
  render: (props) => (
    <div style={{ width: 480 }}>
      <FileUpload {...props}>
        <UploadIcon size={20} strokeWidth={1.8} />
        Drop files to attach
      </FileUpload>
    </div>
  )
}

export const WithFileList: Story = {
  args: { name: 'file' },
  render: function WithFileListRender() {
    const [files, setFiles] = React.useState<File[]>([])

    return (
      <div style={{ display: 'grid', gap: 16, width: 480 }}>
        <FileUpload name='file' onChange={(args) => setFiles(args.value)}>
          <UploadIcon size={20} strokeWidth={1.8} />
          Drop files to attach
        </FileUpload>
        {files.length > 0 ? (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {files.map((file) => (
              <Badge key={file.name} variant='secondary'>
                {file.name}
              </Badge>
            ))}
          </div>
        ) : (
          <Text variant='caption-1' color='neutral-faded'>
            No files selected
          </Text>
        )}
      </div>
    )
  }
}
