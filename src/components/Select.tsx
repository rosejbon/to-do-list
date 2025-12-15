import * as Select from '@radix-ui/react-select'
import { Check, ChevronDown, ChevronUp } from 'lucide-react'

export type RadixSelectOption = {
  label: string
  value: string
}

export interface RadixSelectProps {
  options: Array<RadixSelectOption>
  value?: string
  defaultValue?: string
  placeholder?: string
  onValueChange?: (value: string) => void
  disabled?: boolean
  id?: string
}

export const RadixSelect: React.FC<RadixSelectProps> = ({
  options,
  value,
  defaultValue,
  placeholder = 'Select an option',
  onValueChange,
  disabled = false,
  id,
}) => {
  return (
    <Select.Root
      value={value}
      defaultValue={defaultValue}
      onValueChange={onValueChange}
      disabled={disabled}
    >
      <Select.Trigger
        className="
                    inline-flex h-10 w-full items-center justify-between
                    border-2 border-black bg-white px-3 py-2 text-sm
                    text-gray-900 shadow-sm outline-none
                    focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2
                    disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-gray-400
                "
        id={id}
      >
        <Select.Value placeholder={placeholder} />
        <Select.Icon className="ml-2 text-gray-500">
          <ChevronDown className="h-8 w-8" />
        </Select.Icon>
      </Select.Trigger>

      <Select.Portal>
        <Select.Content
          className="overflow-hidden border-2 border-black bg-white shadow-lg"
          position="popper"
          sideOffset={4}
        >
          <Select.ScrollUpButton className="flex items-center justify-center py-1 text-gray-500">
            <ChevronUp className="h-4 w-4" />
          </Select.ScrollUpButton>

          <Select.Viewport className="p-1">
            {options.map((option) => (
              <Select.Item
                key={option.value}
                value={option.value}
                className="
                                    relative flex cursor-pointer select-none items-center
                                    rounded-sm px-8 py-2 text-sm text-gray-900 w-full
                                    outline-none
                                    focus:bg-indigo-50 focus:ring-indigo-600 focus:ring-offset-2 
                                    data-disabled:pointer-events-none data-disabled:opacity-50
                                "
              >
                <Select.ItemText>{option.label}</Select.ItemText>
                <Select.ItemIndicator className="absolute left-2 inline-flex items-center">
                  <Check className="h-4 w-4 text-black" />
                </Select.ItemIndicator>
              </Select.Item>
            ))}
          </Select.Viewport>

          <Select.ScrollDownButton className="flex items-center justify-center py-1 text-black">
            <ChevronDown className="h-4 w-4" />
          </Select.ScrollDownButton>
          <Select.Arrow />
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  )
}

export default RadixSelect
