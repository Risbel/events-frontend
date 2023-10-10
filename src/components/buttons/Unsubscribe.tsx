import { useDeleteSubscription } from '@/hooks/useDeleteSubscription'
import { Button } from '../ui/button'

const Unsubscribe = ({ id }: { id: string }) => {
  const { unsubscribe } = useDeleteSubscription()

  return (
    <Button
      size={'sm'}
      onClick={() => unsubscribe(id)}
      className="hover:bg-red-800 hover:text-white"
      variant={'secondary'}
    >
      Unsubscribe
    </Button>
  )
}

export default Unsubscribe
