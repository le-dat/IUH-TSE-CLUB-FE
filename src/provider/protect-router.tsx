'use client'

import { usePathname, useRouter } from 'next/navigation'

import { useEffect } from 'react'

import { ROUTES } from '@/constants/routes'
import { useUserStore } from '@/store/user.store'

const ProtectRouter = ({ children }: { children: React.ReactNode }) => {
  const pathName = usePathname()
  const router = useRouter()
  const { isAuthenticated } = useUserStore()

  useEffect(() => {
    const redirectToHome = () => {
      if (pathName === ROUTES.LOGIN || pathName === ROUTES.REGISTER) {
        router.push(ROUTES.HOME)
      }
    }

    const redirectToLogin = () => {
      if (pathName === ROUTES.REGISTER) {
        router.push(ROUTES.REGISTER)
      } else {
        router.push(ROUTES.LOGIN)
      }
    }

    if (isAuthenticated) {
      redirectToHome()
    } else {
      redirectToLogin()
    }
  }, [isAuthenticated, pathName, router])

  return <>{children}</>
}

export default ProtectRouter
