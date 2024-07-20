import { ReactNode, Suspense, useCallback, useMemo } from 'react'

import TonePortalContent from '#components/TonePortalContent'
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

  return toneMemo || <TonePortalContent handleClick={handleClick} />
}

export default TonePortal
