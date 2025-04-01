import axios from 'axios'

const api = axios.create({
  baseURL: 'http://35.196.79.227:8000/',
})

const endPoints = {
  // Auth
  login: 'login',
  register: 'register',
  newToken: 'renew-token',
  // Users
  users: 'users/me',
  userModerator: 'users/create-moderator',
  // Address
  address: 'address',
  // Categories
  categories: 'categories',
  // Disounts
  discounts: 'discounts',
  // Cupons
  cupons: 'cupons',
  // Products
  products: 'products',
  productStock: 'products/stock',
  // Cart
  cart: 'cart',
  cartItems: 'cart/items',
  cartClear: 'cart/clear',
  // Orders
  orders: 'orders',
}

const url = 'http://35.196.79.227:8000'

export { api, endPoints, url }
