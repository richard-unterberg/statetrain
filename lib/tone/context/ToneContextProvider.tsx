import { createContext, ReactNode, useMemo, useState } from 'react'

import { ToneType, TransportType } from '#lib/types'
import useInternalContextMetronome from '#tone/hooks/useInternalContextMetronome'

export interface ToneContextGetter {
  tone: ToneType | undefined
  transport: TransportType | undefined
}

export interface ToneContextSetter {
  setTone: React.Dispatch<React.SetStateAction<ToneType | undefined>>
  setTransport: React.Dispatch<React.SetStateAction<TransportType | undefined>>
  setMetronome: () => void
}

export type ToneContextValues = ToneContextGetter & ToneContextSetter

export const ToneContext = createContext<ToneContextValues | undefined>(undefined)

const ToneContextProvider = ({ children }: { children: ReactNode }) => {
  const [tone, setTone] = useState<ToneType | undefined>()
  const [transport, setTransport] = useState<TransportType | undefined>()

  // we init and provide a internal hook here for the global metronome
  const { setMetronome } = useInternalContextMetronome({ tone, transport })

  const toneContextValue = useMemo(
    () => ({ tone, setTone, transport, setTransport, setMetronome }),
    [setMetronome, tone, transport],
  )

  return <ToneContext.Provider value={toneContextValue}>{children}</ToneContext.Provider>
}

export default ToneContextProvider
