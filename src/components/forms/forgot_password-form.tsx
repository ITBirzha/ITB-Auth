import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'

import { useTranslation } from 'react-i18next'

import { getForgotPasswordSchema } from '@/components/forms/utils/schemas.ts'
import { zodResolver } from '@hookform/resolvers/zod'

import { useSubmitForgotPassword } from '@/hooks/auth/useSubmitForgotPassword.ts'

import { routes } from '@/config/routes.ts'

import { Button } from '@/components/ui/lib/button.tsx'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/lib/card.tsx'
import { Input } from '@/components/ui/lib/input.tsx'
import { Label } from '@/components/ui/lib/label.tsx'

export function ForgotPasswordForm() {
  const { t } = useTranslation()
  const schema = getForgotPasswordSchema(t)

  const {
    register,
    handleSubmit,
    formState: { errors, isValid }
  } = useForm({
    resolver: zodResolver(schema),
    mode: 'onChange',
    defaultValues: {
      email: ''
    }
  })

  const onSubmit = useSubmitForgotPassword()

  return (
    <Card className='mx-auto max-w-sm'>
      <CardHeader>
        <CardTitle className='text-2xl'>{t('forgot_password.title')}</CardTitle>
        <CardDescription className='w-full text-center text-sm'>
          {t('forgot_password.description')}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='grid gap-4'>
            <div className='grid gap-2'>
              <Label htmlFor='email'>{t('forgot_password.email')}</Label>
              <Input
                id='email'
                type='email'
                placeholder='m@example.com'
                {...register('email')}
                required
              />
              {errors.email && <p className='text-sm text-red-600'>{errors.email.message}</p>}
            </div>
            <Button
              type='submit'
              className='w-full'
              disabled={Object.keys(errors).length > 0 || !isValid}
            >
              {t('forgot_password.to_reset')}
            </Button>
          </div>
        </form>
        <div className='mt-4 text-center text-sm'>
          {t('forgot_password.remember_password')}{' '}
          <Link
            to={routes.AUTH.LOGIN}
            className='underline text-blue-600'
          >
            {t('login.form.to_login')}
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}
