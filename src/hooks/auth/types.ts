export interface RegisterRequest {
  name: string
  email: string
  password: string
  confirmPassword: string
}

export interface LoginRequest {
  email: string
  password: string
}

export interface ForgotPasswordRequest {
  email: string
}
