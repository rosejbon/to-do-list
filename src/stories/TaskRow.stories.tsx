import { fn } from 'storybook/test'
import { TaskRow } from '../components/TaskRow'
import { Button } from '../components/Button'
import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  title: 'Example/TaskRow',
  component: TaskRow,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    onCompletedChange: { action: 'completed changed' },
    onDelete: { action: 'delete' },
    onOpenDelete: { action: 'open delete' },
    deleteTask: { control: 'text' },
    task: { control: 'object' },
  },
  args: {
    task: {
      id: '1',
      name: 'Sample Task',
      createdDate: '2025-12-14',
      priority: 'high',
      completed: false,
    },
    onCompletedChange: fn(),
    onDelete: fn(),
    onOpenDelete: fn(),
    deleteTask: null,
    children: <Button>Edit</Button>,
  },
} satisfies Meta<typeof TaskRow>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    deleteTask: null,
    children: <Button>Edit</Button>,
  },
}

export const Completed: Story = {
  args: {
    task: {
      id: '2',
      name: 'Completed Task',
      createdDate: '2025-12-14',
      priority: 'medium',
      completed: true,
    },
    deleteTask: null,
    children: <Button>Edit</Button>,
  },
}
