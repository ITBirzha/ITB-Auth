import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'

import { useTranslation } from 'react-i18next'

import { getLoginSchema } from '@/components/forms/utils/schemas.ts'
import { zodResolver } from '@hookform/resolvers/zod'

import { useSubmitLogin } from '@/hooks/auth/useSubmitLogin.ts'

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

import { OAuthButtons } from '@/components/ui/OAuthButtons.tsx'

export function LoginForm() {
  const { t } = useTranslation()
  const schema = getLoginSchema(t)

  const {
    register,
    handleSubmit,
    formState: { errors, isValid }
  } = useForm({
    resolver: zodResolver(schema),
    mode: 'onChange',
    defaultValues: {
      email: '',
      password: ''
    }
  })

  const onSubmit = useSubmitLogin()

  return (
    <Card className='mx-auto max-w-sm'>
      <CardHeader>
        <CardTitle className='text-2xl'>{t('login.form.title')}</CardTitle>
        <CardDescription className='w-full text-center text-sm'>
          {t('login.form.description')}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit((data, event) => onSubmit(data, event))}>
          <div className='grid gap-4'>
            <div className='grid gap-2'>
              <Label htmlFor='email'>{t('login.form.email')}</Label>
              <Input
                id='email'
                type='email'
                placeholder='m@example.com'
                autoComplete='email'
                {...register('email')}
                required
              />
              {errors.email && <p className='text-sm text-red-600'>{errors.email.message}</p>}
            </div>
            <div className='grid gap-2'>
              <div className='flex items-center'>
                <Label htmlFor='password'>{t('login.form.password')}</Label>
                <Link
                  to={routes.AUTH.FORGOT_PASSWORD}
                  className='ml-auto inline-block text-sm text-blue-600'
                >
                  {t('login.form.forgot_your_password')}
                </Link>
              </div>
              <Input
                id='password'
                type='password'
                autoComplete='current-password'
                {...register('password')}
                required
              />
              {errors.password && <p className='text-sm text-red-600'>{errors.password.message}</p>}
            </div>
            <Button
              type='submit'
              className='w-full'
              disabled={Object.keys(errors).length > 0 || !isValid}
            >
              {t('login.form.to_login')}
            </Button>
            <OAuthButtons />
          </div>
        </form>
        <div className='mt-4 text-center text-sm'>
          {t('login.form.no_account')}{' '}
          <Link
            to={routes.AUTH.REGISTER}
            className='underline text-blue-600'
          >
            {t('register.form.to_register')}
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}
