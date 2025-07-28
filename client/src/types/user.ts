export interface User {
  id: string
  name: string
  email: string
  courseIds: Array<string>
  admin: true | false
}
