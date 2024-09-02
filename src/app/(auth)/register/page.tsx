'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'

import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@tanstack/react-query'
import { FormProvider, useForm } from 'react-hook-form'
import { toast } from 'sonner'

import Button from '@/components/ui/button'
import { EmailInput, PasswordInput, TextInput } from '@/components/ui/form'
import { FORM_SIGN_AUTH } from '@/constants/form'
import { ROUTES } from '@/constants/routes'
import authService from '@/service/auth.service'
import { validationSignUpSchema } from '@/utils/validate'

const Register = () => {
  const router = useRouter()
  const { mutate, isPending } = useMutation({ mutationFn: authService.register })

  const methods = useForm({
    resolver: yupResolver(validationSignUpSchema),
  })

  const {
    watch,
    handleSubmit,
    reset,
    formState: { errors },
  } = methods

  const isFormValid = watch(FORM_SIGN_AUTH.email) && watch(FORM_SIGN_AUTH.password) && watch(FORM_SIGN_AUTH.name)
  const isSubmitDisabled = isPending || !isFormValid

  const onSubmit = (data: any) => {
    if (isSubmitDisabled) return

    mutate(
      { email: data.email, name: data.name, password: data.password },
      {
        onSuccess: (response) => {
          toast.success(response?.message)
          reset()
          router.push(ROUTES.LOGIN)
        },
        onError: (error) => {
          console.error(error)
          toast.error(error?.message || 'An error occurred during registration')
        },
      }
    )
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className='mx-auto w-full max-w-md'>
        <div className='mb-8 text-center'>
          <h1 className='text-3xl font-bold text-gray-800'>Join DatBoard</h1>
          <p className='mt-2 text-gray-600'>The future of task management</p>
        </div>

        <div className='space-y-6'>
          <TextInput errors={errors} />
          <EmailInput errors={errors} />
          <PasswordInput errors={errors} />

          <Button
            type='submit'
            disabled={isSubmitDisabled}
            className='hover:bg-primary-dark w-full rounded-lg bg-primary py-2 text-white transition duration-300'
          >
            {isPending ? 'Registering...' : 'Register'}
          </Button>
        </div>

        <div className='mt-6 text-center text-sm'>
          <p className='text-gray-600'>
            By registering, you agree to our{' '}
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
          <Link href='/reset-password' className='text-primary hover:underline focus:outline-none'>
            Forgot password?
          </Link>
        </div>

        <div className='mt-8 text-center'>
          <p className='text-gray-600'>
            Already have an account?{' '}
            <Link href={ROUTES.LOGIN} className='text-primary hover:underline'>
              Login
            </Link>
          </p>
        </div>
      </form>
    </FormProvider>
  )
}

export default Register
