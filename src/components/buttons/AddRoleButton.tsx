'use client'

import { useState } from 'react'

import clsx from 'clsx'
import { Button } from '../ui/button'
import AddRolesForm from '../forms/AddRolesForm'

const AddRoleButton = ({ discoId }: { discoId: string }) => {
  const [isActiveForm, setIsActiveForm] = useState(false)

  return (
    <div>
      <Button
        size={'sm'}
        variant={'outline'}
        onClick={() => setIsActiveForm(true)}
        className={clsx(isActiveForm && 'hidden')}
      >
        Add role
      </Button>

      {isActiveForm && (
        <AddRolesForm discoId={discoId} setIsActiveForm={setIsActiveForm} />
      )}
    </div>
  )
}

export default AddRoleButton
