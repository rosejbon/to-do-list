import { createFileRoute, useNavigate } from '@tanstack/react-router'
import React, { useState } from 'react'
import TextField from '../components/TextField'
import { Button } from '../components/Button'
import RadixSelect from '../components/Select'
import type { RadixSelectOption } from '../components/Select'

const PriorityLevel: Array<RadixSelectOption> = [
    { label: 'low', value: 'low' },
    { label: 'medium', value: 'medium' },
    { label: 'high', value: 'high' },
    { label: 'none', value: 'none' },
]

const SimpleForm = () => {
    const [name, setName] = useState('')
    const [priority, setPriority] = useState('')
    const [errors, setErrors] = useState<{ name?: string }>({})
    const navigate = useNavigate()

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        const newErrors: typeof errors = {}
        if (!name.trim()) newErrors.name = 'Task name is required'

        setErrors(newErrors)

        if (Object.keys(newErrors).length === 0) {
            const newTask = {
                id: Date.now().toString(),
                name,
                createdDate: new Date().toISOString(),
                priority,
                completed: false,
            }

            const tasksJSON = localStorage.getItem('tasks')
            let tasks = []
            if (tasksJSON) {
                try {
                    tasks = JSON.parse(tasksJSON)
                    if (!Array.isArray(tasks)) tasks = []
                } catch {
                    tasks = []
                }
            }
            tasks.push(newTask)
            localStorage.setItem('tasks', JSON.stringify(tasks))

            // Redirect to index after task creation
            navigate({ to: '/' })
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
                Submit
            </Button>
        </form>
    )
}

export const Route = createFileRoute('/create-task')({
    component: RouteComponent,
})

function RouteComponent() {
    return (
        <div>
            <h1>Create a new task</h1>
            <SimpleForm />
        </div>
    )
}
