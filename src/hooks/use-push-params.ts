import { useRouter } from 'next/navigation'

import { useCallback } from 'react'

import { ROUTES } from '@/constants/routes' // Adjust the import according to your project structure

const usePushParams = () => {
  const router = useRouter()

  const pushParamsToUrl = useCallback(
    (params: Record<string, any>) => {
      const searchParams = new URLSearchParams(window.location.search)
      Object.entries(params).forEach(([key, value]) => {
        searchParams.set(key, value)
      })
      const newUrl = `${ROUTES.SEARCH}?${searchParams.toString()}`
      router.push(newUrl)
    },
    [router]
  )

  return { pushParamsToUrl }
}

export default usePushParams
