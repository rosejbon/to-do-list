import * as AlertDialog from '@radix-ui/react-alert-dialog'
import { Button } from './Button'

type DeleteDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  onDelete: () => void
  onCancel: () => void
  taskName: string
}

export default function DeleteDialog({
  open,
  onOpenChange,
  onDelete,
  onCancel,
  taskName,
}: DeleteDialogProps) {
  return (
    <AlertDialog.Root open={open} onOpenChange={onOpenChange}>
      <AlertDialog.Trigger asChild>
        <Button variant="secondary">
          Delete <span className="sr-only">{taskName} task</span>
        </Button>
      </AlertDialog.Trigger>
      <AlertDialog.Portal>
        <AlertDialog.Overlay className="fixed inset-0 bg-black/30" />
        <AlertDialog.Content className="fixed top-1/2 left-1/2 bg-white p-6 rounded shadow-lg -translate-x-1/2 -translate-y-1/2">
          <AlertDialog.Title className="font-bold text-lg mb-2">
            Delete Task
          </AlertDialog.Title>
          <AlertDialog.Description className="mb-4">
            Are you sure you want to delete{' '}
            <span className="font-semibold">{taskName}</span>? This action
            cannot be undone.
          </AlertDialog.Description>
          <div className="flex justify-end gap-2">
            <AlertDialog.Cancel asChild>
              <Button variant="primary" onClick={onCancel}>
                Cancel
              </Button>
            </AlertDialog.Cancel>
            <AlertDialog.Action asChild>
              <Button variant="secondary" onClick={onDelete}>
                Delete
              </Button>
            </AlertDialog.Action>
          </div>
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  )
}
