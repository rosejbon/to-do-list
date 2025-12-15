import { fn } from 'storybook/test'
import { Button } from '../components/Button'
import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  title: 'Example/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'radio' },
      options: ['primary', 'secondary'],
    },
    leftElement: { control: 'text' },
    rightElement: { control: 'text' },
    asChild: { control: 'boolean' },
  },
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#story-args
  args: { onClick: fn(), children: 'Button' },
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    variant: 'primary',
    children: 'Primary Button',
  },
}

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Secondary Button',
  },
}

export const WithLeftElement: Story = {
  args: {
    variant: 'primary',
    leftElement: '🚀',
    children: 'With Left Element',
  },
}

export const WithRightElement: Story = {
  args: {
    variant: 'primary',
    rightElement: '➡️',
    children: 'With Right Element',
  },
}

export const AsLink: Story = {
  args: {
    asChild: true,
    variant: 'primary',
  },
  render: (args) => (
    <Button {...args}>
      <a href="https://example.com">
        <span>Link Button</span>
      </a>
    </Button>
  ),
}
