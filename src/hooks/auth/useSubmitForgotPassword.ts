import { useTranslation } from 'react-i18next'

import { useToast } from '@/hooks/use-toast.ts'
import { api } from '@/config/api/api.ts'
import { endpoints } from '@/config/api/endpoints.ts'

import { ForgotPasswordRequest } from './types.ts'

export const useSubmitForgotPassword = () => {
  const { t } = useTranslation()
  const { toast } = useToast()

  return async (data: ForgotPasswordRequest) => {
    try {
      await api.post(endpoints.AUTH.FORGOT_PASSWORD, data)
      toast({
        title: t('forgot_password.toasts.success.title'),
        description: t('forgot_password.toasts.success.description')
      })
    } catch {
      toast({
        title: t('forgot_password.toasts.error.title'),
        description: t('forgot_password.toasts.error.description'),
        variant: 'destructive'
      })
    }
  }
}
