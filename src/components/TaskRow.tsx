import Checkbox from './Checkbox'
import DeleteDialog from './DeleteDialog'
import PriorityBadge from './PriorityBadge'

type Task = {
    id: string
    name: string
    createdDate: string
    priority: string
    completed: boolean
}

interface TaskRowProps {
    task: Task
    onCompletedChange: (id: string, checked: boolean) => void
    onDelete: (id: string) => void
    onOpenDelete: (id: string | null) => void
    deleteTask: string | null
    children?: React.ReactNode
}

export function TaskRow({
    task,
    onCompletedChange,
    onDelete,
    onOpenDelete,
    deleteTask,
    children,
}: TaskRowProps) {
    return (
        <tr>
            {/* Completed column */}
            <td className="border border-gray-300 px-4 py-2">
                <Checkbox
                    id={task.id}
                    checked={task.completed}
                    onCheckedChange={(checked) => onCompletedChange(task.id, checked)}
                />
            </td>
            {/* Task name column */}
            <td className="border border-gray-300 px-4 py-2 text-left">
                <label
                    htmlFor={task.id}
                    className={task.completed ? 'line-through text-gray-500' : ''}
                >
                    {task.name}
                </label>
            </td>
            {/* Priority column */}
            <td className="border border-gray-300 px-4 py-2">
                <PriorityBadge
                    level={
                        ['high', 'medium', 'low', 'none'].includes(task.priority)
                            ? (task.priority as 'high' | 'medium' | 'low' | 'none')
                            : 'none'
                    }
                />
            </td>
            {/* Edit column */}
            {/* 
                TODO: We pass the edit link as a child to TaskRow instead of hardcoding a TanStack Router <Link> here.
                This is a workaround for Storybook compatibility, since Storybook does not play well with TanStack Router's <Link> component.
                See: https://github.com/TanStack/router/discussions/952
            */}
            <td className="border border-gray-300 px-4 py-2">
                {children}
            </td>
            {/* Delete column */}
            <td className="border border-gray-300 px-4 py-2">
                <DeleteDialog
                    open={deleteTask === task.id}
                    onOpenChange={(open) => onOpenDelete(open ? task.id : null)}
                    onDelete={() => onDelete(task.id)}
                    onCancel={() => onOpenDelete(null)}
                    taskName={task.name}
                />
            </td>
        </tr>
    )
}
