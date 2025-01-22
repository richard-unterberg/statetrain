/**
 * INTERNAL HOOK
 * DO NOT IMPORT DIRECTLY - use useTone()
 */
import { useContext } from "react"

import { TransportContext } from "#tone/context/TransportContextProvider"

/**
 * @private
 * do not import directly - use useTone.ts
 */
const useInternalTransportContext = () => {
  const context = useContext(TransportContext)

  if (!context) {
    throw new Error("transport must be used within the TransportContextProvider")
  }

  return { transport: context?.transport, setTransport: context?.setTransport }
}

export default useInternalTransportContext
