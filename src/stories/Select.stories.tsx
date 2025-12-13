import { fn } from 'storybook/test';
import RadixSelect from '../components/Select';
import type {RadixSelectOption} from '../components/Select';
import type { Meta, StoryObj } from '@storybook/react-vite';

const options: Array<RadixSelectOption> = [
    { label: 'Option One', value: 'one' },
    { label: 'Option Two', value: 'two' },
    { label: 'Option Three', value: 'three' },
];

const meta = {
    title: 'Example/Select',
    component: RadixSelect,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        value: { control: 'text' },
        defaultValue: { control: 'text' },
        placeholder: { control: 'text' },
        disabled: { control: 'boolean' },
        onValueChange: { action: 'value changed' },
    },
    args: {
        options,
        placeholder: 'Select an option',
        onValueChange: fn(),
    },
} satisfies Meta<typeof RadixSelect>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithDefaultValue: Story = {
    args: {
        defaultValue: 'two',
    },
};

export const Disabled: Story = {
    args: {
        disabled: true,
    },
};

export const CustomPlaceholder: Story = {
    args: {
        placeholder: 'Pick something...',
    },
};