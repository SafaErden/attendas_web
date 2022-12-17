import { IUser } from '../pages/Users/users'
import endpoints from '../services/endpoints'
import { request } from '../utils/request'

export const getUsers = (query: string) => request.get(endpoints.users(query))
export const getUser = (userId: string) => request.get(endpoints.getUser(userId))
export const createUser = (data: Partial<IUser>) => request.post(endpoints.createUser(), data)
export const editUser = (data: Partial<IUser>) => request.put(endpoints.editUser(), data)
export const getRoles = () => request.get(endpoints.roles())
export const getUserContactRoles = () => request.get(endpoints.contactRoles())
