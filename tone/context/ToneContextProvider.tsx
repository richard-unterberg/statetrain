import { createContext, type ReactNode, useState } from "react"

import type { ToneType } from "#lib/types"

export interface ToneContextValues {
  tone: ToneType | undefined
  setTone: React.Dispatch<React.SetStateAction<ToneType | undefined>>
}

export const ToneContext = createContext<ToneContextValues | undefined>(undefined)

const ToneContextProvider = ({ children }: { children: ReactNode }) => {
  const [tone, setTone] = useState<ToneType | undefined>()

  return <ToneContext.Provider value={{ setTone, tone }}>{children}</ToneContext.Provider>
}

export default ToneContextProvider
