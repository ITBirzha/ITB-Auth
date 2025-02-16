import React from 'react'
import { useTranslation } from 'react-i18next'

import { useToast } from '@/hooks/use-toast.ts'
import { post } from '@/config/api/api.ts'
import { endpoints } from '@/config/api/endpoints.ts'

import { LoginRequest } from './types.ts'

export const useSubmitLogin = () => {
  const { t } = useTranslation()
  const { toast } = useToast()

  return async (data: LoginRequest, event?: React.BaseSyntheticEvent) => {
    event?.preventDefault()

    try {
      await post(endpoints.AUTH.LOGIN, data)
    } catch {
      toast({
        title: t('login.toasts.title'),
        description: t('login.toasts.description'),
        variant: 'destructive'
      })
    }
  }
}
