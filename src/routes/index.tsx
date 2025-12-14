import { Link, createFileRoute } from '@tanstack/react-router'
import * as React from 'react'
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table'

import { Button } from '../components/Button'
import { TaskRow } from '../components/TaskRow'

type Task = {
  id: string
  name: string
  createdDate: string
  priority: string
  completed: boolean
}

export const Route = createFileRoute('/')({
  component: App,
})

function App() {
  const [tasks, setTasks] = React.useState<Array<Task>>([])
  const [deleteTask, setDeleteTask] = React.useState<string | null>(null)
  const [deleteMessage, setDeleteMessage] = React.useState<string>('')

  React.useEffect(() => {
    const tasksJSON = localStorage.getItem('tasks')
    if (tasksJSON) {
      try {
        const parsed = JSON.parse(tasksJSON)
        if (Array.isArray(parsed)) setTasks(parsed)
      } catch {
        setTasks([])
      }
    }
  }, [])

  // Handler to update completed state and localStorage
  const handleCompletedChange = (id: string, checked: boolean) => {
    setTasks((prevTasks) => {
      const updatedTasks = prevTasks.map((task) =>
        task.id === id ? { ...task, completed: checked } : task,
      )
      localStorage.setItem('tasks', JSON.stringify(updatedTasks))
      return updatedTasks
    })
  }

  // Handler to delete a task
  const handleDeleteTask = (id: string) => {
    setTasks((prevTasks) => {
      const taskToDelete = prevTasks.find((task) => task.id === id)
      const updatedTasks = prevTasks.filter((task) => task.id !== id)
      localStorage.setItem('tasks', JSON.stringify(updatedTasks))
      if (taskToDelete) {
        setDeleteMessage(`Task "${taskToDelete.name}" has been deleted.`)
      }
      return updatedTasks
    })
    setDeleteTask(null)
  }

  const columnHelper = createColumnHelper<Task>()
  const columns = [
    columnHelper.accessor('completed', { header: 'Completed' }),
    columnHelper.accessor('name', { header: 'Name' }),
    columnHelper.accessor('priority', { header: 'Priority' }),
  ]

  const table = useReactTable({
    data: tasks,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <div className="text-center">
      <h1>Welcome to the To-Do List App</h1>
      {deleteMessage && (
        <div
          role="status"
          aria-live="polite"
          className="sr-only"
        >
          {deleteMessage}
        </div>
      )}
      <div className="overflow-x-auto mt-6">
        <table className="mx-auto border-collapse border border-gray-300">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="border border-gray-300 px-4 py-2 bg-gray-100"
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext(),
                    )}
                  </th>
                ))}
                <th className="border border-gray-300 px-4 py-2 bg-gray-100">Edit</th>
                <th className="border border-gray-300 px-4 py-2 bg-gray-100">Delete</th>
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <TaskRow
                key={row.id}
                task={row.original}
                onCompletedChange={handleCompletedChange}
                onDelete={handleDeleteTask}
                onOpenDelete={setDeleteTask}
                deleteTask={deleteTask}
              >
                <Button asChild>
                  <Link to="/$taskid/edit" params={{ taskid: row.original.id }}>
                    Edit <span className="sr-only">{row.original.name} task</span>
                  </Link>
                </Button>
              </TaskRow>
            ))}
            {tasks.length === 0 && (
              <tr>
                <td colSpan={5} className="py-4 text-gray-500">
                  No tasks found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}