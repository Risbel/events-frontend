import { DiscoRole } from '@/services/getDiscoRoles'
import { Avatar, AvatarImage } from '@radix-ui/react-avatar'
import React from 'react'
import AddRoleButton from '../buttons/AddRoleButton'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import PermissionsByDiscoRole from './PermissionsByDiscoRole'

const PermissionCard = ({
  logo,
  name,
  roles,
  discoId,
}: {
  logo: string
  name: string
  roles: DiscoRole[]
  discoId: string
}) => {
  return (
    <div className="p-4 pl-0">
      <div className="flex items-center gap-4 rounded-full bg-gradient-to-r from-blue-700/30 via-transparent to-transparent">
        <Avatar>
          <AvatarImage className="rounded-full h-16 w-16" src={logo} />
        </Avatar>
        <h1 className="text-white text-xl">{name}</h1>
      </div>

      <div className="flex gap-4 py-4">
        <div className="px-2">
          <h2 className="text-white text-lg font-semibold">Roles</h2>
          {roles.map(rol => (
            <div key={rol.id}>
              <span className="text-white">{rol.name}</span>
            </div>
          ))}
        </div>
        <div>
          <AddRoleButton discoId={discoId} />
        </div>
      </div>

      <div className=" overflow-y-scroll">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[120px]">Roles</TableHead>
              <TableHead>Permissions on resources</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {roles.map(role => (
              <TableRow key={role.id}>
                <TableCell className="text-white">{role.name}</TableCell>
                <TableCell>
                  <PermissionsByDiscoRole roleId={role.id} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

export default PermissionCard
