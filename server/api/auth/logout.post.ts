import { deleteSession } from "../../services/session.service"

export default defineEventHandler(async (event) => {
  const token = getCookie(event, 'auth_token')

  if (token) {
    await deleteSession(token)
  }

  deleteCookie(event, 'auth_token')

  return {
    message: 'Logout successful',
  }
})