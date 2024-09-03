/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
'use client'

import { useRouter } from 'next/navigation'

import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@tanstack/react-query'
import { FormProvider, useForm } from 'react-hook-form'
import { toast } from 'sonner'

import Button from '@/components/ui/button'
import { EmailInput, PasswordInput } from '@/components/ui/form'
import { FORM_LOGIN_AUTH } from '@/constants/form'
import { ROUTES } from '@/constants/routes'
import authService from '@/service/auth.service'
import { useUserStore } from '@/store/user.store'
import { setLocalStorage, TokenStorage } from '@/utils/local-storage'
import { validationLoginSchema } from '@/utils/validate'

const Login = () => {
  const router = useRouter()
  const { setUser, setIsAuthenticated } = useUserStore()
  const { mutate, isPending } = useMutation({ mutationFn: authService.login })

  const methods = useForm({
    resolver: yupResolver(validationLoginSchema),
  })

  const {
    watch,
    handleSubmit,
    reset,
    formState: { errors },
  } = methods

  const isFormValid = watch(FORM_LOGIN_AUTH.email) && watch(FORM_LOGIN_AUTH.password)
  const isSubmitDisabled = isPending || !isFormValid

  const onSubmit = async (data: any) => {
    if (isSubmitDisabled) return

    mutate(
      { email: data.email, password: data.password },
      {
        onSuccess: (response) => {
          toast.success(response?.message)
          setIsAuthenticated(true)
          setUser(response?.data?.user!)
          setLocalStorage('user', response?.data?.user!)
          TokenStorage.setToken(response?.data?.tokens?.access_token!)
          TokenStorage.setRefreshToken(response?.data?.tokens?.refresh_token!)
          router.push(ROUTES.HOME)
          reset()
        },
        onError: (error) => {
          console.error(error)
          toast.error(error?.message || 'An error occurred during login')
        },
      }
    )
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className='mx-auto w-full max-w-md'>
        <div className='mb-8 text-center'>
          <h1 className='text-3xl font-bold text-gray-800'>Welcome Back</h1>
          <p className='mt-2 text-gray-600'>Log in to access your dashboard</p>
        </div>

        <div className='space-y-6'>
          <EmailInput id={FORM_LOGIN_AUTH.email} label='Email' placeholder='Enter your email' errors={errors} />
          <PasswordInput
            id={FORM_LOGIN_AUTH.password}
            label='Password'
            placeholder='Enter your password'
            errors={errors}
          />

          <Button
            type='submit'
            disabled={isSubmitDisabled}
            className='hover:bg-primary-dark w-full rounded-lg bg-primary py-2 text-white transition duration-300'
          >
            {isPending ? 'Logging in...' : 'Log In'}
          </Button>
        </div>

        <div className='mt-6 text-center text-sm'>
          <p className='text-gray-600'>
            By logging in, you agree to our{' '}
            <a
              href='https://ledat-portfolio.vercel.app/'
              target='_blank'
              rel='noopener noreferrer'
              className='text-primary hover:underline'
            >
              Privacy & Terms
            </a>
          </p>
        </div>

        <div className='mt-4 flex justify-center'>
          <button
            type='button'
            onClick={() => toast.info('Password reset feature coming soon!')}
            className='text-primary hover:underline focus:outline-none'
          >
            Forgot password?
          </button>
        </div>

        <div className='mt-8 text-center'>
          <p className='text-gray-600'>
            Don&apos;t have an account?{' '}
            <a href={ROUTES.REGISTER} className='text-primary hover:underline'>
              Sign up
            </a>
          </p>
        </div>
      </form>
    </FormProvider>
  )
}

export default Login
