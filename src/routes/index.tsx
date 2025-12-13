import { createFileRoute } from '@tanstack/react-router'
import * as React from 'react'
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table'
import Checkbox from '../components/Checkbox'

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
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => {
              const task = row.original
              return (
                <tr key={row.id}>
                  {/* Completed column */}
                  <td className="border border-gray-300 px-4 py-2">
                    <Checkbox
                      id={task.id}
                      checked={task.completed}
                      onCheckedChange={(checked) =>
                        handleCompletedChange(task.id, checked)
                      }
                    />
                  </td>
                  {/* Name column as row header with label for checkbox */}
                  <td className="border border-gray-300 px-4 py-2 text-left">
                    <label
                      htmlFor={task.id}
                      className={
                        task.completed ? 'line-through text-gray-500' : ''
                      }
                    >
                      {task.name}
                    </label>
                  </td>
                  {/* Priority column */}
                  <td className="border border-gray-300 px-4 py-2">
                    {task.priority}
                  </td>
                </tr>
              )
            })}
            {tasks.length === 0 && (
              <tr>
                <td colSpan={3} className="py-4 text-gray-500">
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
