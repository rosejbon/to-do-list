import * as React from 'react'
import * as Checkbox from '@radix-ui/react-checkbox'
import { Check } from 'lucide-react'

export interface RadixCheckboxProps {
  checked?: boolean
  onCheckedChange?: (checked: boolean) => void
  id?: string
  disabled?: boolean
}

export const RadixCheckbox: React.FC<RadixCheckboxProps> = ({
  checked,
  onCheckedChange,
  id,
  disabled = false,
}) => {
  return (
    <Checkbox.Root
      checked={checked}
      onCheckedChange={(value) => onCheckedChange?.(value === true)}
      disabled={disabled}
      className="
                    flex h-8 w-8 items-center justify-center rounded
                    border border-gray-300 bg-white shadow-sm
                    outline-none
                    cursor-pointer
                    focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600 focus:ring-offset-2
                    data-[state=checked]:border-black data-[state=checked]:bg-black
                    disabled:bg-gray-100 disabled:border-gray-200 disabled:pointer-events-none
                "
      id={id}
    >
      <Checkbox.Indicator className="text-white">
        <Check className="h-5 w-5" />
      </Checkbox.Indicator>
    </Checkbox.Root>
  )
}

export default RadixCheckbox
