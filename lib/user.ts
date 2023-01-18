import { getAppConfig } from "@/utils/config"

export interface User {
  id: number
  firstName: string
  lastName: string
  gender: string
  birthDate: string
  phone: string
}

export type GetUserRequest = {
  id: number
}

export type GetUserResponse = User

export async function getUser(req: GetUserRequest) {
  const config = getAppConfig();
  const url = new URL(config.baseUrl + "users/" + req.id)
  const res = await fetch(url)
  const data: GetUserResponse = await res.json()
  return data
}
