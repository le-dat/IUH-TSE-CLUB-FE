/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
'use client'

import { useRouter } from 'next/navigation'

import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@tanstack/react-query'
import { FormProvider, useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { EmailInput, PasswordInput } from '@/components/ui/form'
import { FORM_LOGIN_AUTH } from '@/constants/form'
import { ROUTES } from '@/constants/routes'
import authService from '@/service/auth.service'
import { useUserStore } from '@/store/user.store'
import { TokenStorage } from '@/utils/local-storage'
import { validationLoginSchema } from '@/utils/validate'

const Login = () => {
  const methods = useForm({
    resolver: yupResolver(validationLoginSchema),
  })
  const {
    watch,
    handleSubmit,
    reset,
    formState: { errors },
  } = methods
  const router = useRouter()
  const { setUser, setIsAuthenticated } = useUserStore()
  const { mutate, isPending } = useMutation({ mutationFn: authService.login })
  const disabled = isPending || !watch(FORM_LOGIN_AUTH.email) || !watch(FORM_LOGIN_AUTH.password)

  const onSubmit = (data: any) => {
    if (disabled) return
    mutate(
      { email: data.email, password: data.password },
      {
        onSuccess: async (response) => {
          toast.success(response?.message)
          setUser(response?.data?.user!)
          setIsAuthenticated(true)
          TokenStorage.setToken(response?.data?.tokens?.access_token!)
          TokenStorage.setRefreshToken(response?.data?.tokens?.refresh_token!)
          router.push(ROUTES.HOME)
          reset()
        },
        onError: (error) => {
          console.error(error)
          toast.error(error?.message)
        },
      }
    )
  }

  const onErrors = (errors: any) => console.error(errors)

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit(onSubmit, onErrors)}
        className='relative flex size-full h-fit max-w-[436px] shrink flex-col rounded-2xl bg-white'
      >
        <div className='xs:p-12 xs:pb-6 flex w-full flex-col items-center gap-1 p-6'>
          <div className='text-2xl font-bold'>Login in to Beincom</div>
          <div className='mt-1 text-center text-sm font-normal'>The future of community engagement</div>
        </div>

        <div className='flex w-full flex-1 flex-col space-y-4 px-[42px] pb-[70px]'>
          <div className='space-y-4'>
            <EmailInput errors={errors} />
            <PasswordInput errors={errors} />
            <button
              className='relative flex h-10 w-full items-center justify-center space-x-2 whitespace-nowrap rounded-md bg-primary px-4 py-2 text-base font-medium text-white transition-colors hover:opacity-80 focus-visible:outline-[3px] active:ring disabled:!cursor-not-allowed disabled:bg-[rgba(234_237_242)] disabled:text-[rgb(68,79,142)] disabled:!ring-0 disabled:focus-visible:!outline-0 [&>svg]:size-6'
              disabled={disabled}
              type='submit'
            >
              {isPending ? 'Log In...' : 'Log In'}
            </button>
            <div className='!mt-2 w-full text-center text-xs font-normal text-[rgb(68,79,142)]'>
              By logging in, you agree to our{' '}
              <a target='_blank' className='underline' href='https://ledat-portfolio.vercel.app/'>
                Privacy &amp; Terms
              </a>
            </div>
            <div className='flex items-center gap-1'>
              <button
                type='button'
                onClick={() => toast.info('Coming soon!')}
                className='mx-auto cursor-pointer text-center !text-sm font-normal text-[rgba(9,97,237)] hover:underline disabled:cursor-not-allowed disabled:text-[rgb(68,79,142)] disabled:no-underline'
              >
                Forgot password?
              </button>
            </div>
          </div>
        </div>

        <div className='xs:p-12 xs:pt-6 w-full p-6'>
          <div className='text-neutral-60 w-full text-center text-sm'>
            Don’t have an account?{' '}
            <a className='font-medium text-[rgba(9,97,237)] hover:underline' href={ROUTES.REGISTER}>
              Sign up
            </a>
          </div>
        </div>
      </form>
    </FormProvider>
  )
}

export default Login
