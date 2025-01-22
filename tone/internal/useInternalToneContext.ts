/**
 * INTERNAL HOOK
 * DO NOT IMPORT DIRECTLY - use useTone()
 */
import { useContext } from "react"

import { ToneContext } from "#tone/context/ToneContextProvider"

/**
 * @private
 * do not import directly - use useTone.ts
 */
const useInternalToneContext = () => {
  const context = useContext(ToneContext)
  const tone = context?.tone
  const setTone = context?.setTone
  const transport = context?.transport
  const setTransport = context?.setTransport

  if (!context) {
    throw new Error("tone must be used within the ToneContextProvider")
  }

  return { tone, setTone, transport, setTransport }
}

export default useInternalToneContext
