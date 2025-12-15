import { useState } from 'react'
import { fn } from 'storybook/test'
import DeleteDialog from '../components/DeleteDialog'
import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  title: 'Example/DeleteDialog',
  component: DeleteDialog,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    open: { control: 'boolean' },
    taskName: { control: 'text' },
  },
  args: {
    open: false,
    onOpenChange: () => {},
    taskName: 'Sample Task',
    onDelete: fn(),
    onCancel: fn(),
  },
} satisfies Meta<typeof DeleteDialog>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    open: false,
    onOpenChange: () => {},
    taskName: 'Sample Task',
    onDelete: fn(),
    onCancel: fn(),
  },
  render: (args) => {
    const [open, setOpen] = useState(false)
    return <DeleteDialog {...args} open={open} onOpenChange={setOpen} />
  },
}
