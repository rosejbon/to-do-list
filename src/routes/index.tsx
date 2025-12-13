import { createFileRoute } from '@tanstack/react-router'
import * as React from 'react'
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table'

type Task = {
  name: string
  priority: string
  completed: boolean
}

export const Route = createFileRoute('/')({
  component: App,
})

function App() {
  const [tasks, setTasks] = React.useState<Task[]>([])

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

  const columnHelper = createColumnHelper<Task>()
  const columns = [
    columnHelper.accessor('name', { header: 'Name' }),
    columnHelper.accessor('priority', { header: 'Priority' }),
    columnHelper.accessor('completed', {
      header: 'Completed',
      cell: info => (info.getValue() ? 'Yes' : 'No'),
    }),
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
            {table.getHeaderGroups().map(headerGroup => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                  <th
                    key={header.id}
                    className="border border-gray-300 px-4 py-2 bg-gray-100"
                  >
                    {flexRender(header.column.columnDef.header, header.getContext())}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map(row => (
              <tr key={row.id}>
                {row.getVisibleCells().map(cell => (
                  <td key={cell.id} className="border border-gray-300 px-4 py-2">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
            {tasks.length === 0 && (
              <tr>
                <td colSpan={columns.length} className="py-4 text-gray-500">
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