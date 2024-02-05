import httpService from "@/config/axios.config";

export const getDiscoBySlug = async (slug: any) => {
  const response = await httpService.get<IDiscoRoles>(`/discoRoles/${slug}`, { validateStatus: null });

  return response.data;
};

export interface IDiscoRoles {
  id: string;
  name: string;
  logo: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
  DiscoRoles: IDiscoRole[];
}

interface IDiscoRole {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  discoId: string;
  rolePermissionResouces: IrolePermissionResouces[];
}

export interface IrolePermissionResouces {
  id: string;
  createdAt: string;
  updatedAt: string;
  discoRoleId: string;
  permissionId: string;
  resourceId: string;
  Permission: IPermission;
  Resource: IResource;
}

interface IPermission {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

interface IResource {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}
