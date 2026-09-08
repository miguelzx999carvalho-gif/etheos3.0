import { useEffect, useState } from 'react'

/**
 * Hook genérico que sincroniza um estado com o localStorage.
 * Utilizado pelo protótipo para persistir dados no navegador.
 */
export function useLocalStorage<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(() => {
    try {
      const stored = window.localStorage.getItem(key)
      return stored ? (JSON.parse(stored) as T) : initialValue
    } catch {
      return initialValue
    }
  })

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value))
    } catch {
      // armazenamento cheio ou indisponível — ignora
    }
  }, [key, value])

  return [value, setValue] as const
}
