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

  if (!context) {
    throw new Error("tone must be used within the ToneContextProvider")
  }

  return { tone: context?.tone, setTone: context?.setTone }
}

export default useInternalToneContext
