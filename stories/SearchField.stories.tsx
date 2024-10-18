import type { Meta } from '@storybook/react'
import { Form } from 'react-aria-components'

import { Button } from '#/components/ui-react-aria/Button'
import { SearchField } from '#/components/ui-react-aria/SearchField'

const meta: Meta<typeof SearchField> = {
  component: SearchField,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    label: 'Search',
  },
}

export default meta

export const Example = (args: any) => <SearchField {...args} />

export const Validation = (args: any) => (
  <Form className="flex flex-col items-start gap-2">
    <SearchField {...args} />
    <Button type="submit" variant="secondary">
      Submit
    </Button>
  </Form>
)

Validation.args = {
  isRequired: true,
}
