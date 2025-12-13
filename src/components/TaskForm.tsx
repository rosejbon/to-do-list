import React, { useEffect, useState } from 'react'
import TextField from './TextField'
import { Button } from './Button'
import RadixSelect from './Select'
import type { RadixSelectOption } from './Select'

const PriorityLevel: Array<RadixSelectOption> = [
    { label: 'low', value: 'low' },
    { label: 'medium', value: 'medium' },
    { label: 'high', value: 'high' },
    { label: 'none', value: 'none' },
]

type TaskFormProps = {
    initialName?: string
    initialPriority?: string
    onSubmit: (values: { name: string; priority: string }) => void
    submitLabel?: string
}

const TaskForm = ({
    initialName = '',
    initialPriority = '',
    onSubmit,
    submitLabel = 'Submit',
}: TaskFormProps) => {
    const [name, setName] = useState(initialName)
    const [priority, setPriority] = useState(initialPriority)
    const [errors, setErrors] = useState<{ name?: string }>({})

    useEffect(() => {
        setName(initialName)
        setPriority(initialPriority)
    }, [initialName, initialPriority])

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        const newErrors: typeof errors = {}
        if (!name.trim()) newErrors.name = 'Task name is required'
        setErrors(newErrors)
        if (Object.keys(newErrors).length === 0) {
            onSubmit({ name, priority })
        }
    }

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-64">
            <TextField
                label="Task Name"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                error={errors.name}
                required={true}
            />
            <div className="flex flex-col space-y-1">
                <label className="text-sm font-medium text-gray-700">Priority</label>
                <RadixSelect
                    options={PriorityLevel}
                    value={priority}
                    onValueChange={setPriority}
                    placeholder="Select a priority"
                />
            </div>
            <Button type="submit" variant="primary">
                {submitLabel}
            </Button>
        </form>
    )
}

export default TaskForm