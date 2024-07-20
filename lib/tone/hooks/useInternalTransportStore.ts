/**
 * INTERNAL HOOK
 * DO NOT IMPORT DIRECTLY - use useTone()
 */
import { create } from 'zustand'

import { TRANSPORT_CONFIG } from '#lib/constants'

export interface TransportStoreGetter {
  bpm: number
  timeSignature: number
  loopLength: number
  isPlaying: boolean
}

export interface TransportStoreSetter {
  setBpm: (payload: number | undefined) => void
  setTimeSignature: (payload: number | undefined) => void
  setLoopLength: (payload: number | undefined) => void
  setIsPlaying: (payload: boolean | undefined) => void
}

export type TransportStoreValues = TransportStoreGetter & TransportStoreSetter

/**
 * @private
 * do not import directly - use useTone.ts
 */
const useInternalTransportStore = create<TransportStoreValues>()(set => ({
  bpm: TRANSPORT_CONFIG.bpm.default,
  setBpm: payload => set(() => ({ bpm: payload })),
  timeSignature: TRANSPORT_CONFIG.timeSignature.default,
  setTimeSignature: payload => set(() => ({ timeSignature: payload })),
  loopLength: TRANSPORT_CONFIG.loopLength.default,
  setLoopLength: payload => set(() => ({ loopLength: payload })),
  isPlaying: TRANSPORT_CONFIG.isPlaying,
  setIsPlaying: payload => set(() => ({ isPlaying: payload })),
}))

export default useInternalTransportStore
