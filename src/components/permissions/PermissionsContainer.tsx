'use client'

import { useGetDiscoRoles } from '@/hooks/useGetDiscoRoles'
import PermissionCard from './PermissionCard'
import useGetMe from '@/hooks/useGetMe'
import Spinner from '../loaders/Spinner'
import Resource405 from '../alerts/Resource405'
import BackToHome from '../links/BackToHome'

const PermissionsContainer = () => {
  const { isLoading: isLoadingMy, user } = useGetMe()

  const {
    isLoading: isLoadingDiscoRoles,
    data,
    error,
    isError,
  } = useGetDiscoRoles()

  if (isLoadingMy) {
    return (
      <div className="flex pt-24 justify-center">
        <Spinner size={20} />
      </div>
    )
  }

  if (user) {
    if (user.role !== 'superAdmin') {
      return (
        <div className="flex flex-col justify-center items-center gap-8 pt-24">
          <Resource405 text={'This resource is just reserved for admins'} />
          <BackToHome />
        </div>
      )
    }
  }

  if (isError && error) {
    return <div>We have had a problem, please try again later.</div>
  }

  if (isLoadingDiscoRoles) {
    return (
      <div className="w-screen flex justify-center">
        <Spinner size={20} />
      </div>
    )
  }

  return (
    <div>
      <div className="col-span-2 md:col-start-2">
        <h1 className="text-2xl text-white font-bold pb-4">Permissions :</h1>
      </div>
      {data &&
        data?.map(disco => (
          <PermissionCard
            key={disco.id}
            logo={disco.logo}
            name={disco.name}
            roles={disco.DiscoRoles}
            discoId={disco.id}
          />
        ))}
    </div>
  )
}

export default PermissionsContainer
