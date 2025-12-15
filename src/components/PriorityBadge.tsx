import { AlertCircle, AlertTriangle, Circle, MinusCircle } from 'lucide-react'

type PriorityLevel = 'high' | 'medium' | 'low' | 'none'

const priorities: Record<
  PriorityLevel,
  {
    label: string
    icon: React.ElementType
    className: string
  }
> = {
  high: {
    label: 'High Priority',
    icon: AlertTriangle,
    className: 'bg-red-100 text-red-700',
  },
  medium: {
    label: 'Medium Priority',
    icon: AlertCircle,
    className: 'bg-yellow-100 text-yellow-700',
  },
  low: {
    label: 'Low Priority',
    icon: MinusCircle,
    className: 'bg-blue-100 text-blue-700',
  },
  none: {
    label: 'No Priority',
    icon: Circle,
    className: 'bg-gray-100 text-gray-500',
  },
}

interface PriorityBadgeProps {
  level?: PriorityLevel
}

export default function PriorityBadge({ level = 'none' }: PriorityBadgeProps) {
  const priority = priorities[level]
  const Icon = priority.icon

  return (
    <span
      className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-sm font-medium ${priority.className}`}
    >
      <Icon className="w-4 h-4" />
      <span className="sr-only">{priority.label}</span>
    </span>
  )
}
