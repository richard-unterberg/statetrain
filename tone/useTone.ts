import { useCallback, useEffect } from "react"

import { TRANSPORT_CONFIG } from "#lib/constants"
import type { ToneContextValues } from "#tone/context/ToneContextProvider"
import useInternalToneContext from "#tone/internal/useInternalToneContext"
import useInternalTransportStore, {
  type TransportStoreGetter,
} from "#tone/internal/useInternalTransportStore"
import useInternalTransportContext from "#tone/internal/useInternalTransportContext"
import type { TransportContextValues } from "#tone/context/TransportContextProvider"

interface UseToneCallbacks {
  handlePlay: () => void
  handleStop: () => void
  handleChangeBpm: (value: number) => void
  handleChangeTimeSignature: (value: number) => void
}

// intersection of tone context member functions and Zustand getters (setters are only used internally in this hook)
type UseToneValues = UseToneCallbacks & ToneContextValues & TransportContextValues & TransportStoreGetter

/**
 * Custom hook for managing tone and transport settings.
 * Mainly retriving data from the ToneContext (tone, transport) and TransportStore (serialized data like bpm, isPlaying, etc).
 * @returns An object containing various tone and transport settings and functions.
 */
const useTone = () => {
  // the one and only invoke of useToneContext + useTransportStore
  const { tone, setTone } = useInternalToneContext()
  const { transport, setTransport } = useInternalTransportContext()
  const setIsPlaying = useInternalTransportStore((state) => state.setIsPlaying)
  const setBpm = useInternalTransportStore((state) => state.setBpm)
  const setTimeSignature = useInternalTransportStore((state) => state.setTimeSignature)
  const isPlaying = useInternalTransportStore((state) => state.isPlaying)
  const loopLength = useInternalTransportStore((state) => state.loopLength)
  const bpm = useInternalTransportStore((state) => state.bpm)
  const timeSignature = useInternalTransportStore((state) => state.timeSignature)

  /** starts the transport and sets UI state */
  const handlePlay = useCallback(() => {
    if (transport) {
      transport.position = "0:0:0"
      transport?.start()
    }
    setIsPlaying(true)
  }, [setIsPlaying, transport])

  /** stops the transport and sets UI state */
  const handleStop = useCallback(() => {
    console.log("here we stop usually")

    if (transport && transport.state === "started") {
      transport.stop()
      transport.position = "0:0:0"
    }
    setIsPlaying(false)
  }, [transport, setIsPlaying])

  useEffect(() => {
    console.log(transport)
  }, [transport])

  /** change transport bpm and sets UI state */
  const handleChangeBpm = useCallback(
    (value: number) => {
      if (value && value <= TRANSPORT_CONFIG.bpm.max && value >= TRANSPORT_CONFIG.bpm.min) {
        if (transport) {
          transport.bpm.value = value
          setBpm(value)
        }
      }
    },
    [setBpm, transport],
  )

  /** stop transport, set signature, recalculate and sets UI state */
  const handleChangeTimeSignature = useCallback(
    (value: number) => {
      if (
        transport &&
        value &&
        value <= TRANSPORT_CONFIG.timeSignature.max &&
        value >= TRANSPORT_CONFIG.timeSignature.min
      ) {
        handleStop()

        transport.timeSignature = value
        transport.loopEnd = `${loopLength}m`
        setTimeSignature(value)
      }
    },
    [handleStop, loopLength, setTimeSignature, transport],
  )

  return {
    transport,
    tone,
    isPlaying,
    loopLength,
    bpm,
    timeSignature,
    setTransport,
    setTone,
    handlePlay,
    handleStop,
    handleChangeBpm,
    handleChangeTimeSignature,
  } as UseToneValues
}

export default useTone
