import { useEffect, useMemo, useRef } from "react"

import useTone from "#tone/useTone"

interface useTransportChangeProps {
  registerEvent: () => void
  clearEvent?: () => void
}

/** custom hook to handle re-registering of transport events after transport length change */
const useTransportChange = ({ registerEvent, clearEvent }: useTransportChangeProps) => {
  // we set it to undefined to trigger the useEffect on first mount
  const { loopLength, timeSignature } = useTone()
  const length = useMemo(() => loopLength * timeSignature, [loopLength, timeSignature])

  const prevLength = useRef<number | undefined>(undefined)

  useEffect(() => {
    if (prevLength.current !== length) {
      registerEvent()
      prevLength.current = length
    }
    return () => {
      clearEvent?.()
    }
  }, [length, registerEvent, clearEvent])
}

export default useTransportChange
