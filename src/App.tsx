import './i18n'

import { AppProvider, ToastProvider } from '@/providers'

export default function App() {
  return (
    <>
      <AppProvider />
      <ToastProvider />
    </>
  )
}
