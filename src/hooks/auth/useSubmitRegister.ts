import { useTranslation } from 'react-i18next'

import { useToast } from '@/hooks/use-toast.ts'
import { post } from '@/config/api/api.ts'
import { endpoints } from '@/config/api/endpoints.ts'

import { RegisterRequest } from './types.ts'

export const useSubmitRegister = () => {
  const { t } = useTranslation()
  const { toast } = useToast()

  return async (data: RegisterRequest) => {
    try {
      await post(endpoints.AUTH.REGISTER, {
        name: data.name,
        email: data.email,
        password: data.password
      })
    } catch {
      toast({
        title: t('register.toasts.title'),
        description: t('register.toasts.description'),
        variant: 'destructive'
      })
    }
  }
}
