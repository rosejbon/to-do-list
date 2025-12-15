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
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full max-w-md">
            <div className="flex flex-col space-y-1 w-full">
                <TextField
                    label="Task Name"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required={true}
                    error={errors.name}
                />
            </div>
            <div className="flex flex-col space-y-1">
                <label className="text-md font-bold text-gray-700">Priority</label>
                <RadixSelect
                    options={PriorityLevel}
                    value={priority}
                    onValueChange={setPriority}
                    placeholder="Select a priority"
                />
            </div>
            <Button
                type="submit"
                variant="primary"
                rightElement={
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 58.471 61.278"><path d="M28.908.008c-6.078-.09-12.401 1.066-17.55 4.457-4.437 2.923-7.628 7.168-9.484 12.121-3.6 9.61-1.745 21.057 3.276 29.81 5.24 9.134 14.757 15.71 25.594 14.797 6.918-.583 13.604-3.531 18.647-8.305 5.345-5.058 8.486-11.984 9.005-19.299 1.05-14.783-9.027-28.672-23.27-32.516C33.092.523 31.003.2 28.908.008c-1.347-.124-2.5 1.238-2.5 2.5 0 1.455 1.15 2.376 2.5 2.5 6.653.612 12.885 3.533 17.44 8.43 1.19 1.28 1.793 2.055 2.74 3.52a30 30 0 0 1 2.215 4.113c.193.435-.212-.534.091.214a30 30 0 0 1 .572 1.53q.407 1.185.712 2.402c.408 1.624.595 2.811.7 4.137.123 1.575.119 3.16-.021 4.733-.014.153-.136 1.197-.084.822q-.07.495-.16.987a27 27 0 0 1-.56 2.44c-.8 2.86-2.234 5.753-3.96 8.012-2.098 2.744-4.659 5.023-7.624 6.624-2.445 1.32-4.748 2.21-7.738 2.842q-.514.11-1.03.198c-.203.034-.911.136-.353.063q-.994.13-1.995.177a25 25 0 0 1-3.64-.115c-.74-.074.251.063-.35-.05-.273-.05-.547-.092-.818-.146a22 22 0 0 1-4.07-1.23c-.352-.142.56.256.022.006-.162-.076-.326-.147-.488-.224a23.6 23.6 0 0 1-2.95-1.666q-.668-.447-1.31-.932c.438.33-.02-.018-.197-.164a28 28 0 0 1-3.184-3.065c-.364-.41-.71-.832-1.056-1.257-.37-.454.194.282-.223-.293q-.272-.37-.538-.745a34.7 34.7 0 0 1-3.413-6.172c.259.601-.083-.213-.14-.356a36 36 0 0 1-.903-2.566 37 37 0 0 1-1.198-5.105c-.021-.133-.138-.95-.09-.591.055.424-.022-.186-.026-.222q-.031-.277-.06-.555a34 34 0 0 1-.177-3.415 32 32 0 0 1 .184-3.462c.018-.167.141-1.04.034-.322q.058-.4.126-.8.143-.84.336-1.668a26 26 0 0 1 1.295-4.04c-.212.514-.004.02.1-.205a23 23 0 0 1 1.6-2.908q.239-.367.492-.723c.109-.153.658-.862.239-.336.7-.877 1.456-1.705 2.283-2.464q.6-.548 1.238-1.05c-.514.405.175-.122.3-.211q.417-.295.846-.57a24 24 0 0 1 3.13-1.666c.367-.164-.561.217.044-.018q.188-.075.375-.147a25 25 0 0 1 2.874-.912 29 29 0 0 1 2.933-.591c.493-.077.123-.02.02-.007q.35-.045.7-.082a39 39 0 0 1 4.715-.2c3.218.049 3.22-4.951 0-5" fill="#ffffff" /><g fill="#ffffff"><path d="M18.055 32.82H36.8c3.217 0 3.222-5 0-5H18.055c-3.217 0-3.223 5 0 5" /><path d="M24.927 20.947v18.745c0 3.217 5 3.222 5 0V20.947c0-3.217-5-3.223-5 0" /></g></svg>
                }
            >
                <span> {submitLabel} </span>
            </Button>
        </form>
    )
}

export default TaskForm