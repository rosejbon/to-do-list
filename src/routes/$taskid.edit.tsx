import { createFileRoute, useNavigate, useParams } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import TaskForm from '../components/TaskForm'

export const Route = createFileRoute('/$taskid/edit')({
  component: EditTask,
})

function EditTask() {
  const navigate = useNavigate()
  const { taskid } = useParams({ strict: false });

  const [task, setTask] = useState<{ name: string; priority: string } | null>(null)

  useEffect(() => {
    const tasksJSON = localStorage.getItem('tasks')
    if (tasksJSON) {
      try {
        const tasks = JSON.parse(tasksJSON)
        const found = Array.isArray(tasks) ? tasks.find((t: any) => t.id === taskid) : null
        if (found) {
          setTask({ name: found.name, priority: found.priority })
        }
      } catch {
        // handle error if needed
      }
    }
  }, [taskid])

  const handleEdit = ({ name, priority }: { name: string; priority: string }) => {
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
    const updatedTasks = tasks.map((t: any) =>
      t.id === taskid ? { ...t, name, priority } : t
    )
    localStorage.setItem('tasks', JSON.stringify(updatedTasks))
    navigate({ to: '/' })
  }

  if (!task) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <h1>Edit Task</h1>
      <TaskForm
        initialName={task.name}
        initialPriority={task.priority}
        onSubmit={handleEdit}
        submitLabel="Edit task"
      />
    </div>
  )
}