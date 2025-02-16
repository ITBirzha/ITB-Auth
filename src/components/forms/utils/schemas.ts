import { z } from 'zod'

interface TranslationFunction {
  (key: string): string
}

export const getLoginSchema = (t: TranslationFunction) =>
  z.object({
    email: z.string().email(t('errors.invalid_email')),
    password: z.string().min(6, t('errors.short_password'))
  })

export const getRegisterSchema = (t: TranslationFunction) =>
  z
    .object({
      name: z
        .string()
        .min(1, t('errors.required_name'))
        .regex(/^[A-Za-zА-Яа-яЁё\s]+$/, t('errors.invalid_name')),
      email: z.string().email(t('errors.invalid_email')),
      password: z.string().min(6, t('errors.short_password')),
      confirmPassword: z.string().min(6, t('errors.required_confirm_password'))
    })
    .refine(data => data.password === data.confirmPassword, {
      message: t('errors.passwords_do_not_match'),
      path: ['confirmPassword']
    })

export const getForgotPasswordSchema = (t: TranslationFunction) =>
  z.object({
    email: z.string().email(t('errors.invalid_email'))
  })
