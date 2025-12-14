import { createFileRoute, useNavigate } from '@tanstack/react-router'

import TaskForm from '../components/TaskForm'

export const Route = createFileRoute('/create-task')({
    component: RouteComponent,
})

function RouteComponent() {
    const navigate = useNavigate()

    const handleCreate = ({ name, priority }: { name: string; priority: string }) => {
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
        navigate({ to: '/' })
    }

    return (
        <main className="container mx-auto px-4">
            <h1 className='font-extrabold text-4xl py-8'>Create a new task</h1>
            <TaskForm onSubmit={handleCreate} submitLabel="Add task" />
        </main>
    )
}