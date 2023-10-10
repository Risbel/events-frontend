'use client'

import { useCreateSubscription } from '@/hooks/useCreateSubscription'
import { Button } from '../ui/button'
import Spinner from '../loaders/Spinner'

const SubscribeButton = ({
  userId,
  discoId,
}: {
  userId: string
  discoId: string
}) => {
  const { subscribe, isLoading } = useCreateSubscription()

  return (
    <Button
      onClick={() => subscribe({ userId, discoId })}
      className="bg-slate-700 shadow-xl hover:shadow-blue-500/40 hover:border-b px-2 md:px-4"
      size={'lg'}
    >
      <span className="text-md md:text-xl flex gap-1 items-center">
        Subscribe {isLoading && <Spinner size={15} />}
      </span>
    </Button>
  )
}

export default SubscribeButton
