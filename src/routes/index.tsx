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
    columnHelper.accessor('completed', {
      header: () => <span className="sr-only">Completed</span>,
    }),
    columnHelper.accessor('name', { header: 'Name' }),
    columnHelper.accessor('priority', { header: 'Priority' }),
  ]

  const table = useReactTable({
    data: tasks,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <main className="container mx-auto px-4">
      <h1 className='font-extrabold text-4xl py-8'>Welcome to the To-Do List App</h1>
      {deleteMessage && (
        <div
          role="status"
          aria-live="polite"
          className="sr-only"
        >
          {deleteMessage}
        </div>
      )}
      {tasks.length === 0 ? (
        <div className="flex flex-col items-start justify-center py-8">
          <p className="mb-6 text-xl text-black max-w-xl">
            Either you have done everything already or there are still things for you to add to your list.
          </p>
          <Button asChild>
            <Link to="/create-task">
              Add your first to-do
            </Link>
          </Button>
        </div>
      ) : (
          <div className="overflow-auto w-full pb-4 focus:outline-2 focus:outline-indigo-600 focus:shadow-xl" role="region" aria-labelledby="to-do-list" tabIndex={0}>
          <table className="w-min md:w-full border-collapse border border-gray-300">
            <caption id="to-do-list" className='font-bold text-2xl py-4 text-left'>To-do list</caption>
            <thead>
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      className="border-black border-2 px-4 py-2 bg-gray-100"
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                    </th>
                  ))}
                  <th className=" border-black border-2 px-4 py-2 bg-gray-100 ">Edit</th>
                  <th className=" border-black border-2 px-4 py-2 bg-gray-100">Delete</th>
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
            </tbody>
          </table>
        </div>
      )}
    </main>
  )
}