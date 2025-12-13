import { fn } from 'storybook/test';
import TextField from '../components/TextField';
import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
    title: 'Example/TextField',
    component: TextField,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        label: { control: 'text' },
        id: { control: 'text' },
        error: { control: 'text' },
        type: { control: 'text' },
        placeholder: { control: 'text' },
        value: { control: 'text' },
        onChange: { action: 'changed' },
    },
    args: {
        label: 'Username',
        id: 'username',
        placeholder: 'Enter your username',
        type: 'text',
        onChange: fn(),
    },
} satisfies Meta<typeof TextField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithError: Story = {
    args: {
        error: 'This field is required',
        value: '',
    },
};

export const Password: Story = {
    args: {
        label: 'Password',
        id: 'password',
        type: 'password',
        placeholder: 'Enter your password',
    },
};