import clsx from 'clsx'
import Link from 'next/link'
import React from 'react'

const BackToHome = ({ bg }: { bg?: string }) => {
  return (
    <Link
      className={clsx(
        'text-md text-white p-2 bg-purple-600/40 hover:bg-purple-500/40 rounded-lg',
        `${bg}`
      )}
      href={'/'}
    >
      Back to home
    </Link>
  )
}

export default BackToHome
