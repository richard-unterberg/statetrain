import { useCallback, useRef } from "react"

import type { ToneType, TransportType } from "#lib/types"

const useMetronome = ({ tone, transport }: { tone?: ToneType; transport?: TransportType }) => {
  const metronomeMeasure = useRef<number | null>(null)
  const metronomeQuarterTick = useRef<number | null>(null)

  const clearSetMetronome = useCallback(() => {
    if (!tone || !transport) return
    console.log("clearSetMetronome")

    if (metronomeMeasure.current !== null) {
      transport.clear(metronomeMeasure.current)
      metronomeMeasure.current = null
    }
    if (metronomeQuarterTick.current != null) {
      transport.clear(metronomeQuarterTick.current)
      metronomeQuarterTick.current = null
    }

    const synth = new tone.Synth().toDestination()
    const measure = transport.scheduleRepeat((time) => {
      synth.triggerAttackRelease("C5", "64n", time)
    }, "1m")
    metronomeMeasure.current = measure

    const synth2 = new tone.Synth().toDestination()
    const quarter = transport.scheduleRepeat((time) => {
      synth2.triggerAttackRelease("C4", "64n", time)
    }, "4n")
    metronomeQuarterTick.current = quarter

    console.log(metronomeMeasure.current)
    console.log(metronomeQuarterTick.current)
  }, [tone, transport])

  return {
    clearSetMetronome,
  } as const
}

export default useMetronome
