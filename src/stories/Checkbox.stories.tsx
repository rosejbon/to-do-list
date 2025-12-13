import { fn } from 'storybook/test';
import RadixCheckbox from '../components/Checkbox';
import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
    title: 'Example/Checkbox',
    component: RadixCheckbox,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        checked: { control: 'boolean' },
        defaultChecked: { control: 'boolean' },
        label: { control: 'text' },
        disabled: { control: 'boolean' },
        onCheckedChange: { action: 'checked changed' },
    },
    args: {
        label: 'Checkbox',
        onCheckedChange: fn(),
    },
} satisfies Meta<typeof RadixCheckbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const DefaultChecked: Story = {
    args: {
        defaultChecked: true,
        label: 'Default Checked',
    },
};

export const Unchecked: Story = {
    args: {
        checked: false,
        label: 'Unchecked',
    },
};

export const Checked: Story = {
    args: {
        checked: true,
        label: 'Checked',
    },
};

export const Disabled: Story = {
    args: {
        disabled: true,
        label: 'Disabled',
    },
};

export const WithLongLabel: Story = {
    args: {
        label: 'This is a checkbox with a longer label for demonstration purposes.',
    },
};