import { DependencyList, EffectCallback, useEffect, useRef } from 'react'

const useEffectAfterMount = (cb: EffectCallback, dependencies: DependencyList | undefined) => {
  const mounted = useRef(true)

  useEffect(() => {
    if (!mounted.current) {
      return cb()
    }
    mounted.current = false
  }, dependencies) 
}

export { useEffectAfterMount }
