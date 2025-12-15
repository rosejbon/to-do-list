import { fn } from 'storybook/test'
import RadixCheckbox from '../components/Checkbox'
import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  title: 'Example/Checkbox',
  component: RadixCheckbox,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    checked: { control: 'boolean' },
    disabled: { control: 'boolean' },
    onCheckedChange: { action: 'checked changed' },
    id: { control: 'text' },
  },
  args: {
    onCheckedChange: fn(),
  },
} satisfies Meta<typeof RadixCheckbox>

export default meta
type Story = StoryObj<typeof meta>

export const Unchecked: Story = {
  args: {
    checked: false,
  },
}

export const Checked: Story = {
  args: {
    checked: true,
  },
}

export const Disabled: Story = {
  args: {
    disabled: true,
  },
}
