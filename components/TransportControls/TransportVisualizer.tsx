import { CircleDashed, CircleX, Smile } from "lucide-react"
import { memo, useCallback, useEffect, useMemo, useRef, useState } from "react"

import useTone from "#tone/useTone"
import useTransportChange from "#tone/useTransportChange"

const TransportVisualizer = memo(() => {
  const { transport, tone, loopLength, isPlaying, timeSignature } = useTone()
  const [currentPosition, setCurrentPosition] = useState<undefined | number>(undefined)

  const tickEventId = useRef<number | undefined>(undefined)

  const measures = useMemo(() => Array.from({ length: loopLength }, (_, i) => i), [loopLength])
  const ticks = useMemo(() => Array.from({ length: timeSignature }, (_, i) => i), [timeSignature])

  const handleTick = useCallback(() => {
    setCurrentPosition((prev) => {
      if (prev === undefined) {
        return 0
      }
      return (prev + 1) % (loopLength * timeSignature)
    })
  }, [loopLength, timeSignature])

  const registerTickEvent = useCallback(() => {
    if (tickEventId.current !== undefined) {
      tone?.getDraw().cancel()
      transport?.clear(tickEventId.current)
    }

    const tick = transport?.scheduleRepeat((time) => {
      tone?.getDraw()?.schedule(() => {
        handleTick()
      }, time)
    }, "4n")
    setCurrentPosition(undefined)
    tickEventId.current = tick
  }, [handleTick, tone, transport])

  useTransportChange({
    registerEvent: registerTickEvent,
  })

  useEffect(() => {
    if (!isPlaying) {
      setCurrentPosition(undefined)
    }
  }, [isPlaying])

  return (
    <div className="flex flex-col items-stretch justify-between">
      {measures.map((measure) => (
        <div key={measure} className="flex gap-1">
          {ticks.map((tick) => {
            const isCurrentTick = currentPosition === measure * timeSignature + tick
            const isFirstTick = measure === 0 && tick === 0
            const isFirstMeasure = isCurrentTick && tick === 0

            return (
              <div key={tick} className="w-3 h-3 flex items-center justify-center">
                {isPlaying && (
                  <>
                    <CircleDashed
                      strokeWidth={3}
                      className={`text-errorDark ${isCurrentTick || isFirstMeasure ? "hidden" : "block"}`}
                    />
                    <CircleX
                      strokeWidth={3}
                      className={`text-warningLight ${isCurrentTick && !isFirstMeasure ? "block" : "hidden"}`}
                    />
                    <Smile strokeWidth={4} className={`text-white ${isFirstMeasure ? "block" : "hidden"}`} />
                  </>
                )}
                {!isPlaying && isFirstTick && <Smile strokeWidth={3} className="text-white" />}
                {!isPlaying && !isFirstTick && <CircleDashed strokeWidth={3} className="text-errorDark" />}
              </div>
            )
          })}
        </div>
      ))}
    </div>
  )
})

export default TransportVisualizer
