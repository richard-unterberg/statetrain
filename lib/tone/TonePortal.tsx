import { ReactNode, Suspense, useCallback, useMemo } from 'react'

import Button from '#components/common/Button'
import useTone from '#tone/useTone'
import { setTransportDefaults } from '#tone/utils'

/**
 * This Portal is placed before tone.js is initialized and must be submitted before user can enter any of page-routed contents.
 * It initializes Tone.js and provides the Tone.js context to all following pages / components.
 */
const TonePortal = ({ children }: { children: ReactNode }) => {
  const { tone, setTone, setTransport } = useTone()

  // only after tone is initialized, the children are rendered
  const toneMemo = useMemo(() => tone && <Suspense>{children}</Suspense>, [children, tone])

  const handleClick = useCallback(async () => {
    if (!setTone || !setTransport) return

    // async import
    const toneModule = await import('tone')

    // get transport once & setting defaults
    const toneTransport = toneModule.getTransport()
    setTransportDefaults(toneTransport)

    // feed context
    setTone(toneModule)
    setTransport(toneTransport)
  }, [setTone, setTransport])

  return (
    toneMemo || (
      <div className="flex justify-center">
        <div className="mt-16 p-3">
          <div className="text-5xl text-center mb-6">🚂🚃</div>
          <div className="text-4xl text-center font-black mb-6">STATETRAIN</div>
          <Button className="bg-successDark text-white w-full justify-center" onClick={handleClick}>
            Initialize Tone.js / AudioContext
          </Button>
          <div className="text-sm mt-4 text-gray">
            Unlock and maintain tone.js context for all following pages / components
          </div>
        </div>
      </div>
    )
  )
}

export default TonePortal
