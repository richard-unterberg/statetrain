import { CircleDashed, CircleX, Smile } from 'lucide-react'
import { memo, useCallback, useEffect, useMemo, useRef } from 'react'

import useTone from '#tone/useTone'

const TransportVisualizer = memo(
  ({
    currentPosition,
    setCurrentPosition,
    transportLength,
  }: {
    currentPosition: number
    transportLength: number
    setCurrentPosition: React.Dispatch<React.SetStateAction<number>>
  }) => {
    const { transport, tone, loopLength, isPlaying, timeSignature } = useTone()

    const tickEventId = useRef<number | undefined>()

    const measures = useMemo(() => Array.from({ length: loopLength }, (_, i) => i), [loopLength])
    const ticks = useMemo(() => Array.from({ length: timeSignature }, (_, i) => i), [timeSignature])

    const handleTick = useCallback(() => {
      setCurrentPosition(prev => (prev + 1) % (loopLength * timeSignature))
    }, [loopLength, setCurrentPosition, timeSignature])

    const clearTickEvent = useCallback(() => {
      if (tickEventId.current !== undefined) {
        tone?.getDraw().cancel()
        transport?.clear(tickEventId.current)
      }
    }, [tone, transport])

    const registerTickEvent = useCallback(() => {
      clearTickEvent()

      const tick = transport?.scheduleRepeat(time => {
        tone?.getDraw()?.schedule(() => {
          handleTick()
        }, time)
      }, '4n')
      setCurrentPosition(transportLength)
      tickEventId.current = tick
    }, [clearTickEvent, handleTick, setCurrentPosition, tone, transport, transportLength])

    // on Change of transportLength -> reset
    useEffect(() => {
      if (transportLength) {
        setCurrentPosition(transportLength)
        registerTickEvent()
      }
    }, [transportLength, registerTickEvent, setCurrentPosition])

    return (
      <div className="flex flex-col items-stretch justify-between">
        {measures.map(measure => (
          <div key={measure} className="flex gap-1">
            {ticks.map(tick => {
              const isCurrentTick = currentPosition === measure * timeSignature + tick
              const isFirstTick = measure === 0 && tick === 0
              const isFirstMeasure = isCurrentTick && tick === 0

              return (
                <div key={tick} className="w-3 h-3 flex items-center justify-center">
                  {isPlaying && (
                    <>
                      <CircleDashed
                        strokeWidth={3}
                        className={`text-errorDark ${isCurrentTick || isFirstMeasure ? 'hidden' : 'block'}`}
                      />
                      <CircleX
                        strokeWidth={3}
                        className={`text-warningLight ${isCurrentTick && !isFirstMeasure ? 'block' : 'hidden'}`}
                      />
                      <Smile
                        strokeWidth={4}
                        className={`text-white ${isFirstMeasure ? 'block' : 'hidden'}`}
                      />
                    </>
                  )}
                  {!isPlaying && isFirstTick && <Smile strokeWidth={3} className="text-white" />}
                  {!isPlaying && !isFirstTick && (
                    <CircleDashed strokeWidth={3} className="text-errorDark" />
                  )}
                </div>
              )
            })}
          </div>
        ))}
      </div>
    )
  },
)

export default TransportVisualizer
