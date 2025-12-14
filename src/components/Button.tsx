import * as React from 'react'
import { Slot, Slottable } from '@radix-ui/react-slot'

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    asChild?: boolean
    variant?: 'primary' | 'secondary'
    leftElement?: React.ReactNode
    rightElement?: React.ReactNode
}

export const Button = React.forwardRef<
    HTMLButtonElement,
    ButtonProps
>(({
    asChild = false,
    variant = 'primary',
    leftElement,
    rightElement,
    className = '',
    children,
    ...props
}, ref) => {
    const Comp = asChild ? Slot : 'button'

    const baseStyles =
        'inline-flex items-center gap-2 rounded-md px-4 py-2 text-md font-bold transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50'

    const variantStyles =
        variant === 'secondary'
            ? 'bg-gray-200 text-gray-900 hover:bg-gray-300 focus:ring-indigo-600'
            : 'bg-black text-white hover:bg-gray-800 focus:ring-indigo-600'

    return (
        <Comp
            ref={ref}
            className={`${baseStyles} ${variantStyles} ${className}`}
            {...props}
        >
            {leftElement && (
                <span className="inline-flex shrink-0">
                    {leftElement}
                </span>
            )}

            <Slottable>
                {children}
            </Slottable>

            {rightElement && (
                <span className="inline-flex shrink-0 w-8 h-8 ml-auto">
                    {rightElement}
                </span>
            )}
        </Comp>
    )
})
