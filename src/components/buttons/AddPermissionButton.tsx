'use client'

import { useState } from 'react'

import clsx from 'clsx'
import AddPermissionForm from '../forms/AddPermissionForm'
import { Button } from '../ui/button'

const AddPermissionButton = ({ roleId }: { roleId: string }) => {
  const [isActiveForm, setIsActiveForm] = useState(false)

  return (
    <div>
      <Button
        size={'sm'}
        variant={'outline'}
        onClick={() => setIsActiveForm(true)}
        className={clsx(isActiveForm && 'hidden', 'text-black')}
      >
        +
      </Button>

      {isActiveForm && (
        <AddPermissionForm roleId={roleId} setIsActiveForm={setIsActiveForm} />
      )}
    </div>
  )
}

export default AddPermissionButton
