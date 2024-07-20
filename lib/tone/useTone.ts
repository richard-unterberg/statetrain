import { useCallback } from 'react'

import { TRANSPORT_CONFIG } from '#lib/constants'
import { ToneContextValues } from '#tone/context/ToneContextProvider'
import useInternalToneContext from '#tone/hooks/useInternalToneContext'
import useInternalTransportStore, {
  TransportStoreGetter,
} from '#tone/hooks/useInternalTransportStore'

interface UseToneCallbacks {
  handlePlay: () => void
  handleStop: () => void
  handleChangeBpm: (value: number) => void
  handleChangeTimeSignature: (value: number) => void
}

// intersection of tone context member functions and Zustand getters (setters are only used internally in this hook)
type UseToneValues = UseToneCallbacks & ToneContextValues & TransportStoreGetter

/**
 * Custom hook for managing tone and transport settings.
 * Mainly retriving data from the ToneContext (tone, transport) and TransportStore (serialized data like bpm, isPlaying, etc).
 * @returns An object containing various tone and transport settings and functions.
 */
const useTone = () => {
  // the one and only invoke of useToneContext + useTransportStore
  const { transport, tone, setMetronome, setTone, setTransport } = useInternalToneContext()
  const { setIsPlaying, setBpm, setTimeSignature, isPlaying, loopLength, bpm, timeSignature } =
    useInternalTransportStore()

  /** starts the transport and sets UI state */
  const handlePlay = useCallback(() => {
    transport?.start()
    setIsPlaying(true)
  }, [setIsPlaying, transport])

  /** stops the transport and sets UI state */
  const handleStop = useCallback(() => {
    transport?.stop()
    setIsPlaying(false)
  }, [setIsPlaying, transport])

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
        setMetronome &&
        value &&
        value <= TRANSPORT_CONFIG.timeSignature.max &&
        value >= TRANSPORT_CONFIG.timeSignature.min
      ) {
        if (isPlaying) {
          handleStop()
        }

        transport.timeSignature = value
        transport.loopEnd = `${loopLength}m`
        setTimeSignature(value)
        setMetronome()
      }
    },
    [handleStop, isPlaying, loopLength, setMetronome, setTimeSignature, transport],
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
    setMetronome,
    handlePlay,
    handleStop,
    handleChangeBpm,
    handleChangeTimeSignature,
  } as UseToneValues
}

export default useTone
