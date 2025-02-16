import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'

import { useTranslation } from 'react-i18next'

import { getRegisterSchema } from '@/components/forms/utils/schemas.ts'
import { zodResolver } from '@hookform/resolvers/zod'

import { useSubmitRegister } from '@/hooks/auth/useSubmitRegister.ts'

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

export function RegisterForm() {
  const { t } = useTranslation()
  const schema = getRegisterSchema(t)

  const {
    register,
    handleSubmit,
    formState: { errors, isValid }
  } = useForm({
    resolver: zodResolver(schema),
    mode: 'onChange',
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: ''
    }
  })

  const onSubmit = useSubmitRegister()

  return (
    <Card className='mx-auto max-w-sm'>
      <CardHeader>
        <CardTitle className='text-2xl'>{t('register.form.title')}</CardTitle>
        <CardDescription className='w-full text-center text-sm'>
          {t('register.form.description')}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='grid gap-4'>
            <div className='grid gap-2'>
              <Label htmlFor='name'>{t('register.form.fullname')}</Label>
              <Input
                id='name'
                type='text'
                placeholder={t('register.form.placeholder')}
                autoComplete='name'
                {...register('name')}
                required
              />
              {errors.name && <p className='text-sm text-red-600'>{errors.name.message}</p>}
            </div>
            <div className='grid gap-2'>
              <Label htmlFor='email'>{t('register.form.email')}</Label>
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
              <Label htmlFor='password'>{t('register.form.password')}</Label>
              <Input
                id='password'
                type='password'
                autoComplete='new-password'
                {...register('password')}
                required
              />
              {errors.password && <p className='text-sm text-red-600'>{errors.password.message}</p>}
            </div>
            <div className='grid gap-2'>
              <Label htmlFor='confirmPassword'>{t('register.form.confirm_password')}</Label>
              <Input
                id='confirmPassword'
                type='password'
                autoComplete='new-password'
                {...register('confirmPassword')}
                required
              />
              {errors.confirmPassword && (
                <p className='text-sm text-red-600'>{errors.confirmPassword.message}</p>
              )}
            </div>
            <Button
              type='submit'
              className='w-full'
              disabled={Object.keys(errors).length > 0 || !isValid}
            >
              {t('register.form.to_register')}
            </Button>
            <OAuthButtons />
          </div>
        </form>
        <div className='mt-4 text-center text-sm'>
          {t('register.form.have_account')}{' '}
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
