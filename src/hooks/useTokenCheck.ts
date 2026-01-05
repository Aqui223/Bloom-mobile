import { createSecureStorage } from '@lib/storage'
import useTokenTriggerStore from '@stores/tokenTriggerStore'
import { useEffect, useState } from 'react'

interface useTokenCheck {
  isAuthenticated: boolean
  isLoading: boolean
}

export default function useTokenCheck(): useTokenCheck {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const { counter, setUserID } = useTokenTriggerStore()

  const init = async () => {
    try {
      createSecureStorage('user-storage').then(async (storage) => {
        const id = storage.getString('user_id')
        const token = storage.getString('token')
        setIsAuthenticated(!!token)
        if (id) setUserID(parseInt(id, 10))
      })
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    init()
  }, [])

  useEffect(() => {
    init()
  }, [counter])

  return { isAuthenticated, isLoading }
}
