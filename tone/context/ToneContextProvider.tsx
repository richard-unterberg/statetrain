import { createContext, type ReactNode, useMemo, useState } from "react"

import type { ToneType, TransportType } from "#lib/types"

export interface ToneContextGetter {
  tone: ToneType | undefined
  transport: TransportType | undefined
}

export interface ToneContextSetter {
  setTone: React.Dispatch<React.SetStateAction<ToneType | undefined>>
  setTransport: React.Dispatch<React.SetStateAction<TransportType | undefined>>
}

export type ToneContextValues = ToneContextGetter & ToneContextSetter

export const ToneContext = createContext<ToneContextValues | undefined>(undefined)

const ToneContextProvider = ({ children }: { children: ReactNode }) => {
  const [tone, setTone] = useState<ToneType | undefined>()
  const [transport, setTransport] = useState<TransportType | undefined>()

  const toneContextValue = useMemo(() => ({ tone, setTone, transport, setTransport }), [tone, transport])

  return <ToneContext.Provider value={toneContextValue}>{children}</ToneContext.Provider>
}

export default ToneContextProvider
