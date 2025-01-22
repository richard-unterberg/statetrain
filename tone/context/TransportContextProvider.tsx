import { createContext, type ReactNode, useState } from "react"

import type { TransportType } from "#lib/types"

export interface TransportContextValues {
  transport: TransportType | undefined
  setTransport: React.Dispatch<React.SetStateAction<TransportType | undefined>>
}

export const TransportContext = createContext<TransportContextValues | undefined>(undefined)

const TransportContextProvider = ({ children }: { children: ReactNode }) => {
  const [transport, setTransport] = useState<TransportType | undefined>()

  return <TransportContext.Provider value={{ setTransport, transport }}>{children}</TransportContext.Provider>
}

export default TransportContextProvider
