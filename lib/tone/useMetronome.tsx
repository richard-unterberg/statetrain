import { useCallback, useRef } from 'react'

import { ToneType, TransportType } from '#lib/types'

const useMetronome = ({ tone, transport }: { tone?: ToneType; transport?: TransportType }) => {
  const metronomeMeasure = useRef<number | null>(null)
  const metronomeQuarterTick = useRef<number | null>(null)

  const clearMetronome = useCallback(() => {
    if (!tone || !transport) return

    if (metronomeMeasure.current !== null) {
      transport.clear(metronomeMeasure.current)
      metronomeMeasure.current = null
    }
    if (metronomeQuarterTick.current != null) {
      transport.clear(metronomeQuarterTick.current)
      metronomeQuarterTick.current = null
    }
  }, [tone, transport])

  const setMetronome = useCallback(() => {
    if (!tone || !transport) return
    clearMetronome()

    const synth = new tone.Synth().toDestination()
    const measure = transport.scheduleRepeat(time => {
      synth.triggerAttackRelease('C5', '64n', time)
    }, '1m')
    metronomeMeasure.current = measure

    const synth2 = new tone.Synth().toDestination()
    const quarter = transport.scheduleRepeat(time => {
      synth2.triggerAttackRelease('C4', '64n', time)
    }, '4n')
    metronomeQuarterTick.current = quarter
  }, [clearMetronome, tone, transport])

  return {
    setMetronome,
  } as const
}

export default useMetronome
