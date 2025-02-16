import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom'

import { ForgotPasswordPage, LoginPage, RegisterPage } from '@/pages'

import { routes } from '@/config/routes.ts'

export const AppProvider = () => {
  return (
    <Router>
      <div className='flex flex-col min-h-screen'>
        <main className='flex-grow flex items-center justify-center px-4'>
          <Routes>
            <Route
              path={routes.AUTH.LOGIN}
              element={<LoginPage />}
            />
            <Route
              path={routes.AUTH.REGISTER}
              element={<RegisterPage />}
            />
            <Route
              path={routes.AUTH.FORGOT_PASSWORD}
              element={<ForgotPasswordPage />}
            />
            <Route
              path={routes.HOME}
              element={
                <Navigate
                  to='/login'
                  replace
                />
              }
            />
          </Routes>
        </main>
      </div>
    </Router>
  )
}
