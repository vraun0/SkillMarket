import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { useDelete } from '@/hooks/useDelete'
import { Button } from '@/components/ui/button'
import { useRouteContext } from '@tanstack/react-router'

export function Delete({
  course_id,
  refetch,
}: {
  course_id: string
  refetch: () => void
}) {
  const { auth } = useRouteContext({ from: '/_protected/admin/home' })
  const deleteMutation = useDelete(auth)

  const deleteHandler = () => {
    deleteMutation.mutate(course_id, {
      onSuccess: () => {
        refetch()
      },
    })
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" className="text-primary dark:text-dark-primary">
          Delete
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            <div className="text-text dark:text-dark-text">
              Are you absolutely sure?
            </div>
          </DialogTitle>
          <DialogDescription>
            <div className="text-muted-text dark:text-dark-muted-text">
              This action cannot be undone. This will permanently delete your
              course and remove your data from our servers.
            </div>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button
              variant="ghost"
              onClick={deleteHandler}
              className="bg-red-600 text-dark-text w-20"
              disabled={deleteMutation.isPending}
            >
              {deleteMutation.isPending ? 'Deleting...' : 'Delete'}
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}


