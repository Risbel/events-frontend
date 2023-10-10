import httpService from "@/config/axios.config";

export const getDiscoRoles = async (): Promise<Disco[]> => {
  try {
    const response = await httpService.get("/discoRoles");
    return response.data;
  } catch (error) {
    return error.message;
  }
};

export interface Disco {
  id: string;
  name: string;
  logo: string;
  createdAt: string;
  updatedAt: string;
  DiscoRoles: DiscoRole[];
}

export interface DiscoRole {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  discoId: string;
  rolePermissionResouces: RolePermissionResouces[];
}

export interface RolePermissionResouces {
  id: string;
  createdAt: string;
  updatedAt: string;
  discoRoleId: string;
  permissionId: string;
  resourceId: string;
}
