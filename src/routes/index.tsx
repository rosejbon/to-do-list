import { Link, createFileRoute } from '@tanstack/react-router'
import * as React from 'react'
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table'
import * as AlertDialog from '@radix-ui/react-alert-dialog'

import { Button } from '../components/Button'
import Checkbox from '../components/Checkbox'
import PriorityBadge from '../components/PriorityBadge'

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
      const updatedTasks = prevTasks.filter((task) => task.id !== id)
      localStorage.setItem('tasks', JSON.stringify(updatedTasks))
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
                    <PriorityBadge
                      level={
                        ["high", "medium", "low", "none"].includes(task.priority)
                          ? (task.priority as "high" | "medium" | "low" | "none")
                          : "none"
                      }
                    />
                  </td>
                  {/* Edit column */}
                  <td className="border border-gray-300 px-4 py-2">
                    <Button>
                      <Link to="/$taskid/edit" params={{ taskid: task.id }}>
                        Edit <span className='sr-only'>{task.name} task</span>
                      </Link>
                    </Button>
                  </td>
                  {/* Delete column */}
                  <td className="border border-gray-300 px-4 py-2">
                    <AlertDialog.Root open={deleteTask === task.id} onOpenChange={(open) => setDeleteTask(open ? task.id : null)}>
                      <AlertDialog.Trigger asChild>
                        <Button variant="secondary" onClick={() => setDeleteTask(task.id)}>
                          Delete <span className='sr-only'>{task.name} task</span>
                        </Button>
                      </AlertDialog.Trigger>
                      <AlertDialog.Portal>
                        <AlertDialog.Overlay className="fixed inset-0 bg-black/30" />
                        <AlertDialog.Content className="fixed top-1/2 left-1/2 bg-white p-6 rounded shadow-lg -translate-x-1/2 -translate-y-1/2">
                          <AlertDialog.Title className="font-bold text-lg mb-2">Delete Task</AlertDialog.Title>
                          <AlertDialog.Description className="mb-4">
                            Are you sure you want to delete <span className="font-semibold">{task.name}</span>? This action cannot be undone.
                          </AlertDialog.Description>
                          <div className="flex justify-end gap-2">
                            <AlertDialog.Cancel asChild>
                              <Button variant="primary" onClick={() => setDeleteTask(null)}>
                                Cancel
                              </Button>
                            </AlertDialog.Cancel>
                            <AlertDialog.Action asChild>
                              <Button variant="secondary" onClick={() => handleDeleteTask(task.id)}>
                                Delete
                              </Button>
                            </AlertDialog.Action>
                          </div>
                        </AlertDialog.Content>
                      </AlertDialog.Portal>
                    </AlertDialog.Root>
                  </td>
                </tr>
              )
            })}
            {tasks.length === 0 && (
              <tr>
                <td colSpan={6} className="py-4 text-gray-500">
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