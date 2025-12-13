import PriorityBadge from '../components/PriorityBadge'

import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
    title: 'Example/PriorityBadge',
    component: PriorityBadge,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        level: {
            control: { type: 'radio' },
            options: ['high', 'medium', 'low', 'none'],
        },
    },
    args: {
        level: 'none',
    },
} satisfies Meta<typeof PriorityBadge>

export default meta
type Story = StoryObj<typeof meta>

export const None: Story = {
    args: {
        level: 'none',
    },
}

export const Low: Story = {
    args: {
        level: 'low',
    },
}

export const Medium: Story = {
    args: {
        level: 'medium',
    },
}

export const High: Story = {
    args: {
        level: 'high',
    },
}
