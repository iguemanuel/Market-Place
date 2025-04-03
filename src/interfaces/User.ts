export interface User {
  email: string
  password: string
  id?: number
  name?: string
  role?: string
  image_path?: string
}

export interface UserAddress {
  street: string
  number: number
  zip: string
  city: string
  state: string
  id: number
  user_id: number
  country: string
}
