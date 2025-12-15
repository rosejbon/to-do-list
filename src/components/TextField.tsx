import * as React from 'react'
import * as LabelPrimitive from '@radix-ui/react-label'

interface TextFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string
  id: string
  required?: boolean
  error?: string
}

const TextField: React.FC<TextFieldProps> = ({
  label,
  id,
  required,
  error,
  ...props
}) => {
  const describedBy = error ? `${id}Error` : undefined

  return (
    <div className="flex flex-col space-y-1 w-full">
      <LabelPrimitive.Root
        htmlFor={id}
        className="text-md font-bold text-gray-700"
      >
        {label}
        {required ? <span aria-hidden="true">*</span> : null}
      </LabelPrimitive.Root>
      <input
        id={id}
        aria-required={required}
        aria-invalid={!!error}
        aria-describedby={describedBy}
        {...props}
        className={`
                    px-3 py-2 text-sm border-2
                    focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2 
                    border-black
                    ${props.className || ''}
                `}
      />
      {error && (
        <p
          id={`${id}Error`}
          aria-live="assertive"
          className="text-sm border-l-4 bg-red-100 border-red-500 p-2 mt-2"
        >
          {error}
        </p>
      )}
    </div>
  )
}

export default TextField
