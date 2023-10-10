import React from 'react'
import SubscribeButton from '../buttons/SubscribeButton'

const SubscribeNow = ({
  userId,
  discoId,
}: {
  userId: string
  discoId: string
}) => {
  return (
    <div className="flex items-center gap-4 bg-gradient-to-r from-violet-900 via-transparent to-transparent  pl-2">
      <h1 className="font-normal text-lg text-white">Subscribe now here:</h1>
      <SubscribeButton userId={userId} discoId={discoId} />
    </div>
  )
}

export default SubscribeNow
